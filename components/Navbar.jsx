import { Link } from "react-router-dom";
import "./Navbar.css";

// Import your logo
import logo from "../src/assets/landingpageimages/medini_new_logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Medini Logo" className="logo-image" />
      </div>

      <div className="nav-right">
        <div className="language">
          <span>Choose Language</span>

          <select>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* <Link to="/login" className="nav-btn">
          Login
        </Link> */}

        {/* <Link to="/register" className="nav-btn register">
          Register
        </Link> */}
      </div>
    </nav>
  );
}