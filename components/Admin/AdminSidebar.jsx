import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  PlusCircle,
  BarChart3
} from "lucide-react";

import "./AdminSidebar.css";

// ✅ IMPORT LOGO
import mediniLogo from "../../src/assets/landingpageimages/medini_new_logo.png";

export default function AdminSidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO SECTION */}
      <div className="sidebar-logo">
        <img
          src={mediniLogo}
          alt="Medini Logo"
          className="logo-img"
        />
      </div>

      <NavLink to="/admin">
        <LayoutDashboard size={20} />
        Dashboard
      </NavLink>

      <p className="sidebar-heading">
        MANAGE COURSE
      </p>

      <NavLink to="/admin/search-course">
        <Search size={20} />
        Search Course
      </NavLink>

      <NavLink to="/admin/add-course">
        <PlusCircle size={20} />
        Add Course
      </NavLink>

      <NavLink to="/admin/evaluation-report">
        <BarChart3 size={20} />
        Evaluation Report
      </NavLink>

    </aside>
  );
}