import { getCodeTranslation } from "./codes.js";
import * as cookieUtils from "./utils/cookieUtils.js";

var allUsedCodes = JSON.parse(cookieUtils.getCookie("allUsedCodes"));
if (allUsedCodes === null) {
   allUsedCodes = [];
}
const usedCodes = allUsedCodes.map((code) => getCodeTranslation(code));
console.log(usedCodes);