import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CoursePlayer from "./CoursePlayer";
import AdminDashboard from "./AdminDashboard";
import Explore from "./Explore";
import Profile from "./Profile";
import Checkout from "./Checkout";
import CourseDetail from "./CourseDetail";
import SuperAdmin from "./SuperAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<CoursePlayer />} />
        <Route path="/user" element={<AdminDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/course-detail" element={<CourseDetail />} />

        <Route path="/super-admin" element={<SuperAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
