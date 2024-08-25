import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Reports from "./Routes/Reports";
import Navbar from "./components/Navbar";
import "./App.css";
import Dashboard from "./Routes/Dashboard";
import Packing from "./Routes/Packing";
import Dispatch from "./Routes/Dispatch";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "packing",
        element: <Packing />,
      },
      {
        path: "dispatch",
        element: <Dispatch />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
