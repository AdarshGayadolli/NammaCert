import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import "./AdminHeader.css";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>Administrator Dashboard</h2>
        <p>Welcome Back</p>
      </div>

      <div className="profile-section" ref={menuRef}>
        <div
          className="profile-icon"
          onClick={() => setOpen(!open)}
        >
          <UserCircle size={38} />
        </div>

        {open && (
          <div className="profile-dropdown">
            <div className="profile-details">
              <h4>Administrator</h4>
            </div>

            <hr />

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}