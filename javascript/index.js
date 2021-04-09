window.onload = () => {
    game.init()
    document.getElementById('start-button').onclick = () => {
        startGame();
        console.log('Game started.')
    };
}
    
function startGame() {
    game.start()
}