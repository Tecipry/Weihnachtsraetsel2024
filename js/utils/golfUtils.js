// used to draw relative to the canvas and not in total pixels
export const canvas = document.getElementById("golfCanvas");
// Set the width and height attributes to a higher value
canvas.width = canvas.width * 4;
canvas.height = canvas.height * 4;

export function relHeight(percentage) {
   return Math.floor(canvas.height * percentage);
}
export function relWidth(percentage) {
   return Math.floor(canvas.width * percentage);
}
export function relSize(percentage) {
   return Math.floor(canvas.width * percentage);
}

export function vector(x, y) {
   const obj = {
      x: x,
      y: y,
   };
   return obj;
}
export function point(x, y) {
   const obj = {
      type: "point",
      x: x,
      y: y,
   };
   return obj;
}
export function circle(x, y, radius, colour) {
   const obj = {
      type: "circle",
      coords: point(x, y),
      radius: radius,
      colour: colour,
   };
   return obj;
}
export function square(x, y, width, height, colour) {
   const obj = {
      type: "square",
      coords: point(x, y),
      width: width,
      height: height,
      colour: colour,
   };
   return obj;
}
export function line(startpointX, startpointY, endpointX, endpointY, colour) {
   const obj = {
      type: "line",
      startpoint: point(startpointX, startpointY),
      endpoint: point(endpointX, endpointY),
      colour: colour,
   };
   return obj;
}