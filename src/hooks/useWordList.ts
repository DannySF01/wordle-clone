import { useEffect, useState } from "react";
import wordBank_en from "../wordle-en.txt";
import wordBank_pt from "../wordle-pt.txt";
import { useLanguageContext } from "../Contexts/LanguageContext";

export default function useWordList() {
  const { language } = useLanguageContext();

  const [wordSet, setWordSet] = useState<Set<string>>();
  const [word, setWord] = useState<string>("hello");

  const generateWordsSet = async () => {
    let randomWord = "";
    let wordSet;
    let wordBank;

    switch (language) {
      case "en":
        wordBank = wordBank_en;
        break;
      case "pt":
        wordBank = wordBank_pt;
        break;
      default:
        wordBank = wordBank_en;
        break;
    }

    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        const words = result.split(/\r?\n/);

        randomWord =
          words[Math.floor(Math.random() * words.length)].toUpperCase();
        wordSet = new Set(words);

        console.log(language);
        console.log("randomWord " + randomWord);
      });
    return { wordSet, randomWord };
  };

  useEffect(() => {
    generateWordsSet().then((words) => {
      setWordSet(words.wordSet);
      setWord(words.randomWord);
    });
  }, [language]);

  return { wordSet, word, generateWordsSet };
}
