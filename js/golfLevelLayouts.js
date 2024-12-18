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
      obstacles: {
         // Box around Ball:
         ballBack: {
            type: line(relWidth(0.70), relHeight(0.35), relWidth(0.70), relHeight(0.65), "black"),
         },
         ballBottom: {
            type: line(relWidth(0.60), relHeight(0.65), relWidth(0.70), relHeight(0.65), "black"),
         },
         ballTop: {
            type: line(relWidth(0.60), relHeight(0.35), relWidth(0.70), relHeight(0.35), "black"),
         },
         // Box around Goal:
         goalBack: {
            type: line(relWidth(0.85), relHeight(0.35), relWidth(0.85), relHeight(0.65), "black"),
         },
         goalBottom: {
            type: line(relWidth(0.75), relHeight(0.65), relWidth(0.85), relHeight(0.65), "black"),
         },
         goalTop: {
            type: line(relWidth(0.75), relHeight(0.35), relWidth(0.85), relHeight(0.35), "black"),
         },
      },
      decorations: {
         // Mirrored Box around Goal:
         goalFront: {
            type: line(relWidth(0.15), relHeight(0.35), relWidth(0.15), relHeight(0.65), "black"),
         },
         goalBottomMirrored: {
            type: line(relWidth(0.15), relHeight(0.65), relWidth(0.25), relHeight(0.65), "black"),
         },
         goalTopMirrored: {
            type: line(relWidth(0.15), relHeight(0.35), relWidth(0.25), relHeight(0.35), "black"),
         },
         // Mirrored Box around Ball:
         ballFront: {
            type: line(relWidth(0.30), relHeight(0.35), relWidth(0.30), relHeight(0.65), "black"),
         },
         ballBottomMirrored: {
            type: line(relWidth(0.30), relHeight(0.65), relWidth(0.40), relHeight(0.65), "black"),
         },
         ballTopMirrored: {
            type: line(relWidth(0.30), relHeight(0.35), relWidth(0.40), relHeight(0.35), "black"),
         },
      },
      ballStartLocation: {
         x: relWidth(0.65),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.8),
         y: relHeight(0.5),
      },
      amountOfThrows: 2,
      numberRevealedOnCompletion: 1,
   },
   4: {
      obstacles: {
         outerDiamondUpperLeft: {
            type: line(relWidth(0.5), relHeight(0), relWidth(0.25), relHeight(0.5), "black"),
         },
         outerDiamondUpperRight: {
            type: line(relWidth(0.5), relHeight(0), relWidth(0.75), relHeight(0.5), "black"),
         },
         outerDiamondLowerLeft: {
            type: line(relWidth(0.25), relHeight(0.5), relWidth(0.5), relHeight(1), "black"),
         },
         outerDiamondLowerRight: {
            type: line(relWidth(0.75), relHeight(0.5), relWidth(0.5), relHeight(1), "black"),
         },

         middleDiamondLowerLeft: {
            type: line(relWidth(0.4), relHeight(0.5), relWidth(0.5), relHeight(0.7), "black"),
         },
         middleDiamondLowerRight: {
            type: line(relWidth(0.6), relHeight(0.5), relWidth(0.5), relHeight(0.7), "black"),
         },
         middleDiamondUpperLeft: {
            type: line(relWidth(0.45), relHeight(0.4), relWidth(0.4), relHeight(0.5), "black"),
         },
         middleDiamondUpperRight: {
            type: line(relWidth(0.55), relHeight(0.4), relWidth(0.6), relHeight(0.5), "black"),
         },

         innerDiamondUpperLeft: {
            type: line(relWidth(0.5), relHeight(0.45), relWidth(0.475), relHeight(0.5), "black"),
         },
         innerDiamondUpperRight: {
            type: line(relWidth(0.5), relHeight(0.45), relWidth(0.525), relHeight(0.5), "black"),
         }
         
      
      },
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.88),
      },
      goalLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      amountOfThrows: 2,
      numberRevealedOnCompletion: 5,
   },
   5: {
      obstacles: {
         leftLine: {
            type: line(relWidth(0.4), relHeight(0.2), relWidth(0.4), relHeight(0.8), "var(--tea_green)"),
         },
         rightLine: {
            type: line(relWidth(0.6), relHeight(0.1), relWidth(0.6), relHeight(0.9), "var(--tea_green)"),
         }
      },
      decorations: {
         leftLineTop: {
            type: line(relWidth(0.4), relHeight(0.2), relWidth(0.4), relHeight(0), "black"),
         },
         leftLineBottom: {
            type: line(relWidth(0.4), relHeight(0.8), relWidth(0.4), relHeight(1), "black"),
         },
         rightLineTop: {
            type: line(relWidth(0.6), relHeight(0.1), relWidth(0.6), relHeight(0), "black"),
         },
         rightLineBottom: {
            type: line(relWidth(0.6), relHeight(0.9), relWidth(0.6), relHeight(1), "black"),
         }
      },
      ballStartLocation: {
         x: relWidth(0.2),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.8),
         y: relHeight(0.5),
      },
      amountOfThrows: 2,
      numberRevealedOnCompletion: 7,
   },
   6: {
      obstacles: {
         // very interesting bug: 
         // The usage of my custom colour variables (defined in css) only works, when the obstacles using it are the first ones in the list of obstacles.
         // This demoLine above them would break it:
         // demoLine: {
         //    type: line(relWidth(0.4), relHeight(0.2), relWidth(0.6), relHeight(0.2), "black"),
         // },
         // the custom coloured obstacles would take the colour of the obstacle above them. No clue why.
         centerLineMiddle: {
            type: line(relWidth(0.3), relHeight(0.4), relWidth(0.4), relHeight(0.5), "var(--tea_green)"),
         },
         centerLineRightPart: {
            type: line(relWidth(0.4), relHeight(0.5), relWidth(0.9), relHeight(0.5), "var(--tea_green)"),
         },
         centerLineLeftPart: {
            type: line(relWidth(0.1), relHeight(0.4), relWidth(0.3), relHeight(0.4), "black"),
         },
         leftLine: {
            type: line(relWidth(0.1), relHeight(0.15), relWidth(0.1), relHeight(0.85), "black"),
         },
         rightLine: {
            type: line(relWidth(0.9), relHeight(0.15), relWidth(0.9), relHeight(0.85), "black"),
         },
         bottomLineLeft: {
            type: line(relWidth(0.1), relHeight(0.85), relWidth(0.4), relHeight(0.85), "black"),
         },
         bottomLineRight: {
            type: line(relWidth(0.6), relHeight(0.85), relWidth(0.9), relHeight(0.85), "black"),
         },
      },
         decorations: {
            fakeCenterLine: {
            type: line(relWidth(0.3), relHeight(0.4), relWidth(0.9), relHeight(0.4), "black"),
         }
      },
      ballStartLocation: {
         x: relWidth(0.75),
         y: relHeight(0.25),
      },
      goalLocation: {
         x: relWidth(0.25),
         y: relHeight(0.675),
      },
      amountOfThrows: 2,
      numberRevealedOnCompletion: 4,
   },
};
