
let gameStarted = false;
document.getElementById("btnStartStop").addEventListener("click", function () {
    gameStarted = !gameStarted;
})

// contains the board and all properties
let BOARD = {
    blockSize: 20,
    blockAmount: 20,
    boardWidth: function () {
        return this.blockSize * this.blockAmount
    },
    boardHeight: function () {
        return this.blockSize * this.blockAmount
    }
}

// contains the snake and all properties
const SNAKE = {
    movement: {
        x: 1,
        y: 0
    },
    positions: [{
            x: 5,
            y: 0
        },
        {
            x: 4,
            y: 0
        }
    ]
}

// contains details of the food
const FOOD = {
    x: getRandomBoardCoordinate(),
    y: getRandomBoardCoordinate()
}
// contains the speed value, board refresh rate and snake speed
let SPEED = 5;

// contains the player details and score
const PLAYER = {
    name: "TODO",
    score: 0
}
/**
 * P5 oninit function
 */
function setup() {
    createCanvas(BOARD.boardWidth(), BOARD.boardHeight());
}

/**
 * P5 execution loop
 */
function draw() {
    frameRate(SPEED);
    noStroke();
    stroke('darkgrey');
    strokeWeight(5);
    background('lightgrey');
    if (gameStarted) {
        // update positions:
        let posX = SNAKE.positions[0].x + SNAKE.movement.x;
        let posY = SNAKE.positions[0].y + SNAKE.movement.y;
        if (hasCrashedIntoItself(posX,posY) || hasCrashedIntoEdge(posX,posY)) {
            alert("crash");
            noLoop();
        }
        SNAKE.positions.unshift({
            x: posX,
            y: posY
        })
        if (!hasSnakeEatenFood()) SNAKE.positions.pop();
        processFood();
        // draw snake:
        SNAKE.positions.forEach(element => {
            rect(element.x * BOARD.blockSize, element.y * BOARD.blockSize, BOARD.blockSize, BOARD.blockSize);
        });
    }
}


/**
 * Checks if snake has reached board edge
 * @returns true is snake crashed into edge, else false
 */
function hasCrashedIntoEdge(posX, posY) {
    console.log(SNAKE.positions[0].x)
    if (posX < 0) return true;
    if (posX > BOARD.blockAmount) return true;
    if (posY < 0) return true;
    if (posY > BOARD.blockAmount) return true;
    return false
}

/**
 * Checks if snake has crashed into itself
 * @returns true is snake crashed into itself, else false
 */
function hasCrashedIntoItself(posX, posY) {
    let hasCrashed = false;
    SNAKE.positions.forEach(el => {
        if (el.x === posX && el.y === posY) {
            console.log(`snake crashed into itself at x=${posX}, y=${posY}`);
            hasCrashed = true;
        }
    });
    return hasCrashed;
}


/**
 * Arrow keys handler
 * @returns when snake is running in opposite direction
 */
function keyPressed() {
    if (keyCode === LEFT_ARROW) { 
        if (SNAKE.movement.x > 0) return;
        SNAKE.movement.x = -1;
        SNAKE.movement.y = 0;
    } else if (keyCode === RIGHT_ARROW) {
        if (SNAKE.movement.x < 0) return;
        SNAKE.movement.x = 1;
        SNAKE.movement.y = 0;
    } else if (keyCode === UP_ARROW) {
        if (SNAKE.movement.y > 0) return;
        SNAKE.movement.x = 0;
        SNAKE.movement.y = -1;
    } else if (keyCode === DOWN_ARROW) {
        if (SNAKE.movement.y < 0) return;
        SNAKE.movement.x = 0;
        SNAKE.movement.y = 1;
    }
}


/**
 * Process the food. Update player score.
 */
function processFood() {
    if (hasSnakeEatenFood()) {
        // if snake has eaten food place a new one:
        //  food should only be placed on a non-snake field
        let foodPlacedOnBody = false;
        do {
            FOOD.x = getRandomBoardCoordinate();
            FOOD.y = getRandomBoardCoordinate();
            SNAKE.positions.forEach(el => {
                if (el.x === FOOD.x && el.y === FOOD.y) {
                    foodPlacedOnBody = true;
                }
            });
        } while (foodPlacedOnBody == true);
        PLAYER.score++;
        SPEED += 0.5;
    }
    console.log(`Score: ${PLAYER.score}`);
    ellipse(FOOD.x * BOARD.blockSize + BOARD.blockSize/2, FOOD.y * BOARD.blockSize + BOARD.blockSize/2, BOARD.blockSize);
}


/**
 * Check if snake has eaten the food
 * @returns true if snake's head is the same position as the food, else false
 */
function hasSnakeEatenFood() {
    return SNAKE.positions[0].x === FOOD.x && SNAKE.positions[0].y === FOOD.y
}

function getRandomBoardCoordinate() {
    return Math.floor(Math.random() * BOARD.blockAmount)
}


// TODO:
// TODO: score or sum
// TODO: design und main menu
// TODO: medium: part 1 game, part 2 firebase?