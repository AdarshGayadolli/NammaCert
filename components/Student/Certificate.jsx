import { useEffect, useState } from "react";
import api from "../../src/services/api";
import "./Certificate.css";
import medinilogo from "../../src/assets/landingpageimages/medini_new_logo.png";
import faceArt from "../../src/assets/certificate/sidebar.png";
import signImg from "../../src/assets/certificate/sign.jpeg";

export default function Certificate({ courseId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cert, setCert] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCertificate();
    }
  }, [courseId]);

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

  if (loading) {
    return <p style={{ padding: "30px", color: "#666" }}>Loading certificate...</p>;
  }

  if (error) {
    return <p style={{ padding: "30px", color: "#b42318" }}>{error}</p>;
  }

  if (!cert) {
    return null;
  }

  // Map API fields with fallbacks so missing data shows a blank line,
  // same as the paper template.
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
    <span
      className="cert-line"
      style={{ minWidth }}
    >
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
          <img src={medinilogo} alt="Medini Technologies" className="cert-logo" />

          <img src={faceArt} alt="" className="cert-face-art" />

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

          <h2 className="cert-subtitle">of Completion</h2>

          <div className="cert-body">
            <p>
              This is to certify that <Line value={studentName} minWidth={280} />{" "}
              from the Department of <Line value={department} minWidth={260} />,
              of <Line value={college} minWidth={300} />, bearing USN/AID No.:{" "}
              <Line value={usn} minWidth={200} />, has successfully completed
              the training program on <Line value={courseName} minWidth={280} />.
            </p>

            <p>
              The candidate has successfully fulfilled practical requirements
              of the program during the training period.
            </p>

            <p>
              The duration for the course was: <Line value={duration} />
            </p>

            <p className="cert-field">
              <strong>Certification Number:</strong>{" "}
              <Line value={certificationNumber} />
            </p>

            <p>
              We appreciate the participant's dedication, commitment, and
              successful completion of the program and wish him/her success
              in his/her future endeavours.
            </p>

            <p className="cert-field">
              <strong><u>Issued Date:</u></strong> <Line value={issuedDate} />
            </p>
          </div>

          <p className="cert-congrats">Congratulations!</p>

          <div className="cert-signature">
            <img src={signImg} alt={signatoryName} className="cert-sign-img" />
            <p className="cert-signatory-name">{signatoryName}</p>
            <p>{signatoryTitle}</p>
            <p>{signatoryCompany}</p>
          </div>
        </div>
      </div>
    </div>
  );
}