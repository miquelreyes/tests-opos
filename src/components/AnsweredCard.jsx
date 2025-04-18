import { cn } from "@/lib/utils"
import { useMemo } from "react"

const AnsweredCard = ({ question, options, selected, answer }) => {
  const isSelected = useMemo(() => selected !== -1, [selected])
  const isCorrect = useMemo(() => selected === answer, [answer, selected])
  const isIncorrect = useMemo(
    () => isSelected && selected !== answer,
    [answer, isSelected, selected],
  )
  return (
    <div
      className={cn(
        "flex flex-col bg-slate-200 p-4 rounded-lg shadow-lg md:w-1/3 lg:w-1/4",
        { "bg-green-200": isCorrect, "bg-red-200": isIncorrect },
      )}
    >
      <h3 className="font-bold">{question}</h3>
      {options.map((option, index) => (
        <div
          key={index}
          className={cn({
            "font-bold": index === selected || (isSelected && index === answer),
            "text-green-500": isSelected && index === answer,
            "text-red-500": index === selected && index !== answer,
          })}
        >
          {option}
        </div>
      ))}
    </div>
  )
}

export default AnsweredCard
