import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CoursePlayer from "./CoursePlayer"; // Import our new component!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* NEW ROUTE: The Video Player */}
        <Route path="/course" element={<CoursePlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
