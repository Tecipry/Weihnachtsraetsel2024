import * as cookieUtils from "./utils/cookieUtils.js";
import * as paramUtils from "./utils/paramUtils.js";
import { enableGolfLevel } from "./riddleBoxYellow.js";

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
   else if (functionCode === "381574") {
      setRiddleBoxSolvedCookie("riddleBoxYellow");
   }
   // orange riddle box solved
   else if (functionCode === "134637") {
      setRiddleBoxSolvedCookie("riddleBoxOrange");
   }
   // set cookie to change snakeGame to snakeGameState 1
   else if (functionCode === "215248") {
      cookieUtils.setCookie("snakeGameState", "1", 365);
   }
   // enable golf level 2
   else if (functionCode === "443882") {
      enableGolfLevel(2);
   }
   // enable golf level 3
   else if (functionCode === "123061") {
      enableGolfLevel(3);
   }
   // enable golf level 4
   else if (functionCode === "771510") {
      enableGolfLevel(4);
   }
   // enable golf level 5
   else if (functionCode === "967854") {
      enableGolfLevel(5);
   }
   // enable golf level 6
   else if (functionCode === "665839") {
      enableGolfLevel(6);
   }
}


//// EXPORTED FUNCTIONS for codes.html ////
const code = paramUtils.getParamValue("code");
export function populateDivFromCode() {
   if (code === null) {
      console.log("no code");
      window.location.href = "./overviewPage.html";
      return;
   }
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

   // yellow
   443882: "Du dachtest doch nicht, dass ich nur ein Golflevel für dich habe? - Hier ist natürlich mehr für dich <3",
   123061: "Aller guten Dinge sind doch 3 Golflevel. Es kommen noch mehr, aber erstmal sind wir beim dritten. :D",
   771510: "Inzwischen weist du ja geübt im Golfen ;).<br>Da schaffst du auch das vierte Level",
   967854: "Noch hast du Spaß mit Bällen vor dir. Gerade nur ein Golfball, aber man kann nie wissen was noch kommt ;)",
   665839: "Fast geschafft! Mit diesem Golflevel hast du auch das letzte freigeschaltet. <3",

   //// RiddleBox solves ////
   // red
   168953: "Da habe ich echt meine Notizen durcheinander gebracht... Zum Glück konntest du den Code in dezimal umwandeln.<br>damit ist die rote Rätselbox ist gelöst ;D Die anderen schaffst du auch <3",
   // green (temp)
   214174: "Mit dem Code hast du die grüne Rätselbox gelöst. Weiter so ;D",
   // yellow (temp)
   381574: "SUPER! Und das Rätsel der gelben Rätselbox hast du hinter dir. Proud of you ;)",
   // orange (temp)
   134637: "Das war der Code mit dem du die orangene Rätselbox löst. WUNDERBAR!",
};
