//// VARIABLES ////
var gridSize = 16;
var count = 0;
var gameIsConfined = false;

// set size of canvas to largest multiple of grid which is smaller than the viewport size
const snakeGameContainer = document.getElementById('snakeGameContainer');
const panel_canvas = document.getElementById('snake_panel_canvas');
const snakeGameContainerWidth = document.getElementById('snakeGameContainer').offsetWidth;
const snakeGameContainerHeight = document.getElementById('snakeGameContainer').offsetHeight;

const panelCanvasWidth = Math.floor(snakeGameContainerWidth / gridSize) * gridSize + 'px';
const panelCanvasHeight = Math.floor(snakeGameContainerHeight / gridSize) * gridSize + 'px';

panel_canvas.style.width = panelCanvasWidth;
panel_canvas.style.height = panelCanvasHeight;

// amount of panels inside snakeGameContainer
const amountOfPanelsHorizontal = Math.floor(snakeGameContainerWidth / gridSize);
const amountOfPanelsVertical = Math.floor(snakeGameContainerHeight / gridSize);

// snake Variables
var snake = {
   x: Math.floor(amountOfPanelsHorizontal / 2),
   y: Math.floor(amountOfPanelsVertical / 2),

   // snake velocity. moves one grid length every frame in either the x or y direction
   dx: 1,
   dy: 0,

   // keep track of all grids the snake body occupies
   cells: [],

   // length of the snake. grows when eating an apple
   maxCells: 4
};
//TODO: update this to fit dynamically
var apple = {
   x: 20,
   y: 20
};


//store all panels to manipulate them individually
const indexForAllCanvasPanels = [];

// fill panel_canvas with grid of divs (squares of size gridSize)
for (let y = 0; y < amountOfPanelsVertical; y++) {
   let row = document.createElement("div");
   row.style.height = gridSize + 'px';
   row.className = "panelCanvasRow";

   const rowArray = [];

   for (let x = 0; x < amountOfPanelsHorizontal; x++) {
      let panel = document.createElement("div");
      panel.className = "panelCanvasPanel";
      panel.style.height = gridSize + 'px';
      panel.style.width = gridSize + 'px';

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
// border should be at 1/4 of the whole game area, both horizontally and vertically
const upperBorderRow = Math.floor(amountOfPanelsVertical / 4);
const lowerBorderRow = Math.floor(amountOfPanelsVertical * 3 / 4);
const leftBorderColoumn = Math.floor(amountOfPanelsHorizontal / 4);
const rightBorderColoumn = Math.floor(amountOfPanelsHorizontal * 3 / 4);

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
   if (workingPanel === null) {
      return;
   }
   workingPanel.style.backgroundColor = colour;
   allColouredPanels.push(workingPanel);
}

//draw new apple
//TODO: eliminate illegal apple spawn locations
function newApple(confined) {
   if (confined) {
      console.log("spawning confined apple");
      apple.x = getRandomInt(leftBorderColoumn + 1, rightBorderColoumn - 1);
      apple.y = getRandomInt(upperBorderRow + 1, lowerBorderRow - 1);
   } else {
      console.log("spawning free apple");
      apple.x = getRandomInt(0, amountOfPanelsHorizontal);
      apple.y = getRandomInt(0, amountOfPanelsVertical);
   }
   drawPanel(apple.x, apple.y, 'var(--rusty_red)');
}

// get random whole numbers in a specific range
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
   requestAnimationFrame(loop);

   // slow game loop to 5 fps instead of 60 (60/5 = 12)
   if (++count < 12) {
      return;
   }

   count = 0;
   clearCanvas()

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
   snake.cells.unshift({x: snake.x, y: snake.y});

   // remove cells as we move away from them
   if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
   }

   // draw apple
   drawPanel(apple.x, apple.y, 'var(--rusty_red)');

   // draw snake one cell at a time
   snake.cells.forEach(function(cell, index) {

      drawPanel(cell.x, cell.y, 'var(--hunter_green)');

      // snake ate apple
      if (cell.x === apple.x && cell.y === apple.y) {
         snake.maxCells++;

         newApple(gameIsConfined);
      }

      // check collision with all cells after this one (modified bubble sort)
      for (var i = index + 1; i < snake.cells.length; i++) {

         // snake occupies same space as a body part. reset game
         // TODO: update death logic (death on border, death reveals text)
         if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 25;
            snake.y = 25;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = 1;
            snake.dy = 0;

            newApple(gameIsConfined);
         }
      }
   });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
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
});


function startGame () {
   requestAnimationFrame(loop);
}
window.startGame = startGame;
// TODO: start game on first key press