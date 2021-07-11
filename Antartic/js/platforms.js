const PLATFORM_WIDTH = 1600;
const PLATFORM_HEIGHT = 600;
let bgFrontPlatform, bgMediumPlatform, bgBackPlatform, bgWhite;
let PlPrincipalPlatform;
let platformInitTransicion;


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

    game.load.spritesheet('prota', 'assets/imgs/Gunterprota-Sheet.png', 100, 100);
    game.load.image('PrincipalPlatform','assets/imgs/Platform_PrincipalPlatform.png');
    game.load.spritesheet('transicionIn','assets/imgs/transicion-Sheet.png', 800, 600);
    game.load.spritesheet('backWhite', 'assets/imgs/transicionBackwards-sheet.png', 800, 600);
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
    bgFrontPlatform  = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backgFrontPlatform');
    
    PlPrincipalPlatform = game.add.sprite(0, 536,'PrincipalPlatform');
    game.physics.arcade.enable(PlPrincipalPlatform);
    PlPrincipalPlatform.body.immovable = true;

    createPlayer();
    createControls();

    //transicion desde el nivel anterior
    platformInitTransicion = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'transicionIn');
    platformInitTransicion.animations.add('entry', [7, 6, 5, 4, 3, 2, 1, 0 ], true, false);
    platformInitTransicion.animations.play('entry', 13); 
    game.time.events.add(805, hideSprite, this);   
}

function updatePlatformLevel() {

    //Movimiento del pingüino
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        goRight = false;
        player.body.velocity.x = -PLAYER_VELOCITY;
        player.animations.play('left', 20);
        bgBackPlatform.tilePosition.x += 0.05;
        bgMediumPlatform.tilePosition.x += 0.3;
        bgFrontPlatform.tilePosition.x += 0.75;
    } else if (cursors.right.isDown) {
        goRight = true;
        player.body.velocity.x = PLAYER_VELOCITY;
        player.animations.play('right', 20);
        bgBackPlatform.tilePosition.x -= 0.05;
        bgMediumPlatform.tilePosition.x -= 0.3;
        bgFrontPlatform.tilePosition.x -= 0.75;
    } else {
        stopPlayer();
    }

    //Collide with the ground
    game.physics.arcade.collide(player, PlPrincipalPlatform);

}

function createPlayer(){
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
}

function createControls(){
    //Controls
    cursors = game.input.keyboard.createCursorKeys();
}

function stopPlayer() {
    player.animations.stop();
    if (goRight) {
        player.frame = 19;
    } else {
        player.frame = 18;
    }
}

function hideSprite(){
    platformInitTransicion.visible = false;
}