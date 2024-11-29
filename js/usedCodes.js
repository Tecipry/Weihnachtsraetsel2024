import { getCodeTranslation } from "./codes.js";
import * as cookieUtils from "./utils/cookieUtils.js";

var allUsedCodes = JSON.parse(cookieUtils.getCookie("allUsedCodes"));
if (allUsedCodes === null) {
   allUsedCodes = [];
}
const usedCodes = allUsedCodes.map((code) => getCodeTranslation(code));
console.log(usedCodes);

const usedCodesTableBody = document.getElementById("usedCodesTableBody");
for (var code in usedCodes) {
   let tr = document.createElement("tr");

   let bgColor = "white";
   if (usedCodes[code].category == "riddleBoxRed") {
      bgColor = "var(--rusty_red)";
   } else if (usedCodes[code].category == "riddleBoxGreen") {
      bgColor = "var(--hunter_green)";
   } else if (usedCodes[code].category == "riddleBoxYellow") {
      bgColor = "var(--saffron)";
   } else if (usedCodes[code].category == "riddleBoxOrange") {
      bgColor = "var(--tangerine)";
   }

   let td1 = document.createElement("td");
   td1.style.backgroundColor = bgColor;
   td1.innerHTML = usedCodes[code].code;

   let td2 = document.createElement("td");
   td2.innerHTML = usedCodes[code].text;

   tr.appendChild(td1);
   tr.appendChild(td2);
   usedCodesTableBody.appendChild(tr);
}
