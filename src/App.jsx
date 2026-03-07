import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CoursePlayer from "./CoursePlayer";
import AdminDashboard from "./AdminDashboard";
import Explore from "./Explore";
import YouTube from "./YouTube";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<CoursePlayer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/youtube" element={<YouTube />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
