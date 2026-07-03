import { useEffect, useState } from "react";
import api from "../../src/services/api";
import Certificate from "../../components/Student/Certificate";

export default function FinishedCourse() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCompletedCourses();
  }, []);

  const fetchCompletedCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/student/courses/completed");

      console.log("Completed Courses Response:", response.data);

      const data = response.data.data || response.data;

      setCourses(
        data.courses ||
          data.completedCourses ||
          data ||
          []
      );
    } catch (err) {
      console.error("Failed to fetch completed courses:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load completed courses."
      );
    } finally {
      setLoading(false);
    }
  };

  // Just opens the certificate view — Certificate.jsx fills in dummy
  // demo data wherever real fields aren't available yet.
  const handleDownloadCertificate = (course) => {
    setSelectedCourse(course);
  };

  if (selectedCourse) {
    return (
      <div>
        <button
          onClick={() => setSelectedCourse(null)}
          className="no-print"
          style={{
            margin: "20px 0 0 20px",
            padding: "10px 20px",
            background: "#eee",
            color: "#111",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Finished Courses
        </button>

        <Certificate course={selectedCourse} />
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#111",
          marginBottom: "20px",
        }}
      >
        Finished Courses
      </h1>

      {loading && <p style={{ color: "#666" }}>Loading...</p>}

      {!loading && error && (
        <p style={{ color: "#b42318" }}>{error}</p>
      )}

      {!loading && !error && courses.length === 0 && (
        <p style={{ color: "#666" }}>
          You haven't completed any courses yet.
        </p>
      )}

      {!loading && !error && courses.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Instructor</th>
              <th style={thStyle}>Completion Date</th>
              <th style={thStyle}>Progress</th>
              <th style={thStyle}>Certificate</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => {
              const courseId = course._id || course.id || index;

              const title =
                course.title ||
                course.courseTitle ||
                course.name ||
                "Untitled Course";

              const completionDate =
                course.completionDate ||
                course.completedAt ||
                course.finishedAt ||
                null;

              const instructor =
                course.instructor?.name ||
                course.instructorName ||
                course.instructor ||
                "-";

              const progress =
                course.progress !== undefined
                  ? `${course.progress}%`
                  : "100%";

              return (
                <tr key={courseId}>
                  <td style={tdStyle}>{title}</td>
                  <td style={tdStyle}>{instructor}</td>
                  <td style={tdStyle}>
                    {completionDate
                      ? new Date(completionDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td style={tdStyle}>{progress}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDownloadCertificate(course)}
                      style={{
                        padding: "6px 14px",
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "2px solid #ddd",
  fontSize: "13px",
  color: "#666",
  textTransform: "uppercase",
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
  color: "#333",
};