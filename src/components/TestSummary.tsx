import { useCallback, useState } from "react"
import AnsweredCard from "./AnsweredCard"
import { Button } from "./ui/button"

export enum QuestionStatus {
  All = "all",
  Correct = "correct",
  Incorrect = "incorrect",
  Unanswered = "unanswered",
}

const TestSummary = ({ questions, selectedAnswers }) => {
  const [questionsType, setQuestionsType] = useState(QuestionStatus.All)

  const showQuestion = useCallback((question, index) => {
    switch (questionsType) {
      case QuestionStatus.All:
        return true
      case QuestionStatus.Correct:
        return question.answer === selectedAnswers[index]
      case QuestionStatus.Incorrect:
        return (
          question.answer !== selectedAnswers[index] &&
          selectedAnswers[index] !== -1
        )
      case QuestionStatus.Unanswered:
        return selectedAnswers[index] === -1
    }
  })
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Respuestas</h2>
      <div>Filtrar: </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={() => setQuestionsType(QuestionStatus.All)}>
          Todas
        </Button>
        <Button onClick={() => setQuestionsType(QuestionStatus.Correct)}>
          Correctas
        </Button>
        <Button onClick={() => setQuestionsType(QuestionStatus.Incorrect)}>
          Incorrectas
        </Button>
        <Button onClick={() => setQuestionsType(QuestionStatus.Unanswered)}>
          Sin Contestar
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row flex-wrap md:justify-center">
        {questions.map(
          (question, index) =>
            showQuestion(question, index) && (
              <AnsweredCard
                question={question.question}
                options={question.options}
                answer={question.answer}
                selected={selectedAnswers[index]}
              />
            ),
        )}
      </div>
    </div>
  )
}

export default TestSummary
