/*
   used functions and there meanings "ctx" = context "fillRect" = fillRectangle
   "strokeRect" = rectangle border 
*/






// non changing/changable variables ieo const 
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
// const resetBtn = document.querySelector("#resetBtn"); No need for a restart button, start button is reset button
const startBtn = document.querySelector("#startBtn");
const gameWidth = gameBoard.width; // width for gameBoard
const gameHeight = gameBoard.height; // height for gameBoard
const boardBackground = "rgb(71, 71, 71)";  // color of board background
const snakeColor = "red"; // color of the snake
const snakeBorder = "rgb(44, 7, 7)"; // Dark-Red line around snakes body
const foodColor = "rgb(0, 255, 0)"; // snakes food color 
const unitSize = 15;  // Size of the snake and food



// Changable Variables

let running = false  // 1. boolean 2. idfk
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [  // Snake positioning and x + y
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
]
window.addEventListener("keydown", changeDirection); // I think detects when pressing arrow keys and changes direction according to keypress
// resetBtn.addEventListener("click", resetGame); // Reset game button EDIT* Also i dont see the need for a reset button if the start button is basically a reset button
startBtn.addEventListener("click", startGame); // Start game button
main(); // Game dont start unless user presses button 


// Start of game stuff for beginning again i think

gameStart();
createFood();
drawFood();
function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
};
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood() {
    function randomFood(min, max) {
        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood() {
    /*ctx = context*/
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);  // food color and position
};
function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    snake.unshift(head);
    // if food is eaten statment
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
};
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

function changeDirection(event) {
    const keyPressed = event.keyCode;
    // Key codes from cosole "console.log(keyPressed);"
    //letter key numbers
    const W = 87;
    const S = 83;
    const A = 65;
    const D = 68;
    //arrow key numbers
    const TOP = 38;
    const BOTTTOM = 40;
    const LEFT = 37;
    const RIGHT = 39;
    //key press action for all variables
    const goingW = (yVelocity == -unitSize);
    const goingS = (yVelocity == unitSize);
    const goingA = (xVelocity == unitSize);
    const goingD = (xVelocity == -unitSize);
    //Arrow keybinds
    const goingTOP = (yVelocity == -unitSize);
    const goingBOTTOM = (yVelocity == unitSize);
    const goingLEFT = (xVelocity == unitSize);
    const goingRIGHT = (xVelocity == -unitSize);

    switch (true) {
        // W key action
        // Letter key actions
        case (keyPressed == W && !goingS == 0):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        // S Key action
        case (keyPressed == S && !goingW == 0):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
        // A key action
        case (keyPressed == A && !goingD == 0):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        // D key action
        case (keyPressed == D && !goingA == 0):
            xVelocity = unitSize;
            yVelocity = 0;
            break;

        // Arrorw key actions 
        //arrow top key action
        case (keyPressed == TOP && !goingBOTTOM):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        // arrow bottom Key action
        case (keyPressed == BOTTTOM && !goingTOP):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
        // arrow left key action
        case (keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        // arrow right key action
        case (keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
    }
};

function checkGameOver() {
    switch (true) {
        //game over keys idk
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;

        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }

    }
};
function displayGameOver() {
    ctx.font = "32px MV Boli";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER! You Suck", gameWidth / 2, gameHeight / 2);
    running = false;
};
/*function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
};*/
function startGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
};





