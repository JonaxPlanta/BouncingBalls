// Setting up canvas...
// constant for canva:
const canvas = document.querySelector('canvas');
// canva drawing context, in this case two-dimensional:
const canvaContext = canvas.getContext('2d');


// Function to adjust the canvas size
function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// evoking adjustyPage when the page window is resized
window.addEventListener("resize", adjustCanvas);
// resize the canvas in its loading 
adjustCanvas();


// Function to gerenate a random number:
function randomizer(minimum, maximum) {
    // calculation to obtain a number from minimum and maximum params:
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


// Function to generate a random RGB color value:
function randomColorsRGB() {
    // returning a random rgb(r,g,b) value:
    return `rgb(${randomizer(0, 255)}, ${randomizer(0, 255)}, ${randomizer(0, 255)})`;
}


// Class to build up our balls:
class Ball {
    // assigning attributes...
    constructor (positionX, positionY, speedX, speedY, color, size) {
        // position in plane X:
        this.positionX = positionX;
        // position in plane Y:
        this.positionY = positionY;
        // aceleration based in plane X:
        this.speedX = speedX;
        // aceleration based in plane Y:
        this.speedY = speedY;
        // ball choosen color:
        this.color = color;
        // ball choosen size:
        this.size = size;
    }

    // drawing method
    draw() {
        // create a path:
        canvaContext.beginPath();
        // color for the filling based in the choosen color to ball:
        canvaContext.fillStyle = this.color;
        // draw a ball based in its X and Y position and size. 0 initial angle
        // and complete circunference (2 x 3.14 x size):
        canvaContext.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
        // fill the ball with the fill Style color:
        canvaContext.fill();
    }

    // updating ball position method
    update() {
        // building a "barrier" to keep the balls from leaving the screen...
        // when the ball touch the maximum screen width size, it slows dowm:
        if ((this.positionX + this.size) >= (canvas.width)) {
            this.speedX = -(Math.abs(this.speedX));
        }
        // when the ball touch the minimum screen width size, it speeds up:
        if ((this.positionX + this.size) <= 0) {
            this.speedX = Math.abs(this.speedX);
        }
        // when the ball touch the maximum screen height size, it slows dowm:
        if ((this.positionY + this.size) >= (canvas.height)) {
            this.speedY = -(Math.abs(this.speedY));
        }
        // when the ball touch the minimum screen height size, it speeds up:
        if ((this.positionY + this.size) <= 0) {
            this.speedY = Math.abs(this.speedY);
        }

        // select the next position based in acceleration calculation:
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    }

    // detecting colision mothod
    collisionDetector() {
        // verifying all of the existing balls:
        for (const ball of balls) {
            // this if exists to doesn't occour to calculate the distance between a ball and itself.
            if (!(this === ball)) {
                // calculating the distance in the plane X:
                const distanceX = this.positionX - ball.positionX;
                // calculating the distance in the plane Y:
                const distanceY = this.positionY - ball.positionY;
                // calculating the cartesian distance:
                const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
            
                // in collision, the balls change to a random color.
                // the distance must be the sum between the two balls size and this value divided by 3:
                if (distance < this.size + ball.size - ((this.size + ball.size) / 3)) {
                    ball.color = this.color = randomColorsRGB();
                };
            };
        };
    };
};


// Array with the balls:
const balls = [];


// Generates new balls while the array "balls" doesn't have a limited number of balls
// (you can change for another effect):
while (balls.length < 40) {
    // randomizing ball size (you can change for another effect):
    const ballSize = randomizer(10, 20);
    // generates balls:
    const ball = new Ball (
        // ball position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
        randomizer(0 + ballSize, canvas.width - ballSize),
        randomizer(0 + ballSize, canvas.height - ballSize),
        // setting balls speed (you can change for another effect): 
        randomizer(-6, 6),
        randomizer(-6, 6),
        // sentting a random ball color
        randomColorsRGB(),
        // using the constant with a random value to ball
        ballSize
    );
    // Insert the created ball into the array
    balls.push(ball);
};


// Function to starts the code
function loopCode() {
    // a fill color with a opacity (you can change for another effect):
    canvaContext.fillStyle = "rgba(0, 0, 0, 0.15)";
    // draw a black retangle to be the background
    canvaContext.fillRect(0, 0, canvas.width, canvas.height);

    // executing the balls drawing
    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetector();
    }

    // requesting to repeat the loopCode function, creating a animation
    requestAnimationFrame(loopCode);
}

// Starts code
loopCode();