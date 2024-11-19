function loadNavBar() {
   const navBarDiv = document.getElementById("navBarDiv");
   navBarDiv.innerHTML = `
      <nav>
         <ul style="list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: var(--hunter_green)">
            <li style="float: left">
               <a href="./overviewPage.html" style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none">zurück zur Overview</a>
            </li>
         </ul>
      </nav>
   `;
}

// // cookies to store state of the riddle Boxes
// riddleBoxesSolved = {
//    "riddleBoxRed": false,
//    "riddleBoxGreen": false,
//    "riddleBoxOrange": false,
//    "riddleBoxYellow": false
// }

// riddleBoxesStatus = getCookie("riddleBoxesStatus");
// if (riddleBoxesStatus != null) {
//    riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
// }
// else {
//    setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
// }