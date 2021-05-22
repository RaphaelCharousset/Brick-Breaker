let gameIsRunning = false;

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

main.addEventListener('mousemove', e => { //*Move paddle with mouse
    let x = e.offsetX;
    // document.getElementById('ball').textContent = x; // c'est pour le test
    if (x <= 100) {
        paddle.style.left = "100px";
    } else if (x >= 900) {
        paddle.style.left = "900px";
    } else {
        paddle.style.left = `${x}px`;
    }
});


let ballMoving = () => {
    setInterval(() => {
        if (gameIsRunning) {
    
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
                    } else {
                        gameIsRunning = false; //! stop the game here
                        paddle.style.left = "50%";
                        ballX = 490;
                        ball.style.left = `${ballX}px`;
                        ballY = 1;
                        ball.style.bottom = `${ballY}px`;
                        btn.style.display = "inline-block";
                        rulesContainer.style.display = "inline-block";
                        return;
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
        }

    }, 5);  //*set speed here
}

btn.addEventListener('click', () => {
    btn.style.display = "none";
    rulesContainer.style.display = "none";
    gameIsRunning = true;
    ballMoving();
})



