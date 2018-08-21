const bgColor = 50;
const canvasSize = 600;
const radius = 150;
const lineCount = 30;

const angleIncrement = 360 / lineCount;
var angle = 0;

function setup() {
    noFill();
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    strokeWeight(2);
}

function draw() {
    background(bgColor);
    translate(canvasSize / 2, canvasSize / 2);

    stroke(30, 200, 100);
    ellipse(0, 0, 5, 5);

    var ix1 = 0;
    var ix2 = 100;
    var iy1 = 0;
    var iy2 = 100;

    // finding hypotenuse
    var r = sqrt(sq(abs(ix1 - ix2)) + sq(abs(iy1 - iy2))) / 2;

    // for a sort of snappy animation
    if (angle < 90) {
        angle += (90 - angle) / 20;
        if (90 - angle < 0.1) {
            angle = 90;
        }
    }

    
    var theta = 0;
    if ((ix1 - ix2) != 0) {
        theta = atan((iy1 - iy2) / (ix1 - ix2));
    }

    var x_offset = r * cos(theta) + 50;
    var y_offset = r * sin(theta);

    var x1 = r * cos(angle + theta) + x_offset;
    var x2 = -r * cos(angle + theta) + x_offset;

    var y1 = r * sin(angle + theta) + y_offset;
    var y2 = -r * sin(angle + theta) + y_offset;

    line(x1, y1, x2, y2);
}