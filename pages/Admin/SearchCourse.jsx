import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../src/services/api";
import "./SearchCourse.css";

export default function SearchCourse() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await api.get("/admin/courses");

      const data = response.data.data || [];

      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = courses.filter((course) =>
      (
        (course.title || "") +
        (course.courseId || "") +
        (course.courseType || "") +
        (course.instituteName || "") +
        (course.level || "") +
        (course.trainerName || "") +
        (course.trainerId || "")
      )
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredCourses(filtered);
  };

  const handleViewCourse = (courseId) => {
    navigate(`/admin/courses/${courseId}`);
  };

  return (
    <div className="search-course-container">

      <div className="top-bar">

        <h2>Search Courses</h2>

        <input
          type="text"
          placeholder="Search by Course ID, Title..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

      </div>

      <div className="table-container">

        <table className="course-table">

          <thead>
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Course Type</th>
              <th>Institute</th>
              <th>Trainer</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  No Courses Found
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course.courseId}>

                  <td>{course.courseId}</td>

                  <td>{course.title}</td>

                  <td>{course.courseType}</td>

                  <td>{course.instituteName || "-"}</td>

                  <td>{course.trainerName || course.trainerId}</td>

                  <td>{course.level}</td>

                  <td>
                    {course.duration?.value} {course.duration?.unit}
                  </td>

                  <td>
                    {course.startDate
                      ? new Date(course.startDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {course.endDate
                      ? new Date(course.endDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="assign-btn"
                      onClick={() => handleViewCourse(course.courseId)}
                    >
                      View Course Details
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}