"use client";
import CatTypeImage from "@/components/cat-type-image";
import ListWords from "@/components/cat-type/list-word";
import Header from "@/components/header";
import SelectCaretStyle from "@/components/settings/select-caret-style";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useCaretStore from "@/store/useCaret";
import { CodeXml, RotateCw } from "lucide-react";
import { generate } from "random-words";
import { useEffect, useState } from "react";

const wordCountList = [10, 25, 50];

export default function Home() {
  const [wordCount, setWordCount] = useState<number>(wordCountList[1]);
  const [wordsList, setWordsList] = useState<string>(
    generate({ exactly: wordCount, join: " " })
  );
  const { setPosition: setCaretPosition } = useCaretStore();

  useEffect(() => {
    setWordsList(generate({ exactly: wordCount, join: " " }));
    setCaretPosition(null); // Reset cursor position when word count changes
  }, [wordCount]);

  const handleWordCountChange = (count: number) => {
    setWordCount(count);
  };

  const handleRestartTest = () => {
    setWordsList(generate({ exactly: wordCount, join: " " }));
    setCaretPosition(null); // Reset cursor position when restarting the test
  };

  return (
    <div className="dark bg-primary h-screen w-full py-8">
      <Header />
      <div className="flex items-center gap-x-5 m-10 w-fit mx-auto">
        <div className="dark flex gap-x-4 rounded-md bg-sub-alt text-foreground p-4 w-fit">
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

        <SelectCaretStyle />
      </div>

      <ListWords wordStr={wordsList} />

      <div className="flex w-full justify-center mt-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={handleRestartTest} className="cursor-pointer">
              <RotateCw className="size-5 text-sub hover:text-text" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium text-base">Restart Test</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="mt-5 mx-auto flex w-fit">
        <CatTypeImage />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
        <a
          target="blank"
          href="https://github.com/TuVoXuan/cat-typing"
          className="flex items-center gap-2 text-sub hover:text-text"
        >
          <CodeXml className="size-5 stroke-2" />
          <span className="font-medium text-sm">github</span>
        </a>
      </div>
    </div>
  );
}
