const AVOID_WIDTH = 2400;
const AVOID_HEIGHT = 600;
const CHUZOS_GROUP_SIZE = 300;
const ROMPE_CHUZOS_GROUP_SIZE = 50;
const AVOID_HEALTH = 20;
const TIMER_RHYTHM = 0.1 * Phaser.Timer.SECOND;
let chuzos;
let goRight = true;
let bgFrontAvoid, bgMediumAvoid, bgBackAvoid;
let chuzosProbability = 0.4;
let chuzosVelocity = 200;
let rompeChuzos;
let avoid_score;
let healthValue, healthBar, healthTween;
let avoid_transicion;
let endAvoid = false;

let avoidState = {
    preload: loadAvoidAssets,
    create: createAvoidLevel,
    update: updateAvoidLevel
}

function loadAvoidAssets() {
    loadAvoidSprites();
    loadAvoidImages();
}

function loadAvoidImages() {
    game.load.image('backgBackAvoid', 'assets/imgs/AvoidBackground_back.png');
    game.load.image('backgMediumAvoid', 'assets/imgs/AvoidBackground_medium.png');
    game.load.image('backgFrontAvoid', 'assets/imgs/AvoidBackground_frontFixed.png');
    game.load.image('chuzo', 'assets/imgs/Chuzo.png');
    game.load.image('holder', 'assets/imgs/Health_BarHandler.png');
    game.load.image('healthBar', 'assets/imgs/Health_Bar.png');
}

function loadAvoidSprites() {
    game.load.spritesheet('prota', 'assets/imgs/Gunterprota-Sheet.png', 100, 100);
    game.load.spritesheet('romper', 'assets/imgs/Chuzo-Sheet.png', 29, 58);
    game.load.spritesheet('transicion','assets/imgs/transicion-Sheet.png', 800, 600);
}

function createAvoidLevel() {
    //Set World bounds (arreglar que no son los que tocan)
    game.world.setBounds(0, 0, AVOID_WIDTH, AVOID_HEIGHT);

    //Background
    bgBackAvoid = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backgBackAvoid');
    bgMediumAvoid = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backgMediumAvoid');
    bgFrontAvoid = game.add.tileSprite(0, AVOID_HEIGHT - 90, game.world.width, game.world.height, 'backgFrontAvoid');
    game.physics.arcade.enable(bgFrontAvoid);
    bgFrontAvoid.body.immovable = true;

    //Create Hud
    createAvoidHud();

    //Create player
    player = game.add.sprite(35, 410, 'prota');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);

    //Physic properties
    player.body.gravity.y = PLAYER_BODY_GRAVITY;
    player.body.collideWorldBounds = true;

    //Camera follows the player
    game.camera.follow(player);

    //Animation
    player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], true);
    player.animations.add('right', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37], true);


    //Transicion
    avoid_transicion = game.add.sprite(AVOID_WIDTH - 800,0,'transicion');
    avoid_transicion.animations.add('exit', [0,1,2,3,4,5,6,7], false);

    //Controls
    cursors = game.input.keyboard.createCursorKeys();

    //Create chuzos
    createChuzos(CHUZOS_GROUP_SIZE);
    createRompeChuzos(ROMPE_CHUZOS_GROUP_SIZE);
}

function createAvoidHud() {
    hudGroup = game.add.group();
    healthBar = hudGroup.create(5, 5, 'healthBar');
    hudGroup.create(5, 5, 'holder');
    hudGroup.fixedToCamera = true;
    healthValue = AVOID_HEALTH;
}

function createChuzos(size) {
    chuzos = game.add.group();
    chuzos.enableBody = true;
    chuzos.createMultiple(size, 'chuzo');
    chuzos.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    game.time.events.loop(TIMER_RHYTHM, activateChuzo, this);
}

function activateChuzo() {
    if (Math.random() < chuzosProbability) {
        let chuzo = chuzos.getFirstExists(false);
        if (chuzo) {
            let gw = game.world.width;
            let cw = chuzo.body.width;
            let w = gw - cw;
            let x = Math.floor(Math.random() * w);
            let z = cw / 2 + x;
            chuzo.reset(z, 0);
            chuzo.body.velocity.x = 0;
            chuzo.body.velocity.y = chuzosVelocity;
        }
    }
    // Salto ping??ino
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -PLAYER_VELOCITY * 1.5;
    }
}

function createRompeChuzos(size) {
    rompeChuzos = game.add.group();
    rompeChuzos.createMultiple(size, 'romper');
    rompeChuzos.forEach(setupRompeChuzos, this);
}

function setupRompeChuzos(rompeChuzo) {
    rompeChuzo.anchor.x = 0.5;
    rompeChuzo.anchor.y = 0.25;
    rompeChuzo.animations.add('break');
}

function displayBreak(chuzo) {
    let rompeChuzo = rompeChuzos.getFirstExists(false);
    let x = chuzo.body.center.x;
    let y = chuzo.body.center.y;
    rompeChuzo.reset(x, y);
    rompeChuzo.play('break', 30, false, true);
}

function resetMember(item) {
    item.kill();
}

function updateAvoidLevel() {
    //Movimiento del ping??ino
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        goRight = false;
        player.body.velocity.x = -PLAYER_VELOCITY;
        player.animations.play('left', 20);
        bgBackAvoid.tilePosition.x += 0.05;
        bgMediumAvoid.tilePosition.x += 0.3;
        bgFrontAvoid.tilePosition.x += 0.75;
    } else if (cursors.right.isDown) {
        goRight = true;
        player.body.velocity.x = PLAYER_VELOCITY;
        player.animations.play('right', 20);
        bgBackAvoid.tilePosition.x -= 0.05;
        bgMediumAvoid.tilePosition.x -= 0.3;
        bgFrontAvoid.tilePosition.x -= 0.75;
    } else {
        stopPlayer();
    }

    game.physics.arcade.overlap(chuzos, player, chuzoHitsPlayer, null, this);
    game.physics.arcade.overlap(chuzos, bgFrontAvoid, chuzoHitsGround, null, this);

    if (player.body.center.x > AVOID_WIDTH - 100 && endAvoid == false) {

        avoid_transicion.animations.play('exit', 30);
        chuzos.removeAll(true);
        endAvoid = true;
        game.time.events.add(1000, AvoidNextLevel, this);
        
    }
    //Collide with the ground
    game.physics.arcade.collide(player, bgFrontAvoid);
}

function chuzoHitsPlayer(player, chuzo) {
    chuzo.kill();
    displayBreak(chuzo);
    if (healthValue > 1) {
        healthValue = healthValue - 1;
        healthBar.width = healthBar.width - (healthBar.width / (healthValue + 1));
        healthBar.reset(5, 5);
    } else
        game.state.start('avoid');
}

function chuzoHitsGround(bgFrontAvoid, chuzo) {
    chuzo.kill();
    displayBreak(chuzo);
}

function AvoidNextLevel () {
    game.state.start('platform');
}

function stopPlayer() {
    player.animations.stop();
    if (goRight) {
        player.frame = 19;
    } else {
        player.frame = 18;
    }
}
