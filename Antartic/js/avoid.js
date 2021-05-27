const AVOID_WIDTH = 2400;
const AVOID_HEIGHT = 600;

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
    game.load.image('prota', 'assets/imgs/falsoprota.png');
}

function loadAvoidSprites() {

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

    //Controls
    cursors = game.input.keyboard.createCursorKeys();
}

function updateAvoidLevel() {
    //Movimiento del pingüino
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -PLAYER_VELOCITY;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = PLAYER_VELOCITY;
    }
}