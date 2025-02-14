import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import CompanyLogo from "../assets/icons/logo.png";
import LogoutIcon from "../assets/icons/Logout.png";
import { authContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const { role, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate("/");
  };

  // Filter sidebar items based on user role
  const filteredSidebarData = SidebarData.filter((item) =>
    item.roles.includes(role)
  );

  // Function to check if the current location matches the item's path or is a subpath
  const isActivePath = (itemPath) => {
    return location.pathname.startsWith(itemPath);
  };

  return (
    <div className="nav-menu active">
      <div className="nav-menu-header">
        <img src={CompanyLogo} alt="Company Logo" className="company-logo" />
        <span className="company-name">Ceciliyan</span>
      </div>
      <ul className="nav-menu-items">
        {filteredSidebarData.map((item, index) => {
          const isActive = isActivePath(item.path);  // Check if the current path is the base or subpath of the item
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
      <button className="logout-button" onClick={handleLogout}  >
        <img src={LogoutIcon} alt="Logout" className="nav-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
