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

   if (codeTranslation[code] === undefined) {
      console.log("not a valid code");

      codeText.innerHTML = code + " ist kein gültiger Code";
   }
   else {
      codeText.innerHTML = codeTranslation[code];
   }
}

const codeTranslation = {
   "1": "Code1",
   "2": "Code2",
   "3": "Code3",
   "4": "Code4",
   "5": "Code5",
}