import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CoursePlayer from "./CoursePlayer";
import LandingPage from "./LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. The Landing Page is now the main entry point */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Login gets its own specific page */}
        <Route path="/login" element={<Login />} />

        {/* 3. The Dashboard and Course Player remain the same */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<CoursePlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
