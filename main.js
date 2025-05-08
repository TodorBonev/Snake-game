const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 600;
const rows = canvasSize / box;
const cols = canvasSize / box;

let snake, direction, food, score, level, speed, game;

function startNewGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * cols) * box,
        y: Math.floor(Math.random() * rows) * box
    };
    score = 0;
    level = 1;
    speed = 200;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("level").innerText = "Level: " + level;
    clearInterval(game);
    game = setInterval(draw, speed);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box
        };
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
        if (score % 50 === 0) {
            level++;
            speed -= 20;
            clearInterval(game);
            game = setInterval(draw, speed);
            document.getElementById("level").innerText = "Level: " + level;
        }
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        ctx.fillStyle = "green";
        ctx.font = "50px Arial";
        ctx.fillText("Game over", canvasSize / 4, canvasSize / 2);
        return;
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

startNewGame();





