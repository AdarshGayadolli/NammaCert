import { useEffect, useState } from "react";
import api from "../../src/services/api";

export default function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/student/dashboard");

      console.log("Dashboard Response:", response.data);

      setDashboard(response.data.data || response.data);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          fontSize: "18px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "30px",
          color: "red",
          fontSize: "18px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "8px",
        }}
      >
        Student Dashboard
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Welcome back! Here's your learning overview.
      </p>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <DashboardCard
          title="Assigned Courses"
          value={
            dashboard?.assignedCourses ??
            dashboard?.totalCourses ??
            0
          }
        />

        <DashboardCard
          title="Completed Courses"
          value={
            dashboard?.completedCourses ?? 0
          }
        />

        <DashboardCard
          title="Pending Surveys"
          value={
            dashboard?.pendingSurveys ?? 0
          }
        />

        <DashboardCard
          title="Certificates"
          value={
            dashboard?.certificates ?? 0
          }
        />
      </div>

      {/* Student Profile */}

      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "25px",
          border: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Student Information
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>

            <TableRow
              label="Student ID"
              value={
                dashboard?.studentId || "-"
              }
            />

            <TableRow
              label="Name"
              value={
                dashboard?.name || "-"
              }
            />

            <TableRow
              label="Email"
              value={
                dashboard?.email || "-"
              }
            />

            <TableRow
              label="Phone"
              value={
                dashboard?.phone || "-"
              }
            />

            <TableRow
              label="Institute"
              value={
                dashboard?.instituteName ||
                "-"
              }
            />

            <TableRow
              label="Department"
              value={
                dashboard?.department ||
                "-"
              }
            />

            <TableRow
              label="Course"
              value={
                dashboard?.course || "-"
              }
            />

            <TableRow
              label="Joined On"
              value={
                dashboard?.createdAt
                  ? new Date(
                      dashboard.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            />

          </tbody>
        </table>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "25px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          color: "#666",
          marginBottom: "15px",
          fontWeight: "500",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: "38px",
          fontWeight: "700",
          color: "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TableRow({
  label,
  value,
}) {
  return (
    <tr>
      <td
        style={{
          padding: "12px",
          borderBottom:
            "1px solid #eee",
          fontWeight: "600",
          width: "220px",
        }}
      >
        {label}
      </td>

      <td
        style={{
          padding: "12px",
          borderBottom:
            "1px solid #eee",
        }}
      >
        {value}
      </td>
    </tr>
  );
}