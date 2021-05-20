const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'game');

let mainState = {
    preload: loadAssets,
    create: initaliseGame,
    update: gameUpdate
}

function StartGame() {
    game.state.add("main", mainState);
}