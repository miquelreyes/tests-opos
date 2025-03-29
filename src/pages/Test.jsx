import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import data from "../../data/data.json";
import { useMemo } from "react";
import { useCallback } from "react";

const DEFAULT_NUM_QUESTIONS = 50;
const MAX_NUM_QUESTIONS_TOPIC = 50;
const NUM_TOPICS = 15;
const MAX_NUM_QUESTIONS = NUM_TOPICS * MAX_NUM_QUESTIONS_TOPIC;

const Test = () => {
  const { topic } = useParams();
  const isMixed = useMemo(() => topic === "mixed", [topic]);
  const [searchParams] = useSearchParams();
  const numQuestions = useMemo(
    () =>
      Math.min(
        parseInt(searchParams.get("questions")) ?? DEFAULT_NUM_QUESTIONS,
        isMixed ? MAX_NUM_QUESTIONS : MAX_NUM_QUESTIONS_TOPIC,
      ),
    [isMixed, searchParams],
  );
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const shuffleQuestions = useCallback((questions, numQuestions) => {
    const shuffledQuestions = shuffleArray(questions).slice(0, numQuestions);
    return shuffledQuestions.map((question) => {
      const originalOptions = [...question.options];
      const correctAnswer = originalOptions[question.answer];

      const shuffledOptions = shuffleArray(originalOptions);

      const newAnswerIndex = shuffledOptions.findIndex(
        (option) => option === correctAnswer,
      );

      return {
        ...question,
        options: shuffledOptions,
        answer: newAnswerIndex,
      };
    });
  }, []);

  useEffect(() => {
    if (topic === "mixed") {
      const allQuestions = Object.values(data).flat();
      setQuestions(shuffleQuestions(allQuestions, numQuestions));
    } else {
      setQuestions(shuffleQuestions(data[topic] || [], numQuestions));
    }

    setSelectedAnswers(new Array(numQuestions).fill(-1));
  }, [numQuestions, shuffleQuestions, topic]);

  const handleSelect = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = index;
    setSelectedAnswers(newAnswers);
  };

  const previousQuestion = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const finishTest = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correct++;
    });
    setScore(correct);
    setShowScore(true);
  };

  const reviewTest = () => {
    setShowScore(false);
    setCurrentIndex(0);
  };

  const isLastQuestion = useMemo(
    () => currentIndex === questions.length - 1,
    [currentIndex, questions.length],
  );

  return (
    <div className="p-5">
      {questions.length && (
        <>
          {showScore ? (
            <>
              <h1 className="text-2xl font-bold">
                Puntuación: {score}/{questions.length}
              </h1>
              <button
                className="mt-4 bg-blue-500 text-white p-3 rounded-md"
                onClick={reviewTest}
              >
                Revisar
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">{`Pregunta ${currentIndex + 1} de ${numQuestions}`}</h1>
              <QuestionCard
                question={questions[currentIndex]?.question}
                options={questions[currentIndex]?.options}
                answer={questions[currentIndex]?.answer}
                selected={selectedAnswers[currentIndex]}
                onSelect={handleSelect}
              />
              {currentIndex !== 0 && (
                <button
                  className="mt-4 bg-blue-500 text-white p-3 rounded-md"
                  onClick={previousQuestion}
                  disabled={currentIndex === 0}
                >
                  Anterior
                </button>
              )}
              {!isLastQuestion && (
                <button
                  className="mt-4 bg-blue-500 text-white p-3 rounded-md"
                  onClick={nextQuestion}
                >
                  Siguiente
                </button>
              )}
              <button
                className="mt-4 bg-blue-500 text-white p-3 rounded-md"
                onClick={finishTest}
              >
                Acabar
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
