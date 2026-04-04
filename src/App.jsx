// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { motion } from "framer-motion";

// ── Lazy pages ──
const LandingPage = lazy(() => import("./LandingPage"));
const Login = lazy(() => import("./Login"));
const Dashboard = lazy(() => import("./Dashboard"));
const CoursePlayer = lazy(() => import("./CoursePlayer"));
const SuperAdmin = lazy(() => import("./SuperAdmin"));
const Explore = lazy(() => import("./Explore"));
const CourseDetail = lazy(() => import("./CourseDetail"));
const Checkout = lazy(() => import("./Checkout"));
const Profile = lazy(() => import("./Profile"));

// ── Animated VS Logo for loader ──
const VSLogoAnim = () => (
  <motion.div
    animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.04, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    style={{
      width: 48,
      height: 44,
      borderRadius: 13,
      background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 24px rgba(29,78,216,0.35)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 30% 25%,rgba(255,255,255,0.28),transparent 60%)",
      }}
    />
    <svg
      width="24"
      height="22"
      viewBox="0 0 44 40"
      fill="none"
      style={{ position: "relative", zIndex: 1 }}
    >
      <polyline
        points="12,10 20,28 28,10"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M30 14 C26 10,20 10,20 15 C20 19,30 19,30 24 C30 29,24 30,20 27"
        stroke="#7dd3fc"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </motion.div>
);

// ── Loading fallback ──
const Loader = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-4"
    style={{ background: "linear-gradient(145deg,#f0f4ff,#f8faff,#eaf6ff)" }}
  >
    <VSLogoAnim />
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#1d4ed8",
          }}
        />
      ))}
    </div>
  </div>
);

// ── Safely get user from localStorage ──
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user_details") || "null");
  } catch {
    return null;
  }
};

// ── Route to the correct home for each role ──
const roleHome = (role) => {
  if (role === "super_admin") return "/super-admin";
  return "/dashboard"; // tutor, user, learner, admin all use /dashboard
};

// ── Protected route
function ProtectedRoute({ children, allowedRoles }) {
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleHome(user.role)} replace />;
  }
  return children;
}

// ── Public route
function PublicRoute({ children }) {
  const user = getUser();
  if (user) return <Navigate to={roleHome(user.role)} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <Routes>
          {/* ─── Public ─── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/course-detail" element={<CourseDetail />} />

          {/* ─── Auth ─── */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* ─── Dashboard — all authenticated roles ─── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "user",
                  "learner",
                  "tutor",
                  "admin",
                  "super_admin",
                ]}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ─── Course Player — all authenticated ─── */}
          <Route
            path="/course"
            element={
              <ProtectedRoute
                allowedRoles={["user", "tutor", "admin", "super_admin"]}
              >
                <CoursePlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute
                allowedRoles={["user", "tutor", "admin", "super_admin"]}
              >
                <CoursePlayer />
              </ProtectedRoute>
            }
          />

          {/* ─── Checkout & Profile — learner + tutor (per permissions) ─── */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute
                allowedRoles={["user", "tutor", "admin", "super_admin"]}
              >
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                allowedRoles={["user", "tutor", "admin", "super_admin"]}
              >
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ─── Admin / Super Admin Command Center ─── */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />

          {/* ─── Catch-all ─── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <AppRoutes />
    </BrowserRouter>
  );
}
