import { Dimension, Position } from "@/types";
import { useState, useEffect } from "react";

const ADJUSTMENT_TOP_PX = 4;

export type LetterProperties = [Position | null, Dimension | null];

const useLetterProperties = (
  childId: string,
  parentId: string,
  horizontalPosition: "left" | "right"
): LetterProperties => {
  const [position, setPosition] = useState<Position | null>(null);
  const [letterDimensions, setLetterDimensions] = useState<Dimension | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!childId) return null;
      const parent = document.getElementById(parentId);
      const child = document.getElementById(childId);

      if (parent && child) {
        const parentRect = parent.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();

        setPosition({
          x:
            (horizontalPosition === "left" ? childRect.left : childRect.right) -
            parentRect.left,
          y: childRect.top - parentRect.top + ADJUSTMENT_TOP_PX,
        });

        setLetterDimensions({
          width: childRect.width,
          height: childRect.height,
        });
      } else {
        console.warn("Parent or Child element not found by ID");
      }
    };

    updatePosition();

    // Optional: update on window resize
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [childId, parentId, horizontalPosition]);

  return [position, letterDimensions];
};
export default useLetterProperties;
