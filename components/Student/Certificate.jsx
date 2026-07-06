import { useEffect, useState } from "react";
import api from "../../src/services/api";
import "./Certificate.css";
import medinilogo from "../../src/assets/landingpageimages/medini_new_logo.png";
import faceArt from "../../src/assets/certificate/sidebar.png";
import signImg from "../../src/assets/certificate/sign.jpeg";

export default function Certificate({ courseId, course }) {
  const [loading, setLoading] = useState(!course);
  const [error, setError] = useState("");
  const [cert, setCert] = useState(null);

  useEffect(() => {
    if (course) {
      // We already have the course data (passed from FinishedCourse) —
      // build the certificate straight from it, no extra API call needed.
      setCert(buildCertFromCourse(course));
      setLoading(false);
      return;
    }

    if (courseId) {
      fetchCertificate();
    }
  }, [courseId, course]);

  // Reads whatever the app already stored about the logged-in student
  // (adjust the localStorage key/shape once you confirm what login saves).
  const getStoredStudent = () => {
    try {
      const raw =
        localStorage.getItem("user") ||
        localStorage.getItem("student") ||
        localStorage.getItem("studentData");

      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const buildCertFromCourse = (course) => {
    const student = getStoredStudent();

    let duration = "";
    if (course.startDate && course.endDate) {
      const start = new Date(course.startDate);
      const end = new Date(course.endDate);
      const days =
        Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
      duration = `${days} day${days !== 1 ? "s" : ""}`;
    }

    return {
      studentName:
        student.name || student.studentName || "Demo Student",
      department: student.department || "Computer Science & Engineering",
      college:
        student.college ||
        student.collegeName ||
        "PDA College of Engineering, Kalaburagi",
      usn: student.usn || student.aidNumber || "1PD21CS000",
      courseName: course.title || "Demo Course",
      duration: duration || "10 days",
      certificationNumber: course.courseId || "DEMO-CERT-0001",
      issuedDate: course.endDate || new Date().toISOString(),
    };
  };

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/student/courses/${courseId}/certificate`
      );

      console.log("Certificate Response:", response.data);

      const data = response.data.data || response.data;

      setCert(data);
    } catch (err) {
      console.error("Failed to fetch certificate:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load certificate."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Auto-trigger the download once the certificate is rendered, so the
  // student only has to click "Download" once from the course list.
  useEffect(() => {
    if (!loading && !error && cert) {
      const timer = setTimeout(() => {
        window.print();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [loading, error, cert]);

  if (loading) {
    return <p style={{ padding: "30px", color: "#666" }}>Loading certificate...</p>;
  }

  if (error) {
    return <p style={{ padding: "30px", color: "#b42318" }}>{error}</p>;
  }

  if (!cert) {
    return null;
  }

  const studentName = cert.studentName || cert.name || "";
  const department = cert.department || "";
  const college = cert.college || cert.collegeName || "PDA College of Engineering, Kalaburagi";
  const usn = cert.usn || cert.aidNumber || cert.usnOrAid || "";
  const courseName = cert.courseName || cert.course?.title || "";
  const duration = cert.duration || "";
  const certificationNumber = cert.certificationNumber || cert.certNumber || "";
  const issuedDate = cert.issuedDate
    ? new Date(cert.issuedDate).toLocaleDateString()
    : "";

  const signatoryName = cert.signatoryName || "Pradeep Kallur";
  const signatoryTitle = cert.signatoryTitle || "Co Founder & Managing Director";
  const signatoryCompany = cert.signatoryCompany || "Medini Technologies";

  const Line = ({ value, minWidth = 160 }) => (
    <span className="cert-line" style={{ minWidth }}>
      {value || "\u00A0"}
    </span>
  );

  return (
    <div className="cert-page-wrapper">
      <button className="cert-download-btn no-print" onClick={handlePrint}>
        Download Certificate
      </button>

      <div className="cert-container">
        {/* Left panel */}
        <div className="cert-left">
          <img src={faceArt} alt="" className="cert-face-art" />

          <img
            src={medinilogo}
            alt="Medini Technologies"
            className="cert-logo"
          />

          <p className="cert-footnote">
            Medini and Medini logo are the registered trademarks or trademarks
            of Medini, Inc., and/or its subsidiaries in India and/or other
            country. All other brand names or trademarks belong to their
            respective holders. Medini reserves the rights to alter the
            product and services offerings, specifications &amp; pricing at
            anytime without notice, and is not responsible for typographical
            or geographical errors that may appear in this document. The
            course content holds Medini's copyright.
          </p>
        </div>

        {/* Right panel */}
        <div className="cert-right">
          <div className="cert-banner">
            <h1 className="cert-title">Certificate</h1>
          </div>

          <h2 className="cert-subtitle">
            <span className="cert-subtitle-spacer" aria-hidden="true">
              Certificate
            </span>
            of Completion
          </h2>

          <div className="cert-body">
            <p className="cert-paragraph">
              <strong>This is to certify</strong> that{" "}
              <Line value={studentName} minWidth={190} />, a student of{" "}
              <Line value={department} minWidth={170} /> from{" "}
              <Line value={college} minWidth={210} /> (USN/AID No.{" "}
              <Line value={usn} minWidth={110} />), has successfully
              completed the course{" "}
              <Line value={courseName} minWidth={190} /> over a duration of{" "}
              <Line value={duration} minWidth={80} />, conducted by Medini
              Technologies.
            </p>

            <p className="cert-paragraph">
              The candidate has successfully fulfilled all practical
              requirements of the program during the training period and has
              demonstrated satisfactory proficiency in the course curriculum.
            </p>

            <p className="cert-meta">
              <span>
                <strong>Certification Number:</strong>{" "}
                <Line value={certificationNumber} minWidth={100} />
              </span>
              <span>
                <strong><u>Issued Date:</u></strong>{" "}
                <Line value={issuedDate} minWidth={90} />
              </span>
            </p>
          </div>

          <p className="cert-congrats">Congratulations!</p>

          <div className="cert-signature">
            <div className="cert-signature-inner">
              <img src={signImg} alt={signatoryName} className="cert-sign-img" />
              <p className="cert-signatory-name">{signatoryName}</p>
              <p>{signatoryTitle}</p>
              <p>{signatoryCompany}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}