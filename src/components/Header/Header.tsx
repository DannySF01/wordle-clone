import uk from "../../assets/uk.png";
import pt from "../../assets/pt.png";
import { useLanguageContext } from "../../Contexts/LanguageContext";
import { useGameContext } from "../../Contexts/GameContext";
import "./Header.css";

export default function Header() {
  const { showStats, setShowStats } = useGameContext();
  const { language, setLanguage } = useLanguageContext();
  return (
    <div className="Header">
      <div className="stats-icon" onClick={() => setShowStats(!showStats)}>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="4 4 24 24"
          width="24"
          data-testid="icon-statistics"
        >
          <path
            fill="white"
            d="M20.6666 14.8333V5.5H11.3333V12.5H4.33325V26.5H27.6666V14.8333H20.6666ZM13.6666 7.83333H18.3333V24.1667H13.6666V7.83333ZM6.66659 14.8333H11.3333V24.1667H6.66659V14.8333ZM25.3333 24.1667H20.6666V17.1667H25.3333V24.1667Z"
          ></path>
        </svg>
      </div>
      <div className="header-title">Wordle</div>
      <div className="languages">
        {language === "en" && (
          <button className="language" onClick={() => setLanguage("pt")}>
            <img src={uk} alt="uk" />
          </button>
        )}
        {language === "pt" && (
          <button className="language" onClick={() => setLanguage("en")}>
            <img src={pt} alt="pt" />
          </button>
        )}
      </div>
    </div>
  );
}
