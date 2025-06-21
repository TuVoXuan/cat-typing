import { cn } from "@/lib/utils";
import useWordsStore from "@/store/useWords";

export default function TypingCursor() {
  const { typingCursorPosition } = useWordsStore();
  return (
    <div
      className={cn(
        "absolute top-1 left-2 h-[40px] w-[3px] rounded-full transition-all duration-200 ease-linear bg-flicker"
        // !startedTyping && "animate-flicker"
      )}
      style={{ top: typingCursorPosition?.y, left: typingCursorPosition?.x }}
    ></div>
  );
}
