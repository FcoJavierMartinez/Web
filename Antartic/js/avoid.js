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
}

function createAvoidLevel() {
    //Set World bounds (arreglar que no son los que tocan)
    game.world.setBounds(0,0,GAME_WIDTH,GAME_HEIGHT);

    //Background
    let bgAvoid = game.add.tileSprite(0,0, game.world.width, game.world.height, 'backgAvoid');
    bgAvoid.scrollFactorX = 0.7;
}

function updateAvoidLevel() {
    
}

function loadAvoidSprites() {

}