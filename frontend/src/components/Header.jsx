import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <nav className="header-container">
      <Link to="/" className="logo-link">
        <img
          className="logo-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png"
          alt="Marvel"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <span className="logo-text-fallback">MARVEL</span>
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/timeline" className="nav-item">Timeline</Link>
        <Link to="/others" className="nav-item">Others</Link>
      </div>
    </nav>
  );
}