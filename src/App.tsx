import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:topic" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
