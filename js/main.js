//console.info("%c  WELCOME TO BURLI SNAKE  ","background: #009FE3; color: white; font-size: 20px; width: 100%");

// contains the board and all properties
let BOARD = {
    blockSize: 50,
    blockAmount: 10,
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
let SPEED = 1;

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
    // update positions:
    let posX = SNAKE.positions[0].x + SNAKE.movement.x;
    let posY = SNAKE.positions[0].y + SNAKE.movement.y;
    SNAKE.positions.unshift({
        x: posX,
        y: posY
    })
    if (hasCrashedIntoEdge()) return;
    if (!hasSnakeEatenFood()) SNAKE.positions.pop();
    processFood();
    // draw snake:
    SNAKE.positions.forEach(element => {
        rect(element.x * BOARD.blockSize, element.y * BOARD.blockSize, BOARD.blockSize, BOARD.blockSize);
    });
}


/**
 * Checks if snake has reached board edge
 * @returns true is snake crashed into edge, else false
 */
function hasCrashedIntoEdge() {
    console.log(SNAKE.positions[0].x)
    if (SNAKE.positions[0].x < 0) return true;
    if (SNAKE.positions[0].x > BOARD.blockAmount) return true;
    if (SNAKE.positions[0].y < 0) return true;
    if (SNAKE.positions[0].y > BOARD.blockAmount) return true;
    return false
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
        // if snake has eaten food:
        FOOD.x = getRandomBoardCoordinate();
        FOOD.y = getRandomBoardCoordinate();
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