import { vector, point, circle, square, line, relHeight, relWidth, relSize } from "./utils/golfUtils.js";

export const levels = {
   1: {
      obstacles: {
         wall1: {
            type: line(relWidth(0.5), relHeight(0.1), relWidth(0.9), relHeight(0.5), "red"),
         },
         wall2: {
            type: line(relWidth(0.9), relHeight(0.5), relWidth(0.5), relHeight(0.9), "red"),
         },
         wall3: {
            type: line(relWidth(0.5), relHeight(0.9), relWidth(0.1), relHeight(0.5), "red"),
         },
         // pillar1: {
         //    type: circle(relWidth(0.3), relHeight(0.5), relSize(0.02), "red"),
         // },
      },
      decorations: {},
      ballStartLocation: {
         x: relWidth(0.5),
         y: relHeight(0.5),
      },
      goalLocation: {
         x: relWidth(0.9),
         y: relHeight(0.9),
      },
   },
   2: {},
   3: {},
   4: {},
   5: {},
   6: {},
};
