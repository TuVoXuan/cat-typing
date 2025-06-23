import { IWordLetterRef } from "@/components/cat-type/type";
import { create } from "zustand";

export interface IWord {
  word: string;
  isTypedCorrectly: boolean;
}

export interface ICurrentWord {
  word: string;
  index: number;
}

interface WordsState {
  words: IWord[];
  setWords: (words: IWord[]) => void;
  currentWord: ICurrentWord | undefined;
  setCurrentWord: (currWord: ICurrentWord) => void;
  wordLetterRefs: IWordLetterRef[];
  setWordLetterRefs: (wordLetterRefs: IWordLetterRef[]) => void;
  startedTyping: boolean;
  setStartedTyping: (started: boolean) => void;
}

const useWordsStore = create<WordsState>()((set) => ({
  words: [],
  currentWord: undefined,
  setWords: (words) => set({ words }),
  setCurrentWord: (currWord) => set({ currentWord: currWord }),
  wordLetterRefs: [],
  setWordLetterRefs: (wordLetterRefs) => set({ wordLetterRefs }),
  startedTyping: false,
  setStartedTyping: (started) => set({ startedTyping: started }),
}));

export default useWordsStore;
