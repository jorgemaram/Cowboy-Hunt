window.onload = () => {
    gameApp.init('mycanvas')
    document.getElementById('start-button').onclick = () => {
        gameApp.start();
        document.getElementsByClassName('game-intro')[0].hidden = true;
        document.getElementById('start-button').hidden = true;
    };
};
