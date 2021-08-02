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
        },
        {
            x: 3,
            y: 0
        }
    ]
}

// contains the speed value, board refresh rate and snake speed
const SPEED = 1;

/**
 * P5 oninit function
 */
function setup() {
    createCanvas(BOARD.boardWidth(), BOARD.boardHeight());

    background('lightgrey');
    frameRate(SPEED);
}

/**
 * P5 execution loop
 */
function draw() {
    if (SNAKE.positions[0].x < BOARD.blockAmount && SNAKE.positions[0].y < BOARD.blockAmount) {
        let posX = SNAKE.positions[0].x + SNAKE.movement.x;
        let posY = SNAKE.positions[0].y + SNAKE.movement.y;
        SNAKE.positions.unshift({
            x: posX,
            y: posY
        })
        SNAKE.positions.pop();
    } else {
        console.log("crashed into edge")
        return;
    }
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