import { cn } from "@/lib/utils";
import useCaretStore from "@/store/useCaret";
import { CaretStyle } from "@/types";
import { useMemo } from "react";
import { motion } from "framer-motion";
import useWordsStore from "@/store/useWords";

interface ICaretProps {
  style: CaretStyle;
}

export default function Caret({ style }: ICaretProps) {
  const { position, dimension } = useCaretStore();
  const { startedTyping } = useWordsStore();

  const caretClassName = useMemo(() => {
    switch (style) {
      case "default":
        return "rounded-full";
      case "block":
        return "rounded-[4px]";
      case "outline":
        return "rounded-[4px] border-2 border-caret bg-transparent";
      case "underline":
        return "rounded-full";
      default:
        return "";
    }
  }, [style]);

  const caretStyles = useMemo(() => {
    switch (style) {
      case "default":
        return {
          top: position?.y ?? "unset",
          left: position?.x,
          width: 3,
          height: (dimension?.height ?? 0) * 0.9,
        };
      case "block":
      case "outline":
        return {
          top: position?.y ?? "unset",
          left: position?.x,
          width: dimension?.width,
          height: (dimension?.height ?? 0) * 0.9,
        };
      case "underline":
        return {
          top: (position?.y ?? 0) + (dimension?.height ?? 0) * 0.9 - 3,
          left: position?.x,
          width: dimension?.width,
          height: 3,
        };
    }
  }, [position, dimension, style]);

  return (
    <motion.div
      className={cn(
        "absolute rounded-full ease-linear bg-caret z-0",
        caretClassName,
        !startedTyping && "animate-caret"
      )}
      animate={caretStyles}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      layout // This enables smooth className/layout transitions
    />
  );
}
