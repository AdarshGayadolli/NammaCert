import { Link } from "react-router-dom";
import "./Navbar.css";

// Import your logo
import logo from "../src/assets/landingpageimages/medini_new_logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" aria-label="Medini home">
          <img src={logo} alt="Medini Logo" className="logo-image" />
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <a href="/#about" className="nav-link">About</a>
        <Link to="/login?role=student" className="nav-login nav-login-student">
          Student Login
        </Link>
        <Link to="/login?role=admin" className="nav-login nav-login-admin">
          Admin Login
        </Link>
      </div>
    </nav>
  );
}