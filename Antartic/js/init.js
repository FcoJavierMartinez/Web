let btnPlay, btnInstruction;

let initState = {
    preload: preloadInit,
    create: createInit
};

function preloadInit() {
    game.load.image('bgInit', 'assets/imgs/InitBackground.png');
    game.load.image('instButton', 'assets/imgs/InstructionButton.png');
    game.load.image('playButton', 'assets/imgs/PlayButton.png');
}

function createInit() {
    game.add.image(0,0,'bgInit');

    btnPlay = game.add.button(game.world.width/ 3, game.world.height/3, 'playButton', onPlayButtonPressed);
    btnInstruction = game.add.button(game.world.width/3, game.world.height/3 + 140, 'instButton', onInstructionButtonPressed);
}

function onPlayButtonPressed () {
    game.state.start('avoid');
}

function onInstructionButtonPressed () {
    game.state.start('instructions');
}