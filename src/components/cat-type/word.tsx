import { useEffect, useMemo, useRef, useState } from "react";
import Letter from "./letter";
import {
  EAppEvent,
  publishAppEvent,
  subscribeAppEvent,
} from "@/utils/app-event";
import useWordsStore, { IWord } from "@/store/useWords";
import { cn } from "@/lib/utils";
import useLetterProperties from "@/hooks/useLetterProperties";
import { ADJUSTMENT_TOP_PX, alphabet, LINE_HEIGHT_PX } from "@/constants";
import useCaretStore from "@/store/useCaret";
import { ILetter } from "./type";

interface WordProps {
  word: IWord;
  index: number;
  className?: string;
}

const SPACE_KEY_CODE = "Space";

export default function Word({ word, index, className }: WordProps) {
  const {
    currentWord,
    words,
    setCurrentWord,
    setWords,
    startedTyping,
    setStartedTyping,
    hiddenRowsNum,
    addHiddenRowsNum,
  } = useWordsStore();

  const {
    position: caretPosition,
    dimension: caretDimension,
    setPosition: setCaretPosition,
    setDimension: setCaretDimension,
    style: caretStyle,
  } = useCaretStore();
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [typedLetterId, setTypedLetterId] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<"left" | "right">(
    "left"
  );
  const keyTypedCountRef = useRef<number>(0);
  const [letterPosition, letterDimension] = useLetterProperties(
    typedLetterId,
    "word-list",
    cursorPosition
  );

  useEffect(() => {
    setLetters(
      word.word.split("").map((letter) => ({
        letter: letter,
        isCorrect: null,
        isTyped: false,
      }))
    );
  }, [word]);

  useEffect(() => {
    if (index === 0 && !caretPosition) {
      setTypedLetterId(`${word.word}-${index}-${word.word[0]}-0`);
    }
  }, [caretPosition]);

  useEffect(() => {
    if (letterPosition) {
      let rowsWord = 0;
      const wordListElement = document.getElementById("word-list");
      if (wordListElement) {
        const wordListHeight = wordListElement.scrollHeight;
        const lineHeight = LINE_HEIGHT_PX;
        const maxRows = Math.floor(wordListHeight / lineHeight);
        rowsWord = maxRows;
      }

      if (
        letterPosition.x === 9 &&
        letterPosition.y >= LINE_HEIGHT_PX * 2 + ADJUSTMENT_TOP_PX &&
        rowsWord > 3 &&
        hiddenRowsNum < rowsWord - 3
      ) {
        addHiddenRowsNum();
      }
      setCaretPosition(letterPosition);
    }
  }, [letterPosition]);

  useEffect(() => {
    if (index === 0 && !caretDimension) {
      setCaretDimension(letterDimension);
    }
  }, [letterDimension, caretStyle]);

  const isWordTypedCorrectly = useMemo(() => {
    return letters.every(
      (letter) => letter.isCorrect === true && letter.isTyped === true
    );
  }, [letters]);

  const handleUpdateTypedLetterIdAndCursorPosition = ({
    word,
    wordIndex,
    letter,
    letterIndex,
    cursorPosition,
  }: {
    word: string;
    wordIndex: number;
    letter: string;
    letterIndex: number;
    cursorPosition: "left" | "right";
  }) => {
    setTypedLetterId(`${word}-${wordIndex}-${letter}-${letterIndex}`);
    setCursorPosition(cursorPosition);
  };

  const handleUpdateDeletedLetter = ({
    isJustChangeCurrentWord,
  }: {
    isJustChangeCurrentWord: boolean;
  }) => {
    const newLetters = [...letters];
    const lastTypedLetter = newLetters[keyTypedCountRef.current - 1];

    if (
      lastTypedLetter.isTyped === null &&
      lastTypedLetter.isCorrect === null
    ) {
      if (isJustChangeCurrentWord) {
        handleUpdateTypedLetterIdAndCursorPosition({
          word: word.word,
          wordIndex: index,
          letter: letters[keyTypedCountRef.current - 1].letter,
          letterIndex: keyTypedCountRef.current - 1,
          cursorPosition: "right",
        });
      } else {
        newLetters.pop();
        setLetters(newLetters);
        keyTypedCountRef.current--;
        handleUpdateTypedLetterIdAndCursorPosition({
          word: word.word,
          wordIndex: index,
          letter: letters[keyTypedCountRef.current - 1].letter,
          letterIndex: keyTypedCountRef.current - 1,
          cursorPosition: "right",
        });
      }
    } else {
      if (isJustChangeCurrentWord) {
        handleUpdateTypedLetterIdAndCursorPosition({
          word: word.word,
          wordIndex: index,
          letter: letters[keyTypedCountRef.current - 1].letter,
          letterIndex: keyTypedCountRef.current - 1,
          cursorPosition: "right",
        });
      } else {
        lastTypedLetter.isTyped = false;
        lastTypedLetter.isCorrect = null;
        setLetters(newLetters);
        keyTypedCountRef.current--;

        handleUpdateTypedLetterIdAndCursorPosition({
          word: word.word,
          wordIndex: index,
          letter: letters[keyTypedCountRef.current].letter,
          letterIndex: keyTypedCountRef.current,
          cursorPosition: "left",
        });
      }
    }
  };

  const handleDeleteLetter = () => {
    if (keyTypedCountRef.current === 0) {
      const indexCurrentWord = words.findIndex(
        (word) => word.word === currentWord?.word
      );
      if (
        indexCurrentWord > 0 &&
        !words[indexCurrentWord - 1].isTypedCorrectly
      ) {
        setCurrentWord({
          word: words[indexCurrentWord - 1].word,
          index: indexCurrentWord - 1,
        });
        // dispatch event when change current word to previous word to update the typing cursor position
        publishAppEvent({
          event: EAppEvent.CHANGE_CURRENT_WORD,
          details: { nextWord: words[indexCurrentWord - 1].word },
        });
      }
      return;
    }
    handleUpdateDeletedLetter({
      isJustChangeCurrentWord: false,
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!startedTyping) {
      setStartedTyping(true);
    }
    if (currentWord?.word !== word.word || currentWord?.index !== index) return;

    if (alphabet.includes(event.key)) {
      const { current: typedCount } = keyTypedCountRef;
      const wordLength = word.word.length;
      const maxLetters = 20;

      if (typedCount < wordLength) {
        // Typing existing word letters
        keyTypedCountRef.current++;
        const updatedLetters = [...letters];
        const idx = typedCount;
        updatedLetters[idx].isTyped = true;
        updatedLetters[idx].isCorrect =
          event.key === updatedLetters[idx].letter;

        // update the typed correctly for the last word in the list
        if (keyTypedCountRef.current === wordLength) {
          const currentWordIndex = words.findIndex(
            (word) => word.word === currentWord?.word
          );
          if (currentWordIndex === words.length - 1) {
            const newWords = [...words];
            const isCorrectlyWord = updatedLetters.every(
              (letter) => letter.isCorrect && letter.isTyped
            );
            newWords[currentWordIndex].isTypedCorrectly = isCorrectlyWord;
            setWords(newWords);
          }
        }
        setLetters(updatedLetters);
        handleUpdateTypedLetterIdAndCursorPosition({
          word: word.word,
          wordIndex: index,
          letter: updatedLetters[idx].letter,
          letterIndex: idx,
          cursorPosition: "right",
        });
      } else if (typedCount < maxLetters) {
        // Adding extra letters beyond the word length, up to maxLetters
        keyTypedCountRef.current++;
        setLetters([
          ...letters,
          {
            letter: event.key,
            isCorrect: null,
            isTyped: null,
          },
        ]);

        handleUpdateTypedLetterIdAndCursorPosition({
          word: word.word,
          wordIndex: index,
          letter: event.key,
          letterIndex: typedCount,
          cursorPosition: "right",
        });
      }
    } else if (event.code === SPACE_KEY_CODE) {
      // it will check if the current word is the last word in the list
      // then turn to the next word if has
      if (letters[0].isTyped === false) {
        return;
      }
      const newWords = [...words];
      newWords[index].isTypedCorrectly = isWordTypedCorrectly;
      setWords(newWords);
      if (index + 1 >= newWords.length) return;

      setCurrentWord({
        word: newWords[index + 1].word,
        index: index + 1,
      });

      handleUpdateTypedLetterIdAndCursorPosition({
        word: newWords[index + 1].word,
        wordIndex: index + 1,
        letter: newWords[index + 1].word[0],
        letterIndex: 0,
        cursorPosition: "left",
      });
    } else if (event.key === "Backspace") {
      // it will delete the last typed letter if the typed count is equal to 0 then back to previous word
      // if previous word is not typed correctly then it will delete the last typed letter
      handleDeleteLetter();
    }
  };

  useEffect(() => {
    if (!words.every((word) => word.isTypedCorrectly)) {
      //Need to update the condition of the when stop listening event keydown
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentWord, letters, words]);

  useEffect(() => {
    const listenerChangeCurrentWord = subscribeAppEvent({
      event: EAppEvent.CHANGE_CURRENT_WORD,
      listener: (event) => {
        if (event.detail.nextWord === word.word) {
          handleUpdateDeletedLetter({
            isJustChangeCurrentWord: true,
          });
        }
      },
    });
    return () => {
      listenerChangeCurrentWord.unsubscribe();
    };
  }, [letters, word.word, keyTypedCountRef.current]);

  return (
    <div className={cn("flex px-[9px]", className)}>
      {letters.map((letter, letterIndex) => (
        <Letter
          key={letterIndex}
          letter={letter}
          word={word.word}
          letterIndex={letterIndex}
          wordIndex={index}
        />
      ))}
    </div>
  );
}
