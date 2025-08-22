import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import CompanyLogo from "../assets/icons/logo.png";
import LogoutIcon from "../assets/icons/Logout.png";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const { role, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
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
    <div className="flex flex-col w-64 bg-white border-r shadow-sm min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <img src={CompanyLogo} alt="Company Logo" className="h-8 w-8" />

        <span className="text-green-600 font-bold text-lg">Ceciliyan</span>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 px-4 py-6 space-y-2">
        {filteredSidebarData.map((item, index) => {
          const isActive = isActivePath(item.path);
          return (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-green-100 text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center ${
                    isActive ? "filter-green" : "filter-gray"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    className: "w-full h-full object-contain",
                  })}
                </div>

                {/* {item.icon} */}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-3 border-t text-red-600 hover:bg-red-50 transition"
      >
        <img src={LogoutIcon} alt="Logout" className="h-5 w-5" />
        <span>Logout</span>
      </button>
      <style jsx>{`
        .filter-gray {
          filter: invert(39%) sepia(10%) saturate(70%) hue-rotate(173deg)
            brightness(92%) contrast(86%);
        }
        .filter-green {
          filter: invert(48%) sepia(79%) saturate(376%) hue-rotate(87deg)
            brightness(95%) contrast(92%);
        }
      `}</style>
    </div>
  );
};

export default Navbar;
