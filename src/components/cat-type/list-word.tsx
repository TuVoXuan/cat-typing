import { useEffect, useMemo } from "react";
import Caret from "./caret";
import Word from "./word";
import useWordsStore from "@/store/useWords";
import useCaretStore from "@/store/useCaret";
import { toast } from "sonner";
import { LINE_HEIGHT_PX } from "@/constants";

interface ListWordsProps {
  wordStr: string;
}

export default function ListWords({ wordStr }: ListWordsProps) {
  const {
    setWords,
    words,
    setCurrentWord,
    startedTyping,
    setStartedTyping,
    hiddenRowsNum,
  } = useWordsStore();
  const { style: caretStyle } = useCaretStore();

  const isWordsCompleted = useMemo(() => {
    if (words.length === 0) return false;
    return words.every((word) => word.isTypedCorrectly === true);
  }, [words]);

  useEffect(() => {
    if (wordStr.length > 0) {
      setWords(
        wordStr.split(" ").map((word, index) => ({
          index,
          word,
          isTypedCorrectly: false,
        }))
      );
      setCurrentWord({ word: wordStr.split(" ")[0], index: 0 });
    }
  }, [wordStr, setWords, setCurrentWord]);

  useEffect(() => {
    if (isWordsCompleted) {
      toast.success("Congratulations! You have completed the typing test.", {
        position: "top-center",
        duration: 5000,
        icon: "🎉",
        style: {
          background: "var(--sub-alt)",
          color: "var(--text)",
          fontWeight: "600",
          fontSize: "14px",
        },
      });
    }
  }, [isWordsCompleted]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (startedTyping) setStartedTyping(false);
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [startedTyping, setStartedTyping]);

  return (
    <div className="flex flex-wrap max-w-[1200px] relative mx-auto h-[144px] overflow-hidden">
      <div
        id="word-list"
        className="relative w-full h-full flex flex-wrap"
        style={{
          top: -(hiddenRowsNum * LINE_HEIGHT_PX),
        }}
      >
        <Caret style={caretStyle} />
        {words.map((word) => (
          <Word
            key={`${word.word}-${word.index}`}
            word={word}
            index={word.index}
          />
        ))}
      </div>
    </div>
  );
}
