import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "pt";

const LanguageContext = createContext({
  language: "en",
  setLanguage: (language: Language) => {
    localStorage.setItem("language", language);
  },
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const savedLanguage = localStorage.getItem("language") || "en";
  const [language, setLanguage] = useState(savedLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const languageValues = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={languageValues}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageContextProvider"
    );
  }
  return context;
};
