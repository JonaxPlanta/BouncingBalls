// Setting up canvas...
const canvas = document.querySelector('canvas'); // Constant for canva
const canvasContext = canvas.getContext('2d'); // Canva drawing context
// in this case two-dimensional ('2d' of 2-dimensional)


// Function to adjust the canvas size
function adjustCanvas() {
    canvas.width = window.innerWidth; // Canvas width receive window width value
    canvas.height = window.innerHeight; // Canvas height receive window height value
}

// Evoking adjustyPage when the page window is resized
window.addEventListener("resize", adjustCanvas);
// Resizes the canvas in its loading 
adjustCanvas();


// Function to gerenate a random number
function randomizer(minimum, maximum) {
    // alculation to obtain a number from minimum and maximum parameters
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


// Function to generate a random RGB color value:
function randomColorsRGB() {
    // Returning a random rgb(r,g,b) value:
    return `rgb(${randomizer(0, 255)}, ${randomizer(0, 255)}, ${randomizer(0, 255)})`;
}


// Class to build up our balls:
class Ball {
    // Assigning attributes...
    constructor (positionX, positionY, speedX, speedY, color, size) { 
        this.positionX = positionX; // Position in plane X
        this.positionY = positionY; // Position in plane Y
        this.speedX = speedX; // Speed based in plane X
        this.speedY = speedY; // Speed based in plane Y
        this.color = color; // Ball choosen color
        this.size = size; // Ball choosen size
    }

    // Drawing method
    draw() {
        canvasContext.beginPath(); // Creates a path
        canvasContext.fillStyle = this.color; // Color for the filling based in the choosen color to ball
        canvasContext.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI); // Draws a ball based 
        // in its X and Y position and size, 0 initial angle and complete circunference (PI times 2)
        canvasContext.fill(); // Fills the ball with the fill Style color
    }

    // Updating ball position method
    update() {
        // Building a "barrier" to keep the balls from leaving the screen
        if ((this.positionX + this.size) >= (canvas.width)) { // When the ball touch the maximum screen
            this.speedX = -(Math.abs(this.speedX)); // width size, it slows dowm
        }
        if ((this.positionX + this.size) <= 0) { // When the ball touch the minimum screen
            this.speedX = Math.abs(this.speedX); // width size, it speeds up
        }
        if ((this.positionY + this.size) >= (canvas.height)) { // When the ball touch the maximum screen
            this.speedY = -(Math.abs(this.speedY)); // height size, it slows dowm
        } 
        if ((this.positionY + this.size) <= 0) { // When the ball touch the minimum screen
            this.speedY = Math.abs(this.speedY); // height size, it speeds up
        }

        // Select the next position based in acceleration calculation:
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    }

    // Detecting colision mothod
    collisionDetector() {
        // Verifying all of the existing balls
        for (const ball of balls) {
            // This "if" exists to doesn't occour to calculate
            // the distance between a ball and itself
            if (!(this === ball)) {
                // Calculating the distance in the plane X
                const distanceX = this.positionX - ball.positionX;
                // Calculating the distance in the plane Y
                const distanceY = this.positionY - ball.positionY;
                // Calculating the cartesian distance
                const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
            
                if (distance < (ball.size + ball.size / 3)) { // The distance must be 
                    // the sum between the two balls size and this value divided by 3
                    ball.color = this.color = randomColorsRGB(); // In collision, the balls changes
                    // its color to a random color
                };
            };
        };
    };
};


const balls = []; // Array with the balls


// Generates new balls while the array "balls" 
// doesn't have a limited number of balls:
while (balls.length < 40) { // (You may change for another amount of balls)
    // Randomizing ball size
    const ballSize = randomizer(10, 20); // (You may change for another ball size)
    // Generates balls
    const ball = new Ball (
        // Ball position always drawn at least one ball width away 
        // from the edge of the canvas, to avoid drawing errors
        randomizer(0 + ballSize, canvas.width - ballSize),
        randomizer(0 + ballSize, canvas.height - ballSize),
        // Setting balls speed: 
        randomizer(-6, 6), // (You may change for another speed in X plane)
        randomizer(-6, 6), // (You may change for another speed in Y plane)
        // Setting a random ball color
        randomColorsRGB(),
        // Using the constant with a random value to ball
        ballSize
    );
    // Inserts the created ball into the array
    balls.push(ball);
};


// Function to starts the code
function loopCode() {
    // A fill color with a opacity:
    canvasContext.fillStyle = "rgba(0, 0, 0, 0.15)"; // (You may change the alpha for another trail effect)
    canvasContext.fillRect(0, 0, canvas.width, canvas.height); // Draws a black retangle to be the background

    // Executing the balls drawing
    for (const ball of balls) {
        ball.draw(); // Draws the ball with draw()
        ball.update(); // Updates the ball position with update()
        ball.collisionDetector(); // Detects if there
        // is a ball collision with collisionDetector()
    }

    // Requesting to repeat the loopCode function
    requestAnimationFrame(loopCode); // This loop creates a animation
}

loopCode(); // Starts code