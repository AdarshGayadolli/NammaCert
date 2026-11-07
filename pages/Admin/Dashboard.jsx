import { useEffect, useState } from "react";
import api from "../../src/services/api";

// The four cards that must always be shown first.
const MAIN_CARDS = [
  { key: "totalStudents", label: "Total Students" },
  { key: "totalCourses", label: "Total Courses" },
  { key: "totalCertificates", label: "Total Certificates" },
  { key: "totalEnrollments", label: "Total Enrollments" },
];

// "revokedCertificates" -> "Revoked Certificates"
const prettifyKey = (key) =>
  String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

const isPlainObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v);

const isDateString = (v) =>
  typeof v === "string" &&
  /^\d{4}-\d{2}-\d{2}T/.test(v) &&
  !Number.isNaN(Date.parse(v));

// Turns any value into something readable inside a card or table cell.
const formatCell = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (isDateString(value)) return new Date(value).toLocaleDateString();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/courses/dashboard");

      setData(response.data.data || response.data);
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
      <div style={{ padding: "30px", fontSize: "18px" }}>
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px", color: "red", fontSize: "18px" }}>
        {error}
      </div>
    );
  }

  const summary = isPlainObject(data?.summary) ? data.summary : {};

  const mainKeys = MAIN_CARDS.map((c) => c.key);

  // Every other number in the summary (activeCourses, totalTrainers, ...)
  const otherSummary = Object.keys(summary).filter(
    (key) => !mainKeys.includes(key)
  );

  // Everything else the API returns next to "summary"
  const otherSections = Object.keys(data || {}).filter(
    (key) => key !== "summary"
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Overview of students, courses, enrollments and certificates.
      </p>

      {/* Main cards */}
      <div style={gridStyle}>
        {MAIN_CARDS.map((card) => (
          <DashboardCard
            key={card.key}
            title={card.label}
            value={summary[card.key] ?? 0}
            big
          />
        ))}
      </div>

      {/* Remaining summary numbers */}
      {otherSummary.length > 0 && (
        <Section title="More Details">
          <div style={gridStyle}>
            {otherSummary.map((key) => (
              <DashboardCard
                key={key}
                title={prettifyKey(key)}
                value={formatCell(summary[key])}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Any other data returned by the API */}
      {otherSections.map((key) => (
        <DataSection key={key} name={key} value={data[key]} />
      ))}
    </div>
  );
}

/* ---------- Generic renderer for any extra data ---------- */

function DataSection({ name, value }) {
  const title = prettifyKey(name);

  // A single number / text value
  if (!Array.isArray(value) && !isPlainObject(value)) {
    return (
      <Section title={title}>
        <div style={gridStyle}>
          <DashboardCard title={title} value={formatCell(value)} />
        </div>
      </Section>
    );
  }

  // A list -> table
  if (Array.isArray(value)) {
    return (
      <Section title={title}>
        <DataTable rows={value} />
      </Section>
    );
  }

  // An object -> cards for simple values, nested tables for the rest
  const entries = Object.entries(value);
  const simple = entries.filter(
    ([, v]) => v === null || typeof v !== "object"
  );
  const nested = entries.filter(
    ([, v]) => v !== null && typeof v === "object"
  );

  return (
    <Section title={title}>
      {simple.length > 0 && (
        <div style={gridStyle}>
          {simple.map(([k, v]) => (
            <DashboardCard
              key={k}
              title={prettifyKey(k)}
              value={formatCell(v)}
            />
          ))}
        </div>
      )}

      {nested.map(([k, v]) => (
        <div key={k} style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontWeight: "600" }}>
            {prettifyKey(k)}
          </h3>

          {Array.isArray(v) ? (
            <DataTable rows={v} />
          ) : (
            <DataTable rows={[v]} />
          )}
        </div>
      ))}
    </Section>
  );
}

function DataTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p style={{ color: "#666" }}>No data available.</p>;
  }

  // List of plain values (strings / numbers)
  if (rows.every((r) => r === null || typeof r !== "object")) {
    return (
      <div style={tableWrapStyle}>
        <table style={tableStyle}>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={tdStyle}>{formatCell(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // List of objects: build columns from every key that appears
  const columns = [];
  rows.forEach((row) => {
    Object.keys(row || {}).forEach((k) => {
      if (!columns.includes(k)) columns.push(k);
    });
  });

  return (
    <div style={tableWrapStyle}>
      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            {columns.map((c) => (
              <th key={c} style={thStyle}>
                {prettifyKey(c)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c} style={tdStyle}>
                  {formatCell(row?.[c])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Small building blocks ---------- */

function Section({ title, children }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>{title}</h2>
      {children}
    </div>
  );
}

function DashboardCard({ title, value, big }) {
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
          fontSize: big ? "16px" : "15px",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: big ? "42px" : "30px",
          fontWeight: "700",
          color: "#000",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const tableWrapStyle = {
  overflowX: "auto",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  whiteSpace: "nowrap",
  fontWeight: "600",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  borderTop: "1px solid #eee",
  fontSize: "14px",
  color: "#333",
};