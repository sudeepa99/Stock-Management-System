import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import CompanyLogo from "../assets/icons/logo.png";
import LogoutIcon from "../assets/icons/Logout.png";
const Navbar = () => {
  const location = useLocation();

  return (
    <div className="nav-menu active">
      <div className="nav-menu-header">
        <img src={CompanyLogo} alt="Company Logo" className="company-logo" />
        <span className="company-name">Ceciliyan</span>
      </div>
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path} className={`${isActive ? 'active' : ''} ${item.title.toLowerCase()}`}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="logout-button">
        <img src={LogoutIcon} alt="Logout" className="nav-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
