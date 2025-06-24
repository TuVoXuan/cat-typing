import { useEffect, useMemo } from "react";
import Caret from "./caret";
import Word from "./word";
import useWordsStore from "@/store/useWords";
import useCaretStore from "@/store/useCaret";

interface ListWordsProps {
  wordStr: string;
}

export default function ListWords({ wordStr }: ListWordsProps) {
  const { setWords, words, setCurrentWord } = useWordsStore();
  const {style: caretStyle} = useCaretStore();

  const isWordsCompleted = useMemo(() => {
    if (words.length === 0) return false;
    return words.every((word) => word.isTypedCorrectly === true);
  }, [words]);

  useEffect(() => {
    if (wordStr.length > 0) {
      setWords(
        wordStr.split(" ").map((word) => ({ word, isTypedCorrectly: false }))
      );
      setCurrentWord({ word: wordStr.split(" ")[0], index: 0 });
    }
  }, [wordStr, setWords, setCurrentWord]);

  useEffect(() => {
    if (isWordsCompleted) {
      console.log("completed type string");
    }
  }, [isWordsCompleted]);

  return (
    <div id="word-list" className="flex flex-wrap max-w-[1200px] relative">
      <Caret style={caretStyle}/>
      {words.map((word, index) => (
        <Word key={`${word.word}-${index}`} word={word} index={index} />
      ))}
    </div>
  );
}
