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
   console.log("execute function: " + functionCode);

   // red riddle box solved
   if (functionCode === 168953) {
      setRiddleBoxSolvedCookie("riddleBoxRed");
   }
   // green riddle box solved
   else if (functionCode === 214174) {
      setRiddleBoxSolvedCookie("riddleBoxGreen");
   }
   // yellow riddle box solved
   else if (functionCode === 381574) {
      setRiddleBoxSolvedCookie("riddleBoxYellow");
   }
   // orange riddle box solved
   else if (functionCode === 134637) {
      setRiddleBoxSolvedCookie("riddleBoxOrange");
   }
   // set cookie to change snakeGame to snakeGameState 1
   else if (functionCode === 215248) {
      cookieUtils.setCookie("snakeGameState", "1", 365);
   }
   // enable golf level 2
   else if (functionCode === 443882) {
      enableGolfLevel(2);
   }
   // enable golf level 3
   else if (functionCode === 123061) {
      enableGolfLevel(3);
   }
   // enable golf level 4
   else if (functionCode === 771510) {
      enableGolfLevel(4);
   }
   // enable golf level 5
   else if (functionCode === 967854) {
      enableGolfLevel(5);
   }
   // enable golf level 6
   else if (functionCode === 665839) {
      enableGolfLevel(6);
   }
}

const code = JSON.parse(paramUtils.getParamValue("code"));

//// EXPORTED FUNCTIONS for codes.html ////
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
      codeText.innerHTML = codeTranslation[code].text;
   }
   executeFunctionFromCode(code);
}
window.populateDivFromCode = populateDivFromCode;

const codeTranslation = {
   // Explanation codes or other //
   111111: {
      text: "Yay, du hast die Website und auch den ersten gültigen Code gefunden. Jeder Code besteht aus 6 Ziffern und kann hier gegen einen Tipp oder eine Information eingelöst werden. Mal schauen was du findest ;D<br>Viel Erfolg <3",
      category: "general",
   },

   // CODES FOR RIDDLE BOX //

   // red
   921009: {
      text: "Das war ein wirklich schönes Herz was du da gemalt hast. Dafür habe ich hier etwas für dich:<br><a href='https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing' class='codeText' target='_blank' style='text-decoration: underline'>https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing</a>",
      category: "riddleBoxRed",
   },
   257041: {
      text: "Du suchst nicht zufällig ein Passwort für eine Audio Datei?<br>Hier: TLOVESC",
      category: "riddleBoxRed",
   },

   // green
   215248: {
      text: "Ist dir schon aufgefallen, dass die Schlange durch den Tod eine Zelle kürzer wird?<br>Ich weiß woran es liegt. Ist mir gerade aber zu viel Aufwand um es zu lösen - deswegen mache ich es einfach nicht.<br>It's a feature, not a bug ;D",
      category: "riddleBoxGreen",
   },

   // yellow
   443882: {
      text: "Du dachtest doch nicht, dass ich nur ein Golflevel für dich habe? - Hier ist natürlich mehr für dich <3",
      category: "riddleBoxYellow",
   },
   123061: {
      text: "Aller guten Dinge sind doch 3 Golflevel. Es kommen noch mehr, aber erstmal sind wir beim dritten. :D",
      category: "riddleBoxYellow",
   },
   771510: {
      text: "Inzwischen weist du ja geübt im Golfen ;).<br>Da schaffst du auch das vierte Level",
      category: "riddleBoxYellow",
   },
   967854: {
      text: "Noch hast du Spaß mit Bällen vor dir. Gerade nur ein Golfball, aber man kann nie wissen was noch kommt ;)",
      category: "yeriddleBoxYellowllow",
   },
   665839: {
      text: "Fast geschafft! Mit diesem Golflevel hast du auch das letzte freigeschaltet. <3",
      category: "riddleBoxYellow",
   },

   //// RiddleBox solves ////
   // red
   168953: {
      text: "Da habe ich echt meine Notizen durcheinander gebracht... Zum Glück konntest du den Code in dezimal umwandeln.<br>damit ist die rote Rätselbox ist gelöst ;D Die anderen schaffst du auch <3",
      category: "riddleBoxRed",
   },
   // green (temp)
   214174: {
      text: "Mit dem Code hast du die grüne Rätselbox gelöst. Weiter so ;D",
      category: "riddleBoxGreen",
   },
   // yellow (temp)
   381574: {
      text: "SUPER! Und das Rätsel der gelben Rätselbox hast du hinter dir. Proud of you ;)",
      category: "riddleBoxYellow",
   },
   // orange (temp)
   134637: {
      text: "Das war der Code mit dem du die orangene Rätselbox löst. WUNDERBAR!",
      category: "riddleBoxOrange",
   },
};

export function getCodeTranslation(code) {
   if (code in codeTranslation) {
      return codeTranslation[code];
   }
   return null;
}

// store used code in cookie for usedCodes.js
var allUsedCodes = JSON.parse(cookieUtils.getCookie("allUsedCodes"));
if (allUsedCodes === null) {
   allUsedCodes = [];
}
if (!allUsedCodes.includes(code) && code in codeTranslation) {
   allUsedCodes.push(code);
   cookieUtils.setCookie("allUsedCodes", JSON.stringify(allUsedCodes), 365);
}
