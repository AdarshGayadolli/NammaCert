import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../src/services/api";
import "./CourseInfoCard.css";

export default function CourseInfoCard() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const response = await api.get("/admin/courses");

      const courses = response.data.data || [];

      const selectedCourse = courses.find(
        (c) => c.courseId === courseId
      );

      setCourse(selectedCourse || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading Course...</h3>;
  }

  if (!course) {
    return <h3>Course Not Found</h3>;
  }

  return (
    <div className="course-info-card">

      <div className="course-header">
        <div>
          <h2>{course.title}</h2>
          <p>{course.courseId}</p>
        </div>

        <span className="course-type">
          {course.courseType}
        </span>
      </div>

      <div className="course-grid">

        <div className="info-box">
          <label>Trainer</label>
          <p>{course.trainerId}</p>
        </div>

        <div className="info-box">
          <label>Institute</label>
          <p>{course.instituteName || "-"}</p>
        </div>

        <div className="info-box">
          <label>Level</label>
          <p>{course.level}</p>
        </div>

        <div className="info-box">
          <label>Status</label>
          <p>{course.status}</p>
        </div>

        <div className="info-box">
          <label>Duration</label>
          <p>
            {course.duration?.value} {course.duration?.unit}
          </p>
        </div>

        <div className="info-box">
          <label>Start Date</label>
          <p>{new Date(course.startDate).toLocaleDateString()}</p>
        </div>

        <div className="info-box">
          <label>End Date</label>
          <p>{new Date(course.endDate).toLocaleDateString()}</p>
        </div>

      </div>

      <div className="description-box">
        <label>Description</label>
        <p>{course.description}</p>
      </div>

    </div>
  );
}