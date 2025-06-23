"use client";
import ListWords from "@/components/cat-type/list-word";
import { cn } from "@/lib/utils";
import useCaretStore from "@/store/useCaret";
import { CaretStyle } from "@/types";
import { generate } from "random-words";
import { useEffect, useState } from "react";

const wordCountList = [10, 25, 50];
const caretStyles: CaretStyle[] = ['default', 'block', 'underline']

export default function Home() {
  const [wordCount, setWordCount] = useState<number>(wordCountList[1]);
  const [wordsList, setWordsList] = useState<string>(
    generate({ exactly: wordCount, join: " " })
  );
  const {setPosition: setCaretPosition, style: caretStyle, setStyle: setCaretStyle} = useCaretStore();

  useEffect(() => {
    setWordsList(generate({ exactly: wordCount, join: " " }));
    setCaretPosition(null); // Reset cursor position when word count changes
  }, [wordCount]);

  const handleWordCountChange = (count: number) => {
    setWordCount(count);
  };

  return (
    <div className="dark bg-primary h-screen w-full items-center justify-center flex flex-col">
      <div className="dark flex gap-x-4 rounded-md bg-sub-alt text-foreground p-4 w-fit mb-10">
        <label className="text-sub">Word count:</label>
        {wordCountList.map((count) => (
          <button
            key={count}
            className={cn(
              "text-base text-sub hover:text-text transition-colors duration-200 cursor-pointer font-medium",
              count === wordCount && "text-main"
            )}
            onClick={() => handleWordCountChange(count)}
          >
            {count}
          </button>
        ))}
      </div>
      <div className="dark flex gap-x-4 rounded-md bg-sub-alt text-foreground p-4 w-fit mb-10">
        <label className="text-sub">Caret style:</label>
        {caretStyles.map((style) => (
          <button
            key={style}
            className={cn(
              "text-base text-sub hover:text-text transition-colors duration-200 cursor-pointer font-medium",
              caretStyle === style && "text-main"
            )}
            onClick={() => setCaretStyle(style)}
          >
            {style}
          </button>
        ))}
      </div>
      <ListWords wordStr={wordsList} />
    </div>
  );
}
