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
      text: "Yay, du hast die Website und auch den ersten gültigen Code gefunden. Jeder Code ist eine 6-stellige Zahl und kann hier gegen einen Tipp oder eine Information eingelöst werden. Weitere Codes erhälst du entweder durch die Rätselboxen oder durch deinen Kalender. Die Codes im Kalender geben dir Tipps zu den Rätseln. Bis auf das Golfspiel sind alle Rätsel aber auch ohne diese Tipps lösbar. Mal schauen was du findest ;D<br>Viel Erfolg <3",
      category: "general",
      obtainedFrom: "calendar",
   },
   810990: {
      text: "FROHE WEIHNACHTEN <3<br>Hier, ich habe eine ganz große Umarmung für dich. Alle Rätselboxen zusammen ergeben den Code für ein 4-stelliges Zahlenschloss. Mach es nicht vor deiner Familie auf, wenn du dir etwas Peinlichkeit sparen willst ;).<br>Ich liebe dich ❤️",
      category: "general",
      obtainedFrom: "calendar",
   },
   179333: {
      text: "Und damit hast du den letzten Code der noch zu den Rätseln gehört gefunden ;D<br>Ich habe zwar keine weiteren Rätsel mehr, dafür aber ein paar behind the scenes <3<br><a href='https://www.youtube.com/playlist?list=PLOLmaDI5X3JMgkZvD_1Mv9pXD4xrFrDbN' class='codeText' target='_blank' style='text-decoration: underline'>https://www.youtube.com/playlist?list=PLOLmaDI5X3JMgkZvD_1Mv9pXD4xrFrDbN</a>",
      category: "general",
      obtainedFrom: "calendar",
   },
   146580: {
      text: "Take this certificate: YOU ARE NOW MY CERTIFIED GAMER GIRL <3",
      category: "general",
      obtainedFrom: "calendar",
   },

   // CODES FOR RIDDLE BOX //

   //// red
   921009: {
      text: "Das war ein wirklich schönes Herz was du da gemalt hast. Dafür habe ich hier etwas für dich:<br><a href='https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing' class='codeText' target='_blank' style='text-decoration: underline'>https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing</a>",
      category: "riddleBoxRed",
      obtainedFrom: "riddle",
   },
   257041: {
      text: "Du suchst nicht zufällig ein Passwort für eine Audio Datei?<br>Hier: TLOVESC",
      category: "riddleBoxRed",
      obtainedFrom: "riddle",
   },
   
   // tips from codes of calendar
   792996: {
      text: "Das Ding mit den Zahlen ärgert mich... Das hier hilft dir bestimmt <3<br><a href='https://www.youtube.com/watch?v=wvFhOI1H_xM' class='codeText' target='_blank' style='text-decoration: underline'>https://www.youtube.com/watch?v=wvFhOI1H_xM</a>",
      category: "riddleBoxRed",
      obtainedFrom: "calendar",
   },
   958577: {
      text: "Ich weiß doch, dass Mathe nicht so dein Ding ist ;D Du brauchst doch nicht selber rechnen - nutze einfach die Seite hier:<br><a href='https://bin-dez-hex-umrechner.de/' class='codeText' target='_blank' style='text-decoration: underline'>https://bin-dez-hex-umrechner.de/</a>",
      category: "riddleBoxRed",
      obtainedFrom: "calendar",
   },
   
   
   //// green
   215248: {
      text: "Ist dir schon aufgefallen, dass die Schlange durch den Tod eine Zelle kürzer wird?<br>Ich weiß woran es liegt. Ist mir gerade aber zu viel Aufwand um es zu lösen - deswegen mache ich es einfach nicht.<br>It's a feature, not a bug ;D",
      category: "riddleBoxGreen",
      obtainedFrom: "riddle",
   },
   
   // tips from codes of calendar
   924659: {
      text: "Press Space to start the game!",
      category: "riddleBoxGreen",
      obtainedFrom: "calendar",
   },
   887420: {
      text: "Ist dein Link 43 Zeichen lang? Dann ist er komplett",
      category: "riddleBoxGreen",
      obtainedFrom: "calendar",
   },
   416683: {
      text: "Morsecode aus einem Video lesen ist schwierig. Ich habs für dich aufgeschrieben:<br>-.-- --- ..- / .... .- ...- . / - .-- --- / ..- -. .-. . .- -.. / -- . ... ... .- --. . ... ---...<br><br>-- . ... ... .- --. . / --- -. . ---...<br><br>.-- .. .-. / -... .-. .- ..- -.-. .... . -. / -. --- -.-. .... / -... .. .-. -. . -. / ..- -. -.. / -.-. .... .. .--. ... .-.-.- / .... .- -... . / -.. .. .-. / -.. .. . / ..-. ..- . -. ..-. / . ..- .-. --- / .-- .. . -.. . .-. / .- ..- ..-. / -.. . -. / - .. ... -.-. .... / --. . .-.. . --. - .-.-.- / ... --- .-.. .-.. - . / .-. . .. -.-. .... . -. .-.-.-<br><br>-- . ... ... .- --. . / - .-- --- ---...<br><br>-.. . .-. / ...- --- .-. - .-. .- --. / .. ... - / ... -.-. .... --- -. / .. -. / ...- .. . .-. / - .- --. . -. --..-- / -.. .- / ... --- .-.. .-.. - . -. / .-- .. .-. / ..- -. ... / -. --- -.-. .... / .- -... ... .--. .-. . -.-. .... . -. .-.-.- / .. -.-. .... / -... .. -. / -- .. - / -- . .. -. . -- / - . .. .-.. / -... .. ... .... . .-. / -. ..- .-. / .- ..- ..-. / .- -.-. .... - / -- .. -. ..- - . -. / --. . -.- --- -- -- . -. .-.-.-",
      category: "riddleBoxGreen",
      obtainedFrom: "calendar",
   },
   476311: {
      text: "Ich bin mir sicher dass du die Idee schon selber hattest my smart girl <3. Einen Morsecode translator habe ich trotzdem für dich:<br><a href='https://morsecodee.com/de' class='codeText' target='_blank' style='text-decoration: underline'>https://morsecodee.com/de</a>",
      category: "riddleBoxGreen",
      obtainedFrom: "calendar",
   },
   608651: {
      text: "Ich hoffe doch, dass dir die Box nicht zu schwer wird. Vergiss nicht dass du nach 6 Zahlan für den Code suchst. Denk nicht zu kompliziert, sondern lies sie einfach aus dem Text ;D",
      category: "riddleBoxGreen",
      obtainedFrom: "calendar",
   },
   
   //// yellow
      
   // tips from codes of calendar
   443882: {
      text: "Du dachtest doch nicht, dass ich nur ein Golflevel für dich habe? - Hier ist natürlich mehr für dich <3",
      category: "riddleBoxYellow",
      obtainedFrom: "calendar",
   },
   123061: {
      text: "Aller guten Dinge sind doch 3 Golflevel. Es kommen noch mehr, aber erstmal sind wir beim dritten. :D",
      category: "riddleBoxYellow",
      obtainedFrom: "calendar",
   },
   771510: {
      text: "Inzwischen bist du ja geübt im Golfen ;).<br>Für das vierte Level hast du 2 Schläge. Doch wenn du es etwas schwerer haben willst, dann versuch es mit nur einem zu schaffen <3<br>Eine frühere Version des Levels war mit einem gut machbar. In dieser finalen Version ist es deutlich schwerer, aber immernoch möglich.",
      category: "riddleBoxYellow",
      obtainedFrom: "calendar",
   },
   967854: {
      text: "Noch hast du Spaß mit Bällen vor dir. Gerade nur ein Golfball, aber man kann nie wissen was noch kommt ;)",
      category: "riddleBoxYellow",
      obtainedFrom: "calendar",
   },
   665839: {
      text: "Fast geschafft! Mit diesem Golflevel hast du auch das letzte freigeschaltet. <3",
      category: "riddleBoxYellow",
      obtainedFrom: "calendar",
   },
   
   //// orange
   
   // tips from codes of calendar
   113318: {
      text: "Das Bild ist größer als dein Bildschirm. Scrolle etwa herum und schau dich um ;)",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   912389: {
      text: "Lade Mal den tab neu - oder dupliziere ihn sogar. Manchmal braucht man einfach eine andere Perspektive um die Dinge klarer zu sehen.",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   677929: {
      text: "Schau dir die Mathe Hausaufgaben auf dem Tisch an. Was ist gesucht?",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   984652: {
      text: "Die römischen Zahlen stehen übrigens für die Reihenfolge o.O<br>Sortier alles richtig zusammen und du hast einen Code gefunden.",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   494480: {
      text: "TicTacToe ist ja eigentlich ein eher langweiliges Spiel. Aber wenn man es über mehrere Felder spielt, verliert man schnell den Überblick und sieht erst den Gewinner, wenn man alle Felder zusammenbringt.",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   461479: {
      text: "Bunte Blumen machen jedes Zimmer schöner. Aber den einen Topf mag ich besonders ;)",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   682614: {
      text: "Manchmal fühlt sich TicTacToe fast wie eine Karte an. Man muss nur den richtigen Platz finden um sein Zeichen zu setzen.",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   227625: {
      text: "Zähl doch Mal die Blütenblätter <3",
      category: "riddleBoxOrange",
      obtainedFrom: "calendar",
   },
   
   //// RiddleBox solves ////
   // red
   168953: {
      text: "Da habe ich echt meine Notizen durcheinander gebracht... Zum Glück konntest du den Code in dezimal umwandeln.<br>damit ist die rote Rätselbox ist gelöst ;D Die anderen schaffst du auch <3",
      category: "riddleBoxRed",
      obtainedFrom: "riddle",
   },
   // green
   214174: {
      text: "Mit dem Code hast du die grüne Rätselbox gelöst. Weiter so ;D",
      category: "riddleBoxGreen",
      obtainedFrom: "riddle",
   },
   // yellow
   381574: {
      text: "SUPER! Und das Rätsel der gelben Rätselbox hast du hinter dir. Proud of you ;)",
      category: "riddleBoxYellow",
      obtainedFrom: "riddle",
   },
   // orange
   134637: {
      text: "Das war der Code mit dem du die orangene Rätselbox löst. WUNDERBAR!",
      category: "riddleBoxOrange",
      obtainedFrom: "riddle",
   },
};

export function getCodeTranslation(code) {
   if (code in codeTranslation) {
      let translation = codeTranslation[code];
      translation.code = code;
      return translation;
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
