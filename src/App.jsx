import { Link, Routes, Route } from 'react-router-dom'
import { Timer } from './pages/Timer/Timer'
import './App.css'
import { Kanban } from './pages/Kanban Style Todolist (Drag and Drop)/Kanban';
import { Pagination } from './pages/Pagination/Pagination';
import { StarRating } from './pages/Star Rating/StarRating';
import { DebounceSearchUseRef } from './pages/Debounce Search (using useRef)/DebounceSearchUseRef';
import { DebounceSearchCustomHook } from './pages/Debounce Search (using customHook)/DebounceSearchCustomHook';

function App() {

  return (
    <div className="App">
      {/* Navigation Buttons */}
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/timer"><button>Timer (useEffect setInterval Cleanup)</button></Link>
        <Link to="/kanban"><button>Kanban Tasks (Drag and Drop)</button></Link>
        <Link to="/pagination"><button>Pagination</button></Link>
        <Link to="/star-rating"><button>Star Rating</button></Link>
        <Link to="/debounce-search-useref"><button>Debounce Search (using useRef)</button></Link>
        <Link to="/debounce-search-customhook"><button>Debounce Search (using customHook)</button></Link>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path="/kanban" element={<Kanban/>} />
        <Route path="/pagination" element={<Pagination/>} />
        <Route path="/star-rating" element={<StarRating/>} />
        <Route path="/debounce-search-useref" element={<DebounceSearchUseRef/>} />
        <Route path="/debounce-search-customhook" element={<DebounceSearchCustomHook/>} />
      </Routes>

    </div>
  );
}

export default App
