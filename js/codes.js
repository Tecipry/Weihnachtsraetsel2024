import * as cookieUtils from "./utils/cookieUtils.js";

// extract url parameters. Param definition is startet with ? and they are seperated with & in the url
const url = document.URL;
var paramPairs = {};
if (url.includes("?") && url.includes("=")) {
   var params = url.split("?")[1].split("&");
   paramPairs = params.reduce(function (acc, param) {
      var [key, value] = param.split("=");
      acc[key] = value;
      return acc;
   }, {});
}

function setRiddleBoxSolvedCookie(riddleBoxName) {
   const riddleBoxesStatus = cookieUtils.getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      var riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
      riddleBoxesSolved[riddleBoxName] = true;
      cookieUtils.setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }
}


function executeFunctionFromCode(functionCode) {
   // red riddle box solved
   if (functionCode === "168953") {
      setRiddleBoxSolvedCookie("riddleBoxRed");
   }
   // green riddle box solved
   else if (functionCode === "214174") {
      setRiddleBoxSolvedCookie("riddleBoxGreen");
   }
   // yellow riddle box solved
   else if (functionCode === "333333") {
      setRiddleBoxSolvedCookie("riddleBoxYellow");
   }
   // orange riddle box solved
   else if (functionCode === "444444") {
      setRiddleBoxSolvedCookie("riddleBoxOrange");
   }
   // set cookie to change snakeGame to snakeGameState 1
   else if (functionCode === "215248") {
      cookieUtils.setCookie("snakeGameState", "1", 365);
   }
}


//// EXPORTED FUNCTIONS for codes.html ////

const parameters = Object.keys(paramPairs);
export function populateDivFromCode() {
   if (!parameters.includes("code")) {
      console.log("no code");
      window.location.href = "./overviewPage.html";
      return;
   }
   const code = paramPairs["code"];
   console.log(code);

   codeText = document.getElementById("codeText");
   codeInfo = document.getElementById("codeInfo");

   if (codeTranslation[code] === undefined) {
      console.log("not a valid code");

      codeInfo.innerHTML = '"' + code + '" ist leider kein gültiger Code';
      codeInfo.style.color = "var(--rusty_red)";
   } else {
      codeInfo.innerHTML = 'Glückwunsch! "' + code + '" ist ein gültiger Code';
      codeText.innerHTML = codeTranslation[code];
   }
   executeFunctionFromCode(code);
}
window.populateDivFromCode = populateDivFromCode;

const codeTranslation = {
   // Explanation codes or other //
   111111: "Yay, du hast die Website und auch den ersten gültigen Code gefunden. Jeder Code besteht aus 6 Ziffern und kann hier gegen einen Tipp oder eine Information eingelöst werden. Mal schauen was du findest ;D<br>Viel Erfolg <3",

   // CODES FOR RIDDLE BOX //

   // red
   921009: "Das war ein wirklich schönes Herz was du da gemalt hast. Dafür habe ich hier etwas für dich:<br><a href='https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing' class='codeText' target='_blank' style='text-decoration: underline'>https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing</a>",
   257041: "Du suchst nicht zufällig ein Passwort für eine Audio Datei?<br>Hier: TLOVESC",

   // green
   215248: "Ist dir schon aufgefallen, dass die Schlange durch den Tod eine Zelle kürzer wird?<br>Ich weiß woran es liegt. Ist mir gerade aber zu viel Aufwand um es zu lösen - deswegen mache ich es einfach nicht.<br>It's a feature, not a bug ;D",

   //// RiddleBox solves ////
   // red
   168953: "Da habe ich echt meine Notizen durcheinander gebracht... Zum Glück konntest du den Code in dezimal umwandeln.<br>damit ist die rote Rätselbox ist gelöst ;D Die anderen schaffst du auch <3",
   // green (temp)
   214174: "Mit dem Code hast du die grüne Rätselbox gelöst. Weiter so ;D",
   // yellow (temp)
   333333: "SUPER! Und das Rätsel der gelben Rätselbox hast du hinter dir. Proud of you ;)",
   // orange (temp)
   444444: "Das war der Code mit dem du die orangene Rätselbox löst. WUNDERBAR!",
};
