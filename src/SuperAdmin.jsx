// src/SuperAdmin.jsx
// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED COMMAND CENTER — works for BOTH "admin" AND "superadmin"
// Role is read from AuthContext → user.role  (or localStorage fallback)
//
// admin:      Overview · All Courses (free view) · Moderation Queue · Users
// superadmin: All above + Final Approval Gate + Sub-admin team + Traffic + Finance
//
// Same VSintellecta logo, same brand colors (#0057FF / #00C2FF), same layout.
// Special tabs & options appear/disappear based on role — no separate component.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import {
  Activity,
  Users,
  DollarSign,
  BookOpen,
  Shield,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  TrendingUp,
  PlayCircle,
  AlertTriangle,
  ArrowLeft,
  Ban,
  CheckSquare,
  LogOut,
  RefreshCw,
  Loader2,
  Download,
  Eye,
  Clock,
  BarChart3,
  Globe,
  Zap,
  Star,
  ShieldCheck,
  ChevronRight,
  Play,
  Unlock,
  Lock,
  Database,
  Server,
  Wifi,
  Filter,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AdminService, CourseService } from "./services/api";

// ─────────────────────────────────────────────
// BRAND TOKENS — VSintellecta
// ─────────────────────────────────────────────
const B = {
  primary: "#1d4ed8",
  cyan: "#0284c7",
  dark: "#0f172a",
  surface: "#ffffff",
  border: "rgba(29,78,216,0.09)",
  bg: "linear-gradient(160deg,#ddeeff 0%,#e4f2ff 45%,#d8e8ff 100%)",
  sidebar: "#ffffff",
  sidebarBorder: "rgba(29,78,216,0.09)",
};

const GLOW = {
  overview: "#1d4ed8",
  courses: "#0284c7",
  moderation: "#f59e0b",
  approval: "#dc2626",
  users: "#7c3aed",
  finance: "#059669",
  traffic: "#0891b2",
};

const toastOK = {
  borderRadius: "12px",
  background: "#0f172a",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  border: "1px solid rgba(29,78,216,0.3)",
};
const toastErr = {
  borderRadius: "12px",
  background: "#fff1f2",
  color: "#e11d48",
  fontSize: "13px",
  fontWeight: 600,
  border: "1px solid #fecdd3",
};

const pV = {
  initial: { opacity: 0, y: 14 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

// ─── VSLogo — matches Header.jsx exactly ────────────────────────────────────
function VSLogo({ size = 32 }) {
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
          id="saLogoGrad"
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
          id="saLogoGlow"
          x1="0"
          y1="0"
          x2="44"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
        <filter id="saLogoShadow" x="-20%" y="-20%" width="140%" height="140%">
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
        fill="url(#saLogoGrad)"
        filter="url(#saLogoShadow)"
      />
      <rect width="44" height="20" rx="11" fill="url(#saLogoGlow)" />
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

// ── Mini sparkline ──
const Sparkline = ({ data, color }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-7">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
          className="flex-1 rounded-t-sm min-h-[2px]"
          style={{
            background: `${color}${i === data.length - 1 ? "ff" : "55"}`,
          }}
        />
      ))}
    </div>
  );
};

// ── Animated pulse dot ──
const Pulse = ({ color = "#10b981" }) => (
  <span className="relative flex h-2.5 w-2.5">
    <span
      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
      style={{ background: color }}
    />
    <span
      className="relative inline-flex rounded-full h-2.5 w-2.5"
      style={{ background: color }}
    />
  </span>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function SuperAdmin() {
  const navigate = useNavigate();

  // Auth — read from localStorage (no AuthContext dependency to keep this self-contained)
  const userData = (() => {
    try {
      return JSON.parse(localStorage.getItem("user_details") || "null");
    } catch {
      return null;
    }
  })();
  const role = userData?.role || "admin";
  const isSuperAdmin = role === "superadmin" || role === "super_admin";
  const userName =
    userData?.first_name || (isSuperAdmin ? "Super Admin" : "Admin");

  const [activeTab, setActiveTab] = useState("overview");
  const [reviewingCourse, setReviewingCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState("");
  const [checklist, setChecklist] = useState({
    copyright: false,
    content: false,
    quality: false,
    originality: false,
  });
  const [actioning, setActioning] = useState(null);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // API data state
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const displayCourses = selectedCourse?.children || allCourses;

  // Boot — load everything
  useEffect(() => {
    (async () => {
      try {
        const [s, u, p, c, t] = await Promise.all([
          AdminService.getPlatformStats(),
          AdminService.getUsers(),
          AdminService.getPendingCourses(),
          CourseService.getAllCourses(),
          AdminService.getTransactions(),
        ]);
        setStats(s.data);
        setUsers(u.data);
        setPending(p.data);
        setAllCourses(c.data);

        setTransactions(t.data);
      } catch {
        toast.error("Failed to load platform data", { style: toastErr });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Moderate a course
  const moderate = async (courseId, action) => {
    if (action === "approved" && !Object.values(checklist).every(Boolean)) {
      toast.error("Complete all 4 safety checks first.", { style: toastErr });
      return;
    }
    setActioning(courseId);
    try {
      await AdminService.moderateCourse(courseId, action);
      setPending((p) => p.filter((c) => c.id !== courseId));
      setReviewingCourse(null);
      toast.success(
        action === "approved"
          ? isSuperAdmin
            ? "✓ Final Approval — Course is now Live!"
            : "✓ Pre-approved — sent to Super Admin"
          : "Course rejected and tutor notified",
        { style: toastOK },
      );
    } catch {
      toast.error("Action failed — try again", { style: toastErr });
    } finally {
      setActioning(null);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Sub-admins (superadmin manages these)
  const subAdmins = [
    {
      id: "A1",
      name: "Kavitha Reddy",
      email: "kavitha@vs.com",
      region: "South India",
      pending: 4,
      approved: 127,
      status: "online",
    },
    {
      id: "A2",
      name: "Rohan Mehta",
      email: "rohan@vs.com",
      region: "West India",
      pending: 2,
      approved: 98,
      status: "online",
    },
    {
      id: "A3",
      name: "Anjali Sharma",
      email: "anjali@vs.com",
      region: "North India",
      pending: 6,
      approved: 145,
      status: "away",
    },
    {
      id: "A4",
      name: "Pradeep Kumar",
      email: "pradeep@vs.com",
      region: "East India",
      pending: 1,
      approved: 76,
      status: "offline",
    },
    {
      id: "A5",
      name: "Divya Iyer",
      email: "divya@vs.com",
      region: "Global",
      pending: 3,
      approved: 112,
      status: "online",
    },
  ];

  const trafficData = [
    { hour: "00", views: 120 },
    { hour: "04", views: 60 },
    { hour: "08", views: 890 },
    { hour: "12", views: 2400 },
    { hour: "16", views: 3100 },
    { hour: "20", views: 1800 },
    { hour: "23", views: 420 },
  ];

  // ── Nav items — superadmin gets extra tabs ──
  const navItems = [
    {
      id: "overview",
      label: "Command Overview",
      icon: Activity,
      glow: GLOW.overview,
    },
    {
      id: "courses",
      label: "All Courses",
      icon: BookOpen,
      glow: GLOW.courses,
      badge: allCourses.length,
    },
    {
      id: "moderation",
      label: isSuperAdmin ? "Sub-Admin Queue" : "Moderation",
      icon: Shield,
      glow: GLOW.moderation,
      badge: pending.length,
      urgent: pending.length > 0,
    },
    ...(isSuperAdmin
      ? [
          {
            id: "approval",
            label: "Final Approval",
            icon: ShieldCheck,
            glow: GLOW.approval,
            badge: pending.length,
            urgent: pending.length > 0,
          },
        ]
      : []),
    { id: "users", label: "Users & Admins", icon: Users, glow: GLOW.users },
    ...(isSuperAdmin
      ? [
          {
            id: "traffic",
            label: "Site Traffic",
            icon: Globe,
            glow: GLOW.traffic,
          },
          {
            id: "finance",
            label: "Financial Reports",
            icon: DollarSign,
            glow: GLOW.finance,
          },
        ]
      : []),
  ];

  const roleLabel = isSuperAdmin ? "Super Admin" : "Admin";
  const roleColor = isSuperAdmin ? "#dc2626" : "#8b5cf6";
  const roleDesc = isSuperAdmin
    ? "System Owner · All Access"
    : "Platform Moderator";

  // ══════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(160deg,#ddeeff 0%,#e4f2ff 45%,#d8e8ff 100%)",
      }}
    >
      <Toaster position="top-right" />

      {/* ═══════════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════════ */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 66 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="h-full flex flex-col shrink-0 relative z-30 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRight: "1.5px solid rgba(29,78,216,0.12)",
          boxShadow: "4px 0 32px rgba(29,78,216,0.12)",
          backdropFilter: "blur(40px)",
        }}
      >
        {/* ── Logo ── */}
        <div
          className="h-14 flex items-center px-3.5 gap-3 shrink-0 cursor-pointer"
          style={{ borderBottom: `1px solid ${B.sidebarBorder}` }}
          onClick={() => navigate("/")}
        >
          <motion.div
            className="rounded-[11px] cursor-pointer"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(29,78,216,0)",
                "0 0 0 6px rgba(29,78,216,0.1)",
                "0 0 0 0 rgba(29,78,216,0)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <VSLogo size={32} />
          </motion.div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
              >
                <p
                  className="text-[14px] font-black tracking-tight leading-none"
                  style={{
                    fontFamily: "'Sora','DM Sans',system-ui,sans-serif",
                    color: "#0f172a",
                  }}
                >
                  <span style={{ color: "#0284c7" }}>VS</span>intellecta
                </p>
                <p
                  style={{
                    fontSize: 8,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginTop: 2,
                  }}
                >
                  <span style={{ color: "#b8922a" }}>Learn</span>
                  <span style={{ color: "rgba(0,0,0,0.2)", fontSize: "4px" }}>
                    ◆
                  </span>
                  <span style={{ color: "#d4a843" }}>Grow</span>
                  <span style={{ color: "rgba(0,0,0,0.2)", fontSize: "4px" }}>
                    ◆
                  </span>
                  <span style={{ color: "#b8922a" }}>Lead</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Live status ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-3 mt-3 px-3 py-2 rounded-xl flex items-center gap-2.5"
              style={{
                background: "rgba(236,253,245,0.9)",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <Pulse color="#10b981" />
              <div className="min-w-0">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                  System Nominal
                </p>
                <p className="text-[9px] text-emerald-600 font-medium truncate">
                  99.98% uptime · All services running
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5 hide-scrollbar">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 text-[9px] font-black uppercase tracking-[0.2em] mb-3"
                style={{ color: "#cbd5e1" }}
              >
                Command Center
              </motion.p>
            )}
          </AnimatePresence>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveTab(item.id);
                  setReviewingCourse(null);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg,${item.glow},${item.glow}cc)`
                    : "transparent",
                  border: `1.5px solid ${isActive ? "transparent" : "transparent"}`,
                  boxShadow: isActive ? `0 3px 14px ${item.glow}35` : "none",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `${item.glow}10` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative z-10 w-5 h-5 flex items-center justify-center shrink-0">
                  <Icon
                    style={{
                      color: isActive ? "white" : "#475569",
                      width: 17,
                      height: 17,
                    }}
                  />
                </div>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-between min-w-0"
                    >
                      <span
                        className="text-xs font-bold truncate relative z-10"
                        style={{
                          color: isActive ? "white" : "#64748b",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.badge > 0 && (
                        <span
                          className="text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ml-1"
                          style={{
                            background: item.urgent
                              ? "#7f1d1d"
                              : `${item.glow}25`,
                            color: item.urgent ? "#fca5a5" : item.glow,
                            border: `1px solid ${item.urgent ? "#991b1b" : `${item.glow}40`}`,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {item.urgent && !sidebarOpen && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* ── Sub-admin count (superadmin only) ── */}
        <AnimatePresence>
          {sidebarOpen && isSuperAdmin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-3 mb-3 px-3 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.88)",
                border: "1.5px solid rgba(29,78,216,0.08)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Shield style={{ width: 12, height: 12, color: B.cyan }} />
                <p
                  className="text-[9px] font-black uppercase tracking-wider"
                  style={{ color: "#94a3b8" }}
                >
                  Your Sub-Admins
                </p>
              </div>
              <div className="flex -space-x-1.5 mb-1">
                {subAdmins.map((a, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white border border-[#050E2B]"
                    style={{ background: `hsl(${220 + i * 30},75%,50%)` }}
                  >
                    {a.name.charAt(0)}
                  </div>
                ))}
              </div>
              <p
                className="text-[9px] font-medium"
                style={{ color: "#94a3b8" }}
              >
                {subAdmins.filter((a) => a.status === "online").length} online ·{" "}
                {subAdmins.length} total
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── User pill + collapse toggle ── */}
        <div
          className="p-2 shrink-0"
          style={{ borderTop: "1.5px solid rgba(29,78,216,0.08)" }}
        >
          <div
            className="flex items-center gap-2.5 p-2.5 rounded-xl mb-1.5"
            style={{
              background: "rgba(255,255,255,0.88)",
              border: "1.5px solid rgba(29,78,216,0.08)",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
              style={{
                background: `linear-gradient(135deg,${roleColor},${B.cyan})`,
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {userName}
                  </p>
                  <p
                    className="text-[9px] font-medium truncate"
                    style={{ color: "#0284c7" }}
                  >
                    {roleDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-red-500/10 group transition-all shrink-0"
              >
                <LogOut
                  style={{ width: 13, height: 13 }}
                  className="text-slate-600 group-hover:text-red-400 transition-colors"
                />
              </button>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full py-1 rounded-xl text-[9px] font-bold flex items-center justify-center gap-1 hover:bg-white/5 transition-all"
            style={{ color: "#cbd5e1" }}
          >
            <ChevronRight
              style={{ width: 11, height: 11 }}
              className={sidebarOpen ? "rotate-180" : ""}
            />
            {sidebarOpen && "Collapse"}
          </button>
        </div>
      </motion.aside>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Ambient glow per active tab */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/3 w-[600px] h-[300px] rounded-full blur-[120px]"
            style={{
              background: `${GLOW[activeTab] || "#1d4ed8"}0a`,
              transition: "background 0.5s",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: "rgba(29,78,216,0.03)" }}
          />
        </div>

        {/* ── Top bar ── */}
        <header
          className="h-[52px] px-6 flex items-center justify-between shrink-0 relative z-10"
          style={{
            borderBottom: "1px solid rgba(29,78,216,0.12)",
            background: "rgba(215,235,255,0.92)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 2px 16px rgba(29,78,216,0.07)",
          }}
        >
          <div className="flex items-center gap-3">
            {navItems.find((n) => n.id === activeTab) &&
              React.createElement(
                navItems.find((n) => n.id === activeTab).icon,
                {
                  style: {
                    color: GLOW[activeTab] || B.cyan,
                    width: 16,
                    height: 16,
                  },
                },
              )}
            <h2
              className="text-sm font-black"
              style={{
                backgroundImage:
                  "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "rgba(0,0,0,0)",
                backgroundClip: "text",
              }}
            >
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: isSuperAdmin
                  ? "rgba(220,38,38,0.1)"
                  : "rgba(124,58,237,0.1)",
                color: isSuperAdmin ? "#dc2626" : "#7c3aed",
                border: `1px solid ${isSuperAdmin ? "rgba(220,38,38,0.2)" : "rgba(124,58,237,0.2)"}`,
              }}
            >
              {roleLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live users counter */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.88)",
                border: "1.5px solid rgba(29,78,216,0.1)",
                boxShadow: "0 1px 8px rgba(29,78,216,0.05)",
              }}
            >
              <Pulse color={B.cyan} />
              <span
                className="text-[10px] font-bold"
                style={{ color: "#0284c7" }}
              >
                2,847 active now
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 13,
                  height: 13,
                  color: "#64748b",
                }}
              />
              <input
                type="text"
                placeholder="Search platform..."
                className="pl-8 pr-4 py-1.5 rounded-xl text-xs font-medium focus:outline-none w-40 transition-all"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  border: "1.5px solid rgba(29,78,216,0.1)",
                  color: "#0f172a",
                  boxShadow: "0 1px 8px rgba(29,78,216,0.05)",
                }}
                onFocus={(e) => (e.target.style.borderColor = B.cyan)}
                onBlur={(e) => (e.target.style.borderColor = B.border)}
              />
            </div>

            {/* Notifications */}
            <button
              className="relative w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all"
              style={{
                border: "1.5px solid rgba(29,78,216,0.1)",
                background: "rgba(255,255,255,0.88)",
              }}
            >
              <Bell
                style={{
                  width: 15,
                  height: 15,
                  color: "#64748b",
                }}
              />
              {pending.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center bg-red-500 text-white">
                  {pending.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* ── Scroll content ── */}
        <div
          className="flex-1 overflow-y-auto hide-scrollbar relative z-10"
          style={{ padding: "18px 22px" }}
        >
          <AnimatePresence mode="wait">
            {/* ════════════════════════════════════════
                OVERVIEW
            ════════════════════════════════════════ */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                variants={pV}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {loading
                    ? Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="rounded-2xl p-5 animate-pulse"
                            style={{
                              background: "rgba(255,255,255,0.88)",
                              border: "1.5px solid rgba(29,78,216,0.08)",
                              height: 116,
                            }}
                          />
                        ))
                    : [
                        {
                          label: "Total Revenue",
                          val: stats?.totalPlatformRevenue || "₹1.24 Cr",
                          sub: "All time",
                          icon: DollarSign,
                          glow: "#10b981",
                          trend: "+14.2%",
                          up: true,
                          spark: [30, 42, 38, 55, 48, 72, 65, 80, 75, 100],
                        },
                        {
                          label: "Active Users",
                          val: stats?.totalActiveUsers || "24,592",
                          sub: "Platform",
                          icon: Users,
                          glow: B.primary,
                          trend: "+5.4%",
                          up: true,
                          spark: [50, 62, 45, 70, 58, 80, 72, 88, 82, 95],
                        },
                        {
                          label: "Pending Review",
                          val: String(pending.length),
                          sub: "Action needed",
                          icon: Shield,
                          glow: "#f59e0b",
                          trend: pending.length > 0 ? "⚠ Now" : "All clear",
                          up: pending.length === 0,
                          spark: [
                            8,
                            12,
                            5,
                            14,
                            10,
                            6,
                            9,
                            11,
                            7,
                            pending.length,
                          ],
                        },
                        {
                          label: "Platform Profit",
                          val: stats?.platformProfit || "₹37.2 L",
                          sub: "Quarter",
                          icon: TrendingUp,
                          glow: B.cyan,
                          trend: "+18.1%",
                          up: true,
                          spark: [40, 52, 48, 65, 58, 75, 70, 85, 80, 100],
                        },
                      ].map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          whileHover={{ y: -2 }}
                          className="rounded-2xl p-5 relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg,${s.glow}16,${s.glow}09)`,
                            border: `1px solid ${s.glow}28`,
                          }}
                        >
                          <div
                            className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full blur-xl"
                            style={{ background: `${s.glow}18` }}
                          />
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center"
                              style={{ background: `${s.glow}18` }}
                            >
                              <s.icon
                                style={{ color: s.glow, width: 16, height: 16 }}
                              />
                            </div>
                            <span
                              className="text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5"
                              style={{
                                background: s.up
                                  ? "rgba(16,185,129,0.12)"
                                  : "rgba(239,68,68,0.12)",
                                color: s.up ? "#34d399" : "#f87171",
                              }}
                            >
                              {s.up ? (
                                <ArrowUpRight style={{ width: 9, height: 9 }} />
                              ) : (
                                <ArrowDownRight
                                  style={{ width: 9, height: 9 }}
                                />
                              )}
                              {s.trend}
                            </span>
                          </div>
                          <p
                            className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                            style={{ color: "#64748b" }}
                          >
                            {s.label}
                          </p>
                          <p
                            className="text-xl font-black mb-0.5"
                            style={{
                              backgroundImage:
                                "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "rgba(0,0,0,0)",
                              backgroundClip: "text",
                            }}
                          >
                            {s.val}
                          </p>
                          <p
                            className="text-[10px] font-medium mb-1.5"
                            style={{ color: "#94a3b8" }}
                          >
                            {s.sub}
                          </p>
                          <Sparkline data={s.spark} color={s.glow} />
                        </motion.div>
                      ))}
                </div>

                {/* System health row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "API Response",
                      val: "128ms",
                      icon: Zap,
                      color: B.cyan,
                      bar: 87,
                    },
                    {
                      label: "DB Load",
                      val: "34%",
                      icon: Database,
                      color: "#10b981",
                      bar: 34,
                    },
                    {
                      label: "Server CPU",
                      val: "52%",
                      icon: Server,
                      color: "#f59e0b",
                      bar: 52,
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="rounded-2xl px-4 py-3.5 flex items-center gap-4"
                      style={{
                        background: "rgba(255,255,255,0.88)",
                        border: "1.5px solid rgba(29,78,216,0.08)",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${s.color}15`,
                          border: `1px solid ${s.color}25`,
                        }}
                      >
                        <s.icon
                          style={{ color: s.color, width: 17, height: 17 }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1.5">
                          <p
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "#64748b" }}
                          >
                            {s.label}
                          </p>
                          <p className="text-xs font-black text-slate-900">
                            {s.val}
                          </p>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${s.bar}%` }}
                            transition={{
                              duration: 1.1,
                              ease: "easeOut",
                              delay: i * 0.15,
                            }}
                            style={{ background: s.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-admin team (superadmin) OR stats strip (admin) */}
                {isSuperAdmin ? (
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: "1.5px solid rgba(29,78,216,0.08)",
                    }}
                  >
                    <div
                      className="px-5 py-3.5 flex items-center justify-between"
                      style={{
                        borderBottom: `1px solid rgba(29,78,216,0.08)`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield
                          style={{ width: 15, height: 15, color: B.cyan }}
                        />
                        <p
                          className="text-sm font-black"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "rgba(0,0,0,0)",
                            backgroundClip: "text",
                          }}
                        >
                          Your Admin Team
                        </p>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${B.cyan}15`, color: B.cyan }}
                        >
                          {
                            subAdmins.filter((a) => a.status === "online")
                              .length
                          }{" "}
                          online
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab("users")}
                        className="text-[10px] font-bold flex items-center gap-1 hover:text-blue-700 transition-colors"
                        style={{ color: "#0284c7" }}
                      >
                        View All{" "}
                        <ChevronRight style={{ width: 11, height: 11 }} />
                      </button>
                    </div>
                    <div
                      className="divide-y"
                      style={{ borderColor: "rgba(29,78,216,0.07)" }}
                    >
                      {subAdmins.slice(0, 3).map((a) => (
                        <div
                          key={a.id}
                          className="px-5 py-3 flex items-center gap-4 hover:bg-white/2 transition-colors"
                        >
                          <div className="relative">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                              style={{
                                background: `linear-gradient(135deg,${B.primary},${B.cyan})`,
                              }}
                            >
                              {a.name.charAt(0)}
                            </div>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#050E2B] ${a.status === "online" ? "bg-emerald-400" : a.status === "away" ? "bg-amber-400" : "bg-slate-500"}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {a.name}
                            </p>
                            <p
                              className="text-[10px] truncate"
                              style={{ color: "#94a3b8" }}
                            >
                              {a.region}
                            </p>
                          </div>
                          <div className="flex gap-4 text-[10px] text-center">
                            <div>
                              <p className="font-black text-amber-400">
                                {a.pending}
                              </p>
                              <p style={{ color: "#94a3b8" }}>Pending</p>
                            </div>
                            <div>
                              <p
                                className="font-black"
                                style={{ color: "#0284c7" }}
                              >
                                {a.approved}
                              </p>
                              <p style={{ color: "#94a3b8" }}>Done</p>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-full capitalize ${a.status === "online" ? "bg-emerald-500/15 text-emerald-400" : a.status === "away" ? "bg-amber-500/15 text-amber-400" : "bg-slate-500/15 text-slate-400"}`}
                          >
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: "1.5px solid rgba(29,78,216,0.08)",
                    }}
                  >
                    <div
                      className="px-5 py-3.5 flex justify-between items-center"
                      style={{
                        borderBottom: `1px solid rgba(29,78,216,0.08)`,
                        background: "rgba(139,92,246,0.07)",
                      }}
                    >
                      <p
                        className="text-sm font-black"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "rgba(0,0,0,0)",
                          backgroundClip: "text",
                        }}
                      >
                        Platform At a Glance
                      </p>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(139,92,246,0.15)",
                          color: "#a78bfa",
                        }}
                      >
                        Admin View
                      </span>
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-4">
                      {[
                        {
                          label: "Pending Courses",
                          val: String(pending.length),
                          glow: "#f59e0b",
                        },
                        {
                          label: "Total Users",
                          val: String(users.length),
                          glow: B.cyan,
                        },
                        {
                          label: "All Courses",
                          val: String(allCourses.length),
                          glow: "#10b981",
                        },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className="text-center p-4 rounded-xl"
                          style={{
                            background: `${s.glow}08`,
                            border: `1px solid ${s.glow}20`,
                          }}
                        >
                          <p
                            className="text-2xl font-black"
                            style={{ color: s.glow }}
                          >
                            {s.val}
                          </p>
                          <p
                            className="text-[10px] font-medium mt-0.5"
                            style={{ color: "#94a3b8" }}
                          >
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent transactions */}
                {transactions.length > 0 && (
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: "1.5px solid rgba(29,78,216,0.08)",
                    }}
                  >
                    <div
                      className="px-5 py-3.5 flex justify-between items-center"
                      style={{ borderBottom: `1px solid ${B.sidebarBorder}` }}
                    >
                      <p
                        className="text-sm font-black"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "rgba(0,0,0,0)",
                          backgroundClip: "text",
                        }}
                      >
                        Recent Transactions
                      </p>
                      {isSuperAdmin && (
                        <button
                          onClick={() => setActiveTab("finance")}
                          className="text-[10px] font-bold flex items-center gap-1 hover:text-blue-700 transition-colors"
                          style={{ color: "#0284c7" }}
                        >
                          All <ChevronRight style={{ width: 11, height: 11 }} />
                        </button>
                      )}
                    </div>
                    <div
                      className="divide-y"
                      style={{ borderColor: "rgba(29,78,216,0.07)" }}
                    >
                      {transactions.slice(0, 3).map((t, i) => (
                        <div
                          key={i}
                          className="px-5 py-3 flex items-center gap-3 hover:bg-white/2 transition-colors"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: t.amount.startsWith("-")
                                ? "rgba(239,68,68,0.12)"
                                : "rgba(16,185,129,0.12)",
                            }}
                          >
                            <DollarSign
                              style={{
                                width: 12,
                                height: 12,
                                color: t.amount.startsWith("-")
                                  ? "#f87171"
                                  : "#34d399",
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {t.item}
                            </p>
                            <p
                              className="text-[10px]"
                              style={{ color: "#64748b" }}
                            >
                              {t.user} · {t.date}
                            </p>
                          </div>
                          <p
                            className={`text-xs font-black shrink-0 ${t.amount.startsWith("-") ? "text-rose-400" : "text-emerald-400"}`}
                          >
                            {t.amount}
                          </p>
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-full ${t.status === "Completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/15 text-blue-400"}`}
                          >
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                ALL COURSES — both roles view for free
            ════════════════════════════════════════ */}
            {activeTab === "courses" && (
              <motion.div
                key="courses"
                variants={pV}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-base font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      All Platform Courses
                    </h3>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: "#94a3b8" }}
                    >
                      {isSuperAdmin
                        ? "Super admin access — view all content without purchasing"
                        : "Admin access — view all courses for moderation"}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                    style={{
                      background: `${B.cyan}15`,
                      color: B.cyan,
                      border: `1px solid ${B.cyan}25`,
                    }}
                  >
                    <Unlock style={{ width: 12, height: 12 }} /> Free Access ·{" "}
                    {allCourses.length} courses
                  </span>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="rounded-2xl animate-pulse"
                          style={{
                            background: "rgba(255,255,255,0.88)",
                            border: "1.5px solid rgba(29,78,216,0.08)",
                            height: 210,
                          }}
                        />
                      ))}
                  </div>
                ) : (
                  <div>
                    {selectedCourse && (
                      <button
                        onClick={() => setSelectedCourse(null)}
                        className="mb-4 text-xs text-blue-500 font-medium flex items-center gap-1 hover:text-blue-700 transition"
                      >
                        ← Back
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                      
                      {displayCourses.map((c, i) => (
                        <motion.div
                          key={c.id || i}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            if (c.children) {
                              setSelectedCourse(c); // go deeper
                            }
                          }}
                          className="rounded-2xl overflow-hidden relative group cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.88)",
                            border: "1.5px solid rgba(29,78,216,0.08)",
                          }}
                        >
                          <div className="relative h-36 overflow-hidden">
                            {c.img ? (
                              <img
                                src={c.img}
                                alt={c.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg,${B.primary},${B.cyan})`,
                                }}
                              >
                                <BookOpen
                                  style={{
                                    width: 32,
                                    height: 32,
                                    color: "#64748b",
                                  }}
                                />
                              </div>
                            )}

                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(to bottom,transparent 40%,rgba(5,14,43,0.95) 100%)",
                              }}
                            />

                            <div
                              className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-lg"
                              style={{
                                background: "rgba(0,194,255,0.2)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(0,194,255,0.3)",
                              }}
                            >
                              <Unlock style={{ width: 10, height: 10, color: B.cyan }} />
                              <span
                                className="text-[9px] font-black uppercase tracking-wider"
                                style={{ color: "#0284c7" }}
                              >
                                {c.children ? "Explore" : "Free Access"}
                              </span>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(0,87,255,0.8)" }}
                              >
                                <Play
                                  style={{
                                    width: 16,
                                    height: 16,
                                    color: "white",
                                    marginLeft: 2,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-4">
                            <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-1">
                              {c.title}
                            </h4>

                            {/* {!c.children && ( */}
                            <p
                              className="text-[10px] mb-2.5"
                              style={{ color: "#94a3b8" }}
                            >
                              {c.author || "Sujatha Kancharla"}
                            </p>
                            {/* )} */}

                            {/* {!c.children && ( */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                                <Star
                                  style={{
                                    width: 11,
                                    height: 11,
                                    fill: "#f59e0b",
                                    color: "#f59e0b",
                                  }}
                                />
                                {c.rating || "4.8"} 
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-slate-900">
                                  {c.price}
                                </span>

                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  onClick={(e) => {
                                    e.stopPropagation(); // IMPORTANT
                                    setPreviewCourse(c);
                                  }}
                                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold"
                                  style={{
                                    background: "rgba(29,78,216,0.08)",
                                    color: "#1d4ed8",
                                    border: "1.5px solid rgba(29,78,216,0.2)",
                                  }}
                                >
                                  Preview
                                </motion.button>
                              </div>
                            </div>
                            {/* )} */}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick preview modal */}
                <AnimatePresence>
                  {previewCourse && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4"
                      style={{
                        background: "rgba(2,5,15,0.85)",
                        backdropFilter: "blur(12px)",
                      }}
                      onClick={() => setPreviewCourse(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95 }}
                        className="w-full max-w-2xl rounded-2xl overflow-hidden"
                        style={{
                          background: "#050E2B",
                          border: "1px solid rgba(0,194,255,0.25)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="aspect-video bg-black">
                          {previewCourse.vid ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${previewCourse.vid}?autoplay=1&rel=0`}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play
                                style={{
                                  width: 48,
                                  height: 48,
                                  color: "rgba(255,255,255,0.15)",
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex items-center justify-between">
                          <div>
                            <h3
                              className="text-sm font-black"
                              style={{
                                backgroundImage:
                                  "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "rgba(0,0,0,0)",
                                backgroundClip: "text",
                              }}
                            >
                              {previewCourse.title}
                            </h3>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                              {previewCourse.author} · {previewCourse.price}
                            </p>
                          </div>
                          <button
                            onClick={() => setPreviewCourse(null)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{
                              background: "rgba(255,255,255,0.88)",
                              border: "1.5px solid rgba(29,78,216,0.08)",
                            }}
                          >
                            <XCircle
                              style={{
                                width: 16,
                                height: 16,
                                color: "rgba(255,255,255,0.5)",
                              }}
                            />
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                MODERATION / FINAL APPROVAL
                admin     → "moderation" tab (pre-vets)
                superadmin → "moderation" (sub-admin view) + "approval" (final gate)
            ════════════════════════════════════════ */}
            {(activeTab === "moderation" || activeTab === "approval") && (
              <motion.div
                key={activeTab}
                variants={pV}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
              >
                {!reviewingCourse ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className="text-base font-black"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "rgba(0,0,0,0)",
                            backgroundClip: "text",
                          }}
                        >
                          {activeTab === "approval"
                            ? "Final Approval Gate"
                            : "Moderation Queue"}
                        </h3>
                        <p
                          className="text-[11px] mt-0.5"
                          style={{ color: "#94a3b8" }}
                        >
                          {activeTab === "approval"
                            ? "Pre-vetted by sub-admins — your final sign-off makes it live"
                            : isSuperAdmin
                              ? "Sub-admin review before Final Approval queue"
                              : "Review and pre-approve — Super Admin gives final sign-off"}
                        </p>
                      </div>
                      <button
                        onClick={async () => {
                          const r = await AdminService.getPendingCourses();
                          setPending(r.data);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all"
                        style={{
                          color: B.cyan,
                          border: "1.5px solid rgba(29,78,216,0.08)",
                        }}
                      >
                        <RefreshCw style={{ width: 13, height: 13 }} /> Refresh
                      </button>
                    </div>

                    {/* Info banner */}
                    <div
                      className="rounded-2xl px-5 py-3 flex items-center gap-3"
                      style={{
                        background:
                          activeTab === "approval"
                            ? "rgba(220,38,38,0.07)"
                            : "rgba(245,158,11,0.07)",
                        border: `1px solid ${activeTab === "approval" ? "rgba(220,38,38,0.25)" : "rgba(245,158,11,0.25)"}`,
                      }}
                    >
                      <AlertTriangle
                        style={{
                          width: 15,
                          height: 15,
                          flexShrink: 0,
                          color:
                            activeTab === "approval" ? "#f87171" : "#f59e0b",
                        }}
                      />
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#475569" }}
                      >
                        {activeTab === "approval"
                          ? "Super Admin Final Gate: Complete the 4-item checklist before approving. This action publishes the course immediately."
                          : isSuperAdmin
                            ? "Oversight view: Sub-admins pre-vet content. Approved here goes to your Final Approval queue."
                            : "Admin Pre-vetting: Verify content quality. Approved courses are forwarded to Super Admin for final sign-off."}
                      </p>
                    </div>

                    {pending.length === 0 ? (
                      <div
                        className="flex flex-col items-center py-20 text-center rounded-2xl"
                        style={{
                          background: "rgba(255,255,255,0.88)",
                          border: "1.5px solid rgba(29,78,216,0.08)",
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                          style={{
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.25)",
                          }}
                        >
                          <CheckCircle
                            style={{ width: 28, height: 28, color: "#34d399" }}
                          />
                        </div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: "#0f172a" }}
                        >
                          Queue is clear!
                        </p>
                        <p
                          className="text-[11px] mt-1"
                          style={{ color: "#94a3b8" }}
                        >
                          No courses pending review.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence>
                          {pending.map((course) => (
                            <motion.div
                              key={course.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              whileHover={{ y: -3 }}
                              className="rounded-2xl overflow-hidden flex flex-col"
                              style={{
                                background: "rgba(255,255,255,0.88)",
                                border: "1.5px solid rgba(29,78,216,0.08)",
                              }}
                            >
                              <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                  <span
                                    className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                                    style={{
                                      background: "rgba(245,158,11,0.15)",
                                      color: "#f59e0b",
                                      border: "1px solid rgba(245,158,11,0.3)",
                                    }}
                                  >
                                    {activeTab === "approval"
                                      ? "Awaiting Final Approval"
                                      : "Pending Review"}
                                  </span>
                                  <span
                                    className="text-[9px] ml-auto flex items-center gap-1"
                                    style={{ color: "#64748b" }}
                                  >
                                    <Clock style={{ width: 9, height: 9 }} />
                                    {course.submitted}
                                  </span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">
                                  {course.title}
                                </h4>
                                <p
                                  className="text-[11px] line-clamp-2 mb-3"
                                  style={{ color: "#64748b" }}
                                >
                                  {course.description}
                                </p>
                                <div
                                  className="space-y-1 mb-3 pt-3"
                                  style={{
                                    borderTop:
                                      "1.5px solid rgba(29,78,216,0.08)",
                                  }}
                                >
                                  {[
                                    ["Tutor", course.instructor],
                                    ["Price", course.price],
                                    ["Length", course.length],
                                  ].map(([k, v]) => (
                                    <div
                                      key={k}
                                      className="flex justify-between"
                                    >
                                      <span
                                        className="text-[10px] font-bold"
                                        style={{
                                          color: "#64748b",
                                        }}
                                      >
                                        {k}
                                      </span>
                                      <span className="text-[10px] font-black text-slate-900">
                                        {v}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                {activeTab === "approval" && (
                                  <div
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl mb-3"
                                    style={{
                                      background: "rgba(16,185,129,0.07)",
                                      border: "1px solid rgba(16,185,129,0.2)",
                                    }}
                                  >
                                    <CheckCircle
                                      style={{
                                        width: 12,
                                        height: 12,
                                        color: "#34d399",
                                        flexShrink: 0,
                                      }}
                                    />
                                    <span className="text-[10px] font-bold text-emerald-400">
                                      Pre-verified by sub-admin
                                    </span>
                                  </div>
                                )}
                                <div className="mt-auto flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => {
                                      setReviewingCourse(course);
                                      setActiveVideo(
                                        course.curriculum[0].video,
                                      );
                                      setChecklist({
                                        copyright: false,
                                        content: false,
                                        quality: false,
                                        originality: false,
                                      });
                                    }}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold"
                                    style={{
                                      background: `${B.primary}22`,
                                      color: B.cyan,
                                      border: `1px solid ${B.primary}35`,
                                    }}
                                  >
                                    <PlayCircle
                                      style={{ width: 14, height: 14 }}
                                    />{" "}
                                    Review
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={async () => {
                                      setActioning(course.id);
                                      await AdminService.moderateCourse(
                                        course.id,
                                        "rejected",
                                      );
                                      setPending((p) =>
                                        p.filter((c) => c.id !== course.id),
                                      );
                                      setActioning(null);
                                      toast.success("Course rejected", {
                                        style: toastOK,
                                      });
                                    }}
                                    disabled={actioning === course.id}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-50 hover:bg-rose-500/10 transition-all"
                                    style={{
                                      border: "1px solid rgba(239,68,68,0.3)",
                                    }}
                                  >
                                    {actioning === course.id ? (
                                      <Loader2
                                        style={{ width: 14, height: 14 }}
                                        className="animate-spin text-rose-400"
                                      />
                                    ) : (
                                      <XCircle
                                        style={{
                                          width: 14,
                                          height: 14,
                                          color: "#f87171",
                                        }}
                                      />
                                    )}
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Detailed video review ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: "1.5px solid rgba(29,78,216,0.1)",
                      background: "rgba(255,255,255,0.88)",
                    }}
                  >
                    {/* Review header */}
                    <div
                      className="px-5 py-4 flex items-center justify-between"
                      style={{
                        background:
                          "linear-gradient(135deg,rgba(29,78,216,0.06),rgba(2,132,199,0.03))",
                        borderBottom: `1px solid rgba(29,78,216,0.08)`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setReviewingCourse(null)}
                          className="p-1.5 rounded-xl hover:bg-white/10 transition-all"
                          style={{
                            border: "1.5px solid rgba(29,78,216,0.1)",
                            background: "rgba(255,255,255,0.88)",
                          }}
                        >
                          <ArrowLeft
                            style={{ width: 16, height: 16, color: "white" }}
                          />
                        </button>
                        <div>
                          <h3
                            className="text-sm font-black"
                            style={{
                              backgroundImage:
                                "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "rgba(0,0,0,0)",
                              backgroundClip: "text",
                            }}
                          >
                            {reviewingCourse.title}
                          </h3>
                          <p
                            className="text-[11px]"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            {reviewingCourse.instructor} ·{" "}
                            {reviewingCourse.price} · {reviewingCourse.length}
                          </p>
                        </div>
                      </div>
                      <span
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black"
                        style={{
                          background: "rgba(245,158,11,0.15)",
                          color: "#f59e0b",
                          border: "1px solid rgba(245,158,11,0.3)",
                        }}
                      >
                        <AlertTriangle style={{ width: 12, height: 12 }} />
                        {activeTab === "approval"
                          ? "Final Review Mode"
                          : "Moderation Active"}
                      </span>
                    </div>

                    {/* Content split */}
                    <div
                      className="flex flex-col lg:flex-row"
                      style={{ height: 560 }}
                    >
                      {/* Video player */}
                      <div className="flex-1 bg-black relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeVideo}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                          >
                            <iframe
                              src={activeVideo}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Moderation panel */}
                      <div
                        className="w-full lg:w-[300px] flex flex-col shrink-0"
                        style={{
                          background: "rgba(5,14,43,0.95)",
                          borderLeft: "1.5px solid rgba(29,78,216,0.08)",
                        }}
                      >
                        {/* Lesson list */}
                        <div
                          className="p-4 flex-1 overflow-y-auto hide-scrollbar"
                          style={{
                            borderBottom: `1px solid ${B.sidebarBorder}`,
                          }}
                        >
                          <p
                            className="text-[10px] font-black uppercase tracking-wider mb-3"
                            style={{ color: "#64748b" }}
                          >
                            Course Lessons
                          </p>
                          <div className="space-y-1.5">
                            {reviewingCourse.curriculum.map((lesson, idx) => {
                              const isAct = activeVideo === lesson.video;
                              return (
                                <motion.button
                                  key={idx}
                                  whileHover={{ x: 2 }}
                                  onClick={() => setActiveVideo(lesson.video)}
                                  className="w-full text-left p-2.5 rounded-xl flex items-center gap-2.5 transition-all"
                                  style={{
                                    background: isAct
                                      ? `${B.primary}35`
                                      : B.surface,
                                    border: `1px solid ${isAct ? `${B.cyan}50` : B.border}`,
                                  }}
                                >
                                  <div
                                    className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                      background: isAct
                                        ? B.cyan
                                        : "rgba(255,255,255,0.05)",
                                    }}
                                  >
                                    <PlayCircle
                                      style={{
                                        width: 12,
                                        height: 12,
                                        color: isAct
                                          ? B.dark
                                          : "rgba(255,255,255,0.3)",
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className="text-[11px] font-bold truncate"
                                      style={{
                                        color: isAct ? "white" : "#475569",
                                      }}
                                    >
                                      {lesson.title}
                                    </p>
                                    <p
                                      className="text-[9px]"
                                      style={{
                                        color: "#94a3b8",
                                      }}
                                    >
                                      {lesson.duration}
                                    </p>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Safety checklist + actions */}
                        <div className="p-4">
                          <p
                            className="text-[10px] font-black uppercase tracking-wider mb-3 flex items-center gap-1.5"
                            style={{ color: "#64748b" }}
                          >
                            <CheckSquare
                              style={{ width: 12, height: 12, color: B.cyan }}
                            />
                            {isSuperAdmin
                              ? "Super Admin Checklist"
                              : "Safety Checklist"}
                          </p>
                          <div className="space-y-2 mb-3">
                            {[
                              ["copyright", "No copyright infringement"],
                              ["content", "Appropriate for all audiences"],
                              [
                                "quality",
                                "Audio & video quality meets standard",
                              ],
                              [
                                "originality",
                                "Original — no plagiarism detected",
                              ],
                            ].map(([k, l]) => (
                              <label
                                key={k}
                                className="flex items-center gap-2.5 cursor-pointer"
                              >
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checklist[k] ? "border-blue-500 bg-blue-500" : "border-slate-300 bg-white"}`}
                                  onClick={() =>
                                    setChecklist((p) => ({ ...p, [k]: !p[k] }))
                                  }
                                >
                                  {checklist[k] && (
                                    <CheckCircle
                                      style={{
                                        width: 10,
                                        height: 10,
                                        color: B.dark,
                                      }}
                                    />
                                  )}
                                </div>
                                <span
                                  className="text-[11px] font-medium transition-colors"
                                  style={{
                                    color: checklist[k] ? "#0f172a" : "#64748b",
                                  }}
                                >
                                  {l}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Progress bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-[10px] font-bold mb-1">
                              <span style={{ color: "#64748b" }}>
                                Checklist
                              </span>
                              <span style={{ color: "#0284c7" }}>
                                {
                                  Object.values(checklist).filter(Boolean)
                                    .length
                                }
                                /4
                              </span>
                            </div>
                            <div
                              className="h-1.5 rounded-full overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                              <motion.div
                                className="h-full rounded-full"
                                animate={{
                                  width: `${(Object.values(checklist).filter(Boolean).length / 4) * 100}%`,
                                }}
                                style={{
                                  background: `linear-gradient(90deg,${B.primary},${B.cyan})`,
                                }}
                                transition={{ duration: 0.4 }}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                moderate(reviewingCourse.id, "approved")
                              }
                              disabled={!!actioning}
                              className="flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 disabled:opacity-50"
                              style={{
                                background:
                                  "linear-gradient(135deg,#059669,#10b981)",
                                color: "white",
                                boxShadow: "0 4px 16px rgba(16,185,129,0.25)",
                              }}
                            >
                              {actioning ? (
                                <Loader2
                                  style={{ width: 14, height: 14 }}
                                  className="animate-spin"
                                />
                              ) : (
                                <>
                                  <ShieldCheck
                                    style={{ width: 14, height: 14 }}
                                  />
                                  {activeTab === "approval"
                                    ? "Final Approve"
                                    : "Pre-Approve"}
                                </>
                              )}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                moderate(reviewingCourse.id, "rejected")
                              }
                              disabled={!!actioning}
                              className="flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 disabled:opacity-50"
                              style={{
                                background: "rgba(239,68,68,0.12)",
                                color: "#f87171",
                                border: "1px solid rgba(239,68,68,0.3)",
                              }}
                            >
                              {actioning ? (
                                <Loader2
                                  style={{ width: 14, height: 14 }}
                                  className="animate-spin"
                                />
                              ) : (
                                <>
                                  <XCircle style={{ width: 14, height: 14 }} />{" "}
                                  Reject
                                </>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                USERS & ADMINS
            ════════════════════════════════════════ */}
            {activeTab === "users" && (
              <motion.div
                key="users"
                variants={pV}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Sub-admin team (superadmin only) */}
                {isSuperAdmin && (
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: "1.5px solid rgba(29,78,216,0.08)",
                    }}
                  >
                    <div
                      className="px-5 py-4 flex items-center justify-between"
                      style={{
                        borderBottom: `1px solid rgba(29,78,216,0.08)`,
                        background: "rgba(200,228,255,0.75)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield
                          style={{ width: 15, height: 15, color: B.cyan }}
                        />
                        <p
                          className="text-sm font-black"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "rgba(0,0,0,0)",
                            backgroundClip: "text",
                          }}
                        >
                          Your Admin Team ({subAdmins.length})
                        </p>
                      </div>
                      <p
                        className="text-[10px] font-bold"
                        style={{ color: "#64748b" }}
                      >
                        Managed by you · Final authority
                      </p>
                    </div>
                    <div
                      className="divide-y"
                      style={{ borderColor: "rgba(29,78,216,0.07)" }}
                    >
                      {subAdmins.map((a) => (
                        <motion.div
                          key={a.id}
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.02)",
                          }}
                          className="px-5 py-3.5 flex items-center gap-4 transition-colors"
                        >
                          <div className="relative">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
                              style={{
                                background: `linear-gradient(135deg,${B.primary},${B.cyan})`,
                              }}
                            >
                              {a.name.charAt(0)}
                            </div>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#050E2B] ${a.status === "online" ? "bg-emerald-400" : a.status === "away" ? "bg-amber-400" : "bg-slate-500"}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800">
                              {a.name}
                            </p>
                            <p
                              className="text-[10px]"
                              style={{ color: "#94a3b8" }}
                            >
                              {a.email} · {a.region}
                            </p>
                          </div>
                          <div className="flex items-center gap-5 text-center text-[10px]">
                            <div>
                              <p className="font-black text-amber-400">
                                {a.pending}
                              </p>
                              <p style={{ color: "#94a3b8" }}>Pending</p>
                            </div>
                            <div>
                              <p
                                className="font-black"
                                style={{ color: "#0284c7" }}
                              >
                                {a.approved}
                              </p>
                              <p style={{ color: "#94a3b8" }}>Approved</p>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] font-black px-2.5 py-1 rounded-full capitalize ${a.status === "online" ? "bg-emerald-500/15 text-emerald-400" : a.status === "away" ? "bg-amber-500/15 text-amber-400" : "bg-slate-500/15 text-slate-400"}`}
                          >
                            {a.status}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all"
                              style={{
                                border: "1.5px solid rgba(29,78,216,0.1)",
                                background: "rgba(255,255,255,0.88)",
                              }}
                            >
                              <Eye
                                style={{ width: 13, height: 13, color: B.cyan }}
                              />
                            </button>
                            <button
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-rose-500/10 transition-all"
                              style={{
                                border: "1.5px solid rgba(29,78,216,0.1)",
                                background: "rgba(255,255,255,0.88)",
                              }}
                            >
                              <Ban
                                style={{
                                  width: 13,
                                  height: 13,
                                  color: "#f87171",
                                }}
                              />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All platform users */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    border: "1.5px solid rgba(29,78,216,0.08)",
                  }}
                >
                  <div
                    className="px-5 py-3.5 flex items-center justify-between"
                    style={{ borderBottom: `1px solid ${B.sidebarBorder}` }}
                  >
                    <p
                      className="text-sm font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      Platform Users
                    </p>
                    {loading && (
                      <Loader2
                        style={{ width: 16, height: 16, color: B.cyan }}
                        className="animate-spin"
                      />
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead
                        style={{
                          borderBottom: `1px solid rgba(29,78,216,0.08)`,
                        }}
                      >
                        <tr>
                          {["User", "Role", "Status", "Joined", "Actions"].map(
                            (h) => (
                              <th
                                key={h}
                                className="px-5 py-3 text-[10px] font-black uppercase tracking-wider"
                                style={{ color: "#000000" }}
                              >
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <motion.tr
                            key={u.id}
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.02)",
                            }}
                            className="transition-colors"
                            style={{
                              borderBottom: `1px solid ${B.sidebarBorder}`,
                            }}
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
                                  style={{
                                    background: `linear-gradient(135deg,${B.primary},${B.cyan})`,
                                  }}
                                >
                                  {u.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800">
                                    {u.name}
                                  </p>
                                  <p
                                    className="text-[10px]"
                                    style={{ color: "#64748b" }}
                                  >
                                    {u.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                                style={{
                                  background:
                                    u.role === "Tutor"
                                      ? "rgba(139,92,246,0.15)"
                                      : `${B.primary}20`,
                                  color:
                                    u.role === "Tutor" ? "#a78bfa" : B.cyan,
                                }}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                                style={{
                                  background:
                                    u.status === "Active"
                                      ? "rgba(16,185,129,0.12)"
                                      : "rgba(239,68,68,0.12)",
                                  color:
                                    u.status === "Active"
                                      ? "#34d399"
                                      : "#f87171",
                                }}
                              >
                                {u.status}
                              </span>
                            </td>
                            <td
                              className="px-5 py-3.5 text-[11px] font-medium"
                              style={{ color: "#94a3b8" }}
                            >
                              {u.joined}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex gap-1.5">
                                <button className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-blue-500/10 transition-all">
                                  <Eye
                                    style={{
                                      width: 13,
                                      height: 13,
                                      color: B.cyan,
                                    }}
                                  />
                                </button>
                                <button className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-rose-500/10 transition-all">
                                  <Ban
                                    style={{
                                      width: 13,
                                      height: 13,
                                      color: "#f87171",
                                    }}
                                  />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                TRAFFIC — superadmin only
            ════════════════════════════════════════ */}
            {activeTab === "traffic" && isSuperAdmin && (
              <motion.div
                key="traffic"
                variants={pV}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-base font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      Site Traffic Analytics
                    </h3>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: "#94a3b8" }}
                    >
                      Real-time platform monitoring
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pulse color={B.cyan} />
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: "#0284c7" }}
                    >
                      Live · 30s refresh
                    </span>
                  </div>
                </div>

                {/* Live metric cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Active Sessions",
                      val: "2,847",
                      icon: Wifi,
                      color: B.cyan,
                      spark: [20, 35, 28, 45, 38, 55, 48, 62, 57, 72],
                    },
                    {
                      label: "Page Views Today",
                      val: "84,291",
                      icon: Globe,
                      color: B.primary,
                      spark: [30, 45, 35, 60, 50, 75, 65, 80, 72, 90],
                    },
                    {
                      label: "Avg Session",
                      val: "8m 42s",
                      icon: Clock,
                      color: "#10b981",
                      spark: [5, 8, 6, 9, 7, 10, 8, 11, 9, 8],
                    },
                    {
                      label: "Bounce Rate",
                      val: "24.3%",
                      icon: BarChart3,
                      color: "#f59e0b",
                      spark: [35, 30, 32, 28, 30, 26, 28, 24, 25, 24],
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl p-5"
                      style={{
                        background: `linear-gradient(135deg,${s.color}12,${s.color}06)`,
                        border: `1px solid ${s.color}28`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ background: `${s.color}18` }}
                        >
                          <s.icon
                            style={{ color: s.color, width: 15, height: 15 }}
                          />
                        </div>
                        <Pulse color={s.color} />
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                        style={{ color: "#64748b" }}
                      >
                        {s.label}
                      </p>
                      <p className="text-xl font-black text-slate-900 mb-1.5">
                        {s.val}
                      </p>
                      <Sparkline data={s.spark} color={s.color} />
                    </motion.div>
                  ))}
                </div>

                {/* Hourly bar chart */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    border: "1.5px solid rgba(29,78,216,0.08)",
                  }}
                >
                  <div className="flex justify-between items-center mb-5">
                    <p
                      className="text-sm font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      Today's Traffic by Hour
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: B.cyan }}
                      />
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: "#0284c7" }}
                      >
                        Page Views
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end gap-3" style={{ height: 130 }}>
                    {trafficData.map((d, i) => {
                      const maxVal = Math.max(
                        ...trafficData.map((x) => x.views),
                      );
                      return (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                        >
                          <div className="relative w-full flex-1 flex items-end">
                            <motion.div
                              className="w-full rounded-t-lg"
                              initial={{ height: 0 }}
                              animate={{
                                height: `${(d.views / maxVal) * 100}%`,
                              }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.08,
                                ease: "easeOut",
                              }}
                              style={{
                                background: `linear-gradient(180deg,${B.cyan},${B.primary})`,
                                minHeight: 4,
                              }}
                            >
                              <div
                                className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
                                style={{
                                  border: "1.5px solid rgba(29,78,216,0.1)",
                                  background: "rgba(255,255,255,0.88)",
                                }}
                              >
                                {d.views.toLocaleString()}
                              </div>
                            </motion.div>
                          </div>
                          <span
                            className="text-[9px] font-bold"
                            style={{ color: "#94a3b8" }}
                          >
                            {d.hour}h
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top pages */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    border: "1.5px solid rgba(29,78,216,0.08)",
                  }}
                >
                  <div
                    className="px-5 py-3.5"
                    style={{ borderBottom: `1px solid ${B.sidebarBorder}` }}
                  >
                    <p
                      className="text-sm font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      Top Pages
                    </p>
                  </div>
                  <div
                    className="divide-y"
                    style={{ borderColor: "rgba(29,78,216,0.07)" }}
                  >
                    {[
                      { page: "/explore", views: "18,240", pct: 82 },
                      { page: "/course-detail", views: "12,880", pct: 58 },
                      { page: "/dashboard", views: "9,420", pct: 43 },
                      { page: "/", views: "7,810", pct: 35 },
                      { page: "/checkout", views: "3,240", pct: 15 },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="px-5 py-3 flex items-center gap-4 hover:bg-white/2 transition-colors"
                      >
                        <p className="text-xs font-bold text-slate-900 font-mono flex-1">
                          {p.page}
                        </p>
                        <div
                          className="w-28 h-1 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${p.pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            style={{
                              background: `linear-gradient(90deg,${B.primary},${B.cyan})`,
                            }}
                          />
                        </div>
                        <p className="text-xs font-black text-white shrink-0">
                          {p.views}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                FINANCE — superadmin only
            ════════════════════════════════════════ */}
            {activeTab === "finance" && isSuperAdmin && (
              <motion.div
                key="finance"
                variants={pV}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Gross Revenue",
                      val: stats?.totalPlatformRevenue || "₹1.24 Cr",
                      icon: TrendingUp,
                      color: "#10b981",
                      trend: "+14.2%",
                    },
                    {
                      label: "Platform Profit",
                      val: "₹37.2 L",
                      icon: DollarSign,
                      color: B.cyan,
                      trend: "+18.1%",
                    },
                    {
                      label: "Tutor Payouts",
                      val: "₹86.5 L",
                      icon: Users,
                      color: "#8b5cf6",
                      trend: "This month",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl p-5 flex items-center gap-4"
                      style={{
                        background: `linear-gradient(135deg,${s.color}12,${s.color}06)`,
                        border: `1px solid ${s.color}28`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${s.color}18` }}
                      >
                        <s.icon
                          style={{ color: s.color, width: 18, height: 18 }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: "#64748b" }}
                        >
                          {s.label}
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {s.val}
                        </p>
                        <p
                          className="text-[10px] font-bold mt-0.5"
                          style={{ color: s.color }}
                        >
                          {s.trend}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Revenue bar chart */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    border: "1.5px solid rgba(29,78,216,0.08)",
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <p
                      className="text-sm font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      Monthly Revenue
                    </p>
                    <button
                      className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all"
                      style={{
                        color: B.cyan,
                        border: "1.5px solid rgba(29,78,216,0.08)",
                      }}
                    >
                      <Download style={{ width: 13, height: 13 }} /> Export CSV
                    </button>
                  </div>
                  <div className="flex items-end gap-3" style={{ height: 110 }}>
                    {[42, 58, 71, 55, 83, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                      >
                        <div className="relative w-full flex-1 flex items-end">
                          <motion.div
                            className="w-full rounded-t-xl"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.1,
                              ease: "easeOut",
                            }}
                            style={{
                              background:
                                i === 5
                                  ? `linear-gradient(180deg,${B.cyan},${B.primary})`
                                  : "rgba(29,78,216,0.12)",
                              minHeight: 4,
                            }}
                          >
                            <div
                              className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black whitespace-nowrap px-1.5 py-0.5 rounded text-white"
                              style={{
                                background: B.dark,
                                border: "1.5px solid rgba(29,78,216,0.08)",
                              }}
                            >
                              ₹{(h * 10500).toLocaleString("en-IN")}
                            </div>
                          </motion.div>
                        </div>
                        <span
                          className="text-[9px] font-bold"
                          style={{ color: "#94a3b8" }}
                        >
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Full transaction table */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    border: "1.5px solid rgba(29,78,216,0.08)",
                  }}
                >
                  <div
                    className="px-5 py-3.5 flex items-center justify-between"
                    style={{ borderBottom: `1px solid ${B.sidebarBorder}` }}
                  >
                    <p
                      className="text-sm font-black"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "rgba(0,0,0,0)",
                        backgroundClip: "text",
                      }}
                    >
                      All Transactions
                    </p>
                    <button
                      className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        border: "1.5px solid rgba(29,78,216,0.08)",
                      }}
                    >
                      <Filter style={{ width: 11, height: 11 }} /> Filter
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead
                        style={{
                          borderBottom: `1px solid rgba(29,78,216,0.08)`,
                        }}
                      >
                        <tr>
                          {[
                            "ID",
                            "User",
                            "Item",
                            "Amount",
                            "Date",
                            "Status",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-5 py-3 text-[10px] font-black uppercase tracking-wider"
                              style={{ color: "#000000" }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((t, i) => (
                          <motion.tr
                            key={i}
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.02)",
                            }}
                            className="transition-colors"
                            style={{
                              borderBottom: `1px solid ${B.sidebarBorder}`,
                            }}
                          >
                            <td
                              className="px-5 py-3 text-[10px] font-black font-mono"
                              style={{ color: "#64748b" }}
                            >
                              {t.id}
                            </td>
                            <td className="px-5 py-3 text-xs font-bold text-slate-900">
                              {t.user}
                            </td>
                            <td
                              className="px-5 py-3 text-xs font-medium"
                              style={{ color: "#64748b" }}
                            >
                              {t.item}
                            </td>
                            <td className="px-5 py-3">
                              <span
                                className={`text-xs font-black ${t.amount.startsWith("-") ? "text-rose-400" : "text-emerald-400"}`}
                              >
                                {t.amount}
                              </span>
                            </td>
                            <td
                              className="px-5 py-3 text-[11px] font-medium"
                              style={{ color: "#64748b" }}
                            >
                              {t.date}
                            </td>
                            <td className="px-5 py-3">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full ${t.status === "Completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/15 text-blue-400"}`}
                              >
                                {t.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
