import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './components/login/login'
import Home from './components/login/home'
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/home" element={<Home />} />   
          <Route path="/" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
