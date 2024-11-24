import * as cookieUtils from "./utils/cookieUtils.js";

//// Handle tab counter ////
var tabsOpen = cookieUtils.getCookie("tabsOpen");
window.tabsOpen = tabsOpen;

if (tabsOpen == null || tabsOpen == "NaN") {
   cookieUtils.setCookie("tabsOpen", "1", 1/24); // set cookie for 1h
} else {
   cookieUtils.setCookie("tabsOpen", parseInt(tabsOpen) + parseInt(1))
}
tabsOpen = cookieUtils.getCookie("tabsOpen");
console.log("tabsOpen: ", tabsOpen)

window.addEventListener('beforeunload', function(event) {
    const newTabCount = cookieUtils.getCookie('tabsOpen')
    if (newTabCount !== null) {
        cookieUtils.setCookie('tabsOpen', newTabCount - 1)
    }
});

//update tabsOpen once per second
setInterval(function() {
   tabsOpen = cookieUtils.getCookie("tabsOpen");
   console.log("tabsOpen: ", tabsOpen)
}, 1000);



// const puzzleContainer = document.getElementById('puzzle-container');
// const targetContainer = document.getElementById('target-container');
// const imgSrc = "../assets/pictures/cropped.png"; // Replace with your image path

// const gridSize = 4; // 4x4 puzzle
// const pieceSize = 384;

// // Create pieces
// const pieces = [];
// for (let row = 0; row < gridSize; row++) {
//   for (let col = 0; col < gridSize; col++) {
//     const piece = document.createElement('div');
//     piece.classList.add('piece');
//     piece.style.backgroundImage = `url(${imgSrc})`;
//     piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
//     piece.dataset.row = row;
//     piece.dataset.col = col;
//     pieces.push(piece);
//   }
// }

// // Shuffle pieces and add to puzzle container
// shuffleArray(pieces).forEach(piece => puzzleContainer.appendChild(piece));
// // pieces.forEach(piece => puzzleContainer.appendChild(piece));

// // Enable drag-and-drop
// let draggedPiece = null;

// pieces.forEach(piece => {
//   piece.draggable = true;

//   piece.addEventListener('dragstart', () => {
//     draggedPiece = piece;
//     piece.classList.add('dragging');
//   });

//   piece.addEventListener('dragend', () => {
//     draggedPiece = null;
//     piece.classList.remove('dragging');
//   });
// });

// targetContainer.addEventListener('dragover', e => e.preventDefault());

// targetContainer.addEventListener('drop', e => {
//   const target = e.target;
//   if (target.classList.contains('piece') || target === targetContainer) {
//     targetContainer.appendChild(draggedPiece);
//     checkCompletion();
//   }
// });

// // Shuffle function
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// // Check if the puzzle is solved
// function checkCompletion() {
//   const pieces = Array.from(targetContainer.children);
//   const isComplete = pieces.every((piece, index) => {
//     const row = Math.floor(index / gridSize);
//     const col = index % gridSize;
//     return parseInt(piece.dataset.row) === row && parseInt(piece.dataset.col) === col;
//   });

//   if (isComplete) {
//     alert('Puzzle Complete!');
//   }
// }
