import { Link, Routes, Route } from 'react-router-dom'
import { Timer } from './pages/Timer/Timer'
import './App.css'

function App() {

  return (
    <div className="App">
      {/* Navigation Buttons */}
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/timer"><button>Timer</button></Link>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route path="/timer" element={<Timer />} />
      </Routes>

    </div>
  );
}

export default App
