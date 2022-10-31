import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import UIChatbot from "./components/Chatbot/Chatbot"
import ImageObjectDetection from "./components/ImageObjectDetection/ImageObjectDetection"
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
        <li>
            <Link to='/'>HomePage</Link>
          </li>
          <li>
            <Link to='/chatbot'>Chatbot</Link>
          </li>
          <li>
            <Link to='/imageobjectdetection'>imageobjectdetection</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatbot" element={<UIChatbot />} />
        <Route path="/imageobjectdetection" element={<ImageObjectDetection />} />
      </Routes>
    </div>
  );
}

export default App;