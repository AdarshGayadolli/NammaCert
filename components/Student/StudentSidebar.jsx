import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Search,
    BookOpen,
    CheckCircle
} from "lucide-react";

// Reuse Admin Sidebar CSS
import "../Admin/AdminSidebar.css";

export default function StudentSidebar() {

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">
                MEDINI
            </div>

            <NavLink to="/student">

                <LayoutDashboard />

                Dashboard

            </NavLink>

            <div className="sidebar-heading">

                COURSES

            </div>

            {/* <NavLink to="/student/search-course">

                <Search />

                Search Course

            </NavLink> */}

            <NavLink to="/student/my-course">

                <BookOpen />

                My Course

            </NavLink>

            <NavLink to="/student/finished-course">

                <CheckCircle />

                Finished Course

            </NavLink>

        </aside>

    );

}