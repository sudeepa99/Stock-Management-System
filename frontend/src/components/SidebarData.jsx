import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import DashboardIcon from "../assets/icons/Group 1.png";
import PackingIcon from "../assets/icons/packing.png";
import DispatchIcon from "../assets/icons/dispatch.png";
import ReportsIcon from "../assets/icons/reports.png";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <img src={DashboardIcon} alt="Dashboard" className="dashboard-icon"/>,
    cName: "nav-text dashboard",
  },
  {
    title: "Packing",
    path: "/packing",
    icon: <img src={PackingIcon} alt="Packing" className="packing-icon"/>,
    cName: "nav-text packing",
  },
  {
    title: "Dispatch",
    path: "/dispatch",
    icon: <img src={DispatchIcon} alt="Dispatch" className="dispatch-icon"/>,
    cName: "nav-text dispatch",
  },
  
  {
    title: "Reports",
    path: "/reports",
    icon: <img src={ReportsIcon} alt="Reports" className="reports-icon"/>,
    cName: "nav-text reports",
  },
  
  
  
 
];
