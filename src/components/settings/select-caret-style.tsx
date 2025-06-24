import { cn } from "@/lib/utils";
import useCaretStore from "@/store/useCaret";
import { CaretStyle } from "@/types";
import React from "react";

const caretStyles: CaretStyle[] = ["default", "block", "outline", "underline"];

function CaretStyleDemo({
  isActive = false,
  style,
  onClick,
}: {
  isActive?: boolean;
  style: CaretStyle;
  onClick?: () => void;
}) {
  if (style === "default") {
    return (
      <button
        onClick={onClick ?? undefined}
        className={cn(
          "group bg-sub-alt hover:bg-text w-10 h-6 rounded-[4px] flex items-center justify-center transition-colors duration-200",
          isActive && "bg-main"
        )}
      >
        <div
          className={cn(
            "h-4 w-[2px] rounded-full bg-text group-hover:bg-sub-alt transition-colors duration-200",
            isActive && "bg-sub-alt"
          )}
        ></div>
      </button>
    );
  }
  if (style === "block") {
    return (
      <button
        onClick={onClick ?? undefined}
        className={cn(
          "group bg-sub-alt hover:bg-text w-10 h-6 rounded-[4px] flex items-center justify-center transition-colors duration-200",
          isActive && "bg-main"
        )}
      >
        <div
          className={cn(
            "h-4 w-2 rounded-[2px] bg-text group-hover:bg-sub-alt transition-colors duration-200",
            isActive && "bg-sub-alt"
          )}
        ></div>
      </button>
    );
  }
  if (style === "outline") {
    return (
      <button
        onClick={onClick ?? undefined}
        className={cn(
          "group bg-sub-alt hover:bg-text w-10 h-6 rounded-[4px] flex items-center justify-center transition-colors duration-200",
          isActive && "bg-main"
        )}
      >
        <div
          className={cn(
            "h-4 w-2 bg-transparent rounded-[2px] border-2 border-text group-hover:border-sub-alt transition-colors duration-200",
            isActive && "border-sub-alt"
          )}
        ></div>
      </button>
    );
  }
  return (
    <button
      onClick={onClick ?? undefined}
      className={cn(
        "group bg-sub-alt hover:bg-text w-10 h-6 rounded-[4px] flex items-end justify-center pb-1 transition-colors duration-200 cursor-pointer",
        isActive && "bg-main"
      )}
    >
      <div
        className={cn(
          "h-[2px] w-3 rounded-full bg-text group-hover:bg-sub-alt transition-colors duration-200",
          isActive && "bg-sub-alt"
        )}
      ></div>
    </button>
  );
}

export default function SelectCaretStyle() {
  const { style: caretStyle, setStyle: setCaretStyle } = useCaretStore();

  return (
    <div className="dark flex items-center gap-x-4 rounded-md bg-sub-alt text-foreground p-4 w-fit">
      <label className="text-sub">Caret style:</label>
      {caretStyles.map((style) => (
        <CaretStyleDemo
          key={style}
          style={style}
          isActive={caretStyle === style}
          onClick={() => setCaretStyle(style)}
        />
      ))}
    </div>
  );
}
