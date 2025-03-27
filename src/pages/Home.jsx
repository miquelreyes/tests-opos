import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/data.json";

const Home = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTopics(Object.keys(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Select a Topic</h1>
      <div className="mt-4">
        {topics.map((topic) => (
          <button
            key={topic}
            className="block w-full text-left p-3 border rounded-md my-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate(`/test/${topic}`)}
          >
            {topic}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white p-3 rounded-md"
        onClick={() => navigate(`/test/mixed`)}
      >
        Mixed Questions
      </button>
    </div>
  );
};

export default Home;
