import { useEffect, useState } from "react";
import wordBank_en from "../wordle-en.txt";
import wordBank_pt from "../wordle-pt.txt";
import { useLanguageContext } from "../Contexts/LanguageContext";

export default function useWordList() {
  const { language: LANGUAGE } = useLanguageContext();

  const [wordSet, setWordSet] = useState<Set<string>>();
  const [word, setWord] = useState<string>("hello");

  const generateWordsSet = async () => {
    let randomWord = "";
    let wordSet;
    let wordBank;

    if (LANGUAGE === "en") {
      wordBank = wordBank_en;
    } else {
      wordBank = wordBank_pt;
    }

    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        let words;
        if (LANGUAGE === "pt") words = result.split("\r" + "\n");
        else words = result.split("\n");

        randomWord =
          words[Math.floor(Math.random() * words.length)].toUpperCase();
        wordSet = new Set(words);
      });
    return { wordSet, randomWord };
  };

  useEffect(() => {
    generateWordsSet().then((words) => {
      setWordSet(words.wordSet);
      setWord(words.randomWord);
    });
  }, [LANGUAGE]);

  return { wordSet, word };
}
