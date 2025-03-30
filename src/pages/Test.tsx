import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import testDataJson from "../../data/data.json";
import { useMemo } from "react";
import { useCallback } from "react";
import { TestData, TestQuestion } from "@/types";
import { Button } from "@/components/ui/button";

const testData: TestData = testDataJson;

const DEFAULT_NUM_QUESTIONS = 50;
const MAX_NUM_QUESTIONS_TOPIC = 50;
const NUM_TOPICS = 15;
const MAX_NUM_QUESTIONS = NUM_TOPICS * MAX_NUM_QUESTIONS_TOPIC;
const NUM_QUESTIONS_TOPIC_EXAM = 6;
const NUM_QUESTIONS_EXAM = NUM_TOPICS * NUM_QUESTIONS_TOPIC_EXAM;

const Test = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const isExam = useMemo(() => topic === "exam", [topic]);
  const isMixed = useMemo(() => topic === "mixed", [topic]);
  const [searchParams] = useSearchParams();
  const numQuestions = useMemo(
    () =>
      isExam
        ? NUM_QUESTIONS_EXAM
        : Math.min(
            parseInt(searchParams.get("questions") ?? "") ??
              DEFAULT_NUM_QUESTIONS,
            isMixed ? MAX_NUM_QUESTIONS : MAX_NUM_QUESTIONS_TOPIC,
          ),
    [isMixed, searchParams],
  );
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showScore, setShowScore] = useState(false);

  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const shuffleQuestions = useCallback(
    (questions: TestQuestion[], numQuestions: number): TestQuestion[] => {
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
    },
    [],
  );

  useEffect(() => {
    let questions: TestQuestion[] = [];
    if (!topic) return;
    switch (topic) {
      case "exam":
        Object.values(testData).forEach((topic) => {
          questions = questions.concat(
            shuffleArray(topic).slice(0, NUM_QUESTIONS_EXAM),
          );
        });
        break;
      case "mixed":
        questions = Object.values(testData).flat() as TestQuestion[];
        break;
      default:
        questions = testData[topic] || [];
        break;
    }

    setQuestions(shuffleQuestions(questions, numQuestions));

    setSelectedAnswers(new Array(numQuestions).fill(-1));
  }, [numQuestions, shuffleQuestions, topic]);

  const handleSelect = (index: number) => {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-start h-full w-full">
      <Button
        variant={"secondary"}
        className="self-start justify-self-start"
        onClick={handleGoBack}
      >
        {"Inicio"}
      </Button>
      {questions.length && (
        <div className="flex flex-col gap-2 justify-center align-middle text-center h-full">
          {showScore ? (
            <div className="flex flex-col align-middle gap-4">
              <h1 className="text-2xl font-bold">Puntuación:</h1>
              <h2 className="text-4xl font-bold">
                {score}/{questions.length}
              </h2>
              <div>
                <Button onClick={reviewTest}>Revisar</Button>
              </div>
            </div>
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
              <div className="flex align-middle justify-center gap-2 w-full">
                <Button
                  onClick={previousQuestion}
                  disabled={currentIndex === 0}
                >
                  {"< Anterior"}
                </Button>
                <Button disabled={isLastQuestion} onClick={nextQuestion}>
                  {"Siguiente >"}
                </Button>
              </div>
              <div>
                <Button variant={"destructive"} onClick={finishTest}>
                  Acabar intento
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
