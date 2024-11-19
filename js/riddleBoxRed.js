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

   if (_.isEqual(panels, heart) || _.isEqual(panels, invertedHeart)) {
      console.log("correct");
   } else {
      console.log("wrong");
   }
}

// function downloadFile() {
//    const fileContent = "Hello, this is the content of the file!";
//    const fileName = "example.txt";

//    const blob = new Blob([fileContent], { type: "text/plain" });
//    const fileURL = URL.createObjectURL(blob);

//    const anchor = document.createElement("a");
//    anchor.href = fileURL;
//    anchor.download = fileName;

//    anchor.click();

//    URL.revokeObjectURL(fileURL);
// }
