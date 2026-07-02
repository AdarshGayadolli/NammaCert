import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Register.css";

export default function Register() {
  return (
    <>
      <Navbar />

      <div className="register-page">
        <div className="register-overlay">

          <div className="register-container">

            {/* Left Card */}

            <div className="register-card">

              <h2>Create Student Account</h2>

              <hr />

              <form>

                <input
                  type="text"
                  placeholder="Full Name"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                />

                <input
                  type="text"
                  placeholder="College / Institution"
                />

                <input
                  type="password"
                  placeholder="Password"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                />

                <button className="register-btn">
                  Register
                </button>

                <Link to="/login">
                  <button
                    type="button"
                    className="back-btn"
                  >
                    Back to Login
                  </button>
                </Link>

              </form>

            </div>

            {/* Right Card */}

            <div className="info-card">

              <h2>
                Welcome to Medini
                Course Management System
              </h2>

              <p>
                The Medini Course Management System provides a
                centralized platform for students to explore
                professional courses, monitor learning progress,
                and complete evaluations seamlessly.
              </p>

              <p>
                Administrators can create, manage, and publish
                courses while tracking learner performance
                through detailed reports and analytics.
              </p>

              <p>
                Register now to begin your learning journey
                and gain access to all available courses and
                assessments.
              </p>

            </div>

          </div>

        </div>
      </div>

    </>
  );
}