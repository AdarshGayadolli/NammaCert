import { Routes, Route } from "react-router-dom";

import StudentSidebar from "../components/Student/StudentSidebar";
import StudentHeader from "../components/Student/StudentHeader";

import StudentDashboard from "../pages/student/Dashboard";
import SearchCourse from "../pages/student/SearchCourse";
import MyCourse from "../pages/student/MyCourse";
import FinishedCourse from "../pages/Student/FinishedCourse";

import "./StudentLayout.css";

export default function StudentLayout() {
  return (
    <div className="student-layout">

      <StudentSidebar />

      <div className="student-main">

        <StudentHeader />

        <div className="student-content">

          <Routes>

            <Route path="/" element={<StudentDashboard />} />

            <Route path="/my-course" element={<MyCourse />} />

            <Route
              path="/finished-course"
              element={<FinishedCourse />}
            />

            <Route
              path="/search-course"
              element={<SearchCourse />}
            />

          </Routes>

        </div>

      </div>

    </div>
  );
}