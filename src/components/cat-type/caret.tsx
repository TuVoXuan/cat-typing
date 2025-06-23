import { cn } from "@/lib/utils";
import useWordsStore from "@/store/useWords";

export default function Caret() {
  const { caretPosition } = useWordsStore();
  return (
    <div
      className={cn(
        "absolute top-1 left-2 h-[40px] w-[3px] rounded-full transition-all duration-200 ease-linear bg-caret"
        // !startedTyping && "animate-flicker"
      )}
      style={{ top: caretPosition?.y, left: caretPosition?.x }}
    ></div>
  );
}
