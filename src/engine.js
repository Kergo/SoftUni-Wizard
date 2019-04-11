let keys = {};

let state = {
    player: {
        x: 150,
        y: 100,
        width: 0,
        height: 0,
        lastTimeFiredFireBall: 0
    },
    scene: {
        isActiveGame: true,
        score: 0,
        lastCloudSpawn: 0,
        lastBugSpawn: 0
    }
};

function isCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom ||
        firstRect.bottom < secondRect.top ||
        firstRect.right < secondRect.left ||
        firstRect.left > secondRect.right);
};

function gameOverAction() {
    state.scene.isActiveGame = false;
    gameOver.classList.remove('hide');
}

function addFireBall(player) {
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');
    fireBall.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireBall.x = player.x + player.width;
    fireBall.style.left = fireBall.x + 'px';
    gameArea.appendChild(fireBall);
}

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}