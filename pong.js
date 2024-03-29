const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;

const begin = [-3, 3];
const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20; //wielkość piłki
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;
const paddleHeight = 100;
const paddleWidth = 20;
const playerX = 70;
const aiX = cw - 90;
let playerY = 100;
let aiY = 100;
const lineWidth = 6;
const lineHeight = 16;
let lineX = cw / 2 - lineWidth / 2;
let ballSpeedX = begin[Math.floor(Math.random() * begin.length)];
let ballSpeedY = begin[Math.floor(Math.random() * begin.length)];
let playerScore = 0;
let aiScore = 0;

function ballZero() {
  ballX = cw / 2 - ballSize / 2;
  ballY = ch / 2 - ballSize / 2;
  ballSpeedX = begin[Math.floor(Math.random() * begin.length)];
  ballSpeedY = begin[Math.floor(Math.random() * begin.length)];
}

function ball() {
  ctx.fillStyle = "white";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= ch) {
    ballSpeedY = -ballSpeedY;
    speedUp();
  }

  if (ballX <= 0) {
    ballZero();
    aiScore++;
  }
  if (ballX + ballSize >= cw) {
    ballZero();
    playerScore++;
  }
  if (
    ballX > playerX + paddleWidth - 3 &&
    ballX <= playerX + paddleWidth &&
    ballY >= playerY - ballSize &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    speedUp();
  }
  if (
    ballX < aiX - paddleWidth + 3 &&
    ballX >= aiX - paddleWidth &&
    ballY >= aiY - ballSize &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    speedUp();
  }
}

function table() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);
  for (let linePosition = 20; linePosition < ch; linePosition += 30) {
    ctx.fillStyle = "white";
    ctx.fillRect(lineX, linePosition, lineWidth, lineHeight);
  }
}

function score() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(playerScore, cw / 2 - 100, 50);
  ctx.fillText(aiScore, cw / 2 + 100, 50);
}
function player() {
  ctx.fillStyle = "white";
  ctx.fillRect(playerX, playerY, 20, 100);
}
function ai() {
  ctx.fillStyle = "white";
  ctx.fillRect(aiX, aiY, 20, 100);
}

topCanvas = canvas.offsetTop;

function playerPosition(e) {
  playerY = e.clientY - topCanvas - paddleHeight / 2;

  if (playerY >= ch - paddleHeight) {
    playerY = ch - paddleHeight;
  }
  if (playerY <= 0) {
    playerY = 0;
  }
}

function speedUp() {
  ballSpeedX *= 1.01;
  ballSpeedY *= 1.01;
}

function aiPosition() {
  let middlePaddle = aiY + paddleHeight / 2;
  let middleBall = ballY + ballSize / 2;

  if (ballX > 500) {
    if (middlePaddle - middleBall > 200) {
      aiY -= 15;
    } else if (middlePaddle - middleBall > 50) {
      aiY -= 5;
    } else if (middlePaddle - middleBall < -200) {
      aiY += 15;
    } else if (middlePaddle - middleBall < -50) {
      aiY += 5;
    }
  } else if (ballX <= 500) {
    if (middlePaddle - middleBall > 200) {
      aiY -= 3;
    } else if (middlePaddle - middleBall < -200) {
      aiY += 3;
    }
  }
}

canvas.addEventListener("mousemove", playerPosition);

function game() {
  table();
  ball();
  player();
  ai();
  aiPosition();
  score();
}
setInterval(game, 1000 / 60);
