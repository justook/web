const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const box = 20;
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;
let d;
document.addEventListener("keydown", direction);
function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}
function draw() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "black" : "gray";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    if (snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)) {
        clearInterval(game);
    }
    snake.unshift(newHead);
    context.fillStyle = "black";
    context.font = "25px Changa one";
    context.fillText(score, 2 * box, 1.6 * box);
}
let game = setInterval(draw, 100);
