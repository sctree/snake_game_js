// get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10;
let snake = [{ x: 160, y: 160 }, { x: 150, y: 160 }, { x: 140, y: 160 }];
let food = { x: 420, y: 220 };
let direction = { x: gridSize, y: 0 };
let score = 0;
let gameInterval;
let isGameOver = false;
let gameStarted = false;

function startGame() {
    snake = [{ x: 160, y: 160 }, { x: 150, y: 160 }, { x: 140, y: 160 }];
    food = { x: 420, y: 220 };
    direction = { x: gridSize, y: 0 };
    score = 0;
    isGameOver = false;
    gameStarted = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);

    drawGame();
}

function endGame() {
    clearInterval(gameInterval);
    isGameOver = true;
    drawGame();
}