## Attention! 
This project will soon be replaced by my upcoming project Open Source Mining Portal (OSMP); which will take the great features NOMP offers, while expanding upon them and giving everything a better look! I have no current ETA, though once I have a proof of work, I will release the repository under MIT! Stay tuned if you would like to help out development by contributing!

## Helping give NOMP new life! With some style.
#### If you want to help contribute, please look at the original [project](https://github.com/foxer666/node-open-mining-portal) first!

BootNOMP is all the things great about NOMP, now with modern style and design of BootStrap 4! Having disliked the previous UI, due to cramping, little to no info displayed while what is displayed is not very helpful to users. I decided to fork a already great project, and add some stylistic touches it severely needs. I would of considered requesting pulls to the main branch, though with such heavy changes to the project, I decided a hard fork would be well suited. But if you would like to contribute, please consider looking at the [original project](https://github.com/foxer666/node-open-mining-portal) first, as these guys are the ones who helped get this NOMP rebirthing process started.

-------
## Updates
_Updates marked with `*` are considered stable releases._
* v1.1.3*
   * Launched website! Be sure to check it out!
   * Redesigned statistics tracking structure, removing redundency.
   * Added more info to the account statistic page.
   * Considered stable, though needs to be fully tested!
* v1.1.2
   * Change charts once again, to ChartJS
   * Redesigned Pool/Worker stats pages
   * Added Yescrypt R16 & R32 to dependency projects, currently being testing with Wavicoin.
   * Completed more of Dashboard.
   * Added new NavBar
   * Initial Completetion, Almost Ready For Production. Going live @[NotoHash.club](https://notohash.club) soon.
* v1.1.1
   * Added payment info to redis.
   * Finished initial version of payment history page.
   * Finished initial version of block history page.
   * Finished new homepage.
   * Almost ready for stable release!
* v1.1.0
    * Added new homepage design.
    * Added dashboard functionality.
    * Added EMA to graphing.
    * Confirmed C11 functionality with Dixicoin.
* v1.0.9
    * Added pool statistic pages.
    * Expanded API.
    * Cleaned up main nav bar.
    * Added Ravencoin config file.
* v1.0.8
    * Fixed C11 algorithm.
    * Starting major UI overhaul using BootStrap 4.
* v1.0.7*
    * Lyra2z (Zcoin) algo fixed, next step is neoscrypt.

-------
### Node Open Mining Portal consists from 3 main modules:
* [NOMP](https://github.com/1301313Y/node-open-mining-portal)
* [Stratum Pool](https://github.com/1301313Y/node-stratum-pool)
* [Node Multihashing](https://github.com/1301313Y/node-multi-hashing)

_Stratum Pool can be replaced with [node-merged-pool](https://github.com/UNOMP/node-merged-pool)._<br>
_Add new algorithms using [Node Multihashing](https://github.com/1301313Y/node-multi-hashing)._

Current version: v1.1.3

-------
### Install
```
git clone https://github.com/foxer666/node-open-mining-portal.git pool
cd pool
npm install
node init.js
```
-------
### Requirements
* Node 8.x.x or higher
* Coin daemon
* Redis Server

### Run in Docker
_I Do Not Use Docker, So I Will Not Be Maintaining This Feature_
1) Correct configs appropriately to your environment in docker directory
2) ```cd docker```
3) ```docker build -t nomp .```
4) ```docker run -d --name nomp -v $(pwd)/config:/opt/config nomp ```

You will need to expose some ports to make it accessible from outside. You can achieve this by adding option -p HOST_PORT:CONTAINER_PORT in 4th step

You can see the logs of the server with ```docker logs -f nomp```, or jump into container with ```docker exec -it nomp```.

-------
### Hashing algorithms
#### Working
|   | Algorithm | Comment|
| ------------- | ------------- | ------------- |
| ✓ | __C11__ | tested shares and payments with Dixicoin |
| ✓ | __Groestl__ | tested only shares with AuroraCoin, blocks not tested |
| ✓ | __lyra2rev2__ | shares work, needs tests with payments. currently being tested with Lunex coin |
| ✓ | __lyra2z__ | Working in testnet *mining* and *payouts* |
| ✓ | __NeoScrypt__ | working now thanks to @foxer666 pushing update to parent repo |
| ✓ | __Qubit__ | Shares works, and blocks should now too. |
| ✓ | __Scrypt__ | tested with AntiLiteCoin, 1CREDIT, ArgusCoin, WAYAWOLFCOIN and many others |
| ✓ | __SHA256__ | tested with VCOIN, don't use with BTC, no Segwit tested |
| ✓ | __X11__ | tested with BrainCoin, CannabisCoin, AdzCoin and many others |
| ✓ | __X16r__ | tested with RavenCoin |
| ✓ | __Yescrypt__ | needs tests, though should work |
| ✓ | __YescryptR16__ | needs tests, though should work |
| ✓ | __YescryptR32__ | currently being tested with WaviCoin. shares work, payments unconfirmed |

#### Need tests
|   | Algorithm | Comment|
| ------------- | ------------- | ------------- |
| ? | __Argon2__ | need tests |
| ? | __Blake__ | need tests |
| ? | __Blake2S__ | need tests |
| ? | __Cryptonight__ | need tests |
| ? | __Dcrypt__ | need tests |
| ? | __Decred__ | need tests |
| ? | __Fresh__ | need tests |
| ? | __Fugue__ | need tests |
| ? | __GroestlMyriad__ | need tests |
| ? | __Quark__ | need tests |
| ? | __Hefty1__ | need tests |
| ? | __Keccak__ | need tests |
| ? | __Lbry__ | need tests |
| ? | __lyra2re__ | need tests |
| ? | __lyra2re2__ | need tests |
| ? | __lyra2z330__ | need tests |
| ? | __NIST5__ | need tests |
| ? | __S3__ | need tests |
| ? | __Scrypt-N__ | need tests |
| ? | __Scrypt-OG__ | need tests |
| ? | __Sha1__ | need tests |
| ? | __SHAvite-3__ | need tests |
| ? | __Skein__ | need tests |
| ? | __X11Ghost__ | need tests |
| ? | __X13__ | need tests |
| ? | __X14__ | need tests |
| ? | __X15__ | need tests |
| ? | __zr5__ | need tests |
| ? | __ziftr__ | need tests |

#### Don't work yet
|   | Algorithm | Comment|
| ------------- | ------------- | ------------- |
| - | __Scrypt-Jane__ | submitblock not working tested with CacheCoin, Yacoin |

https://docs.google.com/spreadsheets/d/1brtwII-e1ce94vidZcs-pPPhfI9J_j9EomwyL8yonuM/edit?usp=sharing

-------

-------
### Credits
* [a2hill](//github.com/a2hill) - helped with X16r
* [devnulled](//github.com/devnull-ed) - helped with lyra2z, neoscrypt algo
* [Kris Klosterman / krisklosterman](https://github.com/krisklosterman) - Updated code for work wiht Node.JS >=8
* [Jerry Brady / mintyfresh68](https://github.com/bluecircle) - got coin-switching fully working and developed proxy-per-algo feature
* [Tony Dobbs](http://anthonydobbs.com) - designs for front-end and created the NOMP logo
* [LucasJones](//github.com/LucasJones) - got p2p block notify working and implemented additional hashing algos
* [vekexasia](//github.com/vekexasia) - co-developer & great tester
* [TheSeven](//github.com/TheSeven) - answering an absurd amount of my questions and being a very helpful gentleman
* [UdjinM6](//github.com/UdjinM6) - helped implement fee withdrawal in payment processing
* [Alex Petrov / sysmanalex](https://github.com/sysmanalex) - contributed the pure C block notify script
* [svirusxxx](//github.com/svirusxxx) - sponsored development of MPOS mode
* [icecube45](//github.com/icecube45) - helping out with the repo wiki
* [Fcases](//github.com/Fcases) - ordered me a pizza <3
* [yoshuki43](//github.com/yoshuki43) - his K-Nomp project has really help the development!
* Those that contributed to [node-stratum-pool](//github.com/zone117x/node-stratum-pool#credits)

-------
### License
Released under the GNU General Public License v2
http://www.gnu.org/licenses/gpl-2.0.html


### Buy Me Some Coffee?
I drink a lot trust me... I will love you forever!


BTC: `148UCoHdsiRQShaYpLBD3ymagMxZ3ypjfp`

ETH: `0xdC88283D6DeD303CeAF88221869B6F3e6F1f69Ab`

DXC: `DE9seweYFGhSnpnELimB9vDNsbWn81ERvD`

WAVI: `WVES2K3J42Ayj9WVQ3erN7u7ze129JSXMN`
