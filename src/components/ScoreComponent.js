import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useSpring, animated } from "@react-spring/web";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have the correct path to your firebase.js

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

  const slideInProps = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateX(0%)" },
  });

  const shareText = `ציון הפרונט-אנד שלי: ${score}\nבדקו גם את שלכם:\n https://my-front-end-score-c4b0aa8d97ee.herokuapp.com/`;

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
      <animated.h1 style={{ ...slideInProps, color: getColor() }}>
        Score: {displayScore}
      </animated.h1>

      <div className="mt-4">
        <h2 style={{ color: "#ffffff" }}>Topics to Refresh:</h2>
        {unselectedTopics.length === 0 ? (
          <p style={{ color: "#ffffff" }}>You've mastered all topics!</p>
        ) : (
          <ul style={{ color: "#ffffff" }} className="uls">
            {unselectedTopics.map((item, index) => {
              // Assuming the item.topic contains the first part and item.subtopic the second
              const topic = item.topic;
              const subtopic = item.subtopic;

              return (
                <li key={index}>
                  <span style={{ color: "yellow", fontWeight: "bold" }}>
                    {topic}
                  </span>{" "}
                  - {subtopic}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-4">
        {!submitted ? (
          !loading ? (
            <Form>
              <Form.Group controlId="username">
                <h2 style={{ color: "#ffffff" }}>Share Score</h2>
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
                  borderColor: "#ea1953",
                  marginRight: "10px",
                  marginTop: "15px",
                }}
              >
                Submit Score
              </Button>
            </Form>
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
          href={`https://www.linkedin.com/shareArticle?mini=true&url=https://my-front-end-score-c4b0aa8d97ee.herokuapp.com&text=${encodeURIComponent(
            shareText
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

        <Button
          onClick={onViewLeaderboard} // Calls the function to view leaderboard
          style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}
        >
          View Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default ScoreComponent;
