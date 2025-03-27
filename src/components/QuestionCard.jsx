import React from "react";

const QuestionCard = ({ question, options, selected, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg text-black font-bold">{question}</h2>
      <div className="mt-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`block w-full text-left p-2 border rounded-md my-1 ${
              selected === index ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;