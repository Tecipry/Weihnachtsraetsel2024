import * as cookieUtils from "./utils/cookieUtils.js";

//// Handle tab counter ////
var tabsOpen = cookieUtils.getCookie("tabsOpen");
window.tabsOpen = tabsOpen;

if (tabsOpen == null || tabsOpen == "NaN") {
   cookieUtils.setCookie("tabsOpen", "1", 1/24); // set cookie for 1h
} else {
   cookieUtils.setCookie("tabsOpen", parseInt(tabsOpen) + parseInt(1))
}
tabsOpen = cookieUtils.getCookie("tabsOpen");
console.log("tabsOpen: ", tabsOpen)

window.addEventListener('beforeunload', function(event) {
    const newTabCount = cookieUtils.getCookie('tabsOpen')
    if (newTabCount !== null) {
        cookieUtils.setCookie('tabsOpen', newTabCount - 1)
    }
});

//update tabsOpen once per second
setInterval(function() {
   tabsOpen = cookieUtils.getCookie("tabsOpen");
   console.log("tabsOpen: ", tabsOpen)
}, 1000);



const searchImageContainer = document.getElementById("searchImageContainer");

var screenWidth = window.innerWidth * 0.8;
screenWidth += 16 - screenWidth%16;
var screenHeight = screenWidth / 16 * 9;

searchImageContainer.style.width = screenWidth + "px";
searchImageContainer.style.height = screenHeight + "px";
searchImageContainer.style.backgroundImage = "url('../assets/pictures/background_picture1.jpg')";
searchImageContainer.style.backgroundSize = screenWidth + "px " + screenHeight + "px";