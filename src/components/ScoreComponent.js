import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import QuizModal from "./QuizModal"; // Import the QuizModal component

const ScoreComponent = ({
  score,
  unselectedTopics,
  scoreCategory,
  onBack,
  buttons,
  onViewLeaderboard,
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSubtopic, setCurrentSubtopic] = useState(null);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(score / 100);
    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(start);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  const getColor = () => {
    switch (scoreCategory) {
      case "green":
        return "green";
      case "yellow":
        return "yellow";
      case "red":
      default:
        return "red";
    }
  };

  const handleSubtopicClick = (subtopic) => {
    setCurrentSubtopic(subtopic);
    setShowModal(true);
  };

  const submitScore = async () => {
    if (!username || username.length < 4) {
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "leaderboard"), {
        username: username,
        score: score,
      });
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting score", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-4 text-center wrapper"
      style={{
        backgroundColor: "#f93459",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ color: getColor() }}>Score: {displayScore}</h1>

      <div>
        <h3 style={{ color: "#ffffff" }}>Test Yourself</h3>
        {unselectedTopics.length === 0 ? (
          <p style={{ color: "#ffffff" }}>You've mastered all topics!</p>
        ) : (
          <ul style={{ color: "#ffffff" }} className="uls">
            {unselectedTopics.map((item, index) => (
              <li key={index} onClick={() => handleSubtopicClick(item)}>
                <span style={{ color: "yellow", fontWeight: "bold" }}>
                  {item.topic}
                </span>{" "}
                - {item.subtopic}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {!submitted ? (
          !loading ? (
            <div>
              <h3 style={{ color: "#ffffff" }}>Share Score</h3>

              <Form style={{ display: "flex", alignItems: "end" }}>
                <Form.Group controlId="username">
                  <Form.Control
                    type="text"
                    required
                    placeholder="LinkedIn User"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={submitScore}
                  style={{
                    marginLeft: "10px",
                    borderColor: "#ea1953",
                  }}
                >
                  Submit Score
                </Button>
              </Form>
            </div>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#ffffff", marginTop: "20px" }}
            >
              <span className="sr-only"></span>
            </Spinner>
          )
        ) : (
          <h3 style={{ color: "green", marginTop: "20px" }}>Submitted!</h3>
        )}
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Button
          onClick={onViewLeaderboard} // Calls the function to view leaderboard
          style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}
        >
          View Leaderboard
        </Button>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Button
          href={`https://www.linkedin.com/shareArticle?mini=true&url=https://tech-yourself-3a21a27e08fa.herokuapp.com&text=${encodeURIComponent(
            `היי, אחלה יוזמה לכל מפתחי האתרים שביננו!`
          )}`}
          target="_blank"
          style={{
            backgroundColor: "#ea1953",
            borderColor: "#ea1953",
            marginRight: "10px",
          }}
        >
          Share on LinkedIn
        </Button>

        <Button
          onClick={onBack}
          style={{
            backgroundColor: "#89045d",
            borderColor: "#89045d",
            marginRight: "10px",
          }}
        >
          {buttons.backToQuiz || "Back to Quiz"}
        </Button>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        show={showModal}
        onHide={() => setShowModal(false)}
        subtopic={currentSubtopic}
      />
    </div>
  );
};

export default ScoreComponent;
