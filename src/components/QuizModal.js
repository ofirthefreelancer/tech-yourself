import React from "react";
import { Modal, Button } from "react-bootstrap";
import Quiz from "react-quiz-component";

const QuizModal = ({ show, onHide, subtopic }) => {
  if (!subtopic) return null;
  const quizData = {
    quizTitle: `${subtopic.subtopic} Quiz`,
    quizSynopsis: subtopic.explanation,
    nrOfQuestions: "3",
    questions: subtopic.quiz.map((q) => ({
      question: q.question,
      questionType: "text",
      point: "20",
      answers: q.options,
      correctAnswer: (q.options.indexOf(q.answer) + 1).toString(),
      answerSelectionType: "single",
      messageForIncorrectAnswer: "Incorrect answer.",
    })),
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Test Yourself</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {quizData && (
          <Quiz
            quiz={quizData}
            shuffle
            showInstantFeedback
            onComplete={(result) => console.log("Quiz Result:", result)}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;
