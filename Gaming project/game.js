const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;
let playerScore = 0, computerScore = 0;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;


window.addEventListener("mousemove", (e) => {
    playerY = e.clientY - paddleHeight / 2;
});


function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
    }
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
}


function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function collisionDetection(playerX, playerY) {
    return ballX - ballRadius < playerX + paddleWidth &&
           ballX + ballRadius > playerX &&
           ballY - ballRadius < playerY + paddleHeight &&
           ballY + ballRadius > playerY;
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    
    if (collisionDetection(0, playerY)) {
        ballSpeedX = -ballSpeedX;
    }

    
    if (collisionDetection(canvas.width - paddleWidth, computerY)) {
        ballSpeedX = -ballSpeedX;
    }


    if (ballX + ballRadius < 0) {
        computerScore++;
        resetBall();
    } else if (ballX - ballRadius > canvas.width) {
        playerScore++;
        resetBall();
    }

    
    computerY += ((ballY - (computerY + paddleHeight / 2))) * 0.1;
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawText(playerScore, canvas.width / 4, 50, "#fff");
    drawText(computerScore, (3 * canvas.width) / 4, 50, "#fff");
    drawRect(0, playerY, paddleWidth, paddleHeight, "#fff");
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, "#fff");
    drawCircle(ballX, ballY, ballRadius, "#fff");
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
