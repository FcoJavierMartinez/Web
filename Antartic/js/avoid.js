const AVOID_WIDTH = 2400;
const AVOID_HEIGHT = 600;
const CHUZOS_GROUP_SIZE = 200;
const TIMER_RHYTHM = 0.1 * Phaser.Timer.SECOND;
let chuzos;
let chuzosProbability = 0.4;
let chuzosVelocity = 200;

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
    game.load.image('backgFrontAvoid', 'assets/imgs/AvoidBackground_front.png');
    game.load.image('chuzo', 'assets/imgs/Chuzo.png');
}

function loadAvoidSprites() {
    game.load.spritesheet('prota', 'assets/imgs/Gunterprota-Sheet.png',100,100);
}

function createAvoidLevel() {
    //Set World bounds (arreglar que no son los que tocan)
    game.world.setBounds(0,0,AVOID_WIDTH,AVOID_HEIGHT);

    //Background
    let bgBackAvoid = game.add.tileSprite(0,0, game.world.width, game.world.height, 'backgBackAvoid');
    let bgMediumAvoid = game.add.tileSprite(0,0,game.world.width, game.world.height, 'backgMediumAvoid');
    let bgFrontAvoid = game.add.tileSprite(0,0,game.world.width, game.world.height, 'backgFrontAvoid');
    bgBackAvoid.scrollFactorX = 0.5;
    bgMediumAvoid.scrollFactorX = 0.8;
    bgFrontAvoid.scrollFactorX = 1;

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

    createChuzos(CHUZOS_GROUP_SIZE);
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
}

function resetMember(item) {
    item.kill();
}

function updateAvoidLevel() {
    //Movimiento del pingüino
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -PLAYER_VELOCITY;
        player.animations.play('left',20);
    } else if (cursors.right.isDown) {
        player.body.velocity.x = PLAYER_VELOCITY;
        player.animations.play('right',20);
    }
}