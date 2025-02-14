import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login/Login';
// import Signup from '../pages/SignUp';
import Reports from "../pages/Reports/WeeklyReport/Reports";
import Dashboard from "../pages/Dashbord/Dashboard";
import Dispatch from "../pages/Dispatch/Dispatch";
import AppLayout from '../layout/Layout';
import Packing from '../pages/Packing/Packing';
import Packing1 from '../pages/Packing/Packing1';
import Packing2 from '../pages/Packing/Packing2';
import DispatchReport from '../pages/Reports/BrokerReport/DispatchReport';
import DailyReport from '../pages/Reports/DispatchReportPerDay/DispatchReport';
import DispatchReportAll from '../pages/Reports/YearlyReport/DispatchReport';
import ProtectedRoute from './ProtectedRoute';
import ReportMainPage from '../pages/Reports/ReportMainPage/ReportMainPage'

import "../App.css";


// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: < ProtectedRoute allowedRoles={["viewer", "admin"]} > <Dashboard /></ProtectedRoute>
      },
      {
        path: "packing",
        element: < ProtectedRoute allowedRoles={["admin"]} > <Packing /></ProtectedRoute>
      },
      {
        path: "packing1",
        element: < ProtectedRoute allowedRoles={["admin"]} > <Packing1 /></ProtectedRoute>
      },
      {
        path: "packing2",
        element: < ProtectedRoute allowedRoles={["admin"]} > <Packing2 /></ProtectedRoute>
      },
      {
        path: "dispatch",
        element: < ProtectedRoute allowedRoles={["admin"]} > <Dispatch /></ProtectedRoute>

      },
      {
        path: "report",
        element: < ProtectedRoute allowedRoles={["viewer", "admin"]} > <ReportMainPage /></ProtectedRoute>

      },
      {
        path: "reportW",
        element: < ProtectedRoute allowedRoles={["viewer", "admin"]} > <Reports /></ProtectedRoute>

      },
      {
        path: "reportB",
        element: < ProtectedRoute allowedRoles={["viewer", "admin"]} ><DispatchReport /></ProtectedRoute>
      },
      {
        path: "reportD",
        element: < ProtectedRoute allowedRoles={["viewer", "admin"]} ><DailyReport /></ProtectedRoute>
      },
      {
        path: "reportY",
        element: < ProtectedRoute allowedRoles={["viewer", "admin"]} ><DispatchReportAll /></ProtectedRoute>
      },

    ],
  },
]);
export default router;