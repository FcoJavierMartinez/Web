let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

let mainState = {
    preload: loadAssets,
    create: initaliseGame,
    update: gameUpdate
}

game.state.add("main", mainState);