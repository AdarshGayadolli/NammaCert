import Navbar from "../components/Navbar";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="landing-page" id="home">
        <main className="landing-content">
          <section className="landing-heading" aria-labelledby="home-title">
            <div className="hero-copy">
              <span className="landing-eyebrow">NAMMACERT · TRAINING, MADE CLEAR</span>
              <h1 id="home-title">
                Bring learning
                <br />
                <span>all together.</span>
              </h1>
              <p>
                Plan courses, keep track of learning, gather feedback, and
                recognize course completion—all in one place.
              </p>
              <a className="landing-text-link" href="#platform">
                Discover the platform <span aria-hidden="true">↓</span>
              </a>
              <div className="landing-highlights" aria-label="Platform highlights">
                <span>Organize courses</span>
                <i />
                <span>Follow progress</span>
                <i />
                <span>Certificates</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="A course journey from planning to achievement">
              <div className="hero-orbit hero-orbit-outer" />
              <div className="hero-orbit hero-orbit-inner" />
              <div className="hero-disc">
                <span>LEARN</span>
                <strong>with<br />purpose</strong>
                <span className="hero-disc-mark">N.</span>
              </div>
              <div className="hero-route">
                <span><i>01</i> Plan</span>
                <span><i>02</i> Progress</span>
                <span><i>03</i> Achieve</span>
              </div>
              <span className="hero-visual-note">YOUR LEARNING JOURNEY</span>
            </div>
          </section>

          <section className="platform-section" id="platform" aria-labelledby="platform-title">
            <div className="section-heading">
              <span className="section-kicker">HOW IT COMES TOGETHER</span>
              <h2 id="platform-title">Everything a learning program needs, in sequence.</h2>
              <p>
                Move from a well-planned course to a completed learning
                experience without losing sight of the details.
              </p>
            </div>

            <div className="journey-list">
              <article className="journey-row">
                <span className="journey-number">01</span>
                <h3>Start with a clear plan</h3>
                <p>
                  Set the course type, instructor, level, duration, and dates
                  before learning begins.
                </p>
              </article>
              <article className="journey-row">
                <span className="journey-number">02</span>
                <h3>Make progress easy to follow</h3>
                <p>
                  Keep assigned courses visible and give learners a way to
                  share feedback along the way.
                </p>
              </article>
              <article className="journey-row">
                <span className="journey-number">03</span>
                <h3>Recognize the finish line</h3>
                <p>
                  Bring completed training and its certificate together to
                  mark each achievement.
                </p>
              </article>
            </div>
          </section>

          <section className="course-formats" aria-labelledby="formats-title">
            <div className="formats-intro">
              <span className="section-kicker">BUILT FOR YOUR PROGRAM</span>
              <h2 id="formats-title">Different courses. One organized place.</h2>
              <p>
                Keep the information that matters to each training format
                close at hand.
              </p>
            </div>
            <div className="format-list">
              <article className="format-item">
                <span className="format-index">01</span>
                <div>
                  <h3>Academic courses</h3>
                  <p>
                    Capture the institute, instructor, course level, duration,
                    and schedule.
                  </p>
                </div>
              </article>
              <article className="format-item">
                <span className="format-index">02</span>
                <div>
                  <h3>Retail courses</h3>
                  <p>
                    Tie product-focused training to the right course and
                    duration details.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="landing-about" id="about" aria-labelledby="about-title">
            <div className="about-copy">
              <span className="section-kicker">ABOUT NAMMACERT</span>
              <h2 id="about-title">Less time coordinating. More time learning.</h2>
              <p>
                NammaCert is Medini’s platform for organizing training from
                course setup through completion. Course details, student
                enrollment, learner feedback, and certificates live in one
                connected workflow.
              </p>
              <p>
                Whether a program is academic or product-focused, NammaCert
                keeps the important information easier to manage and the
                learning journey easier to follow.
              </p>
            </div>

            <div className="about-points" aria-label="NammaCert capabilities">
              <div>
                <span>01 /</span>
                <p><strong>Course setup</strong>Keep course type, instructor, level, and schedule together.</p>
              </div>
              <div>
                <span>02 /</span>
                <p><strong>Learning progress</strong>See assigned courses and gather learner feedback.</p>
              </div>
              <div>
                <span>03 /</span>
                <p><strong>Course completion</strong>Keep completed training and certificates accessible.</p>
              </div>
            </div>
          </section>

          <footer className="landing-footer">
            <span>MEDINI · NAMMACERT</span>
            <span>LEARN <i /> PROGRESS <i /> ACHIEVE</span>
          </footer>
        </main>
      </div>
    </>
  );
}
