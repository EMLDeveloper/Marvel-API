import { NavLink } from "react-router-dom";
import "./SideBar.css";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">MarvelDB</h1>
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          📋 Dashboard
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          🧮 Stats
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          ℹ️ About Info
        </NavLink>
      </nav>
    </aside>
  );
}
