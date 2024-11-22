import * as paramUtils from './utils/paramUtils.js';

const level = paramUtils.getParamValue('level');
const canvas = document.getElementById('golfCanvas');

// used to draw relative to the canvas and not in total pixels
function relHeight(percentage){
    return Math.floor(canvas.height * percentage);
}
function relWidth(percentage){
    return Math.floor(canvas.width * percentage);
}
function relSize(percentage){
    return Math.floor(canvas.width * percentage);
}


function circle(x, y, radius, colour){
    const obj = {
        type: 'circle',
        x:x,
        y:y,
        radius:radius,
        colour:colour
    }
    return obj;
}
function square(x,y,width,height,colour){
    const obj = {
        type: 'square',
        x:x,
        y:y,
        width:width,
        height:height,
        colour:colour
    }
    return obj;
}


var golfBall = {
    type: circle(
        relWidth(0.5),
        relHeight(0.5),
        relSize(0.01),
        'white'
    ),
    dx: 0,
    dy: 0,
}

var wall = {
    type: square(
        relWidth(0.3),
        relHeight(0.2),
        1,
        relHeight(0.6),
        'black'
    ),
}

const ctx = canvas.getContext('2d');

function drawRoundObject(obj) {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fillStyle = obj.colour;
    ctx.fill();
    ctx.closePath();
}
function drawSquareObject(obj) {
    ctx.fillStyle = obj.colour;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}
function drawObject(obj){
    if(obj.type.type == 'circle'){
        drawRoundObject(obj.type);
    } else if (obj.type.type == 'square'){
        drawSquareObject(obj.type);
    }
}

// Draw the wall
drawObject(wall);

// Draw the ball
drawObject(golfBall);
