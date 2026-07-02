export default function FinishedCourse() {
  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "600",
            color: "#111",
          }}
        >
          Finished Courses
        </h1>

        <p
          style={{
            color: "#666",
            marginTop: "8px",
          }}
        >
          View all the courses that you have successfully completed.
        </p>
      </div>

      {/* Test Card */}

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "20px",
        }}
      >
        <h2>🎉 Congratulations!</h2>

        <p style={{ marginTop: "10px", color: "#555" }}>
          You have successfully navigated to the
          <strong> Finished Courses </strong>
          page.
        </p>

        <p style={{ marginTop: "10px", color: "#555" }}>
          Once the backend is connected, all the completed courses,
          completion date, instructor details, progress, and certificate
          download option will be displayed here.
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Download Certificate (Demo)
        </button>
      </div>

      {/* Information Section */}

      <div
        style={{
          background: "#fafafa",
          border: "1px dashed #ccc",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h3>Upcoming Features</h3>

        <ul
          style={{
            marginTop: "15px",
            lineHeight: "2",
            color: "#555",
          }}
        >
          <li>✔ View Completed Courses</li>
          <li>✔ Course Completion Date</li>
          <li>✔ Instructor Details</li>
          <li>✔ Download Certificate</li>
          <li>✔ View Course Report</li>
          <li>✔ Student Performance</li>
        </ul>
      </div>
    </div>
  );
}