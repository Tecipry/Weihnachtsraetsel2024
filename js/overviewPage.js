import * as cookieUtils from "./utils/cookieUtils.js";


//// EXPORTED FUNCTIONS for overviewPage.html ////

function codesButtonHandling() {
   const code = document.getElementById("inputField").value;

   if (code == "") {
      return;
   }

   window.location.href = "./codes.html?code=" + code;
}
window.codesButtonHandling = codesButtonHandling;

function setRiddleBoxStatus() {
   // cookies to store state of the riddle Boxes
   var riddleBoxesSolved = {
      riddleBoxRed: false,
      riddleBoxGreen: false,
      riddleBoxYellow: false,
      riddleBoxOrange: false,
   };

   const riddleBoxesStatus = cookieUtils.getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
   } else {
      cookieUtils.setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }

   const riddleBoxRed_Span = document.getElementById("riddleBoxRed_Span");
   const riddleBoxGreen_Span = document.getElementById("riddleBoxGreen_Span");
   const riddleBoxYellow_Span = document.getElementById("riddleBoxYellow_Span");
   const riddleBoxOrange_Span = document.getElementById("riddleBoxOrange_Span");

   riddleBoxRed_Span.innerHTML = riddleBoxesSolved.riddleBoxRed ? "3" : "?";
   riddleBoxGreen_Span.innerHTML = riddleBoxesSolved.riddleBoxGreen ? "4" : "?";
   riddleBoxYellow_Span.innerHTML = riddleBoxesSolved.riddleBoxYellow ? "7" : "?";
   riddleBoxOrange_Span.innerHTML = riddleBoxesSolved.riddleBoxOrange ? "1" : "?";
}
window.setRiddleBoxStatus = setRiddleBoxStatus;

function clearRiddleBoxCookies() {
   cookieUtils.deleteCookie("riddleBoxesStatus");
   cookieUtils.deleteCookie("snakeGameState");
   cookieUtils.deleteCookie("golfLevelsStatus");
   window.location.reload();
}
window.clearRiddleBoxCookies = clearRiddleBoxCookies;