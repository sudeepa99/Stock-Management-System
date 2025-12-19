import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const AppLayout = () => (
  <>
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  </>
);

export default AppLayout;
