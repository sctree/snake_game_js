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
    gameStarted = true;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);

    drawGame();
}

function endGame() {
    clearInterval(gameInterval);
    isGameOver = true;
    drawGame();
}

function changeDirection(event) {
    if (isGameOver) return;

    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
}

function detectCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function eatFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        snake.push({})


        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
    }
}

function gameLoop() {
    if (detectCollision()) {
        endGame();
        return;
    }

    // move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // add to head end of snake

    eatFood();

    if (!isGameOver) {
        snake.pop();
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let index = -1
    for (let segment of snake) {
        index++
        if (index === 0) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillstyle = 'green';
        }
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    }

    ctx.fillStyle = 'yellow';
    ctx.beginPath(), ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 2, 0, Math.PI * 2), ctx.fill();

    // draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // gameover message, if applicable
    if (isGameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 85, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2 - 40, canvas.height / 2 + 30);
        ctx.fillText('Click to Restart', canvas.width / 2 - 75, canvas.height / 2 + 60);
    } else if (!gameStarted) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Click to Start', canvas.width / 2 - 85, canvas.height / 2);
    }
}

// event listener
window.addEventListener('keydown', changeDirection);

canvas.addEventListener('click', () => {
    if (isGameOver) {
        startGame();
    } else if (!gameStarted) {
        startGame();
    }
});

drawGame();