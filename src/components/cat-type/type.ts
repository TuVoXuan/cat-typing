export interface ILetter {
  letter: string;
  isCorrect: boolean | null;
  isTyped: boolean | null;
}

export interface IWordLetterRef {
  letterRef: React.RefObject<HTMLSpanElement | null>;
  word: string;
}
