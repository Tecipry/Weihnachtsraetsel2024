// // extract url parameters. Param definition is startet wirh ? and they are seperated with & in the url
// const url = document.URL;
// var paramPairs = {};
// if (url.includes("?") && url.includes("=")) {
//    var params = url.split("?")[1].split("&");
//    paramPairs = params.reduce(function (acc, param) {
//       var [key, value] = param.split("=");
//       acc[key] = value;
//       return acc;
//    }, {});
// }

// // handle params:
// const parameters = Object.keys(paramPairs);

// // param pageId
// if (parameters.includes("pageId")) {
//    page = paramPairs["pageId"];
//    console.log(page);
// }

function loadNavBar() {
   console.log("loading navbar");
   const navBarDiv = document.getElementById('navBarDiv');
   navBarDiv.innerHTML = `
      <nav>
         <ul style="list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: var(--hunter_green)">
            <li style="float: left">
               <a href="./overviewPage.html" style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none">zurück zur Overview</a>
            </li>
         </ul>
      </nav>
   `
}