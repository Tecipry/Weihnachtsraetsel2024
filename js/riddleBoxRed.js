function heartSuccessfullyDrawn(inverted) {
   if (!inverted) {
      // normal heart
      document.getElementById("result").innerHTML = "Das ist ein wunderschönes Herz!<br>Hier ein Code den du nutzen kannst: 921009";
   } else {
      // inverted heart
      document.getElementById("result").innerHTML = "whoaa, darauf bin ich gar nicht so schnell gekommen! Mit dem roten Rand entsteht in der Mitte auch ein Herz.<br>Wunderschön<br>Dafür bekommst du einen Code: 257041";
   }
}

function heartNotDrawn() {
   document.getElementById("result").innerHTML = "Fast. Aber das gesuchte Herz sieht anders aus ;D";
   setTimeout(function () {
      document.getElementById("result").innerHTML = "";
   }, 3000);
}

//// EXPORTED FUNCTIONS for riddleBoxRed.html ////

function create7x7Grid() {
   // create a 7x7 grid of panels
   const panelGrid = document.getElementById("panel-grid");

   for (let i = 0; i < 7; i++) {
      let row = document.createElement("div");
      row.className = "gridRow7x7";

      for (let j = 0; j < 7; j++) {
         let panel = document.createElement("div");
         panel.className = "panel";
         panel.style.backgroundColor = "var(--tea_green)";

         panel.addEventListener("click", function () {
            if (this.style.backgroundColor === "var(--tea_green)") {
               this.style.backgroundColor = "var(--rusty_red)";
            } else {
               this.style.backgroundColor = "var(--tea_green)";
            }
         });
         row.appendChild(panel);
      }
      panelGrid.appendChild(row);
   }
}
window.create7x7Grid = create7x7Grid;

const heart = [
   [0, 0, 0, 0, 0, 0, 0],
   [0, 0, 1, 0, 1, 0, 0],
   [0, 1, 1, 1, 1, 1, 0],
   [0, 1, 1, 1, 1, 1, 0],
   [0, 0, 1, 1, 1, 0, 0],
   [0, 0, 0, 1, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0],
];

const invertedHeart = [
   [1, 1, 1, 1, 1, 1, 1],
   [1, 1, 0, 1, 0, 1, 1],
   [1, 0, 0, 0, 0, 0, 1],
   [1, 0, 0, 0, 0, 0, 1],
   [1, 1, 0, 0, 0, 1, 1],
   [1, 1, 1, 0, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1],
];

function checkCurrentGridValue() {
   const panelGrid = document.getElementById("panel-grid");
   const rows = panelGrid.children;
   const panels = Array.from(rows).map((row) => Array.from(row.children).map((panel) => (panel.style.backgroundColor === "var(--tea_green)" ? 0 : 1)));
   console.log(panels);

   if (_.isEqual(panels, heart)) {
      console.log("correct heart");
      heartSuccessfullyDrawn(false);
   } else if (_.isEqual(panels, invertedHeart)) {
      console.log("correct inverted heart");
      heartSuccessfullyDrawn(true);
   } else {
      heartNotDrawn();
   }
}
window.checkCurrentGridValue = checkCurrentGridValue;
