import { Link, NavLink, Outlet } from "react-router-dom";
import MainLayout from "../layout/main-layout";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

export default function ContactPage() {
    return (
        <MainLayout>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/list'}>
                        <FaUsers size={20} className="me-2"/>
                        All Contact
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/create'}>
                        <FaUserPlus size={20} className="me-2"/>
                        Create Contact
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/details'}>Contact Details</NavLink>
                </li>
            </ul>
            <Outlet/>
        </MainLayout>
    )
}