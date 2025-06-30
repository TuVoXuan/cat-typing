import { ADJUSTMENT_TOP_PX } from "@/constants";
import { Dimension, Position } from "@/types";

export type LetterProperties = {
  position: Position;
  dimension: Dimension;
} | null;

const getLetterProperties = (
  childId: string,
  parentId: string,
  horizontalPosition: "left" | "right"
): LetterProperties => {
  if (!childId) return null;

  const parent = document.getElementById(parentId);
  const child = document.getElementById(childId);

  if (parent && child) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const position: Position = {
      x:
        (horizontalPosition === "left" ? childRect.left : childRect.right) -
        parentRect.left,
      y: childRect.top - parentRect.top + ADJUSTMENT_TOP_PX,
    };

    const letterDimensions: Dimension = {
      width: childRect.width,
      height: childRect.height,
    };

    return { position, dimension: letterDimensions };
  } else {
    console.warn("Parent or Child element not found by ID");
    return null;
  }
};

export default getLetterProperties;
