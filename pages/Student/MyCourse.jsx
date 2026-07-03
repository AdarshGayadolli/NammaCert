import { useEffect, useState } from "react";
import api from "../../src/services/api";
import SurveyModal from "../../components/Student/SurveyModal";

export default function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showSurvey, setShowSurvey] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/student/courses");

      console.log("Student Courses:", response.data);

      let data = [];

      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data.courses)) {
        data = response.data.courses;
      } else if (Array.isArray(response.data.data?.courses)) {
        data = response.data.data.courses;
      }

      // initialize surveyCompleted flag
      const updatedData = data.map((course) => ({
        ...course,
        surveyCompleted: course.surveyCompleted || false,
      }));

      setCourses(updatedData);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to fetch courses."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSurvey = (course) => {
    if (course.surveyCompleted) return;

    setSelectedCourse(course);
    setSelectedCourseId(course.courseId);
    setShowSurvey(true);
  };

  const handleSurveyCompleted = () => {
    setCourses((prev) =>
      prev.map((course) =>
        course.courseId === selectedCourseId
          ? {
              ...course,
              surveyCompleted: true,
            }
          : course
      )
    );

    setShowSurvey(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>
          My Courses
        </h2>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Courses assigned to you.
        </p>

        {loading && <p>Loading courses...</p>}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          courses.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                border: "1px dashed #ccc",
                borderRadius: "8px",
              }}
            >
              No courses assigned.
            </div>
          )}

        {!loading &&
          !error &&
          courses.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#000",
                      color: "#fff",
                    }}
                  >
                    <th style={thStyle}>Course ID</th>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Course Type</th>
                    <th style={thStyle}>Duration</th>
                    <th style={thStyle}>Start Date</th>
                    <th style={thStyle}>End Date</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Survey</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.courseId || index}>
                      <td style={tdStyle}>
                        {course.courseId || "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.title || "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.courseType || "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.duration
                          ? `${course.duration.value} ${course.duration.unit}`
                          : "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.startDate
                          ? new Date(
                              course.startDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.endDate
                          ? new Date(
                              course.endDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.status || "-"}
                      </td>

                      <td style={tdStyle}>
                        {course.surveyCompleted ? (
                          <span
                            style={{
                              color: "green",
                              fontWeight: "700",
                            }}
                          >
                            ✓ Survey Completed
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleSurvey(course)
                            }
                            style={{
                              background: "#000",
                              color: "#fff",
                              border: "none",
                              padding: "8px 15px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                          >
                            Give Survey
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        <SurveyModal
          open={showSurvey}
          courseId={selectedCourseId}
          course={selectedCourse}
          onClose={() => setShowSurvey(false)}
          onSurveyCompleted={handleSurveyCompleted}
        />
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "left",
  whiteSpace: "nowrap",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  whiteSpace: "nowrap",
};