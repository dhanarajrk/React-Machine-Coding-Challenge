import { Link, Routes, Route } from 'react-router-dom'
import { Timer } from './pages/Timer/Timer'
import './App.css'
import { Kanban } from './pages/Kanban Style Todolist (Drag and Drop)/Kanban';
import { Pagination } from './pages/Pagination/Pagination';

function App() {

  return (
    <div className="App">
      {/* Navigation Buttons */}
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/timer"><button>Timer (useEffect setInterval Cleanup)</button></Link>
        <Link to="/kanban"><button>Kanban Tasks (Drag and Drop)</button></Link>
        <Link to="/pagination"><button>Pagination</button></Link>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path="/kanban" element={<Kanban/>} />
        <Route path="/pagination" element={<Pagination/>} />
      </Routes>

    </div>
  );
}

export default App
