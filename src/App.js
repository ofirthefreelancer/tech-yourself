import React, { useState } from "react";
import AccordionComponent from "./components/AccordionComponent";
import ScoreComponent from "./components/ScoreComponent";
import LeaderboardComponent from "./components/LeaderboardComponent"; // Ensure correct import path
import Footer from "./components/Footer";

function App() {
  const [view, setView] = useState("accordion"); // 'accordion', 'score', or 'leaderboard'
  const [scoreData, setScoreData] = useState({
    score: 0,
    unselectedTopics: [],
    scoreCategory: "red",
  });
  const [buttons, setButtons] = useState({
    showScore: "Show My Front End Score",
    backToQuiz: "Back to Quiz",
    shareOnLinkedIn: "Share on LinkedIn",
  });

  const handleShowScore = (
    calculatedScore,
    unselectedTopics = [],
    scoreCategory
  ) => {
    setScoreData({ score: calculatedScore, unselectedTopics, scoreCategory });
    setView("score");
  };

  const handleBack = () => {
    setView("accordion");
  };

  const handleViewLeaderboard = () => {
    setView("leaderboard");
  };

  return (
    <div
      className="App"
      style={{
        position: "relative",
      }}
    >
      {view === "accordion" && (
        <AccordionComponent onShowScore={handleShowScore} buttons={buttons} />
      )}

      {view === "score" && (
        <ScoreComponent
          score={scoreData.score}
          unselectedTopics={scoreData.unselectedTopics}
          scoreCategory={scoreData.scoreCategory}
          onBack={handleBack}
          onViewLeaderboard={handleViewLeaderboard} // Navigate to the leaderboard
          buttons={buttons}
        />
      )}

      {view === "leaderboard" && (
        <LeaderboardComponent onGoBack={handleBack} /> // Back to accordion or score
      )}

      <Footer />
    </div>
  );
}

export default App;
