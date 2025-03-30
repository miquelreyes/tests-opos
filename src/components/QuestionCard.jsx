import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Button } from "./ui/button";

const QuestionCard = ({ question, options, selected, answer, onSelect }) => {
  const [preSelectedOption, setPreSelectedOption] = useState(null);
  const isSelected = useMemo(() => selected !== -1, [selected]);

  const getOptionStyles = (index) => {
    if (!isSelected) {
      return "";
    }

    if (index === selected && selected != answer) {
      return "bg-red-500";
    }

    if (index === answer) {
      return "bg-green-500";
    }
  };

  useEffect(() => {
    setPreSelectedOption(null);
  }, [question]);

  return (
    <div className="bg-slate-200 p-4 rounded-lg shadow-lg flex flex-col gap-2">
      <h2 className="text-lg text-black font-bold">{question}</h2>
      <div className="flex flex-col mt-2 gap-1">
        {options.map((option, index) => (
          <Button
            key={index}
            disabled={isSelected}
            variant={"outline"}
            className={`w-full h-fit whitespace-normal text-left p-2 ${preSelectedOption === index && "bg-blue-500 text-white"} ${getOptionStyles(index)}`}
            onClick={() => setPreSelectedOption(index)}
          >
            {option}
          </Button>
        ))}
      </div>
      <Button
        className="bg-blue-900"
        disabled={preSelectedOption === null || isSelected}
        onClick={() => onSelect(preSelectedOption)}
      >
        Responder
      </Button>
    </div>
  );
};

export default QuestionCard;
