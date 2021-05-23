//* Setting rules CTA
let rulesOpener = document.getElementById('rules-opener');
rulesOpener.addEventListener('click', () => {rules.style.display = "flex"});
let rulesCloser = document.getElementById('close-rules');
rulesCloser.addEventListener('click', () => {rules.style.display = "none"});

let gameIsRunning = false;

let level = document.getElementById('level');
let levelCount = 0;
let bestLevel = document.getElementById('best-level');
let bestLevelCount = 0;
let score = document.getElementById('score');
let scoreCount = 0;
let bestScore = document.getElementById('best-score');
let bestScoreCount = 0;

let hits = document.getElementById('hits');
let hitsCount = 0;
let besthits = document.getElementById('best-hits');
let bestHitsCount = 0;

let addPointsAndCheckBestScore = () => {
    scoreCount++;
    score.textContent = `Score : ${scoreCount}`;
    if (scoreCount > bestScoreCount) {
        bestScoreCount = scoreCount;
        bestScore.textContent = `Best score : ${bestScoreCount}`;
    }
}

let paddle = document.getElementById('paddle');
let main = document.getElementById('main');
let blocksAndBall = document.getElementById('blocks-and-ball');
let ball = document.getElementById('ball');

let blocs = document.querySelectorAll('.bloc');

let btn = document.getElementById('btn');

//*Inital ball position
let ballX = 490;
let ballY = 1;
ball.style.left = `${ballX}px`;
ball.style.bottom = `${ballY}px`;
let ballGoesToRight = true;
let ballGoesToBottom = false;

//settings blocs to display none before game starts (to get the levelCount++)
for (const bloc of blocs) {
    bloc.style.display = "none";
}

main.addEventListener('mousemove', e => { //*Move paddle with mouse
  if (gameIsRunning) {
    let x = e.offsetX;
    if (x <= 100) {
        paddle.style.left = "100px";
    } else if (x >= 900) {
        paddle.style.left = "900px";
    } else {
        paddle.style.left = `${x}px`;
    }
  }
});

let ballMoving = () => {
    // let speed = 5 * (Math.pow(0.9, levelCount)); //!marche pas, l'interval veut pas aller plus vite
    let speed = 23 * (8 / (levelCount + 8)); 
    let levelProgress = 0;
    level.innerText = `Level : ${levelCount}`;

    let myInterval = setInterval(() => {
        for (let i = 0; i < 15; i++) {
            for (const bloc of blocs) {
                if (bloc.style.display === "none") {
                    levelProgress++;
                }
            }
            if (levelProgress < 15) {
                levelProgress = 0;
            } else { //next level
                levelCount++;
                speed = 23 * (8 / (levelCount + 8)); 
                level.textContent = `Level : ${levelCount}`;
                if (levelCount > bestLevelCount) {
                    bestLevelCount = levelCount;
                    bestLevel.textContent = `Highest level : ${bestLevelCount}`;
                }
                for (const bloc of blocs) {
                    bloc.style.display = "block";
                }
                ballX = parseInt(Math.round((Math.random() * 800) + 100));
                ballY = 1;
                ballGoesToRight = true;
                ballGoesToBottom = false;
                levelProgress = 0;
                clearInterval(myInterval);
                ballMoving();
            }
    
            //* ball moving and direction
            if (ballGoesToRight) { 
                if (ballX === 980) { //*if ball in touching the right border
                    ballGoesToRight = false; 
                    ballX--; //* ball goes to the left
                    ball.style.left = `${ballX}px`;
                } else { //* ball keeps going to the right border
                    ballX++;
                    ball.style.left = `${ballX}px`;
                }
            } else { //* if ball goes to left border
                if (ballX === 0) { //* if ball is touching the left border
                    ballGoesToRight = true;
                    ballX++; //* ball goes to right
                    ball.style.left = `${ballX}px`;
                } else { //* ball keeps going to the left border
                    ballX--;
                    ball.style.left = `${ballX}px`;
                }
            }
            if (ballGoesToBottom) {
                if (ballY === 0) { //*if ball in touching the bottom border
                    if (ballX >= (paddle.offsetLeft - 100) && ballX <= (paddle.offsetLeft + 100) ) { //* if ball is touching the paddle
                        ballGoesToBottom = false;
                        ballY++; //* ball goes to the top
                        ball.style.bottom = `${ballY}px`;
                        hitsCount++;
                        hits.textContent = `Hits : ${hitsCount}`;
                        if (hitsCount > bestHitsCount) {
                            bestHitsCount = hitsCount;
                            besthits.textContent = `Hits record : ${bestHitsCount}`;
                        }
                    } else { //! ball isn't touching the paddle and GAME OVER
                        gameIsRunning = false; //* stop the game here
                        paddle.style.left = "50%";
                        ballX = 490;
                        ball.style.left = `${ballX}px`;
                        ballY = 1;
                        ball.style.bottom = `${ballY}px`;
                        btn.style.display = "inline-block";
                        rulesOpener.style.display = "inline-block";
                        hitsCount--;
                        clearInterval(myInterval);
                    }
                } else {
                    ballY--; //* ball keeps going to the bottom border
                    ball.style.bottom = `${ballY}px`;
                }
            } else { //* if ball goes to top border
                if (ballY === 680) { //* if ball is touching the top border
                    ballGoesToBottom = true; 
                    ballY--; //* ball goes to the bottom
                    ball.style.bottom = `${ballY}px`;
                } else {
                    ballY++; //* ball keeps going to the top
                    ball.style.bottom = `${ballY}px`;
                }
            }
    
            //*ball hits block
            for (const bloc of blocs) {
                //if ball touches bloc left border
                if ((ball.offsetLeft + ball.offsetWidth) === bloc.offsetLeft 
                // and bloc-bottom-border.offsetTop > ball.offsetTop > bloc-top-border.offsetTop
                && (ball.offsetTop + ball.offsetHeight) >= bloc.offsetTop
                && ball.offsetTop <= (bloc.offsetTop + bloc.offsetHeight)) {
                    ballGoesToRight = false; //ball goes to left
                    bloc.style.display = "none";
                    addPointsAndCheckBestScore();
                } else
                //if ball touches bloc right border
                if (ball.offsetLeft === (bloc.offsetLeft + bloc.offsetWidth)
                && (ball.offsetTop + ball.offsetHeight) >= bloc.offsetTop
                && ball.offsetTop <= (bloc.offsetTop + bloc.offsetHeight)) {
                    ballGoesToRight = true;
                    bloc.style.display = "none";
                    addPointsAndCheckBestScore();
                } else
                //if ball touches bloc bottom border
                if (ball.offsetTop === (bloc.offsetTop + bloc.offsetHeight)
                && (ball.offsetLeft + ball.offsetWidth) >= bloc.offsetLeft
                && ball.offsetLeft <= (bloc.offsetLeft + bloc.offsetWidth)) {
                    ballGoesToBottom = true;
                    bloc.style.display = "none";
                    addPointsAndCheckBestScore();
                } else
                //if ball touches bloc top border
                if ((ball.offsetTop + ball.offsetHeight) === bloc.offsetTop
                && (ball.offsetLeft + ball.offsetWidth) >= bloc.offsetLeft
                && ball.offsetLeft <= (bloc.offsetLeft + bloc.offsetWidth)) {
                    ballGoesToBottom = false;
                    bloc.style.display = "none";
                    addPointsAndCheckBestScore();
                }
    
            }
        }
    }, speed)
};

btn.addEventListener('click', () => {
    for (const bloc of blocs) {
        bloc.style.display = "none";
    }
    levelCount = 0;
    level.textContent = `Level : ${levelCount}`;
    scoreCount = 0;
    score.textContent = `Score : ${scoreCount}`;
    levelCount = 0;
    hitsCount = 0;
    hits.textContent = `Hits : ${hitsCount}`;
    btn.style.display = "none";
    rulesOpener.style.display = "none";
    gameIsRunning = true;
    ballMoving();
})



