import { useState, useRef, useEffect } from "react";
import { UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./StudentHeader.css";

export default function StudentHeader() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const handler = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );

  }, []);

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (
    <header className="admin-header">

      <div>

        <h2>Student Dashboard</h2>

        <p>

          Welcome,
          {" "}
          {user?.name || "Student"}

        </p>

      </div>

      <div
        className="profile-section"
        ref={menuRef}
      >

        <UserCircle
          size={38}
          onClick={() => setOpen(!open)}
          className="profile-icon"
        />

        {open && (

          <div className="profile-dropdown">

            <div className="profile-details">

              <h4>{user?.name}</h4>

              <p>{user?.email}</p>

            </div>

            <hr />

            <button
              className="logout-btn"
              onClick={logout}
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