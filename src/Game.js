import TileMap from "./TileMap.js";

const tileSize = 64;
const velocity = 4;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = "   You Win!";
    if (gameOver) {
      text = " Game Over";
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, canvas.height / 3.5, canvas.width, 225);

    ctx.font = "150px gothic";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "gray");
    gradient.addColorStop("1.0", "black");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 20, canvas.height / 2);
    draw(rect);
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
