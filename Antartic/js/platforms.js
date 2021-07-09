const PLATFORM_WIDTH = 1600;
const PLATFORM_HEIGHT = 600;
let bgFrontPlatform, bgMediumPlatform, bgBackPlatform;

let platformState = {
    preload: loadPlatformAssets,
    create: createPlatformLevel,
    update: updatePlatformLevel
}

function loadPlatformAssets() {
    //background,mainland, platforms,collectableitems,player...
    loadPlatformSprites();
    loadPlatformImages();
}

function loadPlatformSprites() {

}

function loadPlatformImages() {
    game.load.image('backgBackPlatform', 'assets/imgs/PlatformBackground_Back.png');
    game.load.image('backgMediumPlatform', 'assets/imgs/PlatformBackground_Medium.png');
    game.load.image('backgFrontPlatform','assets/imgs/PlatformBackground_Front.png');
}

function createPlatformLevel() {
    game.world.setBounds(0, 0, PLATFORM_WIDTH, PLATFORM_HEIGHT);

    bgBackPlatform = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backgBackPlatform');
    bgMediumPlatform  = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backgMediumPlatform');
    bgFrontPlatform  = game.add.tileSprite(0, PLATFORM_HEIGHT - 90, game.world.width, game.world.height, 'backgFrontPlatform');
    game.physics.arcade.enable(bgFrontPlatform);
    bgFrontPlatform.body.immovable = true;
}

function updatePlatformLevel() {

}