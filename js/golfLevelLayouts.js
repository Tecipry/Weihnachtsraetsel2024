import { vector, point, circle, square, line, relHeight, relWidth, relSize } from "./utils/golfUtils.js";

export const levels = {
   1: {
      obstacles: {
         wallTop: {
            type: line(relWidth(0.3), relHeight(0.2), relWidth(0.7), relHeight(0.2), "black"),
         },
         wallBottom: {
            type: line(relWidth(0.3), relHeight(0.8), relWidth(0.7), relHeight(0.8), "black"),
         },
         wallRight: {
            type: line(relWidth(0.7), relHeight(0.2), relWidth(0.7), relHeight(0.8), "black"),
         },
         triangleWallUpper:{
            type: line(relWidth(0.05), relHeight(0.1), relWidth(0.35), relHeight(0.5), "black"),
         },
         triangleWallLower:{
            type: line(relWidth(0.05), relHeight(0.9), relWidth(0.35), relHeight(0.5), "black"),
         },
      },
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.8),
         y: relHeight(0.5),
      },
      amountOfThrows: 3,
      numberRevealedOnCompletion: 3,
   },
   2: {
      obstacles: {
         topDown: {
            type: line(relWidth(0.35), relHeight(0.07), relWidth(0.8), relHeight(0.47), "black"),
         },
         bottomDown: {
            type: line(relWidth(0.35), relHeight(0.93), relWidth(0.8), relHeight(0.53), "black"),
         },
         left: {
            type: line(relWidth(0.35), relHeight(0.07), relWidth(0.35), relHeight(0.93), "black"),
         },
         blockerTop: {
            type: line(relWidth(0.15), relHeight(0.07), relWidth(0.35), relHeight(0.07), "black"),
         },
         blockerBottom: {
            type: line(relWidth(0.15), relHeight(0.93), relWidth(0.35), relHeight(0.93), "black"),
         },
         blockerLeftUpper: {
            type: line(relWidth(0.15), relHeight(0.07), relWidth(0.15), relHeight(0.35), "black"),
         },
         blockerLeftLower: {
            type: line(relWidth(0.15), relHeight(0.65), relWidth(0.15), relHeight(0.93), "black"),
         },
      },
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.25),
         y: relHeight(0.5),
      },
      amountOfThrows: 3,
      numberRevealedOnCompletion: 8,
   },
   3: {
      obstacles: {},
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.9),
         y: relHeight(0.9),
      },
      amountOfThrows: 5,
      numberRevealedOnCompletion: 1,
   },
   4: {
      obstacles: {},
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.9),
         y: relHeight(0.9),
      },
      amountOfThrows: 5,
      numberRevealedOnCompletion: 5,
   },
   5: {
      obstacles: {},
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.9),
         y: relHeight(0.9),
      },
      amountOfThrows: 5,
      numberRevealedOnCompletion: 7,
   },
   6: {
      obstacles: {},
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.9),
         y: relHeight(0.9),
      },
      amountOfThrows: 5,
      numberRevealedOnCompletion: 4,
   },
};
