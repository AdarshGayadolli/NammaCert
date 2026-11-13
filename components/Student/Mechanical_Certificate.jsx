import { useEffect, useState } from "react";
import api from "../../src/services/api";
import "./Mechanical_Certificate.css";
import medinilogo from "../../src/assets/landingpageimages/medini_new_logo.png";
import faceArt from "../../src/assets/certificate/mechanical_sidebar.png";
import signImg from "../../src/assets/certificate/sign.jpeg";

export default function Mechanical_Certificate({ courseId, course }) {
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
    <span className="mechanical-cert-line" style={{ minWidth }}>
      {value || "\u00A0"}
    </span>
  );

  return (
    <div className="mechanical-cert-page-wrapper">
      <button className="mechanical-cert-download-btn no-print" onClick={handlePrint}>
        Download Certificate
      </button>

      <div className="mechanical-cert-container">
        {/* Left panel */}
        <div className="mechanical-cert-left">
          <img src={faceArt} alt="" className="mechanical-cert-face-art" />

          <img
            src={medinilogo}
            alt="Medini Technologies"
            className="mechanical-cert-logo"
          />

          <p className="mechanical-cert-footnote">
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
        <div className="mechanical-cert-right">
          <div className="mechanical-cert-banner">
            <h1 className="mechanical-cert-title">Certificate</h1>
          </div>

          <h2 className="mechanical-cert-subtitle">
            <span className="mechanical-cert-subtitle-spacer" aria-hidden="true">
              Certificate
            </span>
            of Completion
          </h2>

          <div className="mechanical-cert-body">
            <p className="mechanical-cert-tpl">
              This is to certify that{" "}
              <Line value={studentName} minWidth={180} /> from the Department
              of <Line value={department} minWidth={180} />, of PDA College of
              Engineering, Kalaburagi, bearing USN/AID No.:{" "}
              <Line value={usn} minWidth={120} />, has successfully completed
              the training program on{" "}
              <Line value={courseName} minWidth={160} />
            </p>

            <p className="mechanical-cert-tpl">
              The candidate has successfully fulfilled all practical
              requirements of the program during the training period.
            </p>

            <p className="mechanical-cert-tpl">
              The duration for the course was:{" "}
              <Line value={duration} minWidth={80} />
            </p>

            <p className="mechanical-cert-tpl mechanical-cert-tpl-gap">
              Certification Number:{" "}
              <Line value={certificationNumber} minWidth={100} />
            </p>

            <p className="mechanical-cert-tpl">
              We appreciate the participant’s dedication, commitment, and
              successful completion of the program and wish him/her success in
              his/her future endeavours.
            </p>

            <p className="mechanical-cert-tpl">
              <u>Issued Date:</u> <Line value={issuedDate} minWidth={90} />
            </p>
          </div>

          <p className="mechanical-cert-congrats">Congratulations!</p>

          <div className="mechanical-cert-signature">
            <div className="mechanical-cert-signature-inner">
              <img src={signImg} alt={signatoryName} className="mechanical-cert-sign-img" />
              <p className="mechanical-cert-signatory-name">{signatoryName}</p>
              <p>{signatoryTitle}</p>
              <p>{signatoryCompany}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}