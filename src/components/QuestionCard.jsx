import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg text-black font-bold">{question}</h2>
      <div className="mt-2">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={isSelected}
            className={`block w-full text-left p-2 border rounded-md my-1 ${preSelectedOption === index && "bg-gray-300"} ${getOptionStyles(index)}`}
            onClick={() => setPreSelectedOption(index)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white p-3 rounded-md"
        disabled={preSelectedOption === null || isSelected}
        onClick={() => onSelect(preSelectedOption)}
      >
        Seleccionar
      </button>
    </div>
  );
};

export default QuestionCard;
