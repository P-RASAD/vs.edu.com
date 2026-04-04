import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Settings,
  LogOut,
  Flame,
  Play,
  UploadCloud,
  DollarSign,
  Users,
  X,
  Plus,
  Folder,
  Video,
  Search,
  BarChart3,
  Shield,
  Medal,
  ArrowRight,
  User,
  Phone,
  MonitorPlay,
  CheckCircle,
  Zap,
  ChevronRight,
  Bell,
  Loader2,
  BookMarked,
  XCircle,
  Radio,
  Calendar,
  Clock,
  Link2,
  Copy,
  Eye,
  PlayCircle,
  FileVideo,
  AlertTriangle,
  ArrowLeft,
  Trash2,
  ChevronLeft,
  Activity,
  RefreshCw,
  Download,
  Ban,
  CheckSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AdminService, TutorService } from "./services/api";

import {
  TutorOverview,
  TutorAnalytics,
  TutorLiveClasses,
  TutorVideoUpload,
} from "./panels/TutorPanel";
import {
  LearnerHome,
  LearnerMyPrograms,
  LearnerExplore,
} from "./panels/LearnerPanel";

const C = {
  primary: "#1d4ed8",
  secondary: "#0284c7",
  accent: "#f59e0b",
  emerald: "#10b981",
  surface: "#f0f4ff",
  surfaceDeep: "#e8efff",
  dark: "#0f172a",
  text: "#1e293b",
  textSub: "#64748b",
  border: "rgba(29,78,216,0.1)",
  borderSoft: "rgba(29,78,216,0.06)",
  gold: "#b8922a",
  gold2: "#d4a843",
  sideBg: "#ffffff",
  bg: "#f4f7ff",
};

// ── Shared UI Configurations ──
const spring = { type: "spring", stiffness: 420, damping: 32 };
const toastOK = {
  borderRadius: "12px",
  background: "#0f172a",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
};
const toastErr = {
  borderRadius: "12px",
  background: "#fff1f2",
  color: "#e11d48",
  fontSize: "13px",
  fontWeight: 600,
  border: "1px solid #fecdd3",
};

const Skel = ({ w = "100%", h = 16, r = 8 }) => (
  <div
    className="animate-pulse"
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: "rgba(29,78,216,0.07)",
    }}
  />
);

function VSLogo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.91)}
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient
          id="dbLogoGrad"
          x1="0"
          y1="0"
          x2="44"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient
          id="dbLogoGlow"
          x1="0"
          y1="0"
          x2="44"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
        <filter id="dbLogoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor="#1d4ed8"
            floodOpacity="0.3"
          />
        </filter>
      </defs>
      <rect
        width="44"
        height="40"
        rx="11"
        fill="url(#dbLogoGrad)"
        filter="url(#dbLogoShadow)"
      />
      <rect width="44" height="20" rx="11" fill="url(#dbLogoGlow)" />
      <polyline
        points="11,10 19.5,27 28,10"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M31 13.5 C27.5 10,21.5 10.5,21.5 15 C21.5 19,31 18.5,31 23 C31 27.5,25 29,21.5 26.5"
        stroke="#7dd3fc"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();

  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  });
  useEffect(() => {
    if (!authLoading && !user) navigateRef.current("/login");
  }, [user, authLoading]);

  const role = user?.role || "learner";
  const fName = user?.first_name || user?.firstName || "User";
  const isTutor = role === "tutor";
  const isAdmin = role === "admin";
  const isSuperAdmin = role === "superadmin" || role === "super_admin";
  const isAdminLevel = isAdmin || isSuperAdmin;

  const getDefaultView = () => {
    if (isAdminLevel) return "admin-hub";
    if (isTutor) return "dashboard";
    return "dashboard";
  };

  const [currentView, setCurrentView] = useState(getDefaultView);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Section 1: Foundation",
      videos: ["Introduction to Syllabus"],
    },
  ]);
  const addModule = () =>
    setModules((p) => [
      ...p,
      {
        id: Date.now(),
        title: `Section ${p.length + 1}: New Topic`,
        videos: [],
      },
    ]);
  const addVideo = (mi) =>
    setModules((p) => {
      const m = [...p];
      m[mi] = { ...m[mi], videos: [...m[mi].videos, ""] };
      return m;
    });
  const updateMod = (mi, t) =>
    setModules((p) => {
      const m = [...p];
      m[mi] = { ...m[mi], title: t };
      return m;
    });
  const updateVid = (mi, vi, t) =>
    setModules((p) => {
      const m = [...p];
      const vs = [...m[mi].videos];
      vs[vi] = t;
      m[mi] = { ...m[mi], videos: vs };
      return m;
    });
  const removeMod = (mi) => setModules((p) => p.filter((_, i) => i !== mi));
  const removeVid = (mi, vi) =>
    setModules((p) => {
      const m = [...p];
      m[mi] = { ...m[mi], videos: m[mi].videos.filter((_, i) => i !== vi) };
      return m;
    });

  const handleLogout = () => {
    logout();
    toast.success("See you soon!", { style: toastOK });
    navigate("/");
  };

  const pageTitle =
    {
      dashboard: isTutor ? `Hello, ${fName} 👋` : `Good morning, ${fName}`,
      explore: "Course Catalog",
      "my-programs": "My Programs",
      "tutor-hub": "Instructor Analytics",
      "live-classes": "Live Classes",
      "video-upload": "Video Management",
      "admin-hub": "Platform Command",
      settings: "Account Settings",
    }[currentView] || "Dashboard";

  if (authLoading || !user)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(160deg,#eaf2ff 0%,#f0f6ff 45%,#e4eeff 100%)",
        }}
      >
        <div
          className="w-10 h-10 border-2 rounded-full animate-spin"
          style={{ borderColor: C.primary, borderTopColor: "transparent" }}
        />
      </div>
    );

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(145deg,#eaf2ff 0%,#f0f6ff 50%,#e4eeff 100%)",
      }}
    >
      <Toaster position="top-right" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(29,78,216,0.06) 0%,transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(2,132,199,0.05) 0%,transparent 65%)",
          }}
        />
      </div>

      <Sidebar
        fName={fName}
        role={role}
        isTutor={isTutor}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
        isAdminLevel={isAdminLevel}
        currentView={currentView}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
        navigate={navigate}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <header
          className="h-[64px] px-7 flex items-center justify-between shrink-0"
          style={{
            borderBottom: "1px solid rgba(29,78,216,0.09)",
            background: "rgba(234,242,255,0.94)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 2px 20px rgba(29,78,216,0.06)",
          }}
        >
          <div>
            <h2
              className="text-lg font-black tracking-tight flex items-center gap-2"
              style={{ color: C.dark }}
            >
              {pageTitle}
              {isTutor && currentView === "dashboard" && (
                <Medal className="w-5 h-5 text-amber-400 fill-amber-400" />
              )}
            </h2>
            <p
              className="text-xs font-medium mt-0.5"
              style={{ color: "#64748b" }}
            >
              {isTutor && currentView === "dashboard"
                ? "📈 Revenue up 18.5% this month"
                : "Ready to level up today?"}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-blue-50 transition-colors"
              style={{ border: "1.5px solid rgba(29,78,216,0.09)" }}
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
            </motion.button>

            {isTutor && (
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsLiveModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#dc2626,#ef4444)",
                    boxShadow: "0 4px 14px rgba(220,38,38,0.28)",
                  }}
                >
                  <Radio className="w-3.5 h-3.5" /> Go Live
                </motion.button>
                <motion.button
                  onClick={() => setIsCourseModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                    boxShadow: "0 4px 16px rgba(29,78,216,0.25)",
                  }}
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Add Course
                </motion.button>
              </div>
            )}

            {isAdminLevel && (
              <motion.button
                onClick={() => setCurrentView("admin-hub")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                  boxShadow: "0 4px 14px rgba(124,58,237,0.25)",
                }}
              >
                <Shield className="w-3.5 h-3.5" /> Command Center
              </motion.button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-7 pb-20 hide-scrollbar">
          <AnimatePresence mode="wait">
            {/* TUTOR VIEWS */}
            {isTutor && currentView === "dashboard" && (
              <TutorOverview
                key="tutor-home"
                user={user}
                onGoLive={() => setIsLiveModalOpen(true)}
                onAddCourse={() => setIsCourseModalOpen(true)}
              />
            )}
            {isTutor && currentView === "tutor-hub" && (
              <TutorAnalytics key="tutor-analytics" />
            )}
            {isTutor && currentView === "live-classes" && (
              <TutorLiveClasses
                key="tutor-live"
                onGoLive={() => setIsLiveModalOpen(true)}
              />
            )}
            {isTutor && currentView === "video-upload" && (
              <TutorVideoUpload key="tutor-video" />
            )}

            {/* LEARNER / USER VIEWS */}
            {!isTutor && !isAdminLevel && currentView === "dashboard" && (
              <LearnerHome
                key="learner-home"
                user={user}
                setCurrentView={setCurrentView}
              />
            )}
            {!isTutor && !isAdminLevel && currentView === "my-programs" && (
              <LearnerMyPrograms key="learner-programs" />
            )}
            {!isAdminLevel && currentView === "explore" && (
              <LearnerExplore key="explore" />
            )}

            {/* ADMIN & COMMON VIEWS */}
            {currentView === "admin-hub" && (
              <AdminHubView key="admin" role={role} />
            )}
            {currentView === "settings" && (
              <AccountSettingsView key="settings" user={user} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {!isAdminLevel && !isTutor && currentView === "dashboard" && (
        <RightSidebar />
      )}

      <CreateCourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        modules={modules}
        addModule={addModule}
        addVideo={addVideo}
        updateMod={updateMod}
        updateVid={updateVid}
        removeMod={removeMod}
        removeVid={removeVid}
      />
      <GoLiveModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLAPSIBLE SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({
  fName,
  role,
  isTutor,
  isAdmin,
  isSuperAdmin,
  isAdminLevel,
  currentView,
  setCurrentView,
  handleLogout,
  navigate,
  collapsed,
  setCollapsed,
}) {
  const roleColor =
    {
      learner: C.primary,
      tutor: "#10b981",
      admin: "#7c3aed",
      superadmin: "#dc2626",
      super_admin: "#dc2626",
    }[role] || C.primary;
  const roleLabel =
    {
      learner: "Learner",
      tutor: "Educator",
      admin: "Admin",
      superadmin: "Super Admin",
      super_admin: "Super Admin",
    }[role] || role;

  const learnerNav =
    !isAdminLevel && !isTutor
      ? [
          {
            id: "dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
            badge: null,
          },
          { id: "explore", icon: Compass, label: "All Courses", badge: null },
          {
            id: "my-programs",
            icon: BookOpen,
            label: "My Programs",
            badge: null,
          },
        ]
      : !isAdminLevel && isTutor
        ? [
            {
              id: "dashboard",
              icon: LayoutDashboard,
              label: "Dashboard",
              badge: null,
            },
            { id: "explore", icon: Compass, label: "All Courses", badge: null },
            {
              id: "my-programs",
              icon: BookOpen,
              label: "My Programs",
              badge: null,
            },
          ]
        : [];

  const tutorNav = isTutor
    ? [
        { id: "tutor-hub", icon: BarChart3, label: "Analytics", badge: null },
        { id: "live-classes", icon: Radio, label: "Live Classes", badge: null },
        {
          id: "video-upload",
          icon: FileVideo,
          label: "Upload Videos",
          badge: null,
        },
      ]
    : [];

  const adminNav = isAdminLevel
    ? [
        {
          id: "admin-hub",
          icon: Shield,
          label: isAdmin ? "Moderation" : "Command Center",
          badge: null,
        },
      ]
    : [];

  const settingsNav = [
    { id: "settings", icon: Settings, label: "Account Settings", badge: null },
  ];

  const allGroups = [
    ...(learnerNav.length > 0
      ? [{ label: "Navigation", items: learnerNav, color: C.primary }]
      : []),
    ...(tutorNav.length > 0
      ? [{ label: "Teaching", items: tutorNav, color: "#10b981" }]
      : []),
    ...(adminNav.length > 0
      ? [{ label: "Admin", items: adminNav, color: "#7c3aed" }]
      : []),
    { label: "Account", items: settingsNav, color: C.secondary },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 68 : 252 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="h-full shrink-0 z-20 flex flex-col p-2.5 overflow-hidden"
    >
      <div
        className="flex-1 rounded-[22px] flex flex-col overflow-hidden"
        style={{
          background: "linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)",
          backdropFilter: "blur(32px)",
          borderRight: "1px solid rgba(29,78,216,0.09)",
          boxShadow: "3px 0 28px rgba(29,78,216,0.07)",
        }}
      >
        <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(29,78,216,0)",
                  "0 0 0 6px rgba(29,78,216,0.1)",
                  "0 0 0 0 rgba(29,78,216,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[11px]"
            >
              <VSLogo size={34} />
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1
                    className="text-[14px] font-black tracking-tight leading-none"
                    style={{
                      fontFamily: "'Sora','DM Sans',system-ui,sans-serif",
                    }}
                  >
                    <span style={{ color: "#0284c7" }}>VS</span>
                    <span style={{ color: "#0f172a" }}>intellecta</span>
                  </h1>
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.2em] mt-0.5 flex items-center gap-0.5"
                    style={{ fontFamily: "'Sora',system-ui,sans-serif" }}
                  >
                    <span style={{ color: "#b8922a" }}>Learn</span>
                    <span
                      style={{ color: "rgba(0,0,0,0.18)", fontSize: "4px" }}
                    >
                      ◆
                    </span>
                    <span style={{ color: "#d4a843" }}>Grow</span>
                    <span
                      style={{ color: "rgba(0,0,0,0.18)", fontSize: "4px" }}
                    >
                      ◆
                    </span>
                    <span style={{ color: "#b8922a" }}>Lead</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0"
            style={{ border: "1px solid rgba(29,78,216,0.1)" }}
          >
            {collapsed ? (
              <ChevronRight
                className="w-3.5 h-3.5"
                style={{ color: C.primary }}
              />
            ) : (
              <ChevronLeft
                className="w-3.5 h-3.5"
                style={{ color: C.primary }}
              />
            )}
          </motion.button>
        </div>

        <div
          className="mx-4 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(29,78,216,0.09),transparent)",
          }}
        />

        <nav className="flex-1 overflow-y-auto px-2 py-3 hide-scrollbar">
          {allGroups.map((group, gi) => (
            <div key={gi} className="mb-2">
              {!collapsed && (
                <p
                  className="px-3 text-[9px] font-black tracking-[0.2em] uppercase mb-1.5 mt-2"
                  style={{
                    color:
                      group.color === C.primary
                        ? "#94a3b8"
                        : group.color + "99",
                  }}
                >
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    whileTap={{ scale: 0.97 }}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all relative mb-0.5 ${collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"}`}
                    style={{ color: isActive ? "white" : "#64748b" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg,${group.color},${group.color}CC)`,
                          boxShadow: `0 4px 14px ${group.color}40`,
                        }}
                        transition={spring}
                      />
                    )}
                    <Icon
                      className="w-4 h-4 relative z-10 shrink-0"
                      style={{ color: isActive ? "white" : group.color + "88" }}
                    />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative z-10 font-semibold flex-1 text-left"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && !collapsed && (
                      <ChevronRight className="w-3 h-3 ml-auto relative z-10 opacity-50" />
                    )}
                    {item.badge > 0 && !collapsed && (
                      <span className="relative z-10 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600">
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </nav>

        {!collapsed && (
          <div className="px-3 pb-2">
            <div
              className="px-3 py-1.5 rounded-xl text-center text-[9px] font-black uppercase tracking-wider"
              style={{
                background: `${roleColor}10`,
                color: roleColor,
                border: `1px solid ${roleColor}22`,
              }}
            >
              {roleLabel} Account
            </div>
          </div>
        )}

        <div className="p-2.5">
          <div
            className={`flex items-center rounded-2xl cursor-pointer ${collapsed ? "justify-center p-2" : "gap-3 p-3"}`}
            style={{
              background:
                "linear-gradient(135deg,rgba(29,78,216,0.06),rgba(2,132,199,0.04))",
              border: "1.5px solid rgba(29,78,216,0.1)",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
              style={{
                background: `linear-gradient(135deg,${roleColor},${C.secondary})`,
              }}
            >
              {fName.charAt(0).toUpperCase()}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: C.dark }}
                  >
                    {fName}
                  </p>
                  <p
                    className="text-[10px] font-black uppercase tracking-wider"
                    style={{ color: roleColor }}
                  >
                    {roleLabel}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {!collapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-red-50 group transition-all"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RIGHT SIDEBAR (gamification)
// ─────────────────────────────────────────────────────────────────────────────
const RightSidebar = () => (
  <div className="w-[260px] h-full p-2.5 shrink-0 z-20 hidden xl:flex flex-col">
    <div
      className="flex-1 rounded-[22px] overflow-y-auto hide-scrollbar flex flex-col gap-4 p-4"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(32px)",
        border: "1.5px solid rgba(29,78,216,0.07)",
        boxShadow: "0 8px 32px rgba(29,78,216,0.06)",
      }}
    >
      <div
        className="rounded-2xl p-4"
        style={{
          background: "#f8faff",
          border: "1px solid rgba(29,78,216,0.07)",
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <p
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94a3b8" }}
          >
            Consistency
          </p>
          <CheckCircle className="w-4 h-4" style={{ color: "#10b981" }} />
        </div>
        <div className="flex justify-between">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className="text-[9px] font-black"
                style={{ color: "#cbd5e1" }}
              >
                {d}
              </span>
              {i === 3 ? (
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#FFF7ED,#FED7AA)",
                    border: "1px solid #FBD38D",
                  }}
                >
                  <Flame className="w-4 h-4" style={{ color: "#F97316" }} />
                </motion.div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background:
                      i < 3
                        ? "linear-gradient(135deg,#eef3ff,#dbeafe)"
                        : "white",
                    border: `1px solid ${i < 3 ? "rgba(29,78,216,0.12)" : "#e2e8f0"}`,
                    color: i < 3 ? C.primary : "#94a3b8",
                  }}
                >
                  {15 + i}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(145deg,${C.dark} 0%,#0D1A3E 100%)`,
          border: "1px solid rgba(2,132,199,0.15)",
          boxShadow: "0 8px 28px rgba(29,78,216,0.15)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-28 h-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(2,132,199,0.2),transparent)",
            transform: "translate(30%,-30%)",
          }}
        />
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="w-4 h-4" style={{ color: C.secondary }} />
          <p
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: C.secondary }}
          >
            Daily Challenge
          </p>
        </div>
        <h4 className="font-black text-white text-base leading-tight mb-1">
          Logic Puzzle
        </h4>
        <p
          className="text-xs mb-4 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Solve today's puzzle and earn 50 XP.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
          style={{
            background: `linear-gradient(135deg,${C.secondary},${C.primary})`,
            color: "white",
            boxShadow: "0 4px 16px rgba(2,132,199,0.28)",
          }}
        >
          Start Quiz (+50 XP)
        </motion.button>
      </div>
      <div
        className="rounded-2xl p-4"
        style={{
          background: "#f8faff",
          border: "1px solid rgba(29,78,216,0.07)",
        }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <p
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94a3b8" }}
          >
            Weekly XP Goal
          </p>
          <span className="text-xs font-black" style={{ color: C.primary }}>
            320 / 500
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden mb-1.5"
          style={{ background: "#eef3ff" }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "64%" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg,${C.primary},${C.secondary})`,
            }}
          />
        </div>
        <p className="text-[10px]" style={{ color: "#94a3b8" }}>
          180 XP to your next badge 🏆
        </p>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN HUB VIEW
// ─────────────────────────────────────────────────────────────────────────────
const AdminHubView = ({ role }) => {
  const isSuperAdmin = role === "superadmin" || role === "super_admin";
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null);
  const [reviewing, setReviewing] = useState(null);
  const [activeVid, setActiveVid] = useState("");
  const [checklist, setChecklist] = useState({
    copyright: false,
    content: false,
    quality: false,
  });
  const [section, setSection] = useState("overview");

  useEffect(() => {
    Promise.all([
      AdminService.getPlatformStats(),
      AdminService.getPendingCourses(),
      AdminService.getUsers(),
      isSuperAdmin
        ? AdminService.getTransactions()
        : Promise.resolve({ data: [] }),
    ])
      .then(([s, p, u, t]) => {
        setStats(s.data);
        setPending(p.data);
        setUsers(u.data);
        setTxns(t.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const moderate = async (courseId, status) => {
    const allOk = Object.values(checklist).every(Boolean);
    if (status === "approved" && !allOk)
      return toast.error("Complete all safety checks first.", {
        style: toastErr,
      });
    setActioning(courseId);
    try {
      await AdminService.moderateCourse(courseId, status);
      setPending((p) => p.filter((c) => c.id !== courseId));
      setReviewing(null);
      toast.success(
        status === "approved" ? "Course approved ✓" : "Course rejected",
        { style: toastOK },
      );
    } catch {
      toast.error("Action failed", { style: toastErr });
    } finally {
      setActioning(null);
    }
  };

  const sections = [
    { id: "overview", label: "Overview", icon: Activity },
    {
      id: "moderation",
      label: "Moderation",
      icon: Shield,
      badge: pending.length,
    },
    { id: "users", label: "Users", icon: Users },
    ...(isSuperAdmin
      ? [{ id: "finance", label: "Finance", icon: DollarSign }]
      : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto pt-6 space-y-6"
    >
      <div className="flex gap-2 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSection(s.id);
              setReviewing(null);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background:
                section === s.id
                  ? `linear-gradient(135deg,${C.primary},${C.secondary})`
                  : "white",
              color: section === s.id ? "white" : "#64748b",
              border: `1.5px solid ${section === s.id ? "transparent" : "rgba(29,78,216,0.09)"}`,
              boxShadow:
                section === s.id ? "0 4px 14px rgba(29,78,216,0.25)" : "none",
            }}
          >
            <s.icon className="w-3.5 h-3.5" /> {s.label}
            {s.badge > 0 && (
              <span
                className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${section === s.id ? "bg-white text-blue-600" : "bg-rose-100 text-rose-600"}`}
              >
                {s.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {section === "overview" && (
        <div className="space-y-5">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 animate-pulse"
                    style={{
                      background: "white",
                      border: "1.5px solid rgba(29,78,216,0.09)",
                      boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
                    }}
                  >
                    <Skel h={60} />
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Revenue",
                  val: stats?.totalPlatformRevenue,
                  icon: DollarSign,
                  color: "#7c3aed",
                  bg: "#F5F3FF",
                },
                {
                  label: "Active Users",
                  val: stats?.totalActiveUsers,
                  icon: Users,
                  color: C.primary,
                  bg: "#EEF3FF",
                },
                {
                  label: "Published",
                  val: String(stats?.publishedCourses || 142),
                  icon: BookOpen,
                  color: C.secondary,
                  bg: "#EAF6FF",
                },
                {
                  label: "Pending Review",
                  val: String(pending.length),
                  icon: Shield,
                  color: "#f59e0b",
                  bg: "#FFFBEB",
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl flex items-center gap-3"
                  style={{
                    background: "white",
                    border: "1.5px solid rgba(29,78,216,0.07)",
                    boxShadow: "0 4px 16px rgba(29,78,216,0.05)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.bg }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-black uppercase tracking-wider"
                      style={{ color: "#94a3b8" }}
                    >
                      {s.label}
                    </p>
                    <p className="text-xl font-black" style={{ color: C.dark }}>
                      {s.val}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {isSuperAdmin && txns.length > 0 && (
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "white",
                border: "1.5px solid rgba(29,78,216,0.09)",
                boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
              }}
            >
              <div
                className="px-6 py-4 flex justify-between items-center"
                style={{
                  borderBottom: "1px solid rgba(29,78,216,0.06)",
                  background: "#f8faff",
                }}
              >
                <p className="text-sm font-black" style={{ color: C.dark }}>
                  Recent Transactions
                </p>
                <button
                  onClick={() => setSection("finance")}
                  className="text-xs font-bold"
                  style={{ color: C.primary }}
                >
                  View All
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
                  <tr>
                    {["ID", "User", "Item", "Amount", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {txns.map((t, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-5 py-3 text-xs font-black text-slate-400">
                        {t.id}
                      </td>
                      <td
                        className="px-5 py-3 text-sm font-bold"
                        style={{ color: C.dark }}
                      >
                        {t.user}
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-500">
                        {t.item}
                      </td>
                      <td
                        className={`px-5 py-3 text-sm font-black ${t.amount.startsWith("-") ? "text-rose-500" : "text-emerald-600"}`}
                      >
                        {t.amount}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${t.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {section === "moderation" && (
        <div>
          {!reviewing ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-black" style={{ color: C.dark }}>
                  Pending Courses ({pending.length})
                </p>
                <button
                  onClick={async () => {
                    setLoading(true);
                    const r = await AdminService.getPendingCourses();
                    setPending(r.data);
                    setLoading(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: C.primary }}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>
              {pending.length === 0 ? (
                <div
                  className="flex flex-col items-center py-16 text-center rounded-2xl"
                  style={{
                    background: "white",
                    border: "1.5px solid rgba(29,78,216,0.09)",
                    boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
                  }}
                >
                  <CheckCircle className="w-12 h-12 mb-3 text-emerald-400" />
                  <p className="font-bold text-slate-500">Queue is clear!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {pending.map((c) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="rounded-2xl overflow-hidden flex flex-col"
                        style={{
                          background: "white",
                          border: "1.5px solid rgba(29,78,216,0.09)",
                          boxShadow: "0 4px 20px rgba(29,78,216,0.06)",
                        }}
                      >
                        <div className="p-5 flex-1 flex flex-col">
                          <span className="w-max bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-3">
                            Pending
                          </span>
                          <h4
                            className="font-extrabold text-sm leading-snug mb-1.5"
                            style={{ color: C.dark }}
                          >
                            {c.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mb-3 font-medium">
                            {c.description}
                          </p>
                          <div
                            className="space-y-1 mb-4 pt-3"
                            style={{
                              borderTop: "1px solid rgba(29,78,216,0.05)",
                            }}
                          >
                            {[
                              ["Tutor", c.instructor],
                              ["Price", c.price],
                              ["Length", c.length],
                            ].map(([k, v]) => (
                              <p
                                key={k}
                                className="text-[11px] font-bold flex justify-between"
                                style={{ color: "#94a3b8" }}
                              >
                                <span>{k}</span>
                                <span style={{ color: C.dark }}>{v}</span>
                              </p>
                            ))}
                          </div>
                          <div className="mt-auto flex gap-2">
                            <button
                              onClick={() => {
                                setReviewing(c);
                                setActiveVid(c.curriculum[0].video);
                                setChecklist({
                                  copyright: false,
                                  content: false,
                                  quality: false,
                                });
                              }}
                              className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:bg-blue-600 hover:text-white"
                              style={{
                                background: "#eef3ff",
                                color: C.primary,
                                border: `1px solid rgba(29,78,216,0.15)`,
                              }}
                            >
                              <PlayCircle className="w-3.5 h-3.5" /> Review
                            </button>
                            <button
                              onClick={async () => {
                                setActioning(c.id);
                                await AdminService.moderateCourse(
                                  c.id,
                                  "rejected",
                                );
                                setPending((p) =>
                                  p.filter((x) => x.id !== c.id),
                                );
                                setActioning(null);
                                toast.success("Rejected", { style: toastOK });
                              }}
                              disabled={actioning === c.id}
                              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 hover:bg-rose-50"
                              style={{
                                background: "#fff1f2",
                                border: "1px solid #fecdd3",
                              }}
                            >
                              {actioning === c.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2rem] overflow-hidden"
              style={{
                background: "white",
                border: "1.5px solid rgba(29,78,216,0.08)",
                boxShadow: "0 8px 40px rgba(29,78,216,0.08)",
              }}
            >
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setReviewing(null)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="font-black text-base">{reviewing.title}</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {reviewing.instructor} · {reviewing.price}
                    </p>
                  </div>
                </div>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/50 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Moderation Active
                </span>
              </div>
              <div
                className="flex flex-col lg:flex-row"
                style={{ height: 540 }}
              >
                <div className="flex-1 bg-black relative">
                  <iframe
                    src={activeVid}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="w-full lg:w-[320px] bg-slate-50 flex flex-col shrink-0">
                  <div className="p-5 border-b border-slate-200 flex-1 overflow-y-auto hide-scrollbar">
                    <h4 className="font-extrabold text-slate-900 mb-3 text-sm">
                      Lessons
                    </h4>
                    <div className="space-y-2">
                      {reviewing.curriculum.map((lesson, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 2 }}
                          onClick={() => setActiveVid(lesson.video)}
                          className={`w-full text-left p-3 rounded-xl border flex justify-between items-center transition-all text-xs ${activeVid === lesson.video ? "text-white border-blue-600" : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"}`}
                          style={{
                            background:
                              activeVid === lesson.video
                                ? `linear-gradient(135deg,${C.primary},${C.secondary})`
                                : "white",
                          }}
                        >
                          <span className="font-bold truncate pr-2 flex items-center gap-1.5">
                            <PlayCircle className="w-3.5 h-3.5 shrink-0" />{" "}
                            {lesson.title}
                          </span>
                          <span className="text-[9px] font-black shrink-0 opacity-70">
                            {lesson.duration}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div
                    className="p-5 bg-white"
                    style={{ boxShadow: "0 -10px 20px rgba(0,0,0,0.02)" }}
                  >
                    <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-widest flex items-center gap-1.5">
                      <CheckSquare
                        className="w-3.5 h-3.5"
                        style={{ color: C.primary }}
                      />{" "}
                      Safety Checklist
                    </h4>
                    <div className="space-y-2 mb-4">
                      {[
                        ["copyright", "No Copyright Infringement"],
                        ["content", "No inappropriate content"],
                        ["quality", "Audio & Video quality OK"],
                      ].map(([k, l]) => (
                        <label
                          key={k}
                          className="flex items-center gap-2.5 text-xs font-bold text-slate-600 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={checklist[k]}
                            onChange={(e) =>
                              setChecklist((p) => ({
                                ...p,
                                [k]: e.target.checked,
                              }))
                            }
                            className="w-4 h-4 rounded focus:ring-blue-500"
                            style={{ accentColor: C.primary }}
                          />
                          <span className="group-hover:text-slate-900 transition-colors">
                            {l}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => moderate(reviewing.id, "approved")}
                        disabled={!!actioning}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 text-white disabled:opacity-60"
                        style={{
                          background: "linear-gradient(135deg,#059669,#10B981)",
                          boxShadow: "0 4px 14px rgba(16,185,129,0.22)",
                        }}
                      >
                        {actioning ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}{" "}
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => moderate(reviewing.id, "rejected")}
                        disabled={!!actioning}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-60"
                        style={{
                          background: "#fff1f2",
                          color: "#e11d48",
                          border: "2px solid #fecdd3",
                        }}
                      >
                        {actioning ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}{" "}
                        Reject
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {section === "users" && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "white",
            border: "1.5px solid rgba(29,78,216,0.09)",
            boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
          }}
        >
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{
              borderBottom: "1px solid rgba(29,78,216,0.06)",
              background: "#f8faff",
            }}
          >
            <p className="text-sm font-black" style={{ color: C.dark }}>
              Platform Users
            </p>
            {loading && (
              <Loader2
                className="w-4 h-4 animate-spin"
                style={{ color: C.primary }}
              />
            )}
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
              <tr>
                {["User", "Role", "Status", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                        style={{
                          background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                        }}
                      >
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: C.dark }}
                        >
                          {u.name}
                        </p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${u.role === "Tutor" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${u.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                    {u.joined}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-rose-50 transition-colors">
                        <Ban className="w-3.5 h-3.5 text-rose-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section === "finance" && isSuperAdmin && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "white",
            border: "1.5px solid rgba(29,78,216,0.09)",
            boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
          }}
        >
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{
              borderBottom: "1px solid rgba(29,78,216,0.06)",
              background: "#f8faff",
            }}
          >
            <p className="text-sm font-black" style={{ color: C.dark }}>
              Financial Reports
            </p>
            <button
              className="flex items-center gap-1.5 text-xs font-bold"
              style={{ color: C.primary }}
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
              <tr>
                {["ID", "User", "Item", "Amount", "Date", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {txns.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 text-xs font-black text-slate-400">
                    {t.id}
                  </td>
                  <td
                    className="px-5 py-3 text-sm font-bold"
                    style={{ color: C.dark }}
                  >
                    {t.user}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">{t.item}</td>
                  <td
                    className={`px-5 py-3 text-sm font-black ${t.amount.startsWith("-") ? "text-rose-500" : "text-emerald-600"}`}
                  >
                    {t.amount}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-400">{t.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${t.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
const AccountSettingsView = ({ user }) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Preferences saved!", { style: toastOK });
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl pt-6"
    >
      <form
        onSubmit={handleSave}
        className="rounded-2xl p-7"
        style={{
          background: "white",
          border: "1.5px solid rgba(29,78,216,0.07)",
          boxShadow: "0 4px 24px rgba(29,78,216,0.05)",
        }}
      >
        <div
          className="flex items-center gap-5 mb-7 pb-7"
          style={{ borderBottom: "1px solid rgba(29,78,216,0.06)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
            }}
          >
            {(user?.firstName || "U").charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-black mb-1" style={{ color: C.dark }}>
              {user?.firstName} {user?.lastName}
            </h3>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-max"
              style={{
                background: "#eef3ff",
                color: C.primary,
                border: "1px solid rgba(29,78,216,0.12)",
              }}
            >
              <Shield className="w-3 h-3" /> {user?.role}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "firstName", label: "First Name", icon: User, type: "text" },
            { key: "lastName", label: "Last Name", icon: User, type: "text" },
            {
              key: "email",
              label: "Email",
              icon: User,
              type: "email",
              disabled: true,
            },
            { key: "mobile", label: "Mobile", icon: Phone, type: "tel" },
          ].map((f) => (
            <div key={f.key}>
              <label
                className="text-[10px] font-black uppercase tracking-[0.15em] block mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                {f.label}
              </label>
              <div className="relative">
                <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={f.type}
                  disabled={f.disabled}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                  style={{
                    background: f.disabled ? "#f8fafc" : "white",
                    border: `1.5px solid ${f.disabled ? "#e2e8f0" : "rgba(29,78,216,0.13)"}`,
                    color: f.disabled ? "#94a3b8" : C.dark,
                    cursor: f.disabled ? "not-allowed" : "auto",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-6 pt-6 flex justify-end"
          style={{ borderTop: "1px solid rgba(29,78,216,0.06)" }}
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              boxShadow: "0 4px 16px rgba(29,78,216,0.25)",
            }}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              "Update Preferences"
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────────────────────────
const CreateCourseModal = ({
  isOpen,
  onClose,
  modules,
  addModule,
  addVideo,
  updateMod,
  updateVid,
  removeMod,
  removeVid,
}) => {
  const [meta, setMeta] = useState({
    title: "",
    category: "",
    duration: "",
    price: "",
    visibility: "public",
  });
  const [submitting, setSubmitting] = useState(false);
  const handlePublish = async () => {
    if (!meta.title.trim())
      return toast.error("Course title is required", { style: toastErr });
    if (!meta.price.trim())
      return toast.error("Price is required", { style: toastErr });
    if (modules.reduce((a, m) => a + m.videos.length, 0) === 0)
      return toast.error("Add at least one video", { style: toastErr });
    setSubmitting(true);
    try {
      await TutorService.createCourse({
        ...meta,
        modules: modules.map((m) => ({ title: m.title, videos: m.videos })),
      });
      toast.success("Course submitted for review 🚀", { style: toastOK });
      setMeta({
        title: "",
        category: "",
        duration: "",
        price: "",
        visibility: "public",
      });
      onClose();
    } catch {
      toast.error("Publish failed", { style: toastErr });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(15,23,42,0.65)",
            backdropFilter: "blur(16px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
            transition={spring}
            className="w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "white",
              border: "1.5px solid rgba(29,78,216,0.1)",
              boxShadow: "0 40px 80px rgba(29,78,216,0.15)",
            }}
          >
            <div
              className="px-7 py-4 flex items-center justify-between shrink-0"
              style={{
                borderBottom: "1px solid rgba(29,78,216,0.06)",
                background: "#f8faff",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                  }}
                >
                  <UploadCloud className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-black" style={{ color: C.dark }}>
                  Add New Course
                </h2>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <X className="w-4 h-4 text-slate-500" />
              </motion.button>
            </div>
            <div className="p-7 overflow-y-auto flex-1 hide-scrollbar space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "#94a3b8" }}
                  >
                    Course Details
                  </p>
                  {[
                    ["title", "Course Title *"],
                    ["category", "Category"],
                    ["duration", "Duration (e.g. 40 Hours)"],
                  ].map(([k, ph]) => (
                    <input
                      key={k}
                      type="text"
                      value={meta[k]}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, [k]: e.target.value }))
                      }
                      placeholder={ph}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                      style={{
                        background: "white",
                        border: "1.5px solid rgba(29,78,216,0.09)",
                        color: C.dark,
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "#94a3b8" }}
                  >
                    Pricing
                  </p>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-4 top-3 w-4 h-4"
                      style={{ color: "#10b981" }}
                    />
                    <input
                      type="text"
                      value={meta.price}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, price: e.target.value }))
                      }
                      placeholder="Selling Price *"
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                      style={{
                        background: "#f0fdf4",
                        border: "1.5px solid #bbf7d0",
                        color: "#065f46",
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    {[
                      ["public", "🌐 Public"],
                      ["private", "🔒 Private"],
                    ].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setMeta((p) => ({ ...p, visibility: val }))
                        }
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background:
                            meta.visibility === val ? C.primary : "white",
                          color: meta.visibility === val ? "white" : "#64748b",
                          border: `1.5px solid ${meta.visibility === val ? "transparent" : "#e2e8f0"}`,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "#f8faff",
                      border: "1.5px solid rgba(29,78,216,0.07)",
                    }}
                  >
                    <p
                      className="text-[9px] font-black uppercase tracking-[0.15em] mb-1"
                      style={{ color: "#94a3b8" }}
                    >
                      Summary
                    </p>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#64748b" }}
                    >
                      {modules.length} section{modules.length !== 1 ? "s" : ""}{" "}
                      · {modules.reduce((a, m) => a + m.videos.length, 0)} video
                      {modules.reduce((a, m) => a + m.videos.length, 0) !== 1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{ borderTop: "1px solid rgba(29,78,216,0.06)" }}
                className="pt-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "#94a3b8" }}
                  >
                    Curriculum Builder
                  </p>
                  <motion.button
                    onClick={addModule}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Section
                  </motion.button>
                </div>
                <div className="space-y-2.5">
                  {modules.map((mod, mi) => (
                    <div
                      key={mod.id}
                      className="rounded-xl overflow-hidden"
                      style={{
                        border: "1.5px solid rgba(29,78,216,0.07)",
                        background: "white",
                      }}
                    >
                      <div
                        className="px-4 py-3 flex justify-between items-center gap-3"
                        style={{
                          background: "#f8faff",
                          borderBottom: "1px solid rgba(29,78,216,0.06)",
                        }}
                      >
                        <div className="flex items-center gap-2.5 flex-1">
                          <Folder
                            className="w-4 h-4 shrink-0"
                            style={{ color: C.primary }}
                          />
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => updateMod(mi, e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-bold w-full"
                            style={{ color: C.dark }}
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => removeMod(mi)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                            style={{ border: "1px solid #e2e8f0" }}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => addVideo(mi)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                            style={{
                              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="p-2 space-y-1">
                        <AnimatePresence>
                          {mod.videos.map((vid, vi) => (
                            <motion.div
                              key={vi}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-3.5 py-3 rounded-lg group hover:bg-blue-50/40 transition-colors"
                              style={{
                                border: "1px solid rgba(29,78,216,0.07)",
                                marginBottom: 4,
                              }}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <Video className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                <input
                                  type="text"
                                  value={
                                    typeof vid === "object" ? vid.title : vid
                                  }
                                  onChange={(e) =>
                                    updateVid(
                                      mi,
                                      vi,
                                      typeof vid === "object"
                                        ? { ...vid, title: e.target.value }
                                        : e.target.value,
                                    )
                                  }
                                  placeholder="Lesson title (e.g. Introduction to Algebra)"
                                  className="bg-transparent border-none outline-none text-sm flex-1 font-medium"
                                  style={{ color: C.dark }}
                                />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  onClick={() => removeVid(mi, vi)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                </motion.button>
                              </div>
                              <div className="flex items-center gap-2 pl-6">
                                <div className="flex gap-1.5">
                                  {[
                                    {
                                      key: "youtube",
                                      label: "YouTube",
                                      icon: "▶",
                                      color: "#ef4444",
                                    },
                                    {
                                      key: "direct",
                                      label: "Direct Link",
                                      icon: "🔗",
                                      color: C.primary,
                                    },
                                  ].map((src) => {
                                    const current =
                                      typeof vid === "object"
                                        ? vid.sourceType || "youtube"
                                        : "youtube";
                                    return (
                                      <button
                                        key={src.key}
                                        type="button"
                                        onClick={() =>
                                          updateVid(mi, vi, {
                                            ...(typeof vid === "object"
                                              ? vid
                                              : { title: vid }),
                                            sourceType: src.key,
                                            url: "",
                                          })
                                        }
                                        className="px-2 py-0.5 rounded text-[10px] font-bold transition-all"
                                        style={{
                                          background:
                                            current === src.key
                                              ? src.color
                                              : "white",
                                          color:
                                            current === src.key
                                              ? "white"
                                              : "#94a3b8",
                                          border: `1px solid ${current === src.key ? src.color : "#e2e8f0"}`,
                                        }}
                                      >
                                        {src.icon} {src.label}
                                      </button>
                                    );
                                  })}
                                </div>
                                <div className="relative flex-1">
                                  <Link2 className="absolute left-2.5 top-1.5 w-3 h-3 text-slate-400" />
                                  <input
                                    type="url"
                                    value={
                                      typeof vid === "object"
                                        ? vid.url || ""
                                        : ""
                                    }
                                    onChange={(e) =>
                                      updateVid(mi, vi, {
                                        ...(typeof vid === "object"
                                          ? vid
                                          : {
                                              title: vid,
                                              sourceType: "youtube",
                                            }),
                                        url: e.target.value,
                                      })
                                    }
                                    placeholder={
                                      typeof vid === "object" &&
                                      vid.sourceType === "direct"
                                        ? "https://your-server.com/video.mp4"
                                        : "https://youtu.be/xxxxxxxxxx or youtube.com/watch?v=..."
                                    }
                                    className="w-full pl-8 pr-3 py-1 rounded-lg text-xs font-medium outline-none transition-all"
                                    style={{
                                      background: "#f8faff",
                                      border: "1px solid rgba(29,78,216,0.1)",
                                      color: C.dark,
                                    }}
                                  />
                                </div>
                                {(() => {
                                  const url =
                                    typeof vid === "object"
                                      ? vid.url || ""
                                      : "";
                                  const ytMatch = url.match(
                                    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
                                  );
                                  if (!ytMatch) return null;
                                  return (
                                    <div className="mt-2 pl-0 flex items-center gap-2">
                                      <img
                                        src={`https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`}
                                        className="w-20 h-12 rounded-lg object-cover border"
                                        style={{
                                          borderColor: "rgba(29,78,216,0.15)",
                                        }}
                                        alt="preview"
                                      />
                                      <div>
                                        <p
                                          className="text-[10px] font-bold"
                                          style={{ color: C.primary }}
                                        >
                                          ✓ YouTube video detected
                                        </p>
                                        <p
                                          className="text-[10px]"
                                          style={{ color: "#94a3b8" }}
                                        >
                                          ID: {ytMatch[1]}
                                        </p>
                                        <a
                                          href={`https://youtu.be/${ytMatch[1]}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-[10px] font-bold underline"
                                          style={{ color: "#ef4444" }}
                                        >
                                          Preview →
                                        </a>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {mod.videos.length === 0 && (
                          <p
                            className="text-xs px-4 py-2 italic"
                            style={{ color: "#cbd5e1" }}
                          >
                            No videos yet — click + to add
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="px-7 py-4 flex justify-end gap-3 shrink-0"
              style={{
                borderTop: "1px solid rgba(29,78,216,0.06)",
                background: "#f8faff",
              }}
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50"
                style={{
                  color: "#64748b",
                  background: "white",
                  border: "1px solid #e2e8f0",
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handlePublish}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 disabled:opacity-60"
                style={{
                  background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                  boxShadow: "0 4px 16px rgba(29,78,216,0.25)",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" /> Publish Course
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const GoLiveModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
    description: "",
  });
  const [scheduling, setScheduling] = useState(false);
  const [scheduled, setScheduled] = useState(null);

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!form.title.trim())
      return toast.error("Session title required", { style: toastErr });
    setScheduling(true);
    try {
      const res = await TutorService.scheduleLiveClass(form);
      setScheduled(res.data.meetLink);
      toast.success("Live class scheduled! 🎉", { style: toastOK });
    } catch {
      toast.error("Scheduling failed", { style: toastErr });
    } finally {
      setScheduling(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(scheduled);
    toast.success("Link copied!", { style: toastOK });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(15,23,42,0.65)",
            backdropFilter: "blur(16px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
            transition={spring}
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: "white",
              border: "1.5px solid rgba(220,38,38,0.12)",
              boxShadow: "0 40px 80px rgba(220,38,38,0.12)",
            }}
          >
            <div
              className="px-7 py-5 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg,#0a0f1e,#1a0520)",
                borderBottom: "1px solid rgba(220,38,38,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#dc2626,#ef4444)",
                  }}
                >
                  <Radio className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white">
                    Schedule Live Class
                  </h2>
                  <p className="text-[10px] text-slate-400">
                    Google Meet integration
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => {
                  onClose();
                  setScheduled(null);
                  setForm({
                    title: "",
                    course: "",
                    date: "",
                    time: "",
                    description: "",
                  });
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            <div className="p-7">
              {!scheduled ? (
                <form onSubmit={handleSchedule} className="space-y-4">
                  <div>
                    <label
                      className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5"
                      style={{ color: "#94a3b8" }}
                    >
                      Session Title *
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="e.g. UPSC Prelims Doubt Session"
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                      style={{
                        background: "#f8faff",
                        border: "1.5px solid rgba(29,78,216,0.1)",
                        color: C.dark,
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5"
                        style={{ color: "#94a3b8" }}
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, date: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                        style={{
                          background: "#f8faff",
                          border: "1.5px solid rgba(29,78,216,0.1)",
                          color: C.dark,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5"
                        style={{ color: "#94a3b8" }}
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, time: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                        style={{
                          background: "#f8faff",
                          border: "1.5px solid rgba(29,78,216,0.1)",
                          color: C.dark,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5"
                      style={{ color: "#94a3b8" }}
                    >
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, description: e.target.value }))
                      }
                      placeholder="What will be covered?"
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none resize-none"
                      style={{
                        background: "#f8faff",
                        border: "1.5px solid rgba(29,78,216,0.1)",
                        color: C.dark,
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={scheduling}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg,#dc2626,#ef4444)",
                      boxShadow: "0 6px 20px rgba(220,38,38,0.32)",
                    }}
                  >
                    {scheduling ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />{" "}
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <Radio className="w-4 h-4" /> Schedule Class
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: "linear-gradient(135deg,#ecfdf5,#d1fae5)",
                    }}
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3
                    className="text-lg font-black mb-1"
                    style={{ color: C.dark }}
                  >
                    Class Scheduled!
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-5">
                    Share this link with your students
                  </p>
                  <div
                    className="flex items-center gap-2 p-3 rounded-xl mb-4"
                    style={{
                      background: "#f8faff",
                      border: "1.5px solid rgba(29,78,216,0.1)",
                    }}
                  >
                    <p
                      className="text-xs font-bold flex-1 truncate text-left"
                      style={{ color: C.primary }}
                    >
                      {scheduled}
                    </p>
                    <motion.button
                      onClick={copyLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shrink-0"
                      style={{ background: C.primary }}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(scheduled, "_blank")}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg,#dc2626,#ef4444)",
                      }}
                    >
                      Join Now
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        setScheduled(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                      style={{
                        background: "#f8faff",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
