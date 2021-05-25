let btnBack;

let instructionState = {
    preload: loadInstructionsAssets,
    create: showInstructions
}

function loadInstructionsAssets () {
    game.load.image('backButton', 'assets/imgs/BackButton.png');
}

function showInstructions () {
    btnBack = game.add.button(game.world.width/2, game.world.height/2, 'backButton', onBackButtonPressed);
}

function onBackButtonPressed () {
    game.state.start('init');
}