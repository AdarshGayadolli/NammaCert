import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";
import api from "../src/services/api";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageRole = new URLSearchParams(location.search).get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter Email and Password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data;

        // Save Login Details
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect Based On Backend Role
        if (user.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-overlay">
          <div className="login-container">

            <div className="login-card">

              <h2>
                {pageRole === "admin"
                  ? "Administrator Login"
                  : "Student Login"}
              </h2>

              <hr />

              <form onSubmit={handleLogin}>

                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                  <p
                    style={{
                      color: "red",
                      marginBottom: "15px",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  className="login-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Login"}
                </button>

                <Link to="/">
                  <button
                    type="button"
                    className="back-btn"
                  >
                    Back
                  </button>
                </Link>

              </form>

              <div className="login-links">

                <Link to="#">
                  Forgot Password?
                </Link>

                {pageRole !== "admin" && (
                  <Link to="/register">
                    Create New Account
                  </Link>
                )}

              </div>

            </div>

            <div className="info-card">

              <h2>
                {pageRole === "admin"
                  ? "Administrator Workspace"
                  : "Student Learning Portal"}
              </h2>

              {pageRole === "admin" ? (
                <p>
                  Manage courses, instructors, students and
                  evaluation reports through the Medini
                  Administrator Dashboard.
                </p>
              ) : (
                <p>
                  Access your enrolled courses, complete
                  assessments and monitor your learning
                  progress.
                </p>
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  );
}