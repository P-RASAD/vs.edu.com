// src/Dashboard.jsx  — PART 1 of 2
// Paste this entire file; Part 2 continues immediately after this file's last line.
import React, { useState, useEffect } from "react";
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
  Star,
  Users,
  X,
  Plus,
  Folder,
  Video,
  Search,
  SlidersHorizontal,
  BarChart3,
  Shield,
  GraduationCap,
  TrendingUp,
  Medal,
  PlusCircle,
  ArrowRight,
  Trash2,
  User,
  Phone,
  MonitorPlay,
  CheckCircle,
  Zap,
  ChevronRight,
  Sparkles,
  Bell,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  RefreshCw,
  ShoppingCart,
  Clock,
  BookMarked,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// WIRE: real service layer
import { CourseService, TutorService, AdminService } from "./services/api";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  primary: "#0057FF",
  secondary: "#00C2FF",
  accent: "#FF6B35",
  surface: "#F0F4FF",
  dark: "#050E2B",
};
const spring = { type: "spring", stiffness: 420, damping: 32 };
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────────────
// SMALL SHARED HELPERS
// ─────────────────────────────────────────────

/** Inline skeleton block */
const Skel = ({ w = "100%", h = 16, r = 8 }) => (
  <div
    className="animate-pulse"
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: "rgba(0,87,255,0.07)",
    }}
  />
);

/** Reusable toast styles */
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

// ============================================================================
// MASTER LAYOUT
// ============================================================================
export default function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("user_details"));
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Section 1: Foundation",
      videos: ["Introduction to Syllabus"],
    },
  ]);

  // ── Auth guard (uncomment when real tokens exist) ──
  // useEffect(() => {
  //   const u = localStorage.getItem("vsintellecta_active_user");
  //   if (!u) { navigate("/login"); return; }
  //   const user = JSON.parse(u);
  //   if (user.role === "super_admin" || user.role === "admin") setCurrentView("admin-hub");
  // }, [navigate]);

  const handleLogout = () => {
    toast.success("Logged out successfully", { style: toastOK });
    localStorage.clear();
    navigate("/");
  };

  // Module/video CRUD (curriculum builder state)
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

  // Demo values — replace with localStorage parsed user
  const role = userData?.role
  const isTutor = role === "tutor";
  const isAdminOrSuper = role === "admin" || role === "super_admin";

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(145deg,#EEF3FF 0%,#F7F9FF 45%,#EAF6FF 100%)",
      }}
    >
      {/* Toast provider — move to App.jsx for global coverage */}
      <Toaster position="top-right" />

      {/* Ambient mesh blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(0,87,255,0.07) 0%,transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/2 -right-64 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(0,194,255,0.06) 0%,transparent 65%)",
          }}
        />
      </div>

      <Sidebar
        fName={userData?.first_name}
        role={userData?.role}
        isTutor={isTutor}
        isAdminOrSuper={isAdminOrSuper}
        currentView={currentView}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
        navigate={navigate}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* ── Top bar ── */}
        <header
          className="h-[72px] px-8 flex items-center justify-between shrink-0"
          style={{
            borderBottom: "1px solid rgba(0,87,255,0.06)",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              {currentView === "dashboard"
                ? `Good morning, ${userData?.first_name}`
                : currentView === "explore"
                  ? "Course Catalog"
                  : currentView === "my-programs"
                    ? "My Programs"
                    : currentView === "tutor-hub"
                      ? "Instructor Analytics"
                      : currentView === "admin-hub"
                        ? "Platform Command"
                        : "Account Settings"}
              {isTutor && currentView === "dashboard" && (
                <Medal className="w-5 h-5 text-amber-400 fill-amber-400" />
              )}
            </h2>
            {isTutor && currentView === "dashboard" ? (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Revenue up 18.5% this month
              </p>
            ) : (
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Ready to enhance your skills today?
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.1)",
                boxShadow: "0 2px 10px rgba(0,87,255,0.06)",
              }}
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: C.accent }}
              />
            </motion.button>
            
            {isTutor && (
              <motion.button
                onClick={() => setIsCourseModalOpen(true)}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{
                  background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                  boxShadow: "0 4px 16px rgba(0,87,255,0.30)",
                }}
              >
                <UploadCloud className="w-4 h-4" /> Add Course
              </motion.button>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-red-600 hover:text-red-700 px-4 py-2 transition-colors hidden sm:block"
            >
              Log out
            </button>
          </div>
        </header>

        {/* ── Main scroll area ── */}
        <div className="flex-1 overflow-y-auto px-8 pb-20 hide-scrollbar relative">
          <AnimatePresence mode="wait">
            {currentView === "dashboard" && (
              <UserHomeView
                key="home"
                setCurrentView={setCurrentView}
                isTutor={isTutor}
              />
            )}
            {currentView === "explore" && <ExploreView key="explore" />}
            {currentView === "my-programs" && <MyProgramsView key="programs" />}
            {currentView === "tutor-hub" && <TutorFinancialView key="tutor" />}
            {currentView === "admin-hub" && <AdminOverview key="admin" />}
            {currentView === "settings" && (
              <AccountSettingsView key="settings" />
            )}
          </AnimatePresence>
        </div>
      </main>

      {!isAdminOrSuper && currentView === "dashboard" && <RightSidebar />}

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
    </div>
  );
}

// ============================================================================
// SIDEBAR
// ============================================================================
function Sidebar({
  fName,
  role,
  isTutor,
  isAdminOrSuper,
  currentView,
  setCurrentView,
  handleLogout,
  navigate,
}) {
  const mainNav = !isAdminOrSuper
    ? [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "explore", icon: Compass, label: "All Courses" },
        { id: "my-programs", icon: BookOpen, label: "My Programs" },
      ]
    : [];
  const tutorNav = isTutor
    ? [{ id: "tutor-hub", icon: BarChart3, label: "Instructor Analytics" }]
    : [];
  const adminNav = isAdminOrSuper
    ? [{ id: "admin-hub", icon: Shield, label: "Platform Command" }]
    : [];
  const settingsNav = [
    { id: "settings", icon: Settings, label: "Account Settings" },
  ];

  return (
    <motion.div
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-[248px] h-full p-3 shrink-0 z-20 flex flex-col"
    >
      <div
        className="flex-1 rounded-[26px] flex flex-col overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(0,87,255,0.09)",
          boxShadow:
            "0 8px 40px rgba(0,87,255,0.07),inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Logo */}
        <div
          className="px-5 pt-5 pb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%,rgba(255,255,255,0.35),transparent 60%)",
                }}
              />
              <GraduationCap className="w-5 h-5 text-white relative z-10" />
            </div>
            <div>
              <h1
                className="text-[16px] font-black tracking-tight leading-none"
                style={{ color: C.dark }}
              >
                <span style={{ color: C.primary }}>VS</span>intellecta
              </h1>
              <p
                className="text-[9px] font-extrabold tracking-[0.18em] uppercase mt-0.5"
                style={{ color: C.secondary }}
              >
                Learning Platform
              </p>
            </div>
          </div>
        </div>

        <div
          className="mx-5 h-px"
          style={{
            background: `linear-gradient(90deg,transparent,rgba(0,87,255,0.1),transparent)`,
          }}
        />

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 hide-scrollbar">
          <NavGroup
            label="Navigation"
            items={mainNav}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          {isTutor && (
            <NavGroup
              label="Teaching"
              items={tutorNav}
              currentView={currentView}
              setCurrentView={setCurrentView}
              accent
            />
          )}
          {isAdminOrSuper && (
            <NavGroup
              label="Admin"
              items={adminNav}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          )}
          <NavGroup
            label="Account"
            items={settingsNav}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </nav>

        {/* User pill */}
        <div className="p-3">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer"
            style={{
              background: "rgba(0,87,255,0.04)",
              border: "1px solid rgba(0,87,255,0.08)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              }}
            >
              {fName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold truncate"
                style={{ color: C.dark }}
              >
                {fName}
              </p>
              <p
                className="text-[10px] font-black uppercase tracking-wider"
                style={{ color: C.primary }}
              >
                {role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg transition-all hover:bg-red-50 group"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function NavGroup({ label, items, currentView, setCurrentView, accent }) {
  if (!items.length) return null;
  return (
    <div className="mb-3">
      <p
        className="px-3 text-[9px] font-black tracking-[0.2em] uppercase mb-2 mt-3"
        style={{ color: accent ? C.primary : "#94A3B8" }}
      >
        {label}
      </p>
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          {...item}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      ))}
    </div>
  );
}

function SidebarItem({ id, label, currentView, setCurrentView }) {
  const isActive = currentView === id;
  return (
    <motion.button
      onClick={() => setCurrentView(id)}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors relative"
      style={{ color: isActive ? "white" : "#64748B" }}
    >
      {isActive && (
        <motion.div
          layoutId="navActive"
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(135deg,${C.primary},#0080FF)`,
            boxShadow: `0 4px 14px rgba(0,87,255,0.32)`,
          }}
          transition={spring}
        />
      )}
      <span
        className="relative z-10"
        style={{ color: isActive ? "white" : "#94A3B8" }}
      >
        {/* <Icon className="w-4 h-4" /> */}
      </span>
      <span className="relative z-10 font-semibold">{label}</span>
      {isActive && (
        <ChevronRight className="w-3 h-3 ml-auto relative z-10 opacity-50" />
      )}
    </motion.button>
  );
}

// ============================================================================
// USER HOME VIEW  — UI untouched, marquee items pulled from dummy API structure
// ============================================================================
const UserHomeView = ({ setCurrentView, isTutor }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState(false);

  const features = [
    {
      title: "Psychometric Testing",
      desc: "Discover your true potential with our advanced testing framework.",
      videoId: "Pow-yUGYbVs",
    },
    {
      title: "Career Options after 12th",
      desc: "Detailed breakdowns of every major pathway post-secondary.",
      videoId: "O12p01-ITCY",
    },
    {
      title: "Resume Building",
      desc: "Industry secrets to crafting a resume that gets you hired.",
      videoId: "p1Zle7wRG7E",
    },
    {
      title: "Engineering Insights",
      desc: "A complete guide to the engineering landscape.",
      videoId: "5KgSWcPFXks",
    },
  ];

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(
      () => setActiveTab((p) => (p + 1) % features.length),
      5000,
    );
    return () => clearInterval(t);
  }, [hovered, features.length]);

  const courses = [
    {
      title: "Career Options Post 12th",
      next: "Engineering Pathways",
      perc: 65,
      videoId: "Pow-yUGYbVs",
      color: C.primary,
    },
    {
      title: "Resume Building Masterclass",
      next: "Formatting Secrets",
      perc: 33,
      videoId: "O12p01-ITCY",
      color: C.secondary,
    },
    {
      title: "Psychometric Evaluation",
      next: "Test Preparation",
      perc: 12,
      videoId: "p1Zle7wRG7E",
      color: C.accent,
    },
  ];

  // WIRE: these come from api.js CourseService.getAllCourses() in ExploreView
  // Here we use the same static set for the marquee preview
  const marqueeItems = [
    {
      title: "Top 5 Career Options",
      author: "Surabhi Dewra",
      rating: 4.8,
      oldPrice: "₹2,999",
      price: "₹999",
      vid: "Pow-yUGYbVs",
    },
    {
      title: "Psychometric Testing",
      author: "Surabhi Dewra",
      rating: 4.9,
      oldPrice: "₹4,999",
      price: "₹1,499",
      vid: "O12p01-ITCY",
    },
    {
      title: "After 12th Guidance",
      author: "Surabhi Dewra",
      rating: 4.7,
      oldPrice: "₹1,999",
      price: "₹499",
      vid: "p1Zle7wRG7E",
    },
    {
      title: "Engineering Careers",
      author: "Surabhi Dewra",
      rating: 4.6,
      oldPrice: "₹3,499",
      price: "₹1,299",
      vid: "5KgSWcPFXks",
    },
    {
      title: "Commerce Pathways",
      author: "Surabhi Dewra",
      rating: 4.8,
      oldPrice: "₹2,499",
      price: "₹799",
      vid: "Pow-yUGYbVs",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-8 max-w-5xl mx-auto pt-6"
    >
      {/* ── Tutor stat row ── */}
      {isTutor && (
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Gross Revenue",
              val: "₹2,45,000",
              icon: DollarSign,
              color: "#10B981",
              bg: "#ECFDF5",
              border: "#D1FAE5",
            },
            {
              label: "Active Scholars",
              val: "1,204",
              icon: Users,
              color: C.primary,
              bg: "#EEF3FF",
              border: "#DBEAFE",
            },
            {
              label: "Live Programs",
              val: "4",
              icon: MonitorPlay,
              color: C.secondary,
              bg: "#EAF6FF",
              border: "#BAE6FD",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: "white",
                border: `1px solid ${s.border}`,
                boxShadow: `0 4px 20px ${s.color}0F`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: s.bg }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p
                  className="text-[10px] font-black uppercase tracking-wider mb-0.5"
                  style={{ color: "#94A3B8" }}
                >
                  {s.label}
                </p>
                <p className="text-2xl font-black" style={{ color: C.dark }}>
                  {s.val}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Continue Learning ── */}
      <motion.section variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94A3B8" }}
          >
            Continue Learning
          </p>
          <motion.button
            whileHover={{ x: 2 }}
            onClick={() => setCurrentView("my-programs")}
            className="text-xs font-bold flex items-center gap-1"
            style={{ color: C.primary }}
          >
            View all <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate("/course")}
              className="rounded-[20px] overflow-hidden cursor-pointer group relative"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,87,255,0.07)",
              }}
            >
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg,${c.color},${c.color}88)`,
                }}
              />
              <div className="p-4">
                <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="course"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Play
                        className="w-4 h-4 ml-0.5"
                        style={{ color: c.color, fill: c.color }}
                      />
                    </div>
                  </div>
                </div>
                <h4
                  className="font-bold text-sm leading-snug mb-1"
                  style={{ color: C.dark }}
                >
                  {c.title}
                </h4>
                <p
                  className="text-xs mb-3 flex items-center gap-1.5"
                  style={{ color: "#94A3B8" }}
                >
                  <Play className="w-3 h-3" /> Next: {c.next}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "#F1F5F9" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.perc}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.6 + i * 0.12,
                        ease: "easeOut",
                      }}
                      style={{
                        background: `linear-gradient(90deg,${c.color},${c.color}BB)`,
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-black"
                    style={{ color: c.color }}
                  >
                    {c.perc}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Take a Closer Look (Apple-style — UI untouched) ── */}
      <motion.section
        variants={fadeUp}
        className="rounded-[26px] overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: `linear-gradient(145deg,${C.dark} 0%,#0D1A3E 60%,#071428 100%)`,
          border: "1px solid rgba(0,194,255,0.14)",
          boxShadow: "0 24px 64px rgba(0,87,255,0.18)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(0,87,255,0.12) 0%,transparent 65%)",
            transform: "translate(30%,-30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(0,194,255,0.07) 0%,transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: C.secondary }}
            >
              Featured Content
            </p>
          </div>
          <h2 className="text-2xl font-black text-white mb-7 leading-tight">
            Take a closer look
            <br />
            at your path.
          </h2>

          <div className="flex flex-col md:flex-row gap-7">
            <div className="w-full md:w-[36%] flex flex-col gap-1">
              {features.map((f, i) => {
                const isAct = activeTab === i;
                return (
                  <div key={i}>
                    <motion.button
                      onClick={() => setActiveTab(i)}
                      whileHover={{ x: 3 }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
                      style={{
                        background: isAct
                          ? "rgba(0,87,255,0.22)"
                          : "transparent",
                        border: isAct
                          ? "1px solid rgba(0,87,255,0.28)"
                          : "1px solid transparent",
                        color: isAct ? "white" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <motion.span
                          animate={{ rotate: isAct ? 45 : 0 }}
                          transition={spring}
                        >
                          <PlusCircle
                            className="w-4 h-4"
                            style={{
                              color: isAct
                                ? C.secondary
                                : "rgba(255,255,255,0.25)",
                            }}
                          />
                        </motion.span>
                        {f.title}
                      </span>
                      {isAct && (
                        <ArrowRight
                          className="w-3.5 h-3.5"
                          style={{ color: C.secondary }}
                        />
                      )}
                    </motion.button>
                    <AnimatePresence>
                      {isAct && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mx-2 mt-1 mb-1 p-3.5 rounded-xl text-xs leading-relaxed"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              color: "rgba(255,255,255,0.55)",
                            }}
                          >
                            {f.desc}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="flex gap-1.5 px-4 mt-3">
                {features.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    animate={{
                      width: activeTab === i ? 22 : 5,
                      opacity: activeTab === i ? 1 : 0.3,
                    }}
                    transition={spring}
                    className="h-1 rounded-full"
                    style={{
                      background:
                        activeTab === i ? C.secondary : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-[64%]">
              <div
                className="absolute -inset-[3px] rounded-[22px] blur-sm opacity-50"
                style={{
                  background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                }}
              />
              <div
                className="relative h-[280px] md:h-[350px] rounded-[18px] overflow-hidden"
                style={{ border: "1px solid rgba(0,194,255,0.18)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${features[activeTab].videoId}?rel=0`}
                      title={features[activeTab].title}
                      frameBorder="0"
                      allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Related Programs marquee ── */}
      <motion.section variants={fadeUp} className="overflow-hidden pb-2">
        <div className="flex justify-between items-center mb-4">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94A3B8" }}
          >
            Related Programs
          </p>
          <motion.button
            whileHover={{ x: 2 }}
            onClick={() => setCurrentView("explore")}
            className="text-xs font-bold flex items-center gap-1"
            style={{ color: C.primary }}
          >
            View More <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
        <div className="flex overflow-x-hidden">
          <div className="animate-marquee flex gap-4">
            {[...marqueeItems, ...marqueeItems].map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                onClick={() => navigate("/course")}
                className="w-[240px] rounded-2xl p-3.5 shrink-0 cursor-pointer group"
                style={{
                  background: "white",
                  border: "1px solid rgba(0,87,255,0.08)",
                  boxShadow: "0 2px 16px rgba(0,87,255,0.05)",
                }}
              >
                <div
                  className="relative rounded-xl overflow-hidden mb-3 bg-slate-100"
                  style={{ height: "126px" }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${c.vid}/maxresdefault.jpg`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="course"
                  />
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(0,0,0,0.4),transparent)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.92)" }}
                    >
                      <Play
                        className="w-3.5 h-3.5 ml-0.5"
                        style={{ color: C.primary, fill: C.primary }}
                      />
                    </div>
                  </div>
                </div>
                <h4
                  className="font-bold text-sm truncate mb-0.5"
                  style={{ color: C.dark }}
                >
                  {c.title}
                </h4>
                <p className="text-xs mb-3" style={{ color: "#94A3B8" }}>
                  {c.author}
                </p>
                <div
                  className="flex items-center justify-between pt-2.5"
                  style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
                >
                  <span
                    className="flex items-center gap-1 text-xs font-bold"
                    style={{ color: "#F59E0B" }}
                  >
                    <Star className="w-3 h-3 fill-current" /> {c.rating}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[10px] line-through"
                      style={{ color: "#CBD5E1" }}
                    >
                      {c.oldPrice}
                    </span>
                    <span
                      className="text-sm font-black px-2 py-0.5 rounded-lg"
                      style={{ color: C.primary, background: "#EEF3FF" }}
                    >
                      {c.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

// ============================================================================
// EXPLORE VIEW  — WIRED to CourseService.getAllCourses() + enroll()
// ============================================================================
const ExploreView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null); // courseId being enrolled

  // WIRE: GET /courses
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // WIRE: replace with real → CourseService.getAllCourses({ filter: activeFilter, q: search })
        const res = await CourseService.getAllCourses({
          filter: activeFilter,
          q: search,
        });
        setCourses(res.data);
      } catch (err) {
        console.log('err: ', err);
        toast.error("Failed to load courses", { style: toastErr });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeFilter]);

  const handleEnroll = async (courseId, e) => {
    e.stopPropagation();
    setEnrolling(courseId);
    try {
      // WIRE: POST /courses/:id/enroll
      await CourseService.enroll(courseId);
      toast.success("Successfully enrolled! 🎉", {
        style: toastOK,
        iconTheme: { primary: "#38bdf8", secondary: "#0f172a" },
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Enrollment failed", {
        style: toastErr,
      });
    } finally {
      setEnrolling(null);
    }
  };

  // Local search filter (client-side; swap for server-side when API supports it)
  const visible = courses.filter(
    (c) => !search || c.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // Supplemental static courses for demo variety when API returns only 2
  const demoExtras = [
    {
      id: 103,
      title: "Top 5 Commerce Careers",
      author: "Surabhi Dewra",
      rating: 4.7,
      reviews: "980",
      enrolls: "12k+",
      oldPrice: "₹2,999",
      price: "₹999",
      vid: "O12p01-ITCY",
    },
    {
      id: 104,
      title: "Psychometric Evaluations",
      author: "Surabhi Dewra",
      rating: 4.9,
      reviews: "2.1k",
      enrolls: "22k+",
      oldPrice: "₹1,999",
      price: "₹499",
      vid: "p1Zle7wRG7E",
    },
    {
      id: 105,
      title: "Resume Mastery",
      author: "Surabhi Dewra",
      rating: 4.8,
      reviews: "1.4k",
      enrolls: "18k+",
      oldPrice: "₹2,499",
      price: "₹799",
      vid: "5KgSWcPFXks",
    },
    {
      id: 106,
      title: "Engineering Entrance Prep",
      author: "Surabhi Dewra",
      rating: 4.6,
      reviews: "870",
      enrolls: "9k+",
      oldPrice: "₹3,499",
      price: "₹1,299",
      vid: "Pow-yUGYbVs",
    },
    {
      id: 107,
      title: "After 12th Science Guide",
      author: "Surabhi Dewra",
      rating: 4.7,
      reviews: "640",
      enrolls: "7k+",
      oldPrice: "₹1,499",
      price: "₹399",
      vid: "O12p01-ITCY",
    },
    {
      id: 108,
      title: "Commerce Career Paths",
      author: "Surabhi Dewra",
      rating: 4.5,
      reviews: "520",
      enrolls: "6k+",
      oldPrice: "₹1,999",
      price: "₹599",
      vid: "p1Zle7wRG7E",
    },
    {
      id: 109,
      title: "Arts & Humanities Careers",
      author: "Surabhi Dewra",
      rating: 4.6,
      reviews: "410",
      enrolls: "5k+",
      oldPrice: "₹1,299",
      price: "₹349",
      vid: "5KgSWcPFXks",
    },
    {
      id: 110,
      title: "UPSC Prelims Blueprint",
      author: "Surabhi Dewra",
      rating: 4.9,
      reviews: "3.2k",
      enrolls: "28k+",
      oldPrice: "₹4,999",
      price: "₹1,799",
      vid: "Pow-yUGYbVs",
    },
  ];

  // Merge API results with demo extras (API results take priority)
  const apiIds = new Set(visible.map((c) => c.id));
  const merged = [
    ...visible.map((c) => ({
      ...c,
      vid: "Pow-yUGYbVs",
      reviews: "1.2k",
      enrolls: "15k+",
      oldPrice: "₹4,999",
      author: "Surabhi Dewra",
    })),
    ...demoExtras.filter((d) => !apiIds.has(d.id)),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 max-w-5xl mx-auto pt-6"
    >
      {/* Search + filter bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers, exams, or guides..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none"
            style={{
              background: "white",
              border: "1px solid rgba(0,87,255,0.1)",
              boxShadow: "0 2px 12px rgba(0,87,255,0.04)",
              color: C.dark,
            }}
          />
        </div>
        <button
          className="px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold"
          style={{
            background: "white",
            border: "1px solid rgba(0,87,255,0.1)",
            color: "#64748B",
          }}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex gap-2">
        {["All", "Newest", "Trending", "Most Popular"].map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveFilter(f)}
            className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
            style={{
              background:
                activeFilter === f
                  ? `linear-gradient(135deg,${C.primary},#0080FF)`
                  : "white",
              color: activeFilter === f ? "white" : "#64748B",
              border: `1px solid ${activeFilter === f ? "transparent" : "rgba(0,87,255,0.1)"}`,
              boxShadow:
                activeFilter === f ? "0 4px 14px rgba(0,87,255,0.28)" : "none",
            }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Course grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid rgba(0,87,255,0.08)",
                }}
              >
                <Skel w="100%" h={144} r={0} />
                <div className="p-3 space-y-2">
                  <Skel h={14} />
                  <Skel w="60%" h={10} />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {merged.map((c, i) => (
            <motion.div
              key={c.id || i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.35 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate("/course")}
              className="rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
                boxShadow: "0 2px 16px rgba(0,87,255,0.04)",
              }}
            >
              <div className="relative h-36 overflow-hidden bg-slate-100">
                <img
                  src={`https://img.youtube.com/vi/${c.vid}/maxresdefault.jpg`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="course"
                />
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-white"
                  style={{
                    background: "rgba(5,14,43,0.72)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  CareerGuide
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h4
                  className="font-bold text-sm leading-snug line-clamp-2 mb-1"
                  style={{ color: C.dark }}
                >
                  {c.title}
                </h4>
                <p className="text-xs mb-1.5" style={{ color: "#94A3B8" }}>
                  {c.author || "Surabhi Dewra"}
                </p>
                <div
                  className="flex items-center gap-1 text-xs font-bold mb-1"
                  style={{ color: "#F59E0B" }}
                >
                  <Star className="w-3 h-3 fill-current" /> {c.rating || 4.8}
                  <span
                    className="font-normal ml-0.5"
                    style={{ color: "#CBD5E1" }}
                  >
                    ({c.reviews})
                  </span>
                </div>
                <p
                  className="text-[10px] font-bold uppercase tracking-wide mb-2.5"
                  style={{ color: "#CBD5E1" }}
                >
                  {c.enrolls} enrolled
                </p>
                <div
                  className="mt-auto pt-2.5 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
                >
                  <div>
                    <span
                      className="text-[10px] block line-through"
                      style={{ color: "#CBD5E1" }}
                    >
                      {c.oldPrice || c.price}
                    </span>
                    <span
                      className="font-black text-base"
                      style={{ color: C.dark }}
                    >
                      {c.price}
                    </span>
                  </div>
                  {/* WIRE: Enroll button → CourseService.enroll(c.id) */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleEnroll(c.id, e)}
                    disabled={enrolling === c.id}
                    className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl text-white flex items-center gap-1 disabled:opacity-60"
                    style={{
                      background: `linear-gradient(135deg,${C.primary},#0080FF)`,
                      boxShadow: "0 3px 10px rgba(0,87,255,0.28)",
                    }}
                  >
                    {enrolling === c.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3" /> Enroll
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ============================================================================
// MY PROGRAMS VIEW  — WIRED to CourseService.getMyPrograms()
// ============================================================================
const MyProgramsView = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // WIRE: GET /users/me/courses
        const res = await CourseService.getMyPrograms();
        setPrograms(res.data);
      } catch (err) {
        console.log('err: ', err);
        toast.error("Could not load your programs", { style: toastErr });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Supplement with demo data for display
  const demoPrograms = [
    {
      id: 101,
      title: "Psychometric Testing",
      videoId: "Pow-yUGYbVs",
      sessions: 4,
      progress: 50,
    },
    {
      id: 102,
      title: "Career Options after 12th",
      videoId: "O12p01-ITCY",
      sessions: 6,
      progress: 30,
    },
  ];

  const merged = programs.length
    ? programs.map((p) => ({
        ...p,
        videoId: "Pow-yUGYbVs",
        sessions: 5,
        progress: p.progress ?? 0,
      }))
    : demoPrograms;

  const filtered =
    tab === "All"
      ? merged
      : tab === "In Progress"
        ? merged.filter((p) => p.progress > 0 && p.progress < 100)
        : merged.filter((p) => p.progress === 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-5 pt-6"
    >
      <div
        className="flex gap-1.5 p-1 rounded-2xl w-max"
        style={{ background: "white", border: "1px solid rgba(0,87,255,0.08)" }}
      >
        {["All", "In Progress", "Completed"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background:
                tab === t
                  ? `linear-gradient(135deg,${C.primary},#0080FF)`
                  : "transparent",
              color: tab === t ? "white" : "#64748B",
              boxShadow: tab === t ? "0 3px 10px rgba(0,87,255,0.25)" : "none",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
              }}
            >
              <Skel h={128} r={12} />
              <div className="mt-3 space-y-2">
                <Skel h={14} />
                <Skel w="50%" h={10} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <BookMarked className="w-12 h-12 mb-3" style={{ color: "#CBD5E1" }} />
          <p className="font-bold text-slate-500">No programs here yet.</p>
          <p className="text-sm text-slate-400 mt-1">
            Enroll in a course to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate("/course")}
              className="rounded-2xl p-4 cursor-pointer group"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
                boxShadow: "0 2px 16px rgba(0,87,255,0.04)",
              }}
            >
              <div className="h-32 rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img
                  src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt="course"
                />
              </div>
              <h4
                className="font-bold text-sm mb-2.5"
                style={{ color: C.dark }}
              >
                {c.title}
              </h4>
              <div
                className="flex justify-between items-center text-xs mb-2.5"
                style={{ color: "#94A3B8" }}
              >
                <span className="flex items-center gap-1.5">
                  <MonitorPlay className="w-3.5 h-3.5" /> {c.sessions} Sessions
                </span>
                <span className="font-bold" style={{ color: C.primary }}>
                  {c.progress}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "#EEF3FF" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${c.progress}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  style={{
                    background: `linear-gradient(90deg,${C.primary},${C.secondary})`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// src/Dashboard.jsx  — PART 2 of 2
// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCTIONS: Append everything below directly after the last line of Part 1.
// Part 1 ends after the MyProgramsView component closing brace.
// ─────────────────────────────────────────────────────────────────────────────

// ============================================================================
// TUTOR FINANCIAL VIEW  — WIRED to TutorService.getAnalytics()
// ============================================================================
const TutorFinancialView = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // WIRE: GET /tutors/analytics
        const res = await TutorService.getAnalytics();
        setStats(res.data);
      } catch (err) {
        console.log('err: ', err);
        toast.error("Could not load analytics", { style: toastErr });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = stats
    ? [
        {
          label: "Gross Revenue",
          val: stats.totalRevenue,
          icon: DollarSign,
          color: "#10B981",
          bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)",
          trend: "+12.5%",
        },
        {
          label: "Active Scholars",
          val: String(stats.activeScholars),
          icon: Users,
          color: C.primary,
          bg: `linear-gradient(135deg,#EEF3FF,#DBEAFE)`,
          trend: "+8.2%",
        },
        {
          label: "Live Programs",
          val: String(stats.livePrograms),
          icon: MonitorPlay,
          color: C.secondary,
          bg: "linear-gradient(135deg,#EAF6FF,#BAE6FD)",
          trend: "Live",
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl mx-auto pt-6"
    >
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
              }}
            >
              <Skel w={44} h={44} r={12} />
              <div className="mt-3 space-y-2">
                <Skel w="50%" h={10} />
                <Skel w="70%" h={28} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
                boxShadow: "0 4px 20px rgba(0,87,255,0.06)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60"
                style={{ background: s.bg }}
              />
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: s.bg }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <span
                  className="text-xs font-black px-2.5 py-1 rounded-lg"
                  style={{ background: "#F8FAFC", color: s.color }}
                >
                  {s.trend}
                </span>
              </div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.15em] mb-1 relative z-10"
                style={{ color: "#94A3B8" }}
              >
                {s.label}
              </p>
              <p
                className="text-3xl font-black relative z-10"
                style={{ color: C.dark }}
              >
                {s.val}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Earnings chart placeholder */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "white",
          border: "1px solid rgba(0,87,255,0.08)",
          boxShadow: "0 2px 16px rgba(0,87,255,0.04)",
        }}
      >
        <div className="flex justify-between items-center mb-5">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94A3B8" }}
          >
            Monthly Revenue
          </p>
          <span
            className="text-xs font-bold px-3 py-1 rounded-lg"
            style={{ background: "#EEF3FF", color: C.primary }}
          >
            Last 6 months
          </span>
        </div>
        <div className="flex items-end gap-3 h-28">
          {[42, 58, 71, 55, 83, 95].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-xl relative group cursor-pointer"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background:
                  i === 5
                    ? `linear-gradient(180deg,${C.primary},${C.secondary})`
                    : "rgba(0,87,255,0.10)",
                minHeight: 8,
              }}
            >
              <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black whitespace-nowrap px-2 py-0.5 rounded-md text-white"
                style={{ background: C.dark }}
              >
                ₹{(h * 2500).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
            <span
              key={m}
              className="flex-1 text-center text-[9px] font-bold"
              style={{ color: "#CBD5E1" }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// ADMIN OVERVIEW  — WIRED to AdminService.getPlatformStats() + moderateCourse()
// ============================================================================
const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null); // courseId being moderated

  // Seed pending courses for demo (replace with real GET /admin/pending-courses)
  const demoPending = [
    {
      id: 201,
      title: "JEE Advanced Chemistry",
      tutor: "Dr. Ramesh Kumar",
      tag: "Science",
      submitted: "2 hrs ago",
    },
    {
      id: 202,
      title: "CAT Quant Shortcuts",
      tutor: "Priya Nair",
      tag: "Management",
      submitted: "5 hrs ago",
    },
    {
      id: 203,
      title: "UPSC Ethics Optional",
      tutor: "Arjun Sharma",
      tag: "UPSC",
      submitted: "Yesterday",
    },
    {
      id: 204,
      title: "Class 12 Biology NEET",
      tutor: "Sunita Reddy",
      tag: "Science",
      submitted: "2 days ago",
    },
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // WIRE: GET /admin/stats
        const res = await AdminService.getPlatformStats();
        setStats(res.data);
      } catch (err) {
        console.log('err: ', err);
        toast.error("Could not load platform stats", { style: toastErr });
      } finally {
        setLoading(false);
        setPending(demoPending);
      }
    };
    load();
  }, []);

  // WIRE: PATCH /admin/courses/:id/moderate  { status: 'approved' | 'rejected' }
  const moderate = async (courseId, status) => {
    setActioning(courseId);
    try {
      await AdminService.moderateCourse(courseId, status);
      setPending((p) => p.filter((c) => c.id !== courseId));
      toast.success(
        status === "approved" ? "Course approved ✓" : "Course rejected",
        {
          style: toastOK,
          iconTheme: {
            primary: status === "approved" ? "#34d399" : "#f87171",
            secondary: "#0f172a",
          },
        },
      );
    } catch (err) {
      console.log('err: ', err);
      toast.error("Action failed — try again", { style: toastErr });
    } finally {
      setActioning(null);
    }
  };

  const platformCards = stats
    ? [
        {
          label: "Platform Revenue",
          val: stats.totalPlatformRevenue,
          icon: DollarSign,
          color: "#10B981",
          bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)",
        },
        {
          label: "Active Users",
          val: stats.totalActiveUsers,
          icon: Users,
          color: C.primary,
          bg: `linear-gradient(135deg,#EEF3FF,#DBEAFE)`,
        },
        {
          label: "Pending Reviews",
          val: String(pending.length),
          icon: BookOpen,
          color: C.accent,
          bg: "linear-gradient(135deg,#FFF7ED,#FED7AA)",
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6 pt-6"
    >
      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
              }}
            >
              <Skel h={60} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {platformCards.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl flex items-center gap-4"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
                boxShadow: "0 4px 16px rgba(0,87,255,0.06)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: s.bg }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p
                  className="text-[9px] font-black uppercase tracking-[0.15em]"
                  style={{ color: "#94A3B8" }}
                >
                  {s.label}
                </p>
                <p
                  className="text-2xl font-black mt-0.5"
                  style={{ color: C.dark }}
                >
                  {s.val}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pending approvals queue */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "white",
          border: "1px solid rgba(0,87,255,0.08)",
          boxShadow: "0 2px 16px rgba(0,87,255,0.04)",
        }}
      >
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            borderBottom: "1px solid rgba(0,87,255,0.06)",
            background: "#F8FAFF",
          }}
        >
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4" style={{ color: C.primary }} />
            <p className="text-sm font-black" style={{ color: C.dark }}>
              Pending Course Approvals
            </p>
          </div>
          {pending.length > 0 && (
            <span
              className="text-xs font-black px-2.5 py-1 rounded-full text-white"
              style={{ background: C.accent }}
            >
              {pending.length} waiting
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="flex flex-col items-center py-14 text-center">
            <CheckCircle
              className="w-10 h-10 mb-3"
              style={{ color: "#34d399" }}
            />
            <p className="font-bold" style={{ color: C.dark }}>
              All caught up!
            </p>
            <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
              No courses pending review.
            </p>
          </div>
        ) : (
          <div
            className="divide-y"
            style={{ borderColor: "rgba(0,87,255,0.05)" }}
          >
            <AnimatePresence>
              {pending.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "#EEF3FF" }}
                    >
                      <BookOpen
                        className="w-4 h-4"
                        style={{ color: C.primary }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-bold text-sm truncate"
                        style={{ color: C.dark }}
                      >
                        {course.title}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#94A3B8" }}
                      >
                        by {course.tutor} ·{" "}
                        <span
                          className="font-semibold"
                          style={{ color: C.primary }}
                        >
                          {course.tag}
                        </span>{" "}
                        · {course.submitted}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* WIRE: Approve → AdminService.moderateCourse(id, 'approved') */}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => moderate(course.id, "approved")}
                      disabled={actioning === course.id}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg,#059669,#10B981)",
                        boxShadow: "0 3px 10px rgba(16,185,129,0.28)",
                      }}
                    >
                      {actioning === course.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </>
                      )}
                    </motion.button>
                    {/* WIRE: Reject → AdminService.moderateCourse(id, 'rejected') */}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => moderate(course.id, "rejected")}
                      disabled={actioning === course.id}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-60"
                      style={{
                        background: "#FFF1F2",
                        color: "#E11D48",
                        border: "1px solid #FECDD3",
                      }}
                    >
                      {actioning === course.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// ACCOUNT SETTINGS VIEW
// ============================================================================
const AccountSettingsView = () => {
  const userData = JSON.parse(localStorage.getItem("user_details"));
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl pt-6"
    >
      <div
        className="rounded-2xl p-7"
        style={{
          background: "white",
          border: "1px solid rgba(0,87,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,87,255,0.06)",
        }}
      >
        <div
          className="flex items-center gap-5 mb-7 pb-7"
          style={{ borderBottom: "1px solid rgba(0,87,255,0.06)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
            }}
          >
            {userData?.first_name?.charAt(0) || "A"}
          </div>
          <div>
            <h3 className="text-xl font-black mb-1.5" style={{ color: C.dark }}>
              {userData?.first_name || "Avinash"} {userData?.last_name || ""}
            </h3>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-max"
              style={{
                background: "#EEF3FF",
                color: C.primary,
                border: "1px solid rgba(0,87,255,0.12)",
              }}
            >
              <Shield className="w-3 h-3" /> Verified {userData?.role || "learner"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Email Address",
              Icon: User,
              placeholder: userData?.email || "user@example.com",
              type: "email",
              disabled: true,
            },
            {
              label: "Mobile Number",
              Icon: Phone,
              placeholder: userData?.mobile || "+91 9876543210",
              type: "tel",
              disabled: false,
            },
          ].map((f, i) => (
            <div key={i}>
              <label
                className="text-[10px] font-black uppercase tracking-[0.15em] block mb-1.5"
                style={{ color: "#94A3B8" }}
              >
                {f.label}
              </label>
              <div className="relative">
                <f.Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={f.type}
                  disabled={f.disabled}
                  defaultValue={f.disabled ? f.placeholder : undefined}
                  placeholder={!f.disabled ? f.placeholder : undefined}
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium outline-none"
                  style={{
                    background: f.disabled ? "#F8FAFC" : "white",
                    border: `1px solid ${f.disabled ? "#E2E8F0" : "rgba(0,87,255,0.15)"}`,
                    color: f.disabled ? "#94A3B8" : C.dark,
                    cursor: f.disabled ? "not-allowed" : "auto",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-6 pt-6 flex justify-end"
          style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              toast.success("Preferences saved!", { style: toastOK })
            }
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              boxShadow: "0 4px 16px rgba(0,87,255,0.3)",
            }}
          >
            Update Preferences
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// RIGHT SIDEBAR  — Gamification (UI untouched)
// ============================================================================
const RightSidebar = () => (
  <div className="w-[264px] h-full p-3 shrink-0 z-20 hidden xl:flex flex-col">
    <div
      className="flex-1 rounded-[26px] overflow-y-auto hide-scrollbar flex flex-col gap-4 p-4"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,87,255,0.08)",
        boxShadow:
          "0 8px 40px rgba(0,87,255,0.06),inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* Consistency tracker */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "#F8FAFF",
          border: "1px solid rgba(0,87,255,0.07)",
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <p
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94A3B8" }}
          >
            Consistency
          </p>
          <CheckCircle className="w-4 h-4" style={{ color: "#10B981" }} />
        </div>
        <div className="flex justify-between">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className="text-[9px] font-black"
                style={{ color: "#CBD5E1" }}
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
                        ? "linear-gradient(135deg,#EEF3FF,#DBEAFE)"
                        : "white",
                    border: `1px solid ${i < 3 ? "rgba(0,87,255,0.12)" : "#E2E8F0"}`,
                    color: i < 3 ? C.primary : "#94A3B8",
                  }}
                >
                  {15 + i}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top ranked */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", border: "1px solid rgba(0,87,255,0.08)" }}
      >
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{
            borderBottom: "1px solid rgba(0,87,255,0.06)",
            background: "#F8FAFF",
          }}
        >
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5"
            style={{ color: "#64748B" }}
          >
            <Star
              className="w-3 h-3 fill-current"
              style={{ color: "#F59E0B" }}
            />{" "}
            Top Ranked
          </span>
          <span
            className="text-[9px] font-black px-2 py-0.5 rounded-md"
            style={{ background: "#EEF3FF", color: C.primary }}
          >
            ✦ Special
          </span>
        </div>
        <div className="p-3">
          <div className="h-20 rounded-xl overflow-hidden mb-2.5 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80"
              className="w-full h-full object-cover"
              alt="top"
            />
          </div>
          <h4 className="font-bold text-sm mb-0.5" style={{ color: C.dark }}>
            Astrophysics Fundamentals
          </h4>
          <p className="text-[10px] mb-3" style={{ color: "#94A3B8" }}>
            By Dr. N. Tyson
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-wider text-white"
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              boxShadow: "0 3px 10px rgba(0,87,255,0.25)",
            }}
          >
            View Curriculum
          </motion.button>
        </div>
      </div>

      {/* Daily challenge */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(145deg,${C.dark} 0%,#0D1A3E 100%)`,
          border: "1px solid rgba(0,194,255,0.14)",
          boxShadow: "0 8px 28px rgba(0,87,255,0.2)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-28 h-28 rounded-full"
          style={{
            background: `radial-gradient(circle,rgba(0,194,255,0.15),transparent)`,
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
          Solve today's reasoning puzzle and earn 50 XP.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
          style={{
            background: `linear-gradient(135deg,${C.secondary},${C.primary})`,
            color: "white",
            boxShadow: "0 4px 16px rgba(0,194,255,0.28)",
          }}
        >
          Start Quiz (+50 XP)
        </motion.button>
      </div>

      {/* XP progress */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "#F8FAFF",
          border: "1px solid rgba(0,87,255,0.07)",
        }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <p
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94A3B8" }}
          >
            Weekly XP Goal
          </p>
          <span className="text-xs font-black" style={{ color: C.primary }}>
            320 / 500
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden mb-1.5"
          style={{ background: "#EEF3FF" }}
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
        <p className="text-[10px]" style={{ color: "#94A3B8" }}>
          180 XP to your next badge 🏆
        </p>
      </div>
    </div>
  </div>
);

// ============================================================================
// CREATE COURSE MODAL  — WIRED to TutorService.createCourse()
// ============================================================================
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
  });
  const [submitting, setSubmitting] = useState(false);

  const handlePublish = async () => {
    // Basic validation
    if (!meta.title.trim()) {
      toast.error("Course title is required", { style: toastErr });
      return;
    }
    if (!meta.price.trim()) {
      toast.error("Selling price is required", { style: toastErr });
      return;
    }
    const totalVideos = modules.reduce((acc, m) => acc + m.videos.length, 0);
    if (totalVideos === 0) {
      toast.error("Add at least one video to a section", { style: toastErr });
      return;
    }

    setSubmitting(true);
    try {
      // WIRE: POST /tutors/courses
      // Payload shape matches what api.js TutorService.createCourse() expects
      await TutorService.createCourse({
        title: meta.title,
        category: meta.category,
        duration: meta.duration,
        price: meta.price,
        modules: modules.map((m) => ({ title: m.title, videos: m.videos })),
      });
      toast.success("Course submitted for admin review! 🚀", {
        style: toastOK,
        iconTheme: { primary: "#38bdf8", secondary: "#0f172a" },
      });
      // Reset form
      setMeta({ title: "", category: "", duration: "", price: "" });
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.message || "Publish failed — try again";
      toast.error(msg, { style: toastErr });
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
            background: "rgba(5,14,43,0.55)",
            backdropFilter: "blur(16px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
            transition={spring}
            className="w-full max-w-3xl max-h-[88vh] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "white",
              border: "1px solid rgba(0,87,255,0.12)",
              boxShadow: "0 40px 80px rgba(0,87,255,0.16)",
            }}
          >
            {/* Modal header */}
            <div
              className="px-7 py-4 flex items-center justify-between shrink-0"
              style={{
                borderBottom: "1px solid rgba(0,87,255,0.06)",
                background: "#F8FAFF",
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
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "white", border: "1px solid #E2E8F0" }}
              >
                <X className="w-4 h-4 text-slate-500" />
              </motion.button>
            </div>

            {/* Modal body */}
            <div className="p-7 overflow-y-auto flex-1 hide-scrollbar space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "#94A3B8" }}
                  >
                    Course Meta
                  </p>
                  {[
                    { key: "title", ph: "Course Title *" },
                    { key: "category", ph: "Category (e.g. Science, UPSC)" },
                    { key: "duration", ph: "Duration (e.g. 4 Weeks)" },
                  ].map(({ key, ph }) => (
                    <input
                      key={key}
                      type="text"
                      value={meta[key]}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, [key]: e.target.value }))
                      }
                      placeholder={ph}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                      style={{
                        background: "white",
                        border: "1px solid rgba(0,87,255,0.1)",
                        color: C.dark,
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "#94A3B8" }}
                  >
                    Pricing
                  </p>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: "#10B981" }}
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
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#065F46",
                      }}
                    />
                  </div>
                  {/* Summary */}
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "#F8FAFF",
                      border: "1px solid rgba(0,87,255,0.08)",
                    }}
                  >
                    <p
                      className="text-[9px] font-black uppercase tracking-[0.15em] mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Summary
                    </p>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#64748B" }}
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

              {/* Curriculum builder */}
              <div
                style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
                className="pt-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "#94A3B8" }}
                  >
                    Curriculum
                  </p>
                  <motion.button
                    onClick={addModule}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg,${C.primary},#0080FF)`,
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
                        border: "1px solid rgba(0,87,255,0.08)",
                        background: "white",
                      }}
                    >
                      <div
                        className="px-4 py-3 flex justify-between items-center gap-3"
                        style={{
                          background: "#F8FAFF",
                          borderBottom: "1px solid rgba(0,87,255,0.06)",
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
                          {/* Delete module */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => removeMod(mi)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                            style={{ border: "1px solid #E2E8F0" }}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </motion.button>
                          {/* Add video */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => addVideo(mi)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                            style={{
                              background: `linear-gradient(135deg,${C.primary},#0080FF)`,
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
                              transition={{ duration: 0.22 }}
                              className="flex items-center gap-3 px-3.5 py-2 rounded-lg group hover:bg-slate-50 transition-colors"
                            >
                              <Video className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <input
                                type="text"
                                value={vid}
                                onChange={(e) =>
                                  updateVid(mi, vi, e.target.value)
                                }
                                placeholder="Video title..."
                                className="bg-transparent border-none outline-none text-sm flex-1 font-medium"
                                style={{ color: C.dark }}
                              />
                              {/* Delete video */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => removeVid(mi, vi)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {mod.videos.length === 0 && (
                          <p
                            className="text-xs px-4 py-2 italic"
                            style={{ color: "#CBD5E1" }}
                          >
                            No videos yet — click + to add one
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div
              className="px-7 py-4 flex justify-end gap-3 shrink-0"
              style={{
                borderTop: "1px solid rgba(0,87,255,0.06)",
                background: "#F8FAFF",
              }}
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50"
                style={{
                  color: "#64748B",
                  background: "white",
                  border: "1px solid #E2E8F0",
                }}
              >
                Cancel
              </motion.button>
              {/* WIRE: onClick → TutorService.createCourse(payload) */}
              <motion.button
                onClick={handlePublish}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 disabled:opacity-60"
                style={{
                  background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                  boxShadow: "0 4px 16px rgba(0,87,255,0.30)",
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
