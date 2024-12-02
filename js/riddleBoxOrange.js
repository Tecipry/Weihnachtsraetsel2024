import * as cookieUtils from "./utils/cookieUtils.js";

var openedImages = JSON.parse(cookieUtils.getCookie("openedImages"));
window.openedImages = openedImages;

if (openedImages == null || openedImages == "NaN") {
   openedImages = {
      1: 0,
      2: 0,
      3: 0,
   };

   cookieUtils.setCookie("openedImages", JSON.stringify(openedImages), 365);
}

//// determine which image to display on this tab ////
// choose random from the ones that have not been opened; if all have been opened, choose a random one
var possibleImages = [];
for (var imageIndex of Object.keys(openedImages)) {
   if (openedImages[imageIndex] == 0) {
      possibleImages.push(imageIndex);
   }
}
if (possibleImages.length == 0) {
   possibleImages = [1, 2, 3];
}
const thisTabImage = possibleImages[Math.floor(Math.random() * possibleImages.length)];
openedImages[thisTabImage] += 1;
cookieUtils.setCookie("openedImages", JSON.stringify(openedImages), 365);

const imageLocations = {
   1: "../assets/pictures/background_1.jpg",
   2: "../assets/pictures/background_2.jpg",
   3: "../assets/pictures/background_3.jpg",
}

window.addEventListener('beforeunload', function(event) {
   var newOpenendImages = JSON.parse(cookieUtils.getCookie('openedImages'))
   if (newOpenendImages !== null) {
      newOpenendImages[thisTabImage] -= 1
      cookieUtils.setCookie('openedImages', JSON.stringify(newOpenendImages), 365)
   }
});


//// set image according to this tabs assigned image ////
const searchImageContainer = document.getElementById("searchImageContainer");

var screenWidth = 200; // in viewwidth, so basically 200% of screen width
screenWidth += 16 - screenWidth%16;
var screenHeight = screenWidth / 16 * 9;

searchImageContainer.style.width = `${screenWidth}vw`;
searchImageContainer.style.height = `${screenHeight}vw`;
searchImageContainer.style.backgroundImage = `url(${imageLocations[thisTabImage]})`;
searchImageContainer.style.backgroundSize = `${screenWidth}vw ${screenHeight}vw`;


//// Flashlight Effect ////
//from: https://medium.com/@jay.codes/illuminating-interaction-follow-the-mouse-flashlight-hover-effect-with-minimal-code-dad28cac1479
const flashlight = document.querySelector(".flashlight");
const blurFilter = document.querySelector('#blur-filter feGaussianBlur');
const illuminatedItem = document.querySelector('.illuminatedItem');

const lightRadius = 200;
const flashlightOffset = lightRadius / 2;
const filterIntensity = 100;

flashlight.style.width = flashlight.style.height = `${lightRadius}px`;
blurFilter.setAttribute('stdDeviation', filterIntensity);

const followMouseFlashlight = ({ clientX, clientY }) => {
   const { left, top } = illuminatedItem.getBoundingClientRect();
   flashlight.style.left = `${clientX - left - flashlightOffset}px`;
   flashlight.style.top = `${clientY - top - flashlightOffset}px`;
 };

 window.addEventListener('mousemove', followMouseFlashlight);