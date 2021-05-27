// Remaining time: 30 secs
// Items to solve: 4 items

let timedState = {
    preload: loadTimedAssets,
    create: createTimedLevel,
    update: updateTimedLevel
}

function loadTimedAssets() {
    game.load.image('backgTimed', 'assets/imgs/bgTimed.png');
    game.load.image('prota', 'assets/imgs/falsoprota.png');
}

function createTimedLevel() {
    // bg
    let bgTimed = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backgTimed');

    // player
    player = game.add.image(35, 410, 'prota');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);    
    }

function updateTimedLevel() {
}

function getKeyboardInput(e) {
    /*
    if (e.keyCode >= Phaser.Keyboard.A && e.keyCode <= Phaser.Keyboard.Z) {
        this.add.text(10, 10, 'e');
    }
    */
}