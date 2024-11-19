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

// handle params:
const parameters = Object.keys(paramPairs);

// param code
if (parameters.includes("code")) {
   page = paramPairs["code"];
   console.log(page);
}