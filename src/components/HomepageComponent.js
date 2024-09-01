import React from "react";
import { Button } from "react-bootstrap";
import Footer from "./Footer";
const HomepageComponent = ({ onSelectTopic }) => {
  const topics = [
    { name: "Front-End", json: "frontend.json" },
    { name: "Back-End", json: "backend.json" },
    // Add more topics as needed
  ];

  return (
    <React.Fragment>
      <h1 className="header-text">Tech-Yourself </h1>

      <div
        className="container text-center "
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          className="text-center"
          style={{
            color: "white",
            marginTop: "20px",
            marginBottom: "30px",
            textAlign: "left",
          }}
        >
          This project is an interactive web application designed to help
          developers assess and track their proficiency,
          <p>Made with ❤️ for the Israeli web dev community.</p>
          <h3 style={{ color: "white" }}>Topics 📚</h3>
          <div>
            {topics.map((topic, index) => (
              <Button
                key={index}
                onClick={() => onSelectTopic(topic.json)}
                style={{
                  backgroundColor: "#0056b3",
                  borderColor: "#0056b3",
                  margin: "10px",
                }}
              >
                {topic.name}
              </Button>
            ))}
          </div>
          <h3 className="mt-4">How it works? 🤔</h3>
          <p
            className="text-center"
            style={{
              color: "white",
              marginTop: "20px",
              marginBottom: "30px",
              textAlign: "left",
            }}
          >
            <strong>Choose a Topic:</strong> Select a topic from the homepage.
            <br />
            <br />
            <strong>Tech-Yourself:</strong> Dive into the selected topic, rate
            your experience on the various subtopics and materials.
            <br />
            <br />
            <strong>Get Scored:</strong> As you go through the topics, you
            accumulate points based on your knowledge.
            <br />
            <br />
            <strong>Learn:</strong> Go through the topics that you need to
            refresh, click on them, read, and take a short quiz to test
            yourself.
          </p>
          <h3 className="mt-4" style={{ color: "white" }}>
            Contribute and Grow 🚀
          </h3>
          <p
            className="text-center"
            style={{
              color: "white",
              marginTop: "20px",
              marginBottom: "30px",
              textAlign: "left",
            }}
          >
            Are you a junior developer looking to gain real-world experience? Or
            maybe you're passionate about helping others on their coding
            journey? Either way, you're in the right place!
            <br />
            <br />
            <strong>Fork It, Build It, Share It</strong> 🌟
            <br />
            This project is open for contributions from developers of all
            levels. Whether it's fixing a bug, adding a new feature, or
            improving documentation, every contribution counts. Fork the
            project, make your magic, and send in a pull request!
            <br />
            <br />
            <strong>Why Contribute?</strong>
            <br />- <strong>Gain Experience:</strong> Real projects, real code,
            real impact.
            <br />- <strong>Build Your Portfolio:</strong> Show off your work to
            potential employers or clients.
            <br />- <strong>Give Back:</strong> Help fellow developers by
            improving a tool designed to make learning fun and interactive.
            <br />
            <br />
            So, what are you waiting for? Fork this repo, and let’s build
            something amazing together!
            <br />
          </p>{" "}
          <div className="text-center mb-4">
            <Button
              variant="primary"
              href="https://github.com/ofirthefreelancer/tech-yourself"
              target="_blank"
              style={{
                backgroundColor: "#24292e",
                borderColor: "#24292e",
              }}
            >
              <i className="fa fa-github" style={{ marginRight: "5px" }}></i>{" "}
              Fork on GitHub
            </Button>
          </div>
        </p>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default HomepageComponent;
