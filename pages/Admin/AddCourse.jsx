import React, { useState } from "react";
import CourseTypeDropdown from "../../components/Admin/CourseTypeDropdown";
import InstructorDropdown from "../../components/Admin/InstructorDropdown";
import LevelDropdown from "../../components/Admin/LevelDropdown";
import api from "../../src/services/api";
import "./AddCourse.css";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseType: "",
    title: "", // backend requires "title" (confirmed from expected payload)
    trainerId: "",
    startDate: "",
    endDate: "",
    level: "",
    duration: {
      value: "",
      unit: "Months",
    },
    instituteName: "", // used for Academic courses
    productName: "", // used for Retail courses
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDurationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      duration: {
        ...prev.duration,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);

      // trainerId can be any string — no client-side format
      // restriction; backend validates it if needed.
      // instituteName is sent for Academic courses, productName for
      // Retail courses — backend expects whichever applies.
      await api.post("/admin/courses", {
        ...formData,
      });

      alert("Course created successfully");
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 401) {
        setErrorMsg(
          "Your session has expired or you're not logged in. Please log in again."
        );
      } else if (err?.response?.data?.errors) {
        // Surface backend validation errors directly instead of a generic message
        setErrorMsg(err.response.data.errors.join(" | "));
      } else {
        setErrorMsg("Failed to create course. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="title">Create Course</h1>
      <p className="subtitle">Enter course details</p>

      {errorMsg && <div className="error-banner">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="form">
        {/* ROW 1 */}
        <div className="row">
          <CourseTypeDropdown
            value={formData.courseType}
            onChange={(val) =>
              setFormData((p) => ({
                ...p,
                courseType: val,
                instituteName: val === "Academic" ? p.instituteName : "",
                productName: val === "Retail" ? p.productName : "",
              }))
            }
          />

          {formData.courseType === "Academic" && (
            <input
              name="instituteName"
              placeholder="Institute Name"
              value={formData.instituteName}
              onChange={handleChange}
              className="input"
            />
          )}

          {formData.courseType === "Retail" && (
            <input
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              className="input"
            />
          )}

          <input
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* ROW 2 */}
        <div className="row">
          <InstructorDropdown
            value={formData.trainerId}
            onChange={(val) =>
              setFormData((p) => ({ ...p, trainerId: val }))
            }
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input"
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* ROW 3 */}
        <div className="row">
          <LevelDropdown
            value={formData.level}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                level: val,
              }))
            }
          />

          <input
            type="number"
            name="durationValue"
            placeholder="Duration"
            value={formData.duration.value}
            onChange={(e) => handleDurationChange("value", e.target.value)}
            className="input"
          />

          <select
            name="durationUnit"
            value={formData.duration.unit}
            onChange={(e) => handleDurationChange("unit", e.target.value)}
            className="input"
          >
            <option value="Hours">Hours</option>
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </select>
        </div>

        <button className="btn" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;