import React from "react";
import DashboardIcon from "../assets/icons/Group 1.png";
import PackingIcon from "../assets/icons/packing.png";
import DispatchIcon from "../assets/icons/dispatch.png";
import ReportsIcon from "../assets/icons/reports.png";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <img src={DashboardIcon} alt="Dashboard" className="dashboard-icon" />,
    cName: "nav-text dashboard",
    roles: ["viewer", "admin"],
  },
  {
    title: "Packing",
    path: "/packing",
    icon: <img src={PackingIcon} alt="Packing" className="packing-icon" />,
    cName: "nav-text packing",
    roles: ["admin"],
  },
  {
    title: "Dispatch",
    path: "/dispatch",
    icon: <img src={DispatchIcon} alt="Dispatch" className="dispatch-icon" />,
    cName: "nav-text dispatch",
    roles: ["admin"],
  },
  {
    title: "Reports",
    path: "/report",
    icon: <img src={DispatchIcon} alt="Dispatch" className="dispatch-icon" />,
    cName: "nav-text reports",
    roles: ["viewer", "admin"],
  },
];

