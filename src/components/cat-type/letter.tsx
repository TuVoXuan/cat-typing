import { cn } from "@/lib/utils";
import type { ILetter } from "./type";
import { useRef } from "react";

interface LetterProps {
  letter: ILetter;
  word: string;
  letterIndex: number;
  wordIndex: number;
}

export default function Letter({
  letter,
  word,
  letterIndex,
  wordIndex,
}: LetterProps) {
  const letterRef = useRef<HTMLSpanElement>(null);

  return (
    <span
      id={`${word}-${wordIndex}-${letter.letter}-${letterIndex}`}
      ref={letterRef}
      className={cn(
        "inline-block px-[1px] text-muted text-[32px] pointer-events-none transition-colors duration-75 ease-linear",
        letter.isTyped === true &&
          letter.isCorrect === true &&
          "text-yellow-400",
        letter.isTyped === false && letter.isCorrect === false && "text-muted",
        letter.isTyped === true && letter.isCorrect === false && "text-red-500",
        letter.isTyped === null && letter.isCorrect === null && "text-pink-400"
      )}
    >
      {letter.letter}
    </span>
  );
}
