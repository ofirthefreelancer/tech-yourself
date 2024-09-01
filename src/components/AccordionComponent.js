import React, { useState, useEffect, useRef } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import topicsData from "../data.json";

const AccordionComponent = ({ onShowScore, buttons }) => {
  const [topics, setTopics] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [refreshThreshold, setRefreshThreshold] = useState(5);
  const [scoreThresholds, setScoreThresholds] = useState({});
  const [selectedSubtopics, setSelectedSubtopics] = useState({});
  const accordionRefs = useRef([]); // Array to hold refs for each Accordion.Item

  useEffect(() => {
    setTopics(topicsData.topics);
    setProjectName(topicsData.projectName);
    setRefreshThreshold(topicsData.refreshThreshold);
    setScoreThresholds(topicsData.scoreThresholds);

    // Load saved selections from localStorage
    const savedSelections = JSON.parse(
      localStorage.getItem("selectedSubtopics")
    );
    if (savedSelections) {
      setSelectedSubtopics(savedSelections);
    }
  }, []);

  const handleReset = () => {
    setSelectedSubtopics({});
    localStorage.removeItem("selectedSubtopics");
  };

  const handleRangeChange = (topicIndex, subtopicIndex, value) => {
    const key = `${topicIndex}-${subtopicIndex}`;
    const updatedSelections = {
      ...selectedSubtopics,
      [key]: value,
    };

    setSelectedSubtopics(updatedSelections);

    // Save to localStorage
    localStorage.setItem(
      "selectedSubtopics",
      JSON.stringify(updatedSelections)
    );
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
          }}
        >
          {"Show My Score"}
        </Button>
        <Button
          onClick={handleReset}
          style={{ backgroundColor: "#ff704d", borderColor: "#ff704d" }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default AccordionComponent;
