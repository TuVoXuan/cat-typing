/* eslint-disable @typescript-eslint/no-unused-vars */
import { alphabet, leftHandKeys, rightHandKeys } from "@/constants";
import useWordsStore from "@/store/useWords";
import Image from "next/image";
import React, { useEffect } from "react";
import catNotTyping from "../../assets/images/cat-not-typing.png";
import catTypingLeftHand from "../../assets/images/cat-typing-left-hand.png";
import catTypingRightHand from "../../assets/images/cat-typing-right-hand.png";
import { cn } from "@/lib/utils";

export default function CatTypeImage() {
  const { words } = useWordsStore();
  const [typingAction, setTypingAction] = React.useState<
    "right" | "left" | "none"
  >("none");
  const [historyHandTypeSpaceKey, setHistoryHandTypeSpaceKey] = React.useState<
    "left" | "right"
  >("left");

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    const isLeftHandKey = leftHandKeys.includes(key);
    const isRightHandKey = rightHandKeys.includes(key);

    if (isLeftHandKey) {
      setTypingAction("left");
    } else if (isRightHandKey) {
      setTypingAction("right");
    } else if (event.key === " ") {
      setHistoryHandTypeSpaceKey((prev) =>
        prev === "left" ? "right" : "left"
      );
      setTypingAction(historyHandTypeSpaceKey === "left" ? "right" : "left");
    } else {
      setTypingAction("none");
    }
  }

  function handleKeyUp(_event: KeyboardEvent) {
    setTypingAction("none");
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [words]);

  return (
    <div className="relative w-[200px] h-auto">
      <Image
        className={cn(
          "absolute top-0 left-0",
          typingAction === "right" ? "visible" : "invisible"
        )}
        src={catTypingRightHand.src}
        alt="Cat typing with right hand"
        height={catTypingRightHand.height}
        width={catTypingRightHand.width}
      />

      <Image
        className={cn(
          "absolute top-0 left-0",
          typingAction === "left" ? "visible" : "invisible"
        )}
        src={catTypingLeftHand.src}
        alt="Cat typing with left hand"
        height={catTypingLeftHand.height}
        width={catTypingLeftHand.width}
      />
      <Image
        className={cn(
          "absolute top-0 left-0",
          typingAction === "none" ? "visible" : "invisible"
        )}
        src={catNotTyping.src}
        alt="Cat not typing"
        height={catNotTyping.height}
        width={catNotTyping.width}
      />
    </div>
  );
}
