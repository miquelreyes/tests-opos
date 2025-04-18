import { cn } from "@/lib/utils"
import { useMemo } from "react"

const AnsweredCard = ({ question, options, selected, answer }) => {
  const isSelected = useMemo(() => selected !== -1, [selected])
  return (
    <div className="flex flex-col bg-slate-200 p-4 rounded-lg shadow-lg">
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
