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



function setCookie(name, value, expirationDays) {
   const date = new Date();
   date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // days to milliseconds
   const expires = "expires=" + date.toUTCString();
   document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
   const cookies = document.cookie.split('; ');
   for (let i = 0; i < cookies.length; i++) {
       const [key, value] = cookies[i].split('=');
       if (key === name) {
           return decodeURIComponent(value);
       }
   }
   return null; // Return null if cookie is not found
}

function deleteCookie(name) {
   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setRedSolvedCookie() {
   riddleBoxesStatus = getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
      riddleBoxesSolved.riddleBoxRed = true;
      setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }
}

function setGreenSolvedCookie() {
   riddleBoxesStatus = getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
      riddleBoxesSolved.riddleBoxGreen = true;
      setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }
}

function setYellowSolvedCookie() {
   riddleBoxesStatus = getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
      riddleBoxesSolved.riddleBoxYellow = true;
      setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }
}

function setOrangeSolvedCookie() {
   riddleBoxesStatus = getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
      riddleBoxesSolved.riddleBoxOrange = true;
      setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }
}



const parameters = Object.keys(paramPairs);

function populateDivFromCode() {
   if (!parameters.includes("code")) {
      console.log("no code");
      window.location.href = "./overviewPage.html";
      return;
   }
   code = paramPairs["code"];
   console.log(code);

   codeText = document.getElementById("codeText");
   codeInfo = document.getElementById("codeInfo");

   if (codeTranslation[code] === undefined) {
      console.log("not a valid code");

      codeInfo.innerHTML = "\"" + code + "\" ist leider kein gültiger Code";
      codeInfo.style.color = "var(--rusty_red)";
   }
   else {
      codeInfo.innerHTML = "Glückwunsch! \"" + code + "\" ist ein gültiger Code";
      codeText.innerHTML = codeTranslation[code];
   }
   executeFunctionFromCode(code);
}

function executeFunctionFromCode(functionCode) {
   // red riddle box solved
   if (functionCode === "168953") {
      setRedSolvedCookie();
   }
   // green riddle box solved
   else if (functionCode === "222222") {
      setGreenSolvedCookie();
   }
   // yellow riddle box solved
   else if (functionCode === "333333") {
      setYellowSolvedCookie();
   }
   // orange riddle box solved
   else if (functionCode === "444444") {
      setOrangeSolvedCookie();
   }
}

const codeTranslation = {
   "1": "Code1<br>Code1",
   "2": "Code2",
   "3": "Code3",
   "4": "Code4",
   "5": "Code5",

   "111111": "Yay, du hast die Website und auch den ersten gültigen Code gefunden. Jeder Code besteht aus 6 Ziffern und kann hier gegen einen Tipp oder eine Information eingelöst werden. Mal schauen was du findest ;D<br>Viel Erfolg <3",
   
   //// RiddleBox solves ////
   // red
   "168953": "YAY!<br>Die rote Rätselbox ist gelöst. Die anderen schaffst du auch <3s",
   // green (temp)
   "222222": "Mit dem Code hast du die grüne Rätselbox gelöst. Weiter so ;D",
   // yellow (temp)
   "333333": "SUPER! Und das Rätsel der gelben Rätselbox hast du hinter dir. Proud of you ;)",
   // orange (temp)
   "444444": "Das war der Code mit dem du die orangene Rätselbox löst. WUNDERBAR!",
}

