// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import { AuthProvider, useAuth } from "./context/AuthContext";

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

// ── Protected route wrapper ──
function ProtectedRoute({ children }) {
  // const { user, loading } = useAuth();
  // if (loading) return <Loader />;
  // if (!user) return <Navigate to="/login" replace />;
  // if (allowedRoles && !allowedRoles.includes(user.role))
  //   return <Navigate to="/dashboard" replace />;
  return children;
}

// ── Public-only route (redirect logged-in users away from /login) ──
function PublicRoute({ children }) {
  // const { user, loading, dashboardRoute } = useAuth();
  // if (loading) return <Loader />;
  // if (user) return <Navigate to={dashboardRoute()} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
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

        {/* Protected — all logged-in users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course"
          element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
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
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Toaster position="top-right" />
        <AppRoutes />
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}
