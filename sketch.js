// project inpsired by minutePhysics and 3Blue1Brown's video on Feynman's Lost Lecture (ft.
// 3Blue1Brown)(https://www.youtube.com/watch?v=xdIjYBtnvZU&t)
const bgColor = 20;
const canvasSize = 600;
const radius = 200;
const lineCount = 100;
const angleIncrement = 360 / lineCount;
const textMax = 200;
const text_x = -canvasSize / 2 + 5;
const text_y = canvasSize / 2.5;
const text_message = "Click anywhere within the outer circle to make an ellipse";
const text_x_wrapper = canvasSize;
const text_y_wrapper = 100;
const text_size = 24;
const line_color = "#1ec864";
const hu_increment = 255 / (.5 * lineCount);
const s = 40;
const b = 100;
var lines = [];
var turn = false;
var textColor = bgColor;

function setup() {
    noFill();
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    strokeWeight(2);
    colorMode(HSB);
    textSize(text_size);
}

function draw() {
    var mX = mouseX - canvasSize / 2;
    var mY = mouseY - canvasSize / 2;

    background(bgColor);

    // center coordinates
    translate(canvasSize / 2, canvasSize / 2);

    stroke(line_color);
    // outer circle
    ellipse(0, 0, radius * 2, radius * 2);
    // mouse indicator
    ellipse(mX, mY, 10, 10);

    if (!turn) {

        // draw lines from mouse to outer circle
        for (let i = 0; i < lineCount; i++) {
            if (i < lineCount / 2) {
                // console.log(`${i} is at ${i * hu_increment}`);
                stroke(i * hu_increment, s, b);
            } else {
                // console.log(`${i} is at ${255 - (i * hu_increment)}`);
                stroke(255 - ((i - lineCount / 2) * hu_increment), s, b);
            }
            line(mX, mY, radius * cos(i * angleIncrement), radius * sin(i * angleIncrement));
        }

        // clear lines
        if (lines.length != 0) {
            lines = [];
        }

        // gradient change
        if (textColor < textMax) {
            textColor++;
        }
        stroke(textColor);
        text(text_message, text_x, text_y, text_x_wrapper, text_y_wrapper);

    } else {
        // text first so lines overlay the text
        if (textColor > bgColor) {
            textColor--;
        }
        stroke(textColor);
        text(text_message, text_x, text_y, text_x_wrapper, text_y_wrapper);


        // save lines before clicking
        if (lines.length == 0) {
            for (let i = 0; i < lineCount; i++) {
                lines.push(new Line(mX, mY, radius * cos(i * angleIncrement), radius * sin(i * angleIncrement)));
            }
        }

        for (let i = 0; i < lineCount; i++) {

            // for a sort of snappy animation
            if (lines[i].angle < 90) {
                lines[i].angle += (lines[i].angle + 1) / ((lineCount - i + 1) * 0.5);
                if (90 - lines[i].angle < 0.1) {
                    lines[i].angle = 90;
                }
            }

            // finding hypotenuse
            var r = sqrt(sq(abs(lines[i].x1 - lines[i].x2)) + sq(abs(lines[i].y1 - lines[i].y2))) / 2;
            var theta = 0;

            // so we don't divide by 0
            if ((lines[i].x1 - lines[i].x2) != 0) {
                theta = atan((lines[i].y1 - lines[i].y2) / (lines[i].x1 - lines[i].x2));
            }

            // arctan may sometimes need +180 for correct angle. See math.
            if ((lines[i].x1 - lines[i].x2) < 0) {
                theta += 180;
            }

            var x_offset = r * cos(theta) + lines[i].x2;
            var y_offset = r * sin(theta) + lines[i].y2;

            var x1 = r * cos(lines[i].angle + theta) + x_offset;
            var x2 = -r * cos(lines[i].angle + theta) + x_offset;

            var y1 = r * sin(lines[i].angle + theta) + y_offset;
            var y2 = -r * sin(lines[i].angle + theta) + y_offset;
            if (i < lineCount / 2) {
                // console.log(`${i} is at ${i * hu_increment}`);
                stroke(i * hu_increment, s, b);
            } else {
                // console.log(`${i} is at ${255 - (i * hu_increment)}`);
                stroke(255 - ((i - lineCount / 2) * hu_increment), s, b);
            }
            line(x1, y1, x2, y2);
        }
    }
}

function mousePressed() {
    turn = !turn;
}


class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.angle = 0;
    }
}