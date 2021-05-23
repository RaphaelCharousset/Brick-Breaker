//* Setting rules CTA
let rulesOpener = document.getElementById('rules-opener');
rulesOpener.addEventListener('click', () => {rules.style.display = "flex"});
let rulesCloser = document.getElementById('close-rules');
rulesCloser.addEventListener('click', () => {rules.style.display = "none"});



let gameIsRunning = false;
let level = 1;

let paddle = document.getElementById('paddle');
let main = document.getElementById('main');
let blocksAndBall = document.getElementById('blocks-and-ball');
let ball = document.getElementById('ball');

let btn = document.getElementById('btn');
let rulesContainer = document.getElementById('rules-container');

//*Inital ball position
let ballX = 490;
let ballY = 1;
ball.style.left = `${ballX}px`;
ball.style.bottom = `${ballY}px`;
let ballGoesToRight = true;
let ballGoesToBottom = false;

let speed = 5.208 * (Math.pow(0.96, level));

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

    let myInterval = setInterval(() => {
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
                } else { //! ball isn't touching the paddle and GAME OVER
                    gameIsRunning = false; //* stop the game here
                    paddle.style.left = "50%";
                    ballX = 490;
                    ball.style.left = `${ballX}px`;
                    ballY = 1;
                    ball.style.bottom = `${ballY}px`;
                    btn.style.display = "inline-block";
                    rulesOpener.style.display = "inline-block";
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
    }, speed);
    myInterval;
}

btn.addEventListener('click', () => {
    btn.style.display = "none";
    rulesOpener.style.display = "none";
    gameIsRunning = true;
    ballMoving();
})



