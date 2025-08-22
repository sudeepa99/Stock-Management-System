import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const AppLayout = () => (
  <>
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  </>
);

export default AppLayout;
