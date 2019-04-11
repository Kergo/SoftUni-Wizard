const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');
const gamePoints = gameScore.querySelector('.points');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);



function onGameStart() {
    gameStart.classList.add('hide');

    const wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);
    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight;

    window.requestAnimationFrame(frame(0));
}


const frame = t1 => t2 => {
    if (t2 - t1 > game.frameLength) {
        gameAction(t2);
       scene.isActiveGame && window.requestAnimationFrame(frame(t2));
    } else {
        window.requestAnimationFrame(frame(t1))
    }
}

function gameAction(timestamp) {
    const wizard = document.querySelector('.wizard');
    // player.width = wizard.offsetWidth;
    //player.height = wizard.offsetHeight;

    scene.score++;

    // Add bugs
    if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
        let bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameArea.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';
        gameArea.appendChild(bug);
        scene.lastBugSpawn = timestamp;
    }

    // Add clouds
    if (timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()) {
        let cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameArea.offsetWidth - 200;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';
        gameArea.appendChild(cloud);
        scene.lastCloudSpawn = timestamp;
    }

    // Modify bug position
    let bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        bug.x -= game.speed * 3;
        bug.style.left = bug.x + 'px';

        if (bug.x + bug.offsetWidth <= 0) {
            bug.parentElement.removeChild(bug);
        }
    })

    // Modify clouds positions
    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + cloud.offsetWidth <= 0) {
            cloud.parentElement.removeChild(cloud)
        }
    });

    // Modify fireball positions
    let fireBalls = document.querySelectorAll('.fire-ball');
    fireBalls.forEach(fireBall => {
        fireBall.x += game.speed * game.fireBallMultiplier;
        fireBall.style.left = fireBall.x + 'px';

        if (fireBall.x + fireBall.offsetWidth > gameArea.offsetWidth) {
            fireBall.parentElement.removeChild(fireBall);
        }
    });
    // Apply gravitation
    let isInAir = player.y + player.height < gameArea.offsetHeight
    if (isInAir) {
        player.y += game.speed;
    }



    // Register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowDown && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }
    if (keys.Space && timestamp - player.lastTimeFiredFireBall > game.fireInterval) {
        // Add Fire Ball
        addFireBall(player);
        player.lastTimeFiredFireBall = timestamp;
        setTimeout(wizardFireMovment, 200);
        function wizardFireMovment() {
            wizard.classList.remove('wizard-fire');
        }
        wizard.classList.add('wizard-fire');
    }
    //else {
    //wizard.classList.remove('wizard-fire')

    //}

    // Collision detection
    bugs.forEach(bug => {
        if (isCollision(wizard, bug)) {
            gameOverAction();
        }

        fireBalls.forEach(fireBall => {
            if (isCollision(fireBall, bug)) {
                scene.score += game.bugKillBonus
                bug.parentElement.removeChild(bug);
                fireBall.parentElement.removeChild(fireBall);
            }
        })
    });

    // Apply movement
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    // Apply score
    gamePoints.textContent = scene.score;




}

