const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let global_score = 0;
let game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'game');

window.onload = StartGame();

function StartGame() {
    game.state.add("init",initState);
    game.state.add("instructions", instructionState);
    game.state.add("avoid",avoidState);
    game.state.add("platform",platformState);
}