const AVOID_WIDTH = 2400;
const AVOID_HEIGHT = 600;
const CHUZOS_GROUP_SIZE = 300;
const ROMPE_CHUZOS_GROUP_SIZE = 50;
const TIMER_RHYTHM = 0.1 * Phaser.Timer.SECOND;
let chuzos;
let goRight = true;
let bgFrontAvoid, bgMediumAvoid, bgBackAvoid;
let chuzosProbability = 0.4;
let chuzosVelocity = 200;
let rompeChuzos;

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
    game.load.image('backgBackAvoid','assets/imgs/AvoidBackground_back.png');
    game.load.image('backgMediumAvoid', 'assets/imgs/AvoidBackground_medium.png');
    game.load.image('backgFrontAvoid', 'assets/imgs/suelo_avoid.png');
    game.load.image('chuzo', 'assets/imgs/Chuzo.png');
}

function loadAvoidSprites() {
    game.load.spritesheet('prota', 'assets/imgs/Gunterprota-Sheet.png',100,100);
    game.load.spritesheet('romper', 'assets/imgs/Chuzo-Sheet.png',29,58);
}

function createAvoidLevel() {
    //Set World bounds (arreglar que no son los que tocan)
    game.world.setBounds(0,0,AVOID_WIDTH,AVOID_HEIGHT);

    //Background
    bgBackAvoid = game.add.tileSprite(0,0, game.world.width, game.world.height, 'backgBackAvoid');
    bgMediumAvoid = game.add.tileSprite(0,0,game.world.width, game.world.height, 'backgMediumAvoid');
    bgFrontAvoid = game.add.tileSprite(0,AVOID_HEIGHT - 116,game.world.width,game.world.height,'backgFrontAvoid');
    game.physics.arcade.enable(bgFrontAvoid);
    bgFrontAvoid.body.immovable = true;

    //Create player
    player = game.add.sprite(35,410,'prota');
    player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(player);

    //Physic properties
    player.body.gravity.y = PLAYER_BODY_GRAVITY;
    player.body.collideWorldBounds = true;

    //Camera follows the player
    game.camera.follow(player);

    //Animation
    player.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],true);
    player.animations.add('right',[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],true);
    //Controls
    cursors = game.input.keyboard.createCursorKeys();

    //Create chuzos
    createChuzos(CHUZOS_GROUP_SIZE);
    createRompeChuzos(ROMPE_CHUZOS_GROUP_SIZE);
}

function createChuzos(size) {
    chuzos = game.add.group();
    chuzos.enableBody = true;
    chuzos.createMultiple(size, 'chuzo');
    chuzos.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    chuzos.callAll('anchor.setTo', 'anchor',0.5,1.0);
    game.time.events.loop(TIMER_RHYTHM, activateChuzo, this);
}

function activateChuzo() {
    if(Math.random() < chuzosProbability) {
        let chuzo = chuzos.getFirstExists(false);
        if (chuzo) {
            let gw = game.world.width;
            let cw = chuzo.body.width;
            let w = gw - cw;
            let x = Math.floor(Math.random() * w);
            let z = cw / 2 + x;
            chuzo.reset(z, 0);
            chuzo.body.velocity.x=0;
            chuzo.body.velocity.y = chuzosVelocity;
        }
    }
    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -PLAYER_VELOCITY * 1.5;
    }
}

function createRompeChuzos(size) {
    rompeChuzos = game.add.group();
    rompeChuzos.createMultiple(size,'romper');
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
    //Movimiento del pingüino
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        goRight = false;
        player.body.velocity.x = -PLAYER_VELOCITY;
        player.animations.play('left',20);
        bgBackAvoid.tilePosition.x +=0.05;
        bgMediumAvoid.tilePosition.x += 0.3;
        bgFrontAvoid.tilePosition.x += 0.75;
    } else if (cursors.right.isDown) {
        goRight = true;
        player.body.velocity.x = PLAYER_VELOCITY;
        player.animations.play('right',20);
        bgBackAvoid.tilePosition.x -=0.05;
        bgMediumAvoid.tilePosition.x -= 0.3;
        bgFrontAvoid.tilePosition.x -= 0.75;
    }else{
        stopPlayer();
    }
    game.physics.arcade.overlap(chuzos, player, chuzoHitsPlayer, null, this);

    //Collide with the ground
    game.physics.arcade.collide(player, bgFrontAvoid);
}

function chuzoHitsPlayer(player, chuzo) {
    chuzo.kill();
    displayBreak(chuzo);
}

function stopPlayer(){
    player.animations.stop();
    if (goRight){
        player.frame = 19;
    }
    else{
        player.frame = 18;
    }
}