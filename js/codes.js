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
   else if (functionCode === "222222") {
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
   1: "Code1<br>Code1",
   2: "Code2",
   3: "Code3",
   4: "Code4",
   5: "Code5",

   111111: "Yay, du hast die Website und auch den ersten gültigen Code gefunden. Jeder Code besteht aus 6 Ziffern und kann hier gegen einen Tipp oder eine Information eingelöst werden. Mal schauen was du findest ;D<br>Viel Erfolg <3",

   // CODES FOR RIDDLE BOX //
   921009: "Das war ein wirklich schönes Herz was du da gemalt hast. Dafür habe ich hier etwas für dich:<br><a href='https://drive.google.com/file/d/1nwCjNDaW19i1651i0xRPpJbqN9Ea5HYG/view?usp=sharing' class='codeText' target='_blank' style='text-decoration: underline'>https://drive.google.com/file/d/1nwCjNDaW19i1651i0xRPpJbqN9Ea5HYG/view?usp=sharing</a>",
   257041: "Du suchst nicht zufällig ein Passwort für eine Audio Datei?<br>Hier: TLOVESC",

   //// RiddleBox solves ////
   // red
   168953: "YAY!<br>Die rote Rätselbox ist gelöst. Die anderen schaffst du auch <3",
   // green (temp)
   222222: "Mit dem Code hast du die grüne Rätselbox gelöst. Weiter so ;D",
   // yellow (temp)
   333333: "SUPER! Und das Rätsel der gelben Rätselbox hast du hinter dir. Proud of you ;)",
   // orange (temp)
   444444: "Das war der Code mit dem du die orangene Rätselbox löst. WUNDERBAR!",
};
