// Setting up canvas...
// Constant for canva:
const canvas = document.querySelector('canvas');
// Canva drawing context, in this case two-dimensional:
const canvaContext = canvas.getContext('2d');


// Function to adjust the canvas size
function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Evoking adjustyPage when the page window is resized
window.addEventListener("resize", adjustCanvas);
// Resizes the canvas in its loading 
adjustCanvas();


// Function to gerenate a random number:
function randomizer(minimum, maximum) {
    // calculation to obtain a number from minimum and maximum params:
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
        // Position in plane X:
        this.positionX = positionX;
        // Position in plane Y:
        this.positionY = positionY;
        // Speed based in plane X:
        this.speedX = speedX;
        // Speed based in plane Y:
        this.speedY = speedY;
        // Ball choosen color:
        this.color = color;
        // Ball choosen size:
        this.size = size;
    }

    // Drawing method
    draw() {
        // Creates a path:
        canvaContext.beginPath();
        // Color for the filling based in the choosen color to ball:
        canvaContext.fillStyle = this.color;
        // Draws a ball based in its X and Y position and size. 0 initial angle
        // and complete circunference (2 x 3.14 x size):
        canvaContext.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
        // Fills the ball with the fill Style color:
        canvaContext.fill();
    }

    // Updating ball position method
    update() {
        // Building a "barrier" to keep the balls from leaving the screen...
        // When the ball touch the maximum screen 
        // width size, it slows dowm:
        if ((this.positionX + this.size) >= (canvas.width)) {
            this.speedX = -(Math.abs(this.speedX));
        }
        // When the ball touch the minimum screen 
        // width size, it speeds up:
        if ((this.positionX + this.size) <= 0) {
            this.speedX = Math.abs(this.speedX);
        }
        // When the ball touch the maximum screen 
        // height size, it slows dowm:
        if ((this.positionY + this.size) >= (canvas.height)) {
            this.speedY = -(Math.abs(this.speedY));
        }
        // When the ball touch the minimum screen 
        // height size, it speeds up:
        if ((this.positionY + this.size) <= 0) {
            this.speedY = Math.abs(this.speedY);
        }

        // Select the next position based in acceleration calculation:
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    }

    // Detecting colision mothod
    collisionDetector() {
        // Verifying all of the existing balls:
        for (const ball of balls) {
            // This if exists to doesn't occour to calculate
            // the distance between a ball and itself.
            if (!(this === ball)) {
                // Calculating the distance in the plane X:
                const distanceX = this.positionX - ball.positionX;
                // Calculating the distance in the plane Y:
                const distanceY = this.positionY - ball.positionY;
                // Calculating the cartesian distance:
                const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
            
                // In collision, the balls change to a random color.
                // The distance must be the sum between the two balls 
                // size and this value divided by 3:
                if (distance < (ball.size + ball.size / 3)) {
                    ball.color = this.color = randomColorsRGB();
                };
            };
        };
    };
};


// Array with the balls:
const balls = [];


// Generates new balls while the array "balls" 
// doesn't have a limited number of balls
// (You may change for another effect):
while (balls.length < 40) {
    // Randomizing ball size (you can change for another effect):
    const ballSize = randomizer(10, 20);
    // Generates balls:
    const ball = new Ball (
        // Ball position always drawn at least one ball width away 
        // from the edge of the canvas, to avoid drawing errors
        randomizer(0 + ballSize, canvas.width - ballSize),
        randomizer(0 + ballSize, canvas.height - ballSize),
        // Setting balls speed (you can change for another effect): 
        randomizer(-6, 6),
        randomizer(-6, 6),
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
    // A fill color with a opacity (You may change for another effect):
    canvaContext.fillStyle = "rgba(0, 0, 0, 0.15)";
    // Draw a black retangle to be the background
    canvaContext.fillRect(0, 0, canvas.width, canvas.height);

    // Executing the balls drawing
    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetector();
    }

    // Requesting to repeat the loopCode function, creating a animation
    requestAnimationFrame(loopCode);
}

// Starts code
loopCode();