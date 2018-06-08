var Stratum = require('stratum-pool');
var redis = require('redis');
var net = require('net');


var ShareProcessor = require('./shareProcessor.js');

const loggerFactory = require('./logger.js');

module.exports = function() {
  const logger = loggerFactory.getLogger('PoolWorker', 'system');
  var _this = this;

  var poolConfigs = JSON.parse(process.env.pools);
  var portalConfig = JSON.parse(process.env.portalConfig);

  var forkId = process.env.forkId;

  var pools = {};

  var proxySwitch = {};

  var redisClient = redis.createClient(portalConfig.redis.port, portalConfig.redis.host);

  //Handle messages from master process sent via IPC
  process.on('message', function(message) {
    switch (message.type) {
      case 'banIP':
        onBanIP(message);
        break;
      case 'blocknotify':
        onBlockNotify(message);
        break;
    }
  });

  var onCoinSwitch = function(message) {
    logger.silly('incoming coinswitch message');
    let componentStr = `Proxy Switch [:${(parseInt(forkId) + 1)}]`;

    let logger = loggerFactory.getLogger(componentStr, coin);

    var switchName = message.switchName;

    var newCoin = message.coin;

    var algo = poolConfigs[newCoin].coin.algorithm;

    var newPool = pools[newCoin];
    var oldCoin = proxySwitch[switchName].currentPool;
    var oldPool = pools[oldCoin];
    var proxyPorts = Object.keys(proxySwitch[switchName].ports);

    if (newCoin == oldCoin) {
      logger.debug('Switch message would have no effect - ignoring %s', newCoin);
      return;
    }

    logger.debug('Proxy message for %s from %s to %s', algo, oldCoin, newCoin);

    if (newPool) {
      oldPool.relinquishMiners(
        function(miner, cback) {
          // relinquish miners that are attached to one of the "Auto-switch" ports and leave the others there.
          cback(proxyPorts.indexOf(miner.client.socket.localPort.toString()) !== -1)
        },
        function(clients) {
          newPool.attachMiners(clients);
        }
      );
      proxySwitch[switchName].currentPool = newCoin;

      redisClient.hset('proxyState', algo, newCoin, function(error, obj) {
        if (error) {
          logger.error('Redis error writing proxy config, err = %s', JSON.stringify(err))
        } else {
          logger.debug('Last proxy state saved to redis for %s', algo);
        }
      });
    }
  };

  var onBanIP = function(message) {
    logger.silly('incoming banip message');
    for (var p in pools) {
      if (pools[p].stratumServer)
        pools[p].stratumServer.addBannedIP(message.ip);
    }
  };

  var onBlockNotify = function(message) {
    logger.silly('incoming blocknotify message');

    var messageCoin = message.coin.toLowerCase();
    var poolTarget = Object.keys(pools).filter(function(p) {
      return p.toLowerCase() === messageCoin;
    })[0];

    if (poolTarget)
      pools[poolTarget].processBlockNotify(message.hash, 'blocknotify script');
  };


  Object.keys(poolConfigs).forEach(function(coin) {

    var poolOptions = poolConfigs[coin];

    let componentStr = `Pool [:${(parseInt(forkId) + 1)}]`;
    let logger = loggerFactory.getLogger(componentStr, coin);
    var handlers = {
      auth: function() {},
      share: function() {},
      diff: function() {}
    };

  
    //Functions required for internal payment processing

      var shareProcessor = new ShareProcessor(poolOptions);

      handlers.auth = function(port, workerName, password, authCallback) {
          // All adreses valid logig
          // TODO: any validates
          authCallback(true); 
      };

      handlers.share = function(isValidShare, isValidBlock, data) {
        logger.silly('Handle share, execeuting shareProcessor.handleShare, isValidShare = %s, isValidBlock = %s, data = %s', isValidShare, isValidBlock, JSON.stringify(data))
        shareProcessor.handleShare(isValidShare, isValidBlock, data);
      };


    var authorizeFN = function(ip, port, workerName, password, callback) {
      handlers.auth(port, workerName, password, function(authorized) {

        var authString = authorized ? 'Authorized' : 'Unauthorized ';

        logger.debug('%s %s:%s [%s]', authString, workerName, password, ip);
        callback({
          error: null,
          authorized: authorized,
          disconnect: false
        });
      });
    };


    var pool = Stratum.createPool(poolOptions, authorizeFN, logger);
    pool.on('share', function(isValidShare, isValidBlock, data) {
      
      if (data) {
      //handlers.diff(workerName, diff);
      }
      
      
      logger.silly('onStratumPoolShare');
      logger.debug("forkId %s", forkId);
      var shareDataJsonStr = JSON.stringify(data);

      if (data.blockHash && !isValidBlock) {
        logger.info('We thought a block was found but it was rejected by the daemon, share data: %s' + shareDataJsonStr);
      } else if (isValidBlock) {
        logger.info('Block found: %s', data.blockHash + ' by %s', data.worker);
      }
      if (isValidShare) {
        if (data.shareDiff > 1000000000) {
          logger.warn('Share was found with diff higher than 1.000.000.000!');
        } else if (data.shareDiff > 1000000) {
          logger.warn('Share was found with diff higher than 1.000.000!');
        }
        logger.info('Share accepted at diff %s/%s by %s [%s]', data.difficulty, data.shareDiff, data.worker, data.ip);

      } else if (!isValidShare) {
        logger.info('Share rejected: ' + shareDataJsonStr);
      }

      handlers.share(isValidShare, isValidBlock, data)


    }).on('difficultyUpdate', function(workerName, diff) {
      logger.info('Difficulty update to diff %s workerName = %s', JSON.stringify(workerName));
      
      handlers.diff(workerName, diff);
    }).on('log', function(severity, text) {
      logger.info(text);
    }).on('banIP', function(ip, worker) {
      process.send({
        type: 'banIP',
        ip: ip
      });
    }).on('started', function() {
      // TODO: delte this
    });

    pool.start();
    pools[poolOptions.coin.name] = pool;
  });


  
  this.getFirstPoolForAlgorithm = function(algorithm) {
    var foundCoin = "";
    Object.keys(poolConfigs).forEach(function(coinName) {
      if (poolConfigs[coinName].coin.algorithm == algorithm) {
        if (foundCoin === "")
          foundCoin = coinName;
      }
    });
    return foundCoin;
  };


};
