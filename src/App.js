import React, { useState } from "react";
import AccordionComponent from "./components/AccordionComponent";
import ScoreComponent from "./components/ScoreComponent";
import LeaderboardComponent from "./components/LeaderboardComponent";
import HomepageComponent from "./components/HomepageComponent";
import Footer from "./components/Footer";

function App() {
  const [view, setView] = useState("homepage");
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
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [scoreThresholds, setScoreThresholds] = useState({});

  const handleSelectTopic = async (topicJson) => {
    try {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/topics/${topicJson}`
      );
      const data = await response.json();

      setSelectedTopic(topicJson);
      setScoreThresholds(data.scoreThresholds); // Store score thresholds for leaderboard
      setView("accordion");
    } catch (error) {
      console.error("Error fetching topic data:", error);
    }
  };

  const handleShowScore = (
    calculatedScore,
    unselectedTopics = [],
    scoreCategory
  ) => {
    setScoreData({ score: calculatedScore, unselectedTopics, scoreCategory });
    setView("score");
  };

  const handleBack = () => {
    setView("homepage");
  };

  const handleViewLeaderboard = () => {
    setView("leaderboard");
  };

  return (
    <div className="App">
      {view === "homepage" && (
        <HomepageComponent onSelectTopic={handleSelectTopic} />
      )}

      {view === "accordion" && selectedTopic && (
        <AccordionComponent
          onShowScore={handleShowScore}
          buttons={buttons}
          topicJson={selectedTopic}
          onBack={handleBack} // Pass the handleBack function
        />
      )}

      {view === "score" && (
        <ScoreComponent
          score={scoreData.score}
          unselectedTopics={scoreData.unselectedTopics}
          scoreCategory={scoreData.scoreCategory}
          onBack={handleBack}
          onViewLeaderboard={handleViewLeaderboard}
          buttons={buttons}
        />
      )}

      {view === "leaderboard" && (
        <LeaderboardComponent
          onGoBack={handleBack}
          scoreThresholds={scoreThresholds}
        />
      )}
    </div>
  );
}

export default App;
