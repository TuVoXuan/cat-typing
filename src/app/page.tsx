"use client";
import ListWords from "@/components/cat-type/list-word";
import { cn } from "@/lib/utils";
import useWordsStore from "@/store/useWords";
import { generate } from "random-words";
import { useEffect, useState } from "react";

const wordCountList = [10, 25, 50];

export default function Home() {
  const [wordCount, setWordCount] = useState<number>(wordCountList[1]);
  const [wordsList, setWordsList] = useState<string>(
    generate({ exactly: wordCount, join: " " })
  );
  const { setTypingCursorPosition } = useWordsStore();

  useEffect(() => {
    setWordsList(generate({ exactly: wordCount, join: " " }));
    setTypingCursorPosition(null); // Reset cursor position when word count changes
  }, [wordCount]);

  const handleWordCountChange = (count: number) => {
    setWordCount(count);
  };

  return (
    <div className="h-screen w-fit items-center justify-center flex flex-col">
      <div className="flex gap-x-4 rounded-md bg-secondary text-foreground p-4 w-fit mb-10">
        <label>Word count:</label>
        {wordCountList.map((count) => (
          <button
            key={count}
            className={cn(
              "text-base",
              count === wordCount && "text-yellow-400"
            )}
            onClick={() => handleWordCountChange(count)}
          >
            {count}
          </button>
        ))}
      </div>
      <ListWords wordStr={wordsList} />
    </div>
  );
}
