import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import data from "../../data/data.json";

const Test = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (topic === "mixed") {
      const allQuestions = Object.values(data).flat();
      setQuestions(shuffleArray(allQuestions).slice(10)); // Mezcla y toma 10
    } else {
      setQuestions(shuffleArray(data[topic] || []));
    }
  }, [topic]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleSelect = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = index;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="p-5">
      {score === null && questions.length ? (
        <>
          <h1 className="text-xl font-bold">{topic.toUpperCase()}</h1>
          <QuestionCard
            question={questions[currentIndex]?.question}
            options={questions[currentIndex]?.options}
            selected={selectedAnswers[currentIndex]}
            onSelect={handleSelect}
          />
          <button
            className="mt-4 bg-blue-500 text-white p-3 rounded-md"
            onClick={nextQuestion}
          >
            Siguiente
          </button>
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Score: {score}/{questions.length}</h1>
          <button
            className="mt-4 bg-green-500 text-white p-3 rounded-md"
            onClick={() => navigate("/")}
          >
            Error
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;
