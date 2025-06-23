import { cn } from "@/lib/utils";
import useCaretStore from "@/store/useCaret";
import { CaretStyle } from "@/types";

interface ICaretProps {
  style: CaretStyle
}

export default function Caret({ style }: ICaretProps) {
  const {position, dimension} = useCaretStore();

  return (
    <div
      className={cn(
        "absolute top-1 left-2 h-[40px] w-[3px] rounded-full transition-all duration-200 ease-linear bg-caret"
        // !startedTyping && "animate-flicker"
      )}
      style={{ top: position?.y, left: position?.x, width: dimension?.width, height: dimension?.height }}
    ></div>
  );
}
