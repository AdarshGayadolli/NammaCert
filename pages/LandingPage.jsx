import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="landing-page">
        <div className="landing-overlay">

          <div className="landing-content">

            {/* <div className="landing-heading">
              <h1>
                Medini Course Management
                <br />
                & Evaluation Platform
              </h1>

              <p>
                Choose your workspace to access courses, evaluations,
                and learning resources.
              </p>
            </div> */}

            <div className="portal-container">

              {/* Administrator */}

              <Link
                to="/login?role=admin"
                className="portal-card admin-card"
              >
                <div className="portal-header admin-header">
                  Administrator Portal
                </div>

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Administrator"
                />

                <div className="portal-info">

                  <h3>Learning Partner</h3>

                  <p>
                    Manage courses, publish learning content,
                    monitor evaluations and track learner progress.
                  </p>

                  <button>
                    Continue →
                  </button>

                </div>

              </Link>

              {/* Student */}

              <Link
                to="/login?role=student"
                className="portal-card student-card"
              >
                <div className="portal-header student-header">
                  Student Portal
                </div>

                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  alt="Student"
                />

                <div className="portal-info">

                  <h3>Learning Dashboard</h3>

                  <p>
                    Discover courses, continue learning,
                    and monitor your course completion journey.
                  </p>

                  <button>
                    Continue →
                  </button>

                </div>

              </Link>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}