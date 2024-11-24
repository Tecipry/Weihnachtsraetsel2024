import * as paramUtils from "./utils/paramUtils.js";

const level = paramUtils.getParamValue("level");
const canvas = document.getElementById("golfCanvas");

var isLeftMouseButtonPressed = false;

// PHYSICS CONSTANTS //
const fps = 200;
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

function vector(x, y) {
   const obj = {
      x: x,
      y: y,
   };
   return obj;
}
function point(x, y) {
   const obj = {
      type: "point",
      x: x,
      y: y,
   };
   return obj;
}
window.point = point;
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
window.line = line;

//// Objects ////
// real canvas objects //
var golfBall = {
   type: circle(relWidth(0.5), relHeight(0.5), relSize(0.01), "white"),
   velocity: vector(0, 0),
};
window.golfBall = golfBall;
var goal = {
   type: circle(relWidth(0.9), relHeight(0.9), relSize(0.015), "green"),
};
var wall1 = {
   type: line(relWidth(0.5), relHeight(0.1), relWidth(0.1), relHeight(0.5), "red"),
};
var wall2 = {
   type: line(relWidth(0.5), relHeight(0.1), relWidth(0.9), relHeight(0.5), "red"),
};
var wall3 = {
   type: line(relWidth(0.9), relHeight(0.5), relWidth(0.5), relHeight(0.9), "red"),
};
var wall4 = {
   type: line(relWidth(0.5), relHeight(0.9), relWidth(0.1), relHeight(0.5), "red"),
};
var pillar1 = {
   type: circle(relWidth(0.3), relHeight(0.5), relSize(0.02), "red"),
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

// list of all objects the ball should collide with //
var collisionObjects = [wall1, wall2, wall3, wall4, pillar1];

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

   mousePointer.type.coords.x = mousePosition.x;
   mousePointer.type.coords.y = mousePosition.y;
});
document.addEventListener("mousedown", (event) => {
   isLeftMouseButtonPressed = getLeftMouseButtonState(event);
});
document.addEventListener("mouseup", (event) => {
   isLeftMouseButtonPressed = getLeftMouseButtonState(event);
});

// Math calculations
function getDistanceBetweenPoints(p1, p2) {
   return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getNormalVectorOfLine(line) {
   var vector = {
      x: -(line.endpoint.y - line.startpoint.y),
      y: line.endpoint.x - line.startpoint.x,
   };
   // normalize vector
   const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
   vector.x = vector.x / length;
   vector.y = vector.y / length;

   return vector;
}
function getNormalVectorOfLinePointingAwayFromPoint(line, point) {
   var vector = getNormalVectorOfLine(line);
   // rotate vector if point is on the left side of the line
   if (vector.x * (point.x - line.startpoint.x) + vector.y * (point.y - line.startpoint.y) > 0) {
      vector.x = -vector.x;
      vector.y = -vector.y;
   }
   return vector;
}
function reflectVectorOverNormalVector(vector, normalVector) {
   const dotProduct = normalVector.x * vector.x + normalVector.y * vector.y;
   vector.x = vector.x - 2 * dotProduct * normalVector.x;
   vector.y = vector.y - 2 * dotProduct * normalVector.y;
   return vector;
}
function getDistancebetweenLineAndPoint(line, point) {
   // sidelenghts
   const a = getDistanceBetweenPoints(line.startpoint, line.endpoint);
   const b = getDistanceBetweenPoints(line.startpoint, point);
   const c = getDistanceBetweenPoints(point, line.endpoint);

   // angles in RAD (law of cosine)
   var B = Math.acos((a * a + c * c - b * b) / (2 * a * c));
   var C = Math.acos((a * a + b * b - c * c) / (2 * a * b));

   if (B > Math.PI / 2) {
      // point is on the right side of the line -> distance to endpoint of line is shortest
      return c;
   }
   if (C > Math.PI / 2) {
      // point is on the left side of the line -> distance to startpoint of line is shortest
      return b;
   }
   // some point on the line is closest to point -> distance = altitude of triangle
   return Math.sin(B) * c;
}

// apply physics
function applyDrag(velocity) {
   velocity = velocity * dragFactorPerFrame;
   if (Math.abs(velocity) < 0.1) {
      velocity = 0;
   }
   return velocity;
}
function bounceBallAgainstLine(collisionLine) {
   var normalVector = getNormalVectorOfLinePointingAwayFromPoint(collisionLine, golfBall.type.coords);

   // Move the ball's position to the point where it first intersected the wall
   var penetrationDepth = golfBall.type.radius - getDistancebetweenLineAndPoint(collisionLine, golfBall.type.coords);
   golfBall.type.coords.x -= normalVector.x * penetrationDepth;
   golfBall.type.coords.y -= normalVector.y * penetrationDepth;

   // Reflect the ball's velocity across the normal vector
   golfBall.velocity = reflectVectorOverNormalVector(golfBall.velocity, normalVector);
}
function bounceBallAgainstCircle(collisionCircle) {
   // normal vector is line between ball and circle
   const normalLine = line(golfBall.type.coords.x, golfBall.type.coords.y, collisionCircle.coords.x, collisionCircle.coords.y);
   const normalVector = getNormalVectorOfLine(normalLine);

   // Move the ball's position to the point where it first intersected the circle
   var penetrationDepth = golfBall.type.radius - getDistanceBetweenPoints(golfBall.type.coords, collisionCircle.coords);
   golfBall.type.coords.x -= normalVector.x * penetrationDepth;
   golfBall.type.coords.y -= normalVector.y * penetrationDepth;

   // reflect the ball's velocity across the normal vector
   golfBall.velocity = reflectVectorOverNormalVector(golfBall.velocity, normalVector);
}
function handleBallColliosionWithObject(obj) {
   if (obj.type == "line") {
      bounceBallAgainstLine(obj);
   } else if (obj.type == "circle") {
      // TODO: make circle collision work
      // bounceBallAgainstCircle(obj);
      console.log("circle collision... maybe later");
   }
}

// collision checks
function checkIfPointIsInCircle(point, circle) {
   if (getDistanceBetweenPoints(point, circle.type.coords) < circle.type.radius) {
      return true;
   }
   return false;
}
function checkIfObjectCollidesWithBall(obj) {
   if (obj.type == "line") {
      if (getDistancebetweenLineAndPoint(obj, golfBall.type.coords) < golfBall.type.radius) {
         return true;
      }
   } else if (obj.type == "circle") {
      if (getDistanceBetweenPoints(obj.coords, golfBall.type.coords) < golfBall.type.radius + obj.radius) {
         return true;
      }
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

      // apply throw to golfBall
      golfBall.velocity.x = throwData.throwStrength.x;
      golfBall.velocity.y = throwData.throwStrength.y;
   }

   // check if ball collides with a objects it should bounce off of

   for (const obj of collisionObjects) {
      if (checkIfObjectCollidesWithBall(obj.type)) {
         console.log("ball collides with object");
         handleBallColliosionWithObject(obj.type);
      }
   }

   // check if ball is in goal
   if (checkIfPointIsInCircle(golfBall.type.coords, goal)) {
      console.log("ball is in goal");
      // TODO: add win logic
   }

   // move ball by it's velocity
   golfBall.type.coords.x += golfBall.velocity.x / fps;
   golfBall.type.coords.y += golfBall.velocity.y / fps;

   // decrease ball velocity
   golfBall.velocity.x = applyDrag(golfBall.velocity.x);
   golfBall.velocity.y = applyDrag(golfBall.velocity.y);

   // draw objects
   drawObject(wall1);
   drawObject(wall2);
   drawObject(wall3);
   drawObject(wall4);
   drawObject(pillar1);
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
   golfBall.velocity.x = vx;
   golfBall.velocity.y = vy;
}
window.applyVelocityToBall = applyVelocityToBall;
