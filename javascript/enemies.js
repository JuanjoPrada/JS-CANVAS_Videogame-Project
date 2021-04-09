class Enemy {
    constructor(ctx, canvas, background, player, image, scale, type) {
        this.ctx = ctx
        this.background = background
        this.player = player
        this.canvas = canvas

        this.enemyTypes = 6
        this.type = this.setType()

        this.setSkin()

        this.w = this.setSize().enemyW
        this.h = this.setSize().enemyH

        this.hMultiplier = 1
        this.wScale = 1

        this.posX = canvas.w
        this.posY = this.setPosY()

        this.speedX = this.setSpeed()

        this.flash = 0
    }

    //Tipos de enemigos:
    //Type A => objetos, humanos y animales pequeños
    //Type B => humanos y animales grandes
    //Type C+ => coches y otros vehiculos *en movimiento positivo al background
    //Type C- => coches y otros vehiculos *en movimiento negativo al background
    //Type D => obstaculos de carretera
    //Type EUp => ??
    //Type EDown => obstaculos altos de cesped

    setType() {
        const randomSpawnType = Math.floor(Math.random() * this.enemyTypes)
        const randomInSpawnType = Math.floor(Math.random() * 2)
        let randomType = ''
        switch (randomSpawnType) {
            case 0:
                randomType = 'A'
                break;
            case 1:
                randomType = 'B'
                break;
            case 2:
                switch (randomInSpawnType) {
                    case 0:
                        randomType = 'C+'
                        break
                    case 1:
                        randomType = 'C-'
                        break
                }
                break;
            case 3:
                randomType = 'D'
                break
            case 4:
                switch (randomInSpawnType) {
                    case 0:
                        randomType = 'EUp'
                        break
                    case 1:
                        randomType = 'EDown'
                        break
                }
                break
            case 5:
                const ZProbability = Math.floor(Math.random() * 10)
                if (ZProbability === 9 || this.player.phase === 6) {
                    randomType = 'Z'
                }
                break
        }
        return randomType
    }

    setSkin() {
        this.skin = new Image()
        this.skinFlash = new Image()
        switch (this.type) {
            case 'A':
                const ASkins = 11
                const randomASkin = Math.floor(Math.random() * ASkins)
                switch (randomASkin) {
                    case 0:
                        this.skin.src = 'images/A/blinky.png'
                        this.skinFlash.src = 'images/A/blinkyFlash.png'
                        this.wScale = 1.3493
                        this.hMultiplier = 1
                        break
                    case 1:
                        this.skin.src = 'images/A/funzo.png'
                        this.skinFlash.src = 'images/A/funzoFlash.png'
                        this.wScale = 0.7403
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/A/chumBot.png'
                        this.skinFlash.src = 'images/A/chumBotFlash.png'
                        this.wScale = 0.7798
                        this.hMultiplier = 1.5
                        break
                    case 3:
                        this.skin.src = 'images/A/gremlin.png'
                        this.skinFlash.src = 'images/A/gremlinFlash.png'
                        this.wScale = 1.278
                        this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/A/hansMoleman.png'
                        this.skinFlash.src = 'images/A/hansMolemanFlash.png'
                        this.wScale = 0.6344
                        this.hMultiplier = 2
                        break
                    case 5:
                        this.skin.src = 'images/A/itchy.png'
                        this.skinFlash.src = 'images/A/itchyFlash.png'
                        this.wScale = 0.7008
                        this.hMultiplier = 1.4
                        break
                    case 6:
                        this.skin.src = 'images/A/mrTeeny.png'
                        this.skinFlash.src = 'images/A/mrTeenyFlash.png'
                        this.wScale = 1.1491
                        this.hMultiplier = 1.3
                        break
                    case 7:
                        this.skin.src = 'images/A/myPod.png'
                        this.skinFlash.src = 'images/A/myPodFlash.png'
                        this.wScale = 1.3077
                        this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/A/plopper.png'
                        this.skinFlash.src = 'images/A/plopperFlash.png'
                        this.wScale = 1.5151
                        this.hMultiplier = 1.2
                        break
                    case 9:
                        this.skin.src = 'images/A/snowballV.png'
                        this.skinFlash.src = 'images/A/snowballVFlash.png'
                        this.wScale = 1.1791
                        this.hMultiplier = 1.2
                        break
                    case 10:
                        this.skin.src = 'images/A/woodChipper.png'
                        this.skinFlash.src = 'images/A/woodChipperFlash.png'
                        this.wScale = 1.0909
                        this.hMultiplier = 1
                        break
                }
                break
            case 'B':
                const BSkins = 53
                const randomBSkin = Math.floor(Math.random() * BSkins)
                switch (randomBSkin) {
                    //Estos estaran invertidos 
                    case 0:
                        this.skin.src = 'images/B/kang.png'
                        this.skinFlash.src = 'images/B/kangFlash.png'
                        this.wScale = 1.3678
                        this.hMultiplier = 1.3
                        break
                    case 1:
                        this.skin.src = 'images/B/robo-burns.png'
                        this.skinFlash.src = 'images/B/robo-burnsFlash.png'
                        this.wScale = 1.8018
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/B/sideshowBob.png'
                        this.skinFlash.src = 'images/B/sideshowBobFlash.png'
                        this.wScale = 1.9691
                        this.hMultiplier = 1
                        break
                    case 3:
                        this.skin.src = 'images/B/sister1.png'
                        this.skinFlash.src = 'images/B/sister1Flash.png'
                        this.wScale = 2.1039
                        this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/B/wolfcastle.png'
                        this.skinFlash.src = 'images/B/wolfcastleFlash.png'
                        this.wScale = 1.6066
                        this.hMultiplier = 1
                        break
                    case 5:
                        this.skin.src = 'images/B/barto.png'
                        this.skinFlash.src = 'images/B/bartoFlash.png'
                        this.wScale = 1.7361
                        this.hMultiplier = 1
                        break
                    case 6:
                        this.skin.src = 'images/B/sister2.png'
                        this.skinFlash.src = 'images/B/sister2Flash.png'
                        this.wScale = 2.3617
                        this.hMultiplier = 1
                        break
                    case 7:
                        this.skin.src = 'images/B/frank.png'
                        this.skinFlash.src = 'images/B/frankFlash.png'
                        this.wScale = 1.575
                        this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/B/chief.png'
                        this.skinFlash.src = 'images/B/chiefFlash.png'
                        this.wScale = 1.6856
                        this.hMultiplier = 1
                        break
                    case 9:
                        this.skin.src = 'images/B/surgeon.png'
                        this.skinFlash.src = 'images/B/surgeonFlash.png'
                        this.wScale = 2.5897
                        this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/B/bully.png'
                        this.skinFlash.src = 'images/B/bullyFlash.png'
                        this.wScale = 2
                        this.hMultiplier = 1
                        break
                    case 11:
                        this.skin.src = 'images/B/barney.png'
                        this.skinFlash.src = 'images/B/barneyFlash.png'
                        this.wScale = 1.3516
                        this.hMultiplier = 1
                        break
                    case 12:
                        this.skin.src = 'images/B/bartman.png'
                        this.skinFlash.src = 'images/B/bartmanFlash.png'
                        this.wScale = 1.229
                        this.hMultiplier = 1
                        break
                    case 13:
                        this.skin.src = 'images/B/blinkyMonster.png'
                        this.skinFlash.src = 'images/B/blinkyMonsterFlash.png'
                        this.wScale = 1.5625
                        this.hMultiplier = 1
                        break
                    case 14:
                        this.skin.src = 'images/B/lawyer.png'
                        this.skinFlash.src = 'images/B/lawyerFlash.png'
                        this.wScale = 2.7027
                        this.hMultiplier = 1
                        break
                    case 15:
                        this.skin.src = 'images/B/bumblebee.png'
                        this.skinFlash.src = 'images/B/bumblebeeFlash.png'
                        this.wScale = 1.5975
                        this.hMultiplier = 1
                        break
                    case 16:
                        this.skin.src = 'images/B/duffSurly.png'
                        this.skinFlash.src = 'images/B/duffSurlyFlash.png'
                        this.wScale = 1.844
                        this.hMultiplier = 1
                        break
                    case 17:
                        this.skin.src = 'images/B/discoStu.png'
                        this.skinFlash.src = 'images/B/discoStuFlash.png'
                        this.wScale = 1.7798
                        this.hMultiplier = 1
                        break
                    case 18:
                        this.skin.src = 'images/B/wrestler.png'
                        this.skinFlash.src = 'images/B/wrestlerFlash.png'
                        this.wScale = 1.548
                        this.hMultiplier = 1
                        break
                    case 19:
                        this.skin.src = 'images/B/villain.png'
                        this.skinFlash.src = 'images/B/villainFlash.png'
                        this.wScale = 1.7857
                        this.hMultiplier = 1
                        break
                    case 20:
                        this.skin.src = 'images/B/devil.png'
                        this.skinFlash.src = 'images/B/devilFlash.png'
                        this.wScale = 1.42
                        this.hMultiplier = 1
                        break
                    case 21:
                        this.skin.src = 'images/B/dolphart.png'
                        this.skinFlash.src = 'images/B/dolphartFlash.png'
                        this.wScale = 1.6489
                        this.hMultiplier = 1
                        break
                    case 22:
                        this.skin.src = 'images/B/drColosus.png'
                        this.skinFlash.src = 'images/B/drColosusFlash.png'
                        this.wScale = 1.8868
                        this.hMultiplier = 1
                        break
                    case 23:
                        this.skin.src = 'images/B/duffman.png'
                        this.skinFlash.src = 'images/B/duffmanFlash.png'
                        this.wScale = 1.7857
                        this.hMultiplier = 1
                        break
                    case 24:
                        this.skin.src = 'images/B/lisa.png'
                        this.skinFlash.src = 'images/B/lisaFlash.png'
                        this.wScale = 1.4275
                        this.hMultiplier = 1
                        break
                    case 25:
                        this.skin.src = 'images/B/crabapple.png'
                        this.skinFlash.src = 'images/B/crabappleFlash.png'
                        this.wScale = 2.67
                        this.hMultiplier = 1
                        break
                    case 26:
                        this.skin.src = 'images/B/falloutBoy.png'
                        this.skinFlash.src = 'images/B/falloutBoyFlash.png'
                        this.wScale = 1.2901
                        this.hMultiplier = 1
                        break
                    case 27:
                        this.skin.src = 'images/B/fatTony.png'
                        this.skinFlash.src = 'images/B/fatTonyFlash.png'
                        this.wScale = 1.6165
                        this.hMultiplier = 1
                        break
                    case 28:
                        this.skin.src = 'images/B/frankGrimes.png'
                        this.skinFlash.src = 'images/B/frankGrimesFlash.png'
                        this.wScale = 2.0833
                        this.hMultiplier = 1
                        break
                    case 29:
                        this.skin.src = 'images/B/krusty.png'
                        this.skinFlash.src = 'images/B/krustyFlash.png'
                        this.wScale = 1.2261
                        this.hMultiplier = 1
                        break
                    case 30:
                        this.skin.src = 'images/B/hibbert.png'
                        this.skinFlash.src = 'images/B/hibbertFlash.png'
                        this.wScale = 1.4222
                        this.hMultiplier = 1
                        break
                    case 32:
                        this.skin.src = 'images/B/abe.png'
                        this.skinFlash.src = 'images/B/abeFlash.png'
                        this.wScale = 1.5748
                        this.hMultiplier = 1
                        break
                    case 33:
                        this.skin.src = 'images/B/burns.png'
                        this.skinFlash.src = 'images/B/burnsFlash.png'
                        this.wScale = 2.6702
                        this.hMultiplier = 1
                        break
                    case 34:
                        this.skin.src = 'images/B/kodos.png'
                        this.skinFlash.src = 'images/B/kodosFlash.png'
                        this.wScale = 1.4823
                        this.hMultiplier = 1.5
                        break
                    case 35:
                        this.skin.src = 'images/B/maggie.png'
                        this.skinFlash.src = 'images/B/maggieFlash.png'
                        this.wScale = 1.3511
                        this.hMultiplier = 1
                        break
                    case 36:
                        this.skin.src = 'images/B/nelson.png'
                        this.skinFlash.src = 'images/B/nelsonFlash.png'
                        this.wScale = 1.6293
                        this.hMultiplier = 1
                        break
                    case 37:
                        this.skin.src = 'images/B/ness.png'
                        this.skinFlash.src = 'images/B/nessFlash.png'
                        this.wScale = 1.4427
                        this.hMultiplier = 1
                        break
                    case 38:
                        this.skin.src = 'images/B/poochie.png'
                        this.skinFlash.src = 'images/B/poochieFlash.png'
                        this.wScale = 1.0382
                        this.hMultiplier = 1
                        break
                    case 39:
                        this.skin.src = 'images/B/rex.png'
                        this.skinFlash.src = 'images/B/rexFlash.png'
                        this.wScale = 1.0763
                        this.hMultiplier = 1
                        break
                    case 40:
                        this.skin.src = 'images/B/ralph.png'
                        this.skinFlash.src = 'images/B/ralphFlash.png'
                        this.wScale = 1.0076
                        this.hMultiplier = 1
                        break
                    case 41:
                        this.skin.src = 'images/B/rm.png'
                        this.skinFlash.src = 'images/B/rmFlash.png'
                        this.wScale = 1.7857
                        this.hMultiplier = 1
                        break
                    case 42:
                        this.skin.src = 'images/B/russ.png'
                        this.skinFlash.src = 'images/B/russFlash.png'
                        this.wScale = 2.1739
                        this.hMultiplier = 1
                        break
                    case 43:
                        this.skin.src = 'images/B/twin.png'
                        this.skinFlash.src = 'images/B/twinFlash.png'
                        this.wScale = 2.1968
                        this.hMultiplier = 1
                        break
                    case 44:
                        this.skin.src = 'images/B/scratchy.png'
                        this.skinFlash.src = 'images/B/scratchyFlash.png'
                        this.wScale = 1.3673
                        this.hMultiplier = 1
                        break
                    case 45:
                        this.skin.src = 'images/B/snake.png'
                        this.skinFlash.src = 'images/B/snakeFlash.png'
                        this.wScale = 1.8018
                        this.hMultiplier = 1
                        break
                    case 46:
                        this.skin.src = 'images/B/skinner.png'
                        this.skinFlash.src = 'images/B/skinnerFlash.png'
                        this.wScale = 2.8145
                        this.hMultiplier = 1
                        break
                    case 47:
                        this.skin.src = 'images/B/collector.png'
                        this.skinFlash.src = 'images/B/collectorFlash.png'
                        this.wScale = 1.5038
                        this.hMultiplier = 1
                        break
                    case 48:
                        this.skin.src = 'images/B/collider.png'
                        this.skinFlash.src = 'images/B/colliderFlash.png'
                        this.wScale = 1.6807
                        this.hMultiplier = 1
                        break
                    case 49:
                        this.skin.src = 'images/B/fracker.png'
                        this.skinFlash.src = 'images/B/frackerFlash.png'
                        this.wScale = 1.8181
                        this.hMultiplier = 1
                        break
                    case 50:
                        this.skin.src = 'images/B/troy.png'
                        this.skinFlash.src = 'images/B/troyFlash.png'
                        this.wScale = 1.8763
                        this.hMultiplier = 1
                        break
                    case 51:
                        this.skin.src = 'images/B/bully2.png'
                        this.skinFlash.src = 'images/B/bully2Flash.png'
                        this.wScale = 3.4050
                        this.hMultiplier = 0.7
                        break
                    case 52:
                        this.skin.src = 'images/B/marge.png'
                        this.skinFlash.src = 'images/B/margeFlash.png'
                        this.wScale =
                            this.hMultiplier = 1.9608
                        break

                }
                break
            case 'C+':
                const CPlusSkins = 11
                const randomCPlusSkin = Math.floor(Math.random() * CPlusSkins)
                switch (randomCPlusSkin) {
                    case 0:
                        this.skin.src = 'images/C/C+/eisenhower.png'
                        this.skinFlash.src = 'images/C/C+/eisenhowerFlash.png'
                        this.wScale = 1.6333
                        this.hMultiplier = 1.2
                        break
                    case 1:
                        this.skin.src = 'images/C/C+/hoverCar.png'
                        this.skinFlash.src = 'images/C/C+/hoverCarFlash.png'
                        this.wScale = 1.6703
                        this.hMultiplier = 1.3
                        break
                    case 2:
                        this.skin.src = 'images/C/C+/radmobile.png'
                        this.skinFlash.src = 'images/C/C+/radmobileFlash.png'
                        this.wScale = 2.5592
                        this.hMultiplier = 1.2
                        break
                    case 3:
                        this.skin.src = 'images/C/C+/demonCar.png'
                        this.skinFlash.src = 'images/C/C+/demonCarFlash.png'
                        this.wScale = 1.925
                        this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/C/C+/duffRacer.png'
                        this.skinFlash.src = 'images/C/C+/duffRacerFlash.png'
                        this.wScale = 2.8762
                        this.hMultiplier = 1
                        break
                    case 5:
                        this.skin.src = 'images/C/C+/freakMobile.png'
                        this.skinFlash.src = 'images/C/C+/freakMobileFlash.png'
                        this.wScale = 1.4672
                        this.hMultiplier = 1.5
                        break
                    case 6:
                        this.skin.src = 'images/C/C+/limo.png'
                        this.skinFlash.src = 'images/C/C+/limoFlash.png'
                        this.wScale = 2.4636
                        this.hMultiplier = 1
                        break
                    case 7:
                        this.skin.src = 'images/C/C+/mafiaCar.png'
                        this.skinFlash.src = 'images/C/C+/mafiaCarFlash.png'
                        this.wScale = 1.9739
                        this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/C/C+/missile.png'
                        this.skinFlash.src = 'images/C/C+/missileFlash.png'
                        this.wScale = 2.5736
                        this.hMultiplier = 1
                        break
                    case 9:
                        this.skin.src = 'images/C/C+/pristine1985.png'
                        this.skinFlash.src = 'images/C/C+/pristine1985Flash.png'
                        this.wScale = 2.3663
                        this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/C/C+/trucksTRuckTruck.png'
                        this.skinFlash.src = 'images/C/C+/trucksTruckTruckFlash.png'
                        this.wScale = 1.9184
                        this.hMultiplier = 2
                        break
                }
                break
            case 'C-':
                const CMinusSkins = 11
                const randomCMinusSkin = Math.floor(Math.random() * CMinusSkins)
                switch (randomCMinusSkin) {
                    case 0:
                        this.skin.src = 'images/C/C-/obstaclesTruck.png'
                        this.skinFlash.src = 'images/C/C-/obstaclesTruckFlash.png'
                        this.wScale = 2.3012
                        this.hMultiplier = 1.5
                        break
                    case 1:
                        this.skin.src = 'images/C/C-/policeCar.png'
                        this.skinFlash.src = 'images/C/C-/policeCarFlash.png'
                        this.wScale = 1.8452
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/C/C-/starline.png'
                        this.skinFlash.src = 'images/C/C-/starlineFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                    case 3:
                        this.skin.src = 'images/C/C-/ATFVan.png'
                        this.skinFlash.src = 'images/C/C-/ATFVanFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1.3
                        break
                    case 4:
                        this.skin.src = 'images/C/C-/duffPartybus.png'
                        this.skinFlash.src = 'images/C/C-/duffPartybusFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1.5
                        break
                    case 5:
                        this.skin.src = 'images/C/C-/flyingCar.png'
                        this.skinFlash.src = 'images/C/C-/flyingCarFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                    case 6:
                        this.skin.src = 'images/C/C-/mrPowers.png'
                        this.skinFlash.src = 'images/C/C-/mrPowersFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                    case 7:
                        this.skin.src = 'images/C/C-/quimborgini.png'
                        this.skinFlash.src = 'images/C/C-/quimborginiFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/C/C-/ratTRapDeliveryTruck.png'
                        this.skinFlash.src = 'images/C/C-/ratTRapDeliveryTruckFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1.5
                        break
                    case 9:
                        this.skin.src = 'images/C/C-/simpsonsCar.png'
                        this.skinFlash.src = 'images/C/C-/simpsonsCarFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/C/C-/wagon.png'
                        this.skinFlash.src = 'images/C/C-/wagonFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                }
                break
            case 'D':
                const DSkins = 20
                const randomDSkin = Math.floor(Math.random() * DSkins)
                switch (randomDSkin) {
                    case 0:
                        this.skin.src = 'images/D/jebedias.png'
                        this.skinFlash.src = 'images/D/jebediasFlash.png'
                        this.wScale = 0.4679
                        this.hMultiplier = 1
                        break
                    case 1:
                        this.skin.src = 'images/D/megaDonut.png'
                        this.skinFlash.src = 'images/D/megaDonutFlash.png'
                        this.wScale = 0.8965
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/D/nuclearBomb.png'
                        this.skinFlash.src = 'images/D/nuclearBombFlash.png'
                        this.wScale = 1.0686
                        this.hMultiplier = 1
                        break
                    case 3:
                        this.skin.src = 'images/D/couch.png'
                        this.skinFlash.src = 'images/D/couchFlash.png'
                        this.wScale = 1.1179
                        this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/D/crappyRV.png'
                        this.skinFlash.src = 'images/D/crappyRVFlash.png'
                        this.wScale = 1.0267
                        this.hMultiplier = 1
                        break
                    case 5:
                        this.skin.src = 'images/D/crushedCar.png'
                        this.skinFlash.src = 'images/D/crushedCarFlash.png'
                        this.wScale = 0.9589
                        this.hMultiplier = 1
                        break
                    case 6:
                        this.skin.src = 'images/D/donutTruck.png'
                        this.skinFlash.src = 'images/D/donutTruckFlash.png'
                        this.wScale = 1.2145
                        this.hMultiplier = 1
                        break
                    case 7:
                        this.skin.src = 'images/D/dumpsterBlue.png'
                        this.skinFlash.src = 'images/D/dumpsterBlueFlash.png'
                        this.wScale = 0.9263
                        this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/D/dumpsterGreen.png'
                        this.skinFlash.src = 'images/D/dumpsterGreenFlash.png'
                        this.wScale = 0.9263
                        this.hMultiplier = 1
                        break
                    case 9:
                        this.skin.src = 'images/D/firstPMofAustralia.png'
                        this.skinFlash.src = 'images/D/firstPMofAustraliaFlash.png'
                        this.wScale = 0.5324
                        this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/D/fortAdventure.png'
                        this.skinFlash.src = 'images/D/fortAdventureFlash.png'
                        this.wScale = 1.4074
                        this.hMultiplier = 1
                        break
                    case 11:
                        this.skin.src = 'images/D/hansMechman.png'
                        this.skinFlash.src = 'images/D/hansMechmanFlash.png'
                        this.wScale = 0.7043
                        this.hMultiplier = 1
                        break
                    case 12:
                        this.skin.src = 'images/D/morticianCarriage.png'
                        this.skinFlash.src = 'images/D/morticianCarriageFlash.png'
                        this.wScale = 1.1726
                        this.hMultiplier = 1
                        break
                    case 13:
                        this.skin.src = 'images/D/old1958.png'
                        this.skinFlash.src = 'images/D/old1958Flash.png'
                        this.wScale = 1.5320
                        this.hMultiplier = 1
                        break
                    case 14:
                        this.skin.src = 'images/D/pieMan.png'
                        this.skinFlash.src = 'images/D/pieManFlash.png'
                        this.wScale = 0.6401
                        this.hMultiplier = 1
                        break
                    case 15:
                        this.skin.src = 'images/D/tollBooth.png'
                        this.skinFlash.src = 'images/D/tollBoothFlash.png'
                        this.wScale = 1.0764
                        this.hMultiplier = 1
                        break
                    case 16:
                        this.skin.src = 'images/D/tortureStand.png'
                        this.skinFlash.src = 'images/D/tortureStandFlash.png'
                        this.wScale = 0.8525
                        this.hMultiplier = 1
                        break
                    case 17:
                        this.skin.src = 'images/D/X-RayTruck.png'
                        this.skinFlash.src = 'images/D/X-RayTruckFlash.png'
                        this.wScale = 1.1146
                        this.hMultiplier = 1
                        break
                    case 18:
                        this.skin.src = 'images/D/lookout.png'
                        this.skinFlash.src = 'images/D/lookoutFlash.png'
                        this.wScale = 0.7989
                        this.hMultiplier = 1
                        break
                    case 19:
                        this.skin.src = 'images/D/holoTree.png'
                        this.skinFlash.src = 'images/D/holoTreeFlash.png'
                        this.wScale = 0.8926
                        this.hMultiplier = 1
                        break
                }
                break
            case 'EUp':
            case 'EDown':
                const EUpSkins = 19
                const randomEUpSkin = Math.floor(Math.random() * EUpSkins)
                switch (randomEUpSkin) {
                    case 0:
                        this.skin.src = 'images/E/carPileup.png'
                        this.skinFlash.src = 'images/E/carPileupFlash.png'
                        this.wScale = 0.8614
                        this.hMultiplier = 1
                        break
                    case 1:
                        this.skin.src = 'images/E/lardLad.png'
                        this.skinFlash.src = 'images/E/lardLadFlash.png'
                        this.wScale = 0.5043
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/E/libertyLisa.png'
                        this.skinFlash.src = 'images/E/libertyLisaFlash.png'
                        this.wScale = 0.4821
                        this.hMultiplier = 1
                        break
                    case 3:
                        this.skin.src = 'images/E/monster.png'
                        this.skinFlash.src = 'images/E/monsterFlash.png'
                        this.wScale = 0.6888
                        this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/E/waterCar.png'
                        this.skinFlash.src = 'images/E/waterCarFlash.png'
                        this.wScale = 1.3212
                        this.hMultiplier = 1
                        break
                    case 5:
                        this.skin.src = 'images/E/totem.png'
                        this.skinFlash.src = 'images/E/totemFlash.png'
                        this.wScale = 0.4367
                        this.hMultiplier = 1
                        break
                    case 6:
                        this.skin.src = 'images/E/beerTruckSpill.png'
                        this.skinFlash.src = 'images/E/beerTruckSpillFlash.png'
                        this.wScale = 1
                        this.hMultiplier = 0.75
                        break
                    case 7:
                        this.skin.src = 'images/E/britishRoundabout.png'
                        this.skinFlash.src = 'images/E/britishRoundaboutFlash.png'
                        this.wScale = 0.4047
                        this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/E/carPillar.png'
                        this.skinFlash.src = 'images/E/carPillarFlash.png'
                        this.wScale = 0.3048
                        this.hMultiplier = 1.5
                        break
                    case 9:
                        this.skin.src = 'images/E/christRedeemer.png'
                        this.skinFlash.src = 'images/E/christRedeemerFlash.png'
                        this.wScale = 0.6938
                        this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/E/comicCrystals.png'
                        this.skinFlash.src = 'images/E/comicCrystalsFlash.png'
                        this.wScale = 0.9924
                        this.hMultiplier = 1
                        break
                    case 11:
                        this.skin.src = 'images/E/dipperFlipper.png'
                        this.skinFlash.src = 'images/E/dipperFlipperFlash.png'
                        this.wScale = 0.721
                        this.hMultiplier = 1
                        break
                    case 12:
                        this.skin.src = 'images/E/duffBlimp.png'
                        this.skinFlash.src = 'images/E/duffBlimpFlash.png'
                        this.wScale = 1.5762
                        this.hMultiplier = 1
                        break
                    case 13:
                        this.skin.src = 'images/E/eyeballsOfDeath.png'
                        this.skinFlash.src = 'images/E/eyeballsOfDeathFlash.png'
                        this.wScale = 0.7624
                        this.hMultiplier = 1
                        break
                    case 14:
                        this.skin.src = 'images/E/hot-dogStand.png'
                        this.skinFlash.src = 'images/E/hot-dogStandFlash.png'
                        this.wScale = 0.7721
                        this.hMultiplier = 1
                        break
                    case 15:
                        this.skin.src = 'images/E/mech.png'
                        this.skinFlash.src = 'images/E/mechFlash.png'
                        this.wScale = 0.6029
                        this.hMultiplier = 1
                        break
                    case 16:
                        this.skin.src = 'images/E/radioactiveManTheRide.png'
                        this.skinFlash.src = 'images/E/radioactiveManTheRideFlash.png'
                        this.wScale = 0.7432
                        this.hMultiplier = 1
                        break
                    case 17:
                        this.skin.src = 'images/E/simpsonsTreehouse.png'
                        this.skinFlash.src = 'images/E/simpsonsTreehouseFlash.png'
                        this.wScale = 0.7303
                        this.hMultiplier = 1
                        break
                    case 18:
                        this.skin.src = 'images/E/sphinx.png'
                        this.skinFlash.src = 'images/E/sphinxFlash.png'
                        this.wScale = 1.249
                        this.hMultiplier = 0.8
                        break
                }
                break

            case 'Z':
                const ZSkins = 3
                const randomZSkin = Math.floor(Math.random() * ZSkins)
                switch (randomZSkin) {
                    case 0:
                        this.skin.src = 'images/Z/nuclearPowerPlant.png'
                        this.skinFlash.src = 'images/Z/nuclearPowerPlantFlash.png'
                        this.wScale = 1.0661
                        this.hMultiplier = 1
                        break
                }
                break
        }
    }

    setSize() {
        let dimensionsByType = {
            enemyH: 0,
            enemyW: 0
        }
        switch (this.type) {
            case 'A':
                dimensionsByType.enemyH = ((this.background.boundaryBottom - this.background.grassHeight) / 10) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'B':
                //Este esta invertido porque su tamaño es en funcion del ancho del personaje, no de su altura.
                dimensionsByType.enemyW = (this.player.initialW / 1.5) * this.hMultiplier //a decidir
                dimensionsByType.enemyH = dimensionsByType.enemyW * this.wScale
                break
            case 'C+':
            case 'C-':
                dimensionsByType.enemyH = ((this.background.roadHeight / 3) * 0.8) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'D':
                dimensionsByType.enemyH = (this.background.roadHeight / 2) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'EUp':
            case 'EDown':
                dimensionsByType.enemyH = (this.background.roadHeight) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'Z':
                dimensionsByType.enemyH = (this.background.roadHeight * 1.5) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
        }
        return dimensionsByType
    }

    setPosY() {
        const randomSpawnPosY_MIN = this.background.boundaryTop
        const randomSpawnPosY_MAX = this.background.boundaryBottom - this.h
        let randomSpawnPosY = 0
        switch (this.type) {
            case 'A':
                const randomSpawnPosY_MIN_A = randomSpawnPosY_MIN //a decidir
                const randomSpawnPosY_MAX_A = randomSpawnPosY_MAX //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_A + 1 - randomSpawnPosY_MIN_A) + randomSpawnPosY_MIN_A)
                break
            case 'B':
                const randomSpawnPosY_MIN_B = (randomSpawnPosY_MIN + (this.background.boardwalkHeight / 3)) - this.h //a decidir
                const randomSpawnPosY_MAX_B = randomSpawnPosY_MAX //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_B + 1 - randomSpawnPosY_MIN_B) + randomSpawnPosY_MIN_B)
                break
            case 'C+':
                const randomSpawnPosY_MIN_Cplus = randomSpawnPosY_MIN + this.background.boardwalkHeight //a decidir
                const randomSpawnPosY_MAX_Cplus = randomSpawnPosY_MAX - this.background.boardwalkHeight //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_Cplus + 1 - randomSpawnPosY_MIN_Cplus) + randomSpawnPosY_MIN_Cplus)
                break
            case 'C-':
                const randomSpawnPosY_MIN_Cminus = randomSpawnPosY_MIN + this.background.boardwalkHeight //a decidir
                const randomSpawnPosY_MAX_Cminus = randomSpawnPosY_MAX - this.background.boardwalkHeight //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_Cminus + 1 - randomSpawnPosY_MIN_Cminus) + randomSpawnPosY_MIN_Cminus)
                break
            case 'D':
                const randomSpawnPosY_MIN_D = randomSpawnPosY_MIN + this.background.boardwalkHeight //a decidir
                const randomSpawnPosY_MAX_D = randomSpawnPosY_MAX - this.background.boardwalkHeight //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_D + 1 - randomSpawnPosY_MIN_D) + randomSpawnPosY_MIN_D)
                break
            case 'EUp':
                randomSpawnPosY = this.background.boundaryTop - ((this.h / 3) * 2.5)
                break
            case 'EDown':
                randomSpawnPosY = this.background.boundaryBottom - (this.h / 2)
                break
            case 'Z':
                randomSpawnPosY = (this.background.boundaryBottom - this.h) - this.background.boardwalkHeight
                break
        }
        return randomSpawnPosY
    }

    setSpeed() {
        let speedSet = 0
        const CplusSpeed_MAX = 100 * 2 //a decidir
        const CplusSpeed_MIN = 100 * 1.5 //a decidir
        const CplusSpeedRandom = (Math.floor(Math.random() * (CplusSpeed_MAX - CplusSpeed_MIN) + CplusSpeed_MIN)) / 100
        const CminusSpeed_MAX = 100 * 0.5 //a decidir
        const CminusSpeed_MIN = 100 * 0.1 //a decidir
        const CminusSpeedRandom = (Math.floor(Math.random() * (CminusSpeed_MAX - CminusSpeed_MIN) + CminusSpeed_MIN)) / 100

        switch (this.type) {
            case 'A':
            case 'B':
            case 'D':
            case 'EUp':
            case 'EDown':
            case 'Z':
                speedSet = this.background.speedX
                break
            case 'C+':
                speedSet = this.background.speedX * CplusSpeedRandom
                break
            case 'C-':
                speedSet = this.background.speedX * CminusSpeedRandom
                break
        }
        return speedSet
    }


    draw() {
        this.ctx.drawImage(this.skin, this.posX, this.posY, this.w, this.h)
        if (this.isConsumable()) {
            this.drawFlash()
        }
        this.move()
    }

    isConsumable() { // !!!!!!!! 
        if (this.player.phase === 1 && (this.type === 'A')) {
            return true
        } else if (this.player.phase === 2 && (this.type === 'A' || this.type === 'B')) {
            return true
        } else if (this.player.phase === 3 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-')) {
            return true
        } else if (this.player.phase === 4 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-' || this.type === 'D')) {
            return true
        } else if (this.player.phase === 5 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-' || this.type === 'D' || this.type === 'EUp' || this.type === 'EDown')) {
            return true
        } else if (this.player.phase === 6 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-' || this.type === 'D' || this.type === 'EUp' || this.type === 'EDown' || this.type === 'Z')) {
            return true
        } else {
            return false
        }
    }

    drawFlash() {
        this.flash++
        if (this.flash > (this.speedX * 2)) {
            this.ctx.drawImage(this.skinFlash, this.posX, this.posY, this.w, this.h)
            this.flash = 0
        }
    }

    move() {
        this.posX -= this.speedX
    }
}