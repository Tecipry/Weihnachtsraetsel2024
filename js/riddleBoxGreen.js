import * as cookieUtils from "./utils/cookieUtils.js";

//// SECRET TEXT REVEALED ON DEATH ////
// reveals which text should be revealed. saved via cookie
// 0 -> link to yt
// 1 -> Boxcode for green riddle box
var snakeTextRevealLevel = cookieUtils.getCookie("snakeTextRevealLevel");
if (snakeTextRevealLevel === null) {
   snakeTextRevealLevel = 0;
   cookieUtils.setCookie("snakeTextRevealLevel", snakeTextRevealLevel, 365);
}

var snakeTextToReveal = ""
switch (snakeTextRevealLevel) {
   case "0":
      //TODO add valid video url
      snakeTextToReveal = "https://www.youtube.com/watch?v=someUrl";
      break;
   case "1":
      snakeTextToReveal = "Code: 214174";
      break;
   default:
      snakeTextToReveal = "ERROR";
      break;
}




//// VARIABLES ////
var gridSize = 16;
var count = 0;
// determines whether the snake is confined to the smaller borders or not
var gameIsConfined = true;
// determines whether the apple spawning is confined to the smaller borders or not
var spawnAppleConfined = true;
var gameIsRunning = false;

// set size of canvas to largest multiple of grid which is smaller than the viewport size
const snakeGameContainer = document.getElementById("snakeGameContainer");
const panel_canvas = document.getElementById("snake_panel_canvas");
const snakeGameContainerWidth = document.getElementById("snakeGameContainer").offsetWidth;
const snakeGameContainerHeight = document.getElementById("snakeGameContainer").offsetHeight;

const panelCanvasWidth = Math.floor(snakeGameContainerWidth / gridSize) * gridSize + "px";
const panelCanvasHeight = Math.floor(snakeGameContainerHeight / gridSize) * gridSize + "px";

panel_canvas.style.width = panelCanvasWidth;
panel_canvas.style.height = panelCanvasHeight;

// amount of panels inside snakeGameContainer
const amountOfPanelsHorizontal = Math.floor(snakeGameContainerWidth / gridSize);
const amountOfPanelsVertical = Math.floor(snakeGameContainerHeight / gridSize);

// border should be at 1/4 of the whole game area, both horizontally and vertically
const upperBorderRow = Math.floor(amountOfPanelsVertical / 4);
const lowerBorderRow = Math.floor((amountOfPanelsVertical * 3) / 4);
const leftBorderColoumn = Math.floor(amountOfPanelsHorizontal / 4);
const rightBorderColoumn = Math.floor((amountOfPanelsHorizontal * 3) / 4);

// snake Variables. Values are set on game startup in function startGame()
var snake = {};
var apple = {};

//store all panels to manipulate them individually
const indexForAllCanvasPanels = [];

// fill panel_canvas with grid of divs (squares of size gridSize)
for (let y = 0; y < amountOfPanelsVertical; y++) {
   let row = document.createElement("div");
   row.style.height = gridSize + "px";
   row.className = "panelCanvasRow";

   const rowArray = [];

   for (let x = 0; x < amountOfPanelsHorizontal; x++) {
      let panel = document.createElement("div");
      panel.className = "panelCanvasPanel";
      panel.style.height = gridSize + "px";
      panel.style.width = gridSize + "px";

      rowArray.push(panel);
      row.appendChild(panel);
   }
   indexForAllCanvasPanels.push(rowArray);
   panel_canvas.appendChild(row);
}

function getIndividualPanel(x, y) {
   if (x < 0 || x > indexForAllCanvasPanels[0].length || y < 0 || y > indexForAllCanvasPanels.length) {
      return null;
   }
   return indexForAllCanvasPanels[y][x];
}

//// DEFINE BORDERS FOR GAME ////
//// create array of all border panels ////
const cornerTopLext = [leftBorderColoumn, upperBorderRow];
const cornerTopRight = [rightBorderColoumn, upperBorderRow];
const cornerBottomLeft = [leftBorderColoumn, lowerBorderRow];
const cornerBottomRight = [rightBorderColoumn, lowerBorderRow];

var borderPanelCoordinates = [];
// top row
for (let x = leftBorderColoumn; x <= rightBorderColoumn; x++) {
   borderPanelCoordinates.push([x, upperBorderRow]);
}
// bottom row
for (let x = leftBorderColoumn; x <= rightBorderColoumn; x++) {
   borderPanelCoordinates.push([x, lowerBorderRow]);
}
// left coloumn
for (let y = upperBorderRow; y <= lowerBorderRow; y++) {
   borderPanelCoordinates.push([leftBorderColoumn, y]);
}
// right coloumn
for (let y = upperBorderRow; y <= lowerBorderRow; y++) {
   borderPanelCoordinates.push([rightBorderColoumn, y]);
}

for (let i = 0; i < borderPanelCoordinates.length; i++) {
   let workingPanel = getIndividualPanel(borderPanelCoordinates[i][0], borderPanelCoordinates[i][1]);
   workingPanel.style.backgroundColor = "black";
}

//// MAIN SNAKE GAME ////

//all panels which are coloured
var allColouredPanels = [];

//reset colour of snake panels
function clearCanvas() {
   for (let i = 0; i < allColouredPanels.length; i++) {
      allColouredPanels[i].style.backgroundColor = "transparent";
   }
}
//draw a panel in a colour
function drawPanel(x, y, colour) {
   let workingPanel = getIndividualPanel(x, y);
   if (workingPanel === null || workingPanel === undefined) {
      return;
   }
   workingPanel.style.backgroundColor = colour;
   allColouredPanels.push(workingPanel);
}

//all panels with text on them
var allTextPanels = [];

//add text to a panel
function writeTextToPanel(x, y, text) {
   let workingPanel = getIndividualPanel(x, y);
   if (workingPanel === null || workingPanel === undefined) {
      return;
   }
   workingPanel.innerHTML = text;
   workingPanel.style.fontSize = Math.floor((gridSize / 4) * 3) + "px";
   workingPanel.style.textAlign = "center";
   allTextPanels.push(workingPanel);
}
//reset text of all panels
function clearText() {
   for (let i = 0; i < allTextPanels.length; i++) {
      allTextPanels[i].innerHTML = "";
   }
}

// get random whole numbers in a specific range
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

//generate new apple
function newApple(confined) {
   var illegalAppleSpawnLocations = snake.cells;

   var validAppleSpawnLocation = false;
   while (!validAppleSpawnLocation) {
      if (confined) {
         console.log("spawning confined apple");
         apple.x = getRandomInt(leftBorderColoumn + 1, rightBorderColoumn - 1);
         apple.y = getRandomInt(upperBorderRow + 1, lowerBorderRow - 1);
      } else {
         console.log("spawning free apple");
         apple.x = getRandomInt(0, amountOfPanelsHorizontal);
         apple.y = getRandomInt(0, amountOfPanelsVertical);
      }

      if (
         !illegalAppleSpawnLocations.some(function (element) {
            return element.x === apple.x && element.y === apple.y;
         })
      ) {
         validAppleSpawnLocation = true;
      }
   }
}

function handleDeath(snake) {
   console.log(snake);

   const text = snakeTextToReveal;
   for (let i = 0; i < text.length; i++) {
      setTimeout(function () {
         // game may have restarted
         if (gameIsRunning) {
            return;
         }

         if (i >= snake.cells.length) {
            return;
         }
         let char = text.charAt(i);
         writeTextToPanel(snake.cells[i].x, snake.cells[i].y, char);
      }, 250 * i);
   }
}

function removeHeadCell() {
   snake.cells.shift();
}

// safe and update cells on which snake should dye (excluding itself)
var snakeDeathCells = [];

function updateSnakeDeathCells(confined) {
   //// outer screen borders
   //border above screen
   for (let i = 0; i < amountOfPanelsHorizontal; i++) {
      snakeDeathCells.push({ x: i, y: -1 });
   }
   //border below screen
   for (let i = 0; i < amountOfPanelsHorizontal; i++) {
      snakeDeathCells.push({ x: i, y: amountOfPanelsVertical });
   }
   //border left of screen
   for (let i = 0; i < amountOfPanelsVertical; i++) {
      snakeDeathCells.push({ x: -1, y: i });
   }
   //border right of screen
   for (let i = 0; i < amountOfPanelsVertical; i++) {
      snakeDeathCells.push({ x: amountOfPanelsHorizontal, y: i });
   }

   //walls, if game is confined
   if (confined) {
      for (let i = 0; i < borderPanelCoordinates.length; i++) {
         snakeDeathCells.push({ x: borderPanelCoordinates[i][0], y: borderPanelCoordinates[i][1] });
      }
   }
}

function loop() {
   if (gameIsRunning) {
      requestAnimationFrame(loop);
   } else {
      handleDeath(snake);
   }

   // slow game loop to 5 fps instead of 60 (60/5 = 12)
   if (++count < 12) {
      return;
   }

   count = 0;
   clearCanvas();

   // move snake by it's velocity
   snake.x += snake.dx;
   snake.y += snake.dy;

   // // wrap snake position horizontally on edge of screen
   // if (snake.x < 0) {
   //    snake.x = canvas.width - gridSize;
   // }
   // else if (snake.x >= canvas.width) {
   //    snake.x = 0;
   // }

   // // wrap snake position vertically on edge of screen
   // if (snake.y < 0) {
   //    snake.y = canvas.height - gridSize;
   // }
   // else if (snake.y >= canvas.height) {
   //    snake.y = 0;
   // }

   // keep track of where snake has been. front of the array is always the head
   snake.cells.unshift({ x: snake.x, y: snake.y });

   // remove cells as we move away from them
   if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
   }

   // draw apple
   drawPanel(apple.x, apple.y, "var(--rusty_red)");

   // snake ate apple
   if (snake.cells[0].x === apple.x && snake.cells[0].y === apple.y) {
      snake.maxCells++;

      newApple(spawnAppleConfined);
   }

   //snake head occupies same space as a death cell. stop game
   if (
      snakeDeathCells.some(function (cell) {
         return snake.cells[0].x === cell.x && snake.cells[0].y === cell.y;
      })
   ) {
      removeHeadCell();
      gameIsRunning = false;
   }

   //snake head occupies same space as another body cell. stop game
   if (
      snake.cells.slice(1).some(function (cell) {
         return snake.cells[0].x === cell.x && snake.cells[0].y === cell.y;
      })
   ) {
      removeHeadCell();
      gameIsRunning = false;
   }

   // draw snake one cell at a time
   snake.cells.forEach(function (cell, index) {
      drawPanel(cell.x, cell.y, "var(--hunter_green)");
   });
}

// listen to keyboard events to move the snake
document.addEventListener("keydown", function (e) {
   // prevent snake from backtracking on itself by checking that it's
   // not already moving on the same axis (pressing left while moving
   // left won't do anything, and pressing right while moving left
   // shouldn't let you collide with your own body)

   // left arrow key
   if (e.which === 37 && snake.dx === 0) {
      snake.dx = -1;
      snake.dy = 0;
   }
   // up arrow key
   else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -1;
      snake.dx = 0;
   }
   // right arrow key
   else if (e.which === 39 && snake.dx === 0) {
      snake.dx = 1;
      snake.dy = 0;
   }
   // down arrow key
   else if (e.which === 40 && snake.dy === 0) {
      snake.dy = 1;
      snake.dx = 0;
   }
   // spacebar
   else if (e.which === 32) {
      if (!gameIsRunning) {
         startGame();
      }
   }
});

function startGame() {
   // reset game state
   snake = {
      x: Math.floor(amountOfPanelsHorizontal / 2),
      y: Math.floor(amountOfPanelsVertical / 2),

      // snake velocity. moves one grid length every frame in either the x or y direction
      dx: 1,
      dy: 0,

      // keep track of all grids the snake body occupies
      cells: [],

      // length of the snake. grows when eating an apple
      maxCells: 4,
   };
   apple = {};
   newApple(spawnAppleConfined);
   clearText();

   // start game
   gameIsRunning = true;
   updateSnakeDeathCells(gameIsConfined);
   requestAnimationFrame(loop);
}