import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import data from "../../data/data.json";
import { Label } from "@/components/ui/label";

const Home = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    const availableTopics = Object.keys(data);
    setTopics(availableTopics);
    if (availableTopics.length > 0) {
      setSelectedTopic(availableTopics[0]);
    }
  }, []);

  const handleStartTest = () => {
    if (selectedTopic) {
      navigate(`/test/${selectedTopic}?questions=${numberOfQuestions}`);
    }
  };

  const handleStartExam = () => {
    navigate(`/test/exam`);
  };

  return (
    <div className="flex flex-col gap-3 justify-center align-middle text-center h-full">
      <h1 className="text-2xl font-bold mb-4">
        Elige tema y número de preguntas:
      </h1>

      <Label htmlFor="topic-select">Tema</Label>
      <Select
        value={selectedTopic}
        onValueChange={(value) => {
          setSelectedTopic(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Elige un tema" />
        </SelectTrigger>
        <SelectContent id="topic-select" className="w-full">
          {topics.map((topic, index) => (
            <SelectItem key={topic} value={topic} className="text-black">
              {`Tema ${index + 1}`}
            </SelectItem>
          ))}
          <SelectItem key={"mixed"} value={"mixed"} className="text-black">
            Mezcladas
          </SelectItem>
        </SelectContent>
      </Select>

      <Label htmlFor="questions-input">Número de preguntas</Label>
      <Input
        id="questions-input"
        type="number"
        min="1"
        max="750"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
      />
      <Button onClick={handleStartTest}>Comenzar Test</Button>
      <Button variant={"secondary"} onClick={handleStartExam}>
        Modo examen
      </Button>
    </div>
  );
};

export default Home;
