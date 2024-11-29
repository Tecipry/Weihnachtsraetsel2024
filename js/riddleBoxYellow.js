import * as cookieUtils from "./utils/cookieUtils.js";

function getGolfLevels() {
   const golfLevelsStatus = JSON.parse(cookieUtils.getCookie("golfLevelsStatus"));
   var enabledGolfLevels = {
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
   };
   if (golfLevelsStatus === null) {
      // cookieUtils.setCookie("golfLevelsStatus", JSON.stringify(enabledGolfLevels), 365);
   } else {
      enabledGolfLevels = golfLevelsStatus;
   }
   return enabledGolfLevels;
}
export function setLevelButtons() {
   var enabledGolfLevels = getGolfLevels();
   for (const levelNr in enabledGolfLevels) {
      if (enabledGolfLevels[levelNr]) {
         const button = document.getElementById("button" + levelNr);
         button.classList.remove("disabled");
         button.onclick = () => {
            window.location.href="./golfLevel.html?level=" + levelNr;
         }
      }
   }
}
window.setLevelButtons = setLevelButtons;

export function enableGolfLevel(levelNr) {
   var enabledGolfLevels = getGolfLevels();
   enabledGolfLevels[levelNr] = true;
   cookieUtils.setCookie("golfLevelsStatus", JSON.stringify(enabledGolfLevels), 365);
}
