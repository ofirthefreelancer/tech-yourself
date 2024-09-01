import React, { useState, useEffect, useRef } from "react";
import { Accordion, Form, Button, Spinner } from "react-bootstrap";

const AccordionComponent = ({ onShowScore, buttons, topicJson, onBack }) => {
  const [topics, setTopics] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [refreshThreshold, setRefreshThreshold] = useState(5);
  const [scoreThresholds, setScoreThresholds] = useState({});
  const [selectedSubtopics, setSelectedSubtopics] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const accordionRefs = useRef([]); // Array to hold refs for each Accordion.Item

  const storageKey = `selectedSubtopics-${topicJson}`; // Unique storage key for each topic

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting fetch

      try {
        const response = await fetch(`/topics/${topicJson}`);
        const data = await response.json();

        setTopics(data.topics);
        setProjectName(data.projectName);
        setRefreshThreshold(data.refreshThreshold);
        setScoreThresholds(data.scoreThresholds);

        const savedSelections = JSON.parse(localStorage.getItem(storageKey));
        if (savedSelections) {
          setSelectedSubtopics(savedSelections);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchData();
  }, [topicJson]); // Dependency array with topicJson ensures fetch runs only when topicJson changes

  const handleRangeChange = (topicIndex, subtopicIndex, value) => {
    const key = `${topicIndex}-${subtopicIndex}`;
    const updatedSelections = {
      ...selectedSubtopics,
      [key]: value,
    };

    setSelectedSubtopics(updatedSelections);

    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(updatedSelections));
  };

  const handleAccordionSelect = (eventKey) => {
    if (accordionRefs.current[eventKey]) {
      accordionRefs.current[eventKey].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    const unselectedTopics = [];

    topics.forEach((topic, topicIndex) => {
      topic.subtopics.forEach((subtopic, subtopicIndex) => {
        const key = `${topicIndex}-${subtopicIndex}`;
        const rangeValue = selectedSubtopics[key] || 0;
        const percentage = rangeValue / 5; // Adjusted for max range of 5
        totalScore += percentage * subtopic.points;

        if (rangeValue < refreshThreshold) {
          unselectedTopics.push({
            topic: topic.title,
            subtopic: subtopic.name,
            explanation: subtopic.explanation, // Include explanation if needed
            quiz: subtopic.quiz, // Include quiz if needed
          });
        }
      });
    });

    totalScore = Math.round(totalScore);

    let scoreCategory = "red";
    if (totalScore >= scoreThresholds.green) {
      scoreCategory = "green";
    } else if (totalScore >= scoreThresholds.yellow) {
      scoreCategory = "yellow";
    }

    return { totalScore, unselectedTopics, scoreCategory };
  };

  if (loading) {
    // Display a loading spinner while fetching data
    return (
      <div className="text-center mt-4">
        <Spinner style={{ color: "white" }} animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <p style={{ color: "white" }}>Loading data...</p>
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#f93459",
        borderRadius: "10px",
      }}
    >
      <h1
        className="text-center"
        style={{ color: "white", marginBottom: "30px" }}
      >
        {projectName}
      </h1>
      <Accordion onSelect={handleAccordionSelect}>
        {topics.map((topic, topicIndex) => (
          <Accordion.Item
            eventKey={topicIndex.toString()}
            key={topicIndex}
            ref={(el) => (accordionRefs.current[topicIndex] = el)}
          >
            <Accordion.Header
              style={{ backgroundColor: "#89045d", color: "#ffffff" }}
            >
              {topic.title}
            </Accordion.Header>
            <Accordion.Body
              style={{ backgroundColor: "#f93459", color: "#ffffff" }}
            >
              {topic.subtopics.map((subtopic, subtopicIndex) => (
                <div key={subtopicIndex} style={{ marginBottom: "15px" }}>
                  <label>{subtopic.name}</label>
                  <Form.Range
                    id={`range-${topicIndex}-${subtopicIndex}`}
                    min={0}
                    max={5} // Adjusted max range to 5
                    value={
                      selectedSubtopics[`${topicIndex}-${subtopicIndex}`] || 0
                    }
                    onChange={(e) =>
                      handleRangeChange(
                        topicIndex,
                        subtopicIndex,
                        e.target.value
                      )
                    }
                  />
                  <span>
                    {selectedSubtopics[`${topicIndex}-${subtopicIndex}`] || 0}
                  </span>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <div className="text-center mt-4">
        <Button
          onClick={() => {
            const { totalScore, unselectedTopics, scoreCategory } =
              calculateScore();
            onShowScore(totalScore, unselectedTopics, scoreCategory);
          }}
          style={{
            borderColor: "#ea1953",
            marginRight: "10px",
            marginTop: "15px",
          }}
        >
          {buttons.showScore || "Show My Score"}
        </Button>
      </div>
      <div className="text-center">
        <Button
          onClick={onBack} // Call the onBack function to navigate back to homepage
          style={{
            backgroundColor: "#0056b3",
            borderColor: "#0056b3",
            marginTop: "20px",
          }}
        >
          Back to Homepage
        </Button>
        <Button
          onClick={() => {
            setSelectedSubtopics({});
            localStorage.removeItem(storageKey);
          }}
          style={{
            backgroundColor: "#ff704d",
            borderColor: "#ff704d",
            marginTop: "20px",
            marginLeft: "10px",
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default AccordionComponent;
