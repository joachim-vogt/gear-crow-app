import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="p-6 space-y-6">
      <nav className="space-x-4 text-red-600 underline">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
