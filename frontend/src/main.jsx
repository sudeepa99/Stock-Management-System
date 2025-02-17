import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'tailwindcss/tailwind.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from './context/AuthContext.jsx';
import router from './routes/Routers.jsx';
let root;
const container = document.getElementById("root");

if (!container._reactRoot) {
  root = createRoot(container);
  container._reactRoot = root;
} else {
  root = container._reactRoot;
}

root.render(
  <AuthContextProvider>
    <ToastContainer theme="dark" position="top-right" autoClose={3000} closeOnClick pauseOnHover={false} />
    <RouterProvider router={router} />
  </AuthContextProvider>
);

export default function Routers() {
  return null;
}
