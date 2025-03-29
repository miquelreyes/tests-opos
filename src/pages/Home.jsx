import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/data.json";

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const availableTopics = Object.keys(data);
    setTopics(availableTopics);
    // Set default selection to first topic if available
    if (availableTopics.length > 0) {
      setSelectedTopic(availableTopics[0]);
    }
  }, []);

  const handleStartTest = () => {
    if (selectedTopic) {
      navigate(`/test/${selectedTopic}?questions=${numberOfQuestions}`);
    }
  };

  return (
    <div className="flex flex-col justify-center align-middle p-24">
      <h1 className="text-2xl font-bold mb-4">
        Elige tema y número de preguntas
      </h1>

      <div className="mb-4">
        <label htmlFor="topic-select" className="block mb-2 font-medium">
          Tema
        </label>
        <select
          id="topic-select"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {topics.map((topic, index) => (
            <option key={topic} value={topic} className="text-black">
              {`Tema ${index + 1}`}
            </option>
          ))}
          <option key={"mixed"} value={"mixed"} className="text-black">
            {"Mezcladas"}
          </option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="questions-input" className="block mb-2 font-medium">
          Número de preguntas
        </label>
        <input
          id="questions-input"
          type="number"
          min="1"
          max="750"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(parseInt(e.target.value) || 10)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleStartTest}
          className="flex-1 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Comenzar Test
        </button>
      </div>
    </div>
  );
};

export default Home;
