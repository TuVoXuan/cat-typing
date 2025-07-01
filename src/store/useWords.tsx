import { create } from "zustand";

export interface ILetter {
  letter: string;
  isCorrect: boolean | null;
  isTyped: boolean | null;
}

export interface IWord {
  index: number;
  word: string;
  isTypedCorrectly: boolean;
  letters: ILetter[];
}

export interface ICurrentWord {
  word: string;
  index: number;
}

interface WordsState {
  words: IWord[];
  setWords: (words: IWord[]) => void;
  updateWord: (index: number, letters: ILetter[]) => void;
  currentWord: ICurrentWord | undefined;
  setCurrentWord: (currWord: ICurrentWord) => void;
  startedTyping: boolean;
  setStartedTyping: (started: boolean) => void;
  hiddenRowsNum: number;
  addHiddenRowsNum: () => void;
  resetHiddenRowsNum: () => void;
}

const useWordsStore = create<WordsState>()((set, get) => ({
  words: [],
  currentWord: undefined,
  setWords: (words) => set({ words }),
  updateWord: (index, letters) => {
    const words = get().words;
    if (index < 0 && index >= words.length) return;
    const udpatedWord = words[index];
    udpatedWord.letters = letters;
    set({ words });
  },
  setCurrentWord: (currWord) => set({ currentWord: currWord }),
  startedTyping: false,
  setStartedTyping: (started) => set({ startedTyping: started }),
  hiddenRowsNum: 0,
  addHiddenRowsNum: () => {
    const currHiddenRowsNum = get().hiddenRowsNum;
    set({ hiddenRowsNum: currHiddenRowsNum + 1 });
  },
  resetHiddenRowsNum: () => set({ hiddenRowsNum: 0 }),
}));

export default useWordsStore;
