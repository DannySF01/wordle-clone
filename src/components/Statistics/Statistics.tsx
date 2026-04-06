import "./Statistics.css";

interface StatisticsProps {
  stats: {
    played: number;
    wins: number;
    losses: number;
    streak: number;
    maxStreak: number;
  };
  setShowStats: (value: boolean) => void;
}

export default function Statistics({ stats, setShowStats }: StatisticsProps) {
  return (
    <div className="stats-popup">
      <div className="overlay">
        <div className="stats-header">
          <button className="close-btn" onClick={() => setShowStats(false)}>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              data-testid="icon-close"
            >
              <path
                fill="white"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </svg>
          </button>
        </div>

        <div className="stats-container">
          <h3>STATISTICS</h3>
          <ul className="stats">
            <li>
              <div className="stat">{stats.played}</div>
              <label>Played</label>
            </li>
            <li>
              <div className="stat">
                {stats.wins + stats.losses === 0
                  ? "-"
                  : ((stats.wins / stats.played) * 100).toFixed(0)}
              </div>
              <label>Win %</label>
            </li>
            <li>
              <div className="stat">{stats.streak}</div>
              <label>Current Streak</label>
            </li>
            <li>
              <div className="stat">{stats.maxStreak} </div>
              <label>Max Streak</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
