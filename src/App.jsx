// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// ── Lazy pages ──
const LandingPage = lazy(() => import("./LandingPage"));
const Login = lazy(() => import("./Login"));
const Dashboard = lazy(() => import("./Dashboard"));
const CoursePlayer = lazy(() => import("./CoursePlayer"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const SuperAdmin = lazy(() => import("./SuperAdmin"));
const Explore = lazy(() => import("./Explore"));
const CourseDetail = lazy(() => import("./CourseDetail"));
const Checkout = lazy(() => import("./Checkout"));
const Profile = lazy(() => import("./Profile"));

// ── Loading fallback ──
const Loader = () => (
  <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// ── Helper: safely get user ──
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user_details") || "null");
  } catch (e) {
    console.log("e: ", e);
    return null;
  }
};

// ── Protected route ──
function ProtectedRoute({ children, allowedRoles }) {
  const user = getUser();

  // ❌ Not logged in → go to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// ── Public route ──
function PublicRoute({ children }) {
  const user = getUser();

  // ✅ Already logged in → redirect
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/course-detail" element={<CourseDetail />} />

          {/* Auth */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["tutor", "admin", "super_admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course"
            element={
              <ProtectedRoute allowedRoles={["tutor", "admin", "super_admin"]}>
                <CoursePlayer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course/:id"
            element={
              <ProtectedRoute allowedRoles={["tutor", "admin", "super_admin"]}>
                <CoursePlayer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["tutor", "admin", "super_admin"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["tutor", "admin", "super_admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Tutor / Admin */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Super Admin */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
    </BrowserRouter>
  );
}
