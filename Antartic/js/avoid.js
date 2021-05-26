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
    game.load.image('backgAvoid','assets/imgs/AvoidBackground.png');
    game.load.image('prota', 'assets/imgs/falsoprota.png');
}

function createAvoidLevel() {
    //Set World bounds (arreglar que no son los que tocan)
    game.world.setBounds(0,0,AVOID_WIDTH,AVOID_HEIGHT);

    //Background
    let bgAvoid = game.add.tileSprite(0,0, game.world.width, game.world.height, 'backgAvoid');
    bgAvoid.scrollFactorX = 0.7;

    //Create player
    player = game.add.image(35,410,'prota');
    player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(player);

    //Physic properties
    player.body.gravity.y = PLAYER_BODY_GRAVITY;
    player.body.collideWorldBounds = true;

    //Camera follows the player
    game.camera.follow(player);
}

function updateAvoidLevel() {
    
}

function loadAvoidSprites() {

}