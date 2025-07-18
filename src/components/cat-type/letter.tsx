import { cn } from "@/lib/utils";
import type { ILetter } from "./type";

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
  return (
    <span
      id={`${word}-${wordIndex}-${letter.letter}-${letterIndex}`}
      className={cn(
        "z-[1] inline-block px-[1px] text-sub text-[32px] pointer-events-none transition-colors duration-75 ease-linear",
        letter.isTyped === true && letter.isCorrect === true && "text-text",
        letter.isTyped === false && letter.isCorrect === false && "text-sub",
        letter.isTyped === true && letter.isCorrect === false && "text-error",
        letter.isTyped === null &&
          letter.isCorrect === null &&
          "text-error-extra"
      )}
    >
      {letter.letter}
    </span>
  );
}
