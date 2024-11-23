import * as paramUtils from "./utils/paramUtils.js";

const level = paramUtils.getParamValue("level");
const canvas = document.getElementById("golfCanvas");

var isLeftMouseButtonPressed = false;

// PHYSICS CONSTANTS //
const fps = 50;
const dragFactorPerSecond = 0.5;
const dragFactorPerFrame = Math.pow(dragFactorPerSecond, 1 / fps);

// used to draw relative to the canvas and not in total pixels
function relHeight(percentage) {
   return Math.floor(canvas.height * percentage);
}
function relWidth(percentage) {
   return Math.floor(canvas.width * percentage);
}
function relSize(percentage) {
   return Math.floor(canvas.width * percentage);
}
function point(x, y) {
   const obj = {
      type: "point",
      x: x,
      y: y,
   };
   return obj;
}
function circle(x, y, radius, colour) {
   const obj = {
      type: "circle",
      coords: point(x, y),
      radius: radius,
      colour: colour,
   };
   return obj;
}
function square(x, y, width, height, colour) {
   const obj = {
      type: "square",
      coords: point(x, y),
      width: width,
      height: height,
      colour: colour,
   };
   return obj;
}
function line(startpointX, startpointY, endpointX, endpointY, colour) {
   const obj = {
      type: "line",
      startpoint: point(startpointX, startpointY),
      endpoint: point(endpointX, endpointY),
      colour: colour,
   };
   return obj;
}

//// Objects ////
// real canvas objects //
var golfBall = {
   type: circle(relWidth(0.5), relHeight(0.5), relSize(0.01), "white"),
   vx: 0,
   vy: 0,
};
var goal = {
   type: circle(relWidth(0.9), relHeight(0.9), relSize(0.015), "green"),
};

var wall = {
   type: square(relWidth(0.3), relHeight(0.2), 1, relHeight(0.6), "black"),
};
var throwTrajectory = {
   type: line(relWidth(0.5), relHeight(0.5), relWidth(0.5), relHeight(0.5), "transparent"),
};

// virtual objects //
var mousePointer = {
   type: circle(relWidth(0.5), relHeight(0.5), 1, "red"),
};

var throwData = {
   throwIsDragged: false,
   throwDraggingStartPoint: point(null, null),
   throwDraggingEndPoint: point(null, null),
   throwStrength: {
      x: null,
      y: null,
   },
};

const ctx = canvas.getContext("2d");

function drawCircleObject(obj) {
   ctx.beginPath();
   ctx.arc(obj.coords.x, obj.coords.y, obj.radius, 0, Math.PI * 2);
   ctx.fillStyle = obj.colour;
   ctx.fill();
   ctx.closePath();
}
function drawSquareObject(obj) {
   ctx.fillStyle = obj.colour;
   ctx.fillRect(obj.coords.x, obj.coords.y, obj.width, obj.height);
}
function drawLineObject(obj) {
   ctx.beginPath();
   ctx.moveTo(obj.startpoint.x, obj.startpoint.y);
   ctx.lineTo(obj.endpoint.x, obj.endpoint.y);
   ctx.strokeStyle = obj.colour;
   ctx.stroke();
   ctx.closePath();
}
function drawObject(obj) {
   if (obj.type.type == "circle") {
      drawCircleObject(obj.type);
   } else if (obj.type.type == "square") {
      drawSquareObject(obj.type);
   } else if (obj.type.type == "line") {
      drawLineObject(obj.type);
   }
}

function getMousePosition(event) {
   return point(event.clientX, event.clientY);
}
function convertPageMousePositionToCanvasMousePosition(mousePosition) {
   const canvasRect = canvas.getBoundingClientRect();
   const canvasWidth = canvas.width;
   const canvasHeight = canvas.height;
   const cssWidth = canvas.offsetWidth;
   const cssHeight = canvas.offsetHeight;

   const canvasX = mousePosition.x - canvasRect.left;
   const canvasY = mousePosition.y - canvasRect.top;
   const ratioX = canvasWidth / cssWidth;
   const ratioY = canvasHeight / cssHeight;

   const canvasMouseX = canvasX * ratioX;
   const canvasMouseY = canvasY * ratioY;

   return point(canvasMouseX, canvasMouseY);
}
function getLeftMouseButtonState(event) {
   return event.buttons === 1;
}

// event listener for mouse
document.addEventListener("mousemove", (event) => {
   let mousePosition = getMousePosition(event);
   mousePosition = convertPageMousePositionToCanvasMousePosition(mousePosition);
   isLeftMouseButtonPressed = getLeftMouseButtonState(event);

   //    console.log(`Mouse position: ${mousePosition.x}, ${mousePosition.y} - Left button pressed: ${isLeftButtonPressed}`);
   mousePointer.type.coords.x = mousePosition.x;
   mousePointer.type.coords.y = mousePosition.y;
});
document.addEventListener("mousedown", (event) => {
   isLeftMouseButtonPressed = getLeftMouseButtonState(event);
   //    console.log(`Mouse button changed - Left button pressed: ${isLeftButtonPressed}`);
});
document.addEventListener("mouseup", (event) => {
   isLeftMouseButtonPressed = getLeftMouseButtonState(event);
   //    console.log(`Mouse button changed - Left button pressed: ${isLeftButtonPressed}`);
});

// helpers
function getDistanceBetweenPoints(p1, p2) {
   return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// apply physics
function applyDrag(velocity) {
   velocity = velocity * dragFactorPerFrame;
   if (Math.abs(velocity) < 0.1) {
      velocity = 0;
   }
   return velocity;
}

// collision checks
function checkIfPointIsInCircle(point, circle) {
   if (getDistanceBetweenPoints(point, circle.type.coords) < circle.type.radius) {
      return true;
   }
   return false;
}

//gameLoop
function gameLoop() {
   let time = Date.now();

   // FRAME LOGIC //
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // check for throw
   if (isLeftMouseButtonPressed) {
      console.log("throw is dragged");
      throwData.throwIsDragged = true;
      throwData.throwDraggingStartPoint.x = golfBall.type.coords.x;
      throwData.throwDraggingStartPoint.y = golfBall.type.coords.y;
      throwData.throwDraggingEndPoint.x = mousePointer.type.coords.x;
      throwData.throwDraggingEndPoint.y = mousePointer.type.coords.y;

      throwTrajectory.type.startpoint.x = throwData.throwDraggingStartPoint.x;
      throwTrajectory.type.startpoint.y = throwData.throwDraggingStartPoint.y;
      throwTrajectory.type.endpoint.x = throwData.throwDraggingEndPoint.x;
      throwTrajectory.type.endpoint.y = throwData.throwDraggingEndPoint.y;
      throwTrajectory.type.colour = "red";
   }
   if (throwData.throwIsDragged && !isLeftMouseButtonPressed) {
      throwData.throwIsDragged = false;
      // calculate throw strength
      throwData.throwStrength.x = (throwData.throwDraggingEndPoint.x - throwData.throwDraggingStartPoint.x) * -1;
      throwData.throwStrength.y = (throwData.throwDraggingEndPoint.y - throwData.throwDraggingStartPoint.y) * -1;

      console.log(`throw data: (X: ${throwData.throwStrength.x}, Y: ${throwData.throwStrength.y})`);
      console.log(`throw is thrown with startpoint (${throwData.throwDraggingStartPoint.x}, ${throwData.throwDraggingStartPoint.y}) and endpoint (${throwData.throwDraggingEndPoint.x}, ${throwData.throwDraggingEndPoint.y})`);

      // apply throw to golfBall
      golfBall.vx = throwData.throwStrength.x;
      golfBall.vy = throwData.throwStrength.y;
   }

   // TODO: implement ball collisions

   // check if ball is in goal
   if (checkIfPointIsInCircle(golfBall.type.coords, goal)) {
      console.log("ball is in goal");
      // TODO: add win logic
   }

   // move ball by it's velocity
   golfBall.type.coords.x += golfBall.vx / fps;
   golfBall.type.coords.y += golfBall.vy / fps;

   // decrease ball velocity
   golfBall.vx = applyDrag(golfBall.vx);
   golfBall.vy = applyDrag(golfBall.vy);

   // console.log(`ball velocity: (${golfBall.vx}, ${golfBall.vy})`);

   // draw objects
   drawObject(wall);
   drawObject(goal);
   drawObject(golfBall);
   if (throwData.throwIsDragged) {
      drawObject(throwTrajectory);
   }

   drawObject(mousePointer);

   // trigger new frame
   const frameRuntime = Date.now() - time;
   setTimeout(gameLoop, 1000 / fps - frameRuntime);
}

gameLoop();

//for testing purposes. TODO: remove later
function applyVelocityToBall(vx, vy) {
   golfBall.vx = applyDrag(vx);
   golfBall.vy = applyDrag(vy);
}
window.applyVelocityToBall = applyVelocityToBall;
