import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./LandingPage"));
const Login = lazy(() => import("./Login"));
const Dashboard = lazy(() => import("./Dashboard"));
const CoursePlayer = lazy(() => import("./CoursePlayer"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const Explore = lazy(() => import("./Explore"));
const Profile = lazy(() => import("./Profile"));
const Checkout = lazy(() => import("./Checkout"));
const CourseDetail = lazy(() => import("./CourseDetail"));
const SuperAdmin = lazy(() => import("./SuperAdmin"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;