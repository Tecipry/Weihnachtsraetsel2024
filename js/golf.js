import * as paramUtils from "./utils/paramUtils.js";
import * as levels from "./golfLevelLayouts.js";
import { vector, point, circle, square, line, relHeight, relWidth, relSize, canvas } from "./utils/golfUtils.js";

const level = paramUtils.getParamValue("level");
if (level) {
   history.replaceState({}, '', location.pathname);
}
const levelData = levels.levels[level];

const throwCounter = document.getElementById("throwCounter");

const ctx = canvas.getContext("2d");

var isLeftMouseButtonPressed = false;

// PHYSICS CONSTANTS //
const fps = 200;
const dragFactorPerSecond = 0.5;
const dragFactorPerFrame = Math.pow(dragFactorPerSecond, 1 / fps);
const maxThrowStrength = 800;

//// Objects ////
// real canvas objects //
var golfBall = {
   type: circle(levelData.ballStartLocation.x, levelData.ballStartLocation.y, relSize(0.01), "white"),
   velocity: vector(0, 0),
};
var goal = {
   type: circle(levelData.goalLocation.x, levelData.goalLocation.y, relSize(0.015), "green"),
};
var throwIndicator = {
   type: circle(relWidth(0.7), relHeight(0.5), relSize(0.005), "transparent"),
};

// canvas borders are not drawn, as the canvas object already has a border proberty which is drawn
var canvasBorderTop = {
   type: line(relWidth(0), relHeight(0), relWidth(1), relHeight(0), "transparent"),
};
var canvasBorderBottom = {
   type: line(relWidth(0), relHeight(1), relWidth(1), relHeight(1), "transparent"),
};
var canvasBorderLeft = {
   type: line(relWidth(0), relHeight(0), relWidth(0), relHeight(1), "transparent"),
};
var canvasBorderRight = {
   type: line(relWidth(1), relHeight(0), relWidth(1), relHeight(1), "transparent"),
};

// virtual objects //
var mousePointer = {
   type: circle(relWidth(0.5), relHeight(0.5), 1, "transparent"),
};
var throwData = {
   throwIsDragged: false,
   throwDraggingStartPoint: point(null, null),
   throwDraggingEndPoint: point(null, null),
   throwStrength: {
      x: null,
      y: null,
   },
   throwsLeft: levelData.amountOfThrows,
};

// list of all objects the ball should collide with //
var collisionObjects = [canvasBorderTop, canvasBorderBottom, canvasBorderLeft, canvasBorderRight];
for (var key in levelData.obstacles) {
   collisionObjects.push(levelData.obstacles[key]);
}

// list of all objects that should be drawn on the canvas //
var drawObjects = [goal, throwIndicator, golfBall];
for (var key in levelData.decorations) {
   drawObjects.push(levelData.decorations[key]);
}
drawObjects = drawObjects.concat(collisionObjects);

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
   ctx.lineWidth = 2;
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
function calculateThrowPositionAfterTime(time) {
   //formula for motion after time x: distance = (initial velocity) * (1 - acceleration^time) / (1 - acceleration)
   const slowdownPerFrame = -dragFactorPerFrame;
   const distance = {
      x: (throwData.throwStrength.x * (1 - Math.pow(slowdownPerFrame, time))) / (1 - slowdownPerFrame),
      y: (throwData.throwStrength.y * (1 - Math.pow(slowdownPerFrame, time))) / (1 - slowdownPerFrame),
   };
   return point(distance.x + golfBall.type.coords.x, distance.y + golfBall.type.coords.y);
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
   if (getDistanceBetweenPoints(point, circle.coords) < circle.radius) {
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

function handleGameWin() {
   winNumberReveal = document.getElementById("winNumberReveal");
   winNumberReveal.innerText = levelData.numberRevealedOnCompletion;
}

//gameLoop
function gameLoop() {
   let time = Date.now();

   // FRAME LOGIC //
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // check for throw
   if (isLeftMouseButtonPressed && checkIfPointIsInCircle(mousePointer.type.coords, golfBall.type) && throwData.throwsLeft > 0) {
      throwData.throwIsDragged = true;
   }
   // cancel throw if mouse is released within circle
   if (!isLeftMouseButtonPressed && checkIfPointIsInCircle(mousePointer.type.coords, golfBall.type)) {
      throwData.throwIsDragged = false;
      throwIndicator.type.colour = "transparent";
   }
   // throw is dragged
   if (throwData.throwIsDragged) {
      console.log("dragging throw");
      throwData.throwDraggingStartPoint.x = golfBall.type.coords.x;
      throwData.throwDraggingStartPoint.y = golfBall.type.coords.y;
      throwData.throwDraggingEndPoint.x = mousePointer.type.coords.x;
      throwData.throwDraggingEndPoint.y = mousePointer.type.coords.y;

      // calculate throw strength and limit it
      throwData.throwStrength.x = (throwData.throwDraggingEndPoint.x - throwData.throwDraggingStartPoint.x) * -4;
      throwData.throwStrength.y = (throwData.throwDraggingEndPoint.y - throwData.throwDraggingStartPoint.y) * -4;

      const throwStrengthLength = Math.sqrt(Math.pow(throwData.throwStrength.x, 2) + Math.pow(throwData.throwStrength.y, 2));
      if (throwStrengthLength > maxThrowStrength) {
         const factor = maxThrowStrength / throwStrengthLength;
         throwData.throwStrength.x = throwData.throwStrength.x * factor;
         throwData.throwStrength.y = throwData.throwStrength.y * factor;
      }

      throwIndicator.type.coords = calculateThrowPositionAfterTime(fps / 2); // theoretical ball position after half a second
      throwIndicator.type.colour = "gray";
   }
   //drag is released
   if (throwData.throwIsDragged && !isLeftMouseButtonPressed) {
      console.log("throw released");
      throwData.throwIsDragged = false;
      throwIndicator.type.colour = "transparent";

      golfBall.velocity.x += throwData.throwStrength.x;
      golfBall.velocity.y += throwData.throwStrength.y;

      throwData.throwsLeft--;
   }

   throwCounter.innerText = "Schläge übrig: " + throwData.throwsLeft;

   // check if ball collides with a objects it should bounce off of
   for (const obj of collisionObjects) {
      if (checkIfObjectCollidesWithBall(obj.type)) {
         console.log("ball collides with object");
         handleBallColliosionWithObject(obj.type);
      }
   }

   // move ball by it's velocity
   golfBall.type.coords.x += golfBall.velocity.x / fps;
   golfBall.type.coords.y += golfBall.velocity.y / fps;

   // decrease ball velocity
   golfBall.velocity.x = applyDrag(golfBall.velocity.x);
   golfBall.velocity.y = applyDrag(golfBall.velocity.y);

   // draw objects
   for (const obj of drawObjects) {
      drawObject(obj);
   }

   // check if ball is in goal
   if (checkIfPointIsInCircle(golfBall.type.coords, goal.type)) {
      console.log("ball is in goal");
      handleGameWin();
      return;
   }

   // trigger new frame
   const frameRuntime = Date.now() - time;
   setTimeout(gameLoop, 1000 / fps - frameRuntime);
}

gameLoop();

// function to reload the level
export function reloadLevel() {
   window.location.href = location.pathname + "?level=" + level;
}
window.reloadLevel = reloadLevel;