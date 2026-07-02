import { Routes, Route } from "react-router-dom";

import AdminHeader from "../components/Admin/AdminHeader";
import AdminSidebar from "../components/Admin/AdminSidebar";

import Dashboard from "../pages/Admin/Dashboard";
import SearchCourse from "../pages/Admin/SearchCourse";
import AddCourse from "../pages/Admin/AddCourse";
import EvaluationReport from "../pages/Admin/EvaluationReport";
import CourseDetails from "../pages/Admin/CourseDetails";

import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-right">

        <AdminHeader />

        <div className="admin-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="search-course"
              element={<SearchCourse />}
            />

            <Route
              path="add-course"
              element={<AddCourse />}
            />

            <Route
              path="evaluation-report"
              element={<EvaluationReport />}
            />

            {/* Course Details Page */}

            <Route
              path="courses/:courseId"
              element={<CourseDetails />}
            />

          </Routes>

        </div>

      </div>

    </div>
  );
}