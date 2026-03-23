import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// DESIGN TOKENS — VSintellecta Brand System
// Primary:   #0057FF  (electric blue)
// Secondary: #00C2FF  (sky cyan)
// Accent:    #FF6B35  (warm coral — used sparingly)
// Dark:      #050E2B  (deep navy)
// Surface:   #F0F4FF  (blue-tinted white)
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

// ============================================================================
// MASTER LAYOUT
// ============================================================================
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Section 1: Foundation",
      videos: ["Introduction to Syllabus"],
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const userStr = localStorage.getItem("vsintellecta_active_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setActiveUser(user);
      if (user.role === "superadmin" || user.role === "admin")
        setCurrentView("admin-hub");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vsintellecta_active_user");
    localStorage.removeItem("vsintellecta_token");
    navigate("/login");
  };

  const addModule = () =>
    setModules([
      ...modules,
      {
        id: Date.now(),
        title: `Section ${modules.length + 1}: New Topic`,
        videos: [],
      },
    ]);
  const addVideo = (mi) => {
    const m = [...modules];
    m[mi].videos.push("");
    setModules(m);
  };
  const updateMod = (i, t) => {
    const m = [...modules];
    m[i].title = t;
    setModules(m);
  };
  const updateVid = (mi, vi, t) => {
    const m = [...modules];
    m[mi].videos[vi] = t;
    setModules(m);
  };
  const removeMod = (mi) => setModules(modules.filter((_, i) => i !== mi));
  const removeVid = (mi, vi) => {
    const m = [...modules];
    m[mi].videos = m[mi].videos.filter((_, i) => i !== vi);
    setModules(m);
  };

  const fName = activeUser?.firstName || activeUser?.first_name || "Avinash";
  const role = activeUser?.role || "learner";
  const isTutor = role === "tutor";
  const isAdminOrSuper = role === "admin" || role === "superadmin";

  if (!activeUser)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: C.surface }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 rounded-full border-[3px] border-transparent"
          style={{ borderTopColor: C.primary, borderRightColor: C.secondary }}
        />
      </div>
    );

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(145deg, #EEF3FF 0%, #F7F9FF 45%, #EAF6FF 100%)",
      }}
    >
      {/* Ambient mesh */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,87,255,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/2 -right-64 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,194,255,0.06) 0%, transparent 65%)",
          }}
        />
      </div>

      <Sidebar
        fName={fName}
        role={role}
        isTutor={isTutor}
        isAdminOrSuper={isAdminOrSuper}
        currentView={currentView}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
        navigate={navigate}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TopBar
          fName={fName}
          isTutor={isTutor}
          currentView={currentView}
          onAddCourse={() => setIsCourseModalOpen(true)}
        />
        <div className="flex-1 overflow-y-auto px-8 pb-20 pt-6 hide-scrollbar">
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
            {currentView === "settings" && (
              <AccountSettingsView key="settings" user={activeUser} />
            )}
            {currentView === "admin-hub" && <AdminOverview key="admin" />}
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
      className="w-[258px] h-full p-3 shrink-0 z-20 flex flex-col"
    >
      <div
        className="flex-1 rounded-[28px] flex flex-col overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(0,87,255,0.09)",
          boxShadow:
            "0 8px 40px rgba(0,87,255,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Logo */}
        <div
          className="px-6 pt-6 pb-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 60%)",
                }}
              />
              <GraduationCap className="w-5 h-5 text-white relative z-10" />
            </div>
            <div>
              <h1
                className="text-[17px] font-black tracking-tight leading-none"
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
            background: `linear-gradient(90deg, transparent, rgba(0,87,255,0.1), transparent)`,
          }}
        />

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 hide-scrollbar">
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
                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
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

function SidebarItem({ id, icon: Icon, label, currentView, setCurrentView }) {
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
            background: `linear-gradient(135deg, ${C.primary}, #0080FF)`,
            boxShadow: `0 4px 14px rgba(0,87,255,0.32)`,
          }}
          transition={spring}
        />
      )}
      <span
        className="relative z-10"
        style={{ color: isActive ? "white" : "#94A3B8" }}
      >
        <Icon className="w-4 h-4" />
      </span>
      <span className="relative z-10 font-semibold">{label}</span>
      {isActive && (
        <ChevronRight className="w-3 h-3 ml-auto relative z-10 opacity-50" />
      )}
      {!isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
          style={{ background: "rgba(0,87,255,0.04)" }}
        />
      )}
    </motion.button>
  );
}

// ============================================================================
// TOP BAR
// ============================================================================
function TopBar({ fName, isTutor, currentView, onAddCourse }) {
  const titles = {
    dashboard: `Good Morning, ${fName} ✦`,
    explore: "Course Catalog",
    "my-programs": "My Programs",
    "tutor-hub": "Instructor Financials",
    settings: "Account Settings",
    "admin-hub": "Platform Command",
  };
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="h-20 px-8 flex items-center justify-between shrink-0"
      style={{
        borderBottom: "1px solid rgba(0,87,255,0.06)",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div>
        <h2
          className="text-2xl font-black tracking-tight"
          style={{ color: C.dark }}
        >
          {titles[currentView]}
        </h2>
        {isTutor && currentView === "dashboard" ? (
          <p
            className="text-xs font-bold mt-1 flex items-center gap-1.5"
            style={{ color: "#10B981" }}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Revenue up 18.5% this month
          </p>
        ) : (
          <p className="text-xs font-medium mt-1" style={{ color: "#94A3B8" }}>
            Ready to enhance your skills today?
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "white",
            border: "1px solid rgba(0,87,255,0.1)",
            boxShadow: "0 2px 10px rgba(0,87,255,0.06)",
          }}
        >
          <Bell className="w-4 h-4 text-slate-500" />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ background: C.accent }}
          />
        </motion.button>
        {isTutor && (
          <motion.button
            onClick={onAddCourse}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
              boxShadow: "0 4px 20px rgba(0,87,255,0.32)",
            }}
          >
            <UploadCloud className="w-4 h-4" /> Add Course
          </motion.button>
        )}
      </div>
    </motion.header>
  );
}

// ============================================================================
// USER HOME VIEW
// ============================================================================
const UserHomeView = ({ setCurrentView, isTutor }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState(false);

  const features = [
    {
      title: "Psychometric Testing",
      desc: "Discover your true potential. Our advanced testing framework keeps you aligned as you move through your career.",
      videoId: "Pow-yUGYbVs",
    },
    {
      title: "Career Options after 12th",
      desc: "Navigate your future. Detailed breakdowns of every major pathway available post-secondary education.",
      videoId: "O12p01-ITCY",
    },
    {
      title: "Resume Building",
      desc: "Stand out from the crowd. Learn the industry secrets to crafting a resume that gets you hired.",
      videoId: "p1Zle7wRG7E",
    },
    {
      title: "Engineering Insights",
      desc: "A complete guide to the engineering landscape and what it takes to succeed.",
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
      className="space-y-10 max-w-6xl mx-auto"
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
        <div className="flex items-center justify-between mb-5">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate("/course")}
              className="rounded-[22px] overflow-hidden cursor-pointer group relative"
              style={{
                background: "white",
                border: "1px solid rgba(0,87,255,0.08)",
                boxShadow: `0 4px 24px rgba(0,87,255,0.07)`,
              }}
            >
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                }}
              />
              <div className="p-4">
                <div className="relative h-36 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="course"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Play
                        className="w-5 h-5 ml-0.5"
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
                  className="text-xs mb-4 flex items-center gap-1.5"
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
                        background: `linear-gradient(90deg, ${c.color}, ${c.color}BB)`,
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

      {/* ── Take a Closer Look ── */}
      <motion.section
        variants={fadeUp}
        className="rounded-[28px] overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: `linear-gradient(145deg, ${C.dark} 0%, #0D1A3E 60%, #071428 100%)`,
          border: "1px solid rgba(0,194,255,0.14)",
          boxShadow: "0 24px 64px rgba(0,87,255,0.18)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,87,255,0.12) 0%, transparent 65%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,194,255,0.07) 0%, transparent 65%)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
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
          <h2 className="text-[28px] font-black text-white mb-8 leading-tight">
            Take a closer look
            <br />
            at your path.
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-[36%] flex flex-col gap-1.5">
              {features.map((f, i) => {
                const isAct = activeTab === i;
                return (
                  <div key={i}>
                    <motion.button
                      onClick={() => setActiveTab(i)}
                      whileHover={{ x: 3 }}
                      className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all"
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
                      <span className="flex items-center gap-3">
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
                            className="mx-2 mt-1 mb-1 p-4 rounded-xl text-xs leading-relaxed"
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
              <div className="flex gap-1.5 px-5 mt-3">
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
                  background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                }}
              />
              <div
                className="relative h-[290px] md:h-[370px] rounded-[18px] overflow-hidden"
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
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

      {/* ── Related Programs ── */}
      <motion.section variants={fadeUp} className="overflow-hidden">
        <div className="flex justify-between items-center mb-5">
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
        <div className="flex overflow-x-hidden pb-2">
          <div className="animate-marquee flex gap-5">
            {[...marqueeItems, ...marqueeItems].map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                onClick={() => navigate("/course")}
                className="w-[255px] rounded-2xl p-4 shrink-0 cursor-pointer group"
                style={{
                  background: "white",
                  border: "1px solid rgba(0,87,255,0.08)",
                  boxShadow: "0 2px 16px rgba(0,87,255,0.05)",
                }}
              >
                <div
                  className="relative h-34 rounded-xl overflow-hidden mb-3 bg-slate-100"
                  style={{ height: "136px" }}
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
                        "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
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
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
                >
                  <span
                    className="flex items-center gap-1 text-xs font-bold"
                    style={{ color: "#F59E0B" }}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" /> {c.rating}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] line-through"
                      style={{ color: "#CBD5E1" }}
                    >
                      {c.oldPrice}
                    </span>
                    <span
                      className="text-sm font-black px-2.5 py-1 rounded-lg"
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
// EXPLORE VIEW
// ============================================================================
const ExploreView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const allCourses = Array(10)
    .fill(null)
    .map((_, i) => ({
      title: [
        "Career Guidance Post 12th",
        "Top 5 Commerce Careers",
        "Engineering Entrance Prep",
        "Psychometric Evaluations",
        "Resume Mastery",
      ][i % 5],
      author: "Surabhi Dewra",
      rating: 4.8,
      reviews: "1.2k",
      enrolls: "15k+",
      oldPrice: ["₹4,999", "₹2,999", "₹3,499", "₹1,999", "₹2,499"][i % 5],
      price: ["₹1,499", "₹999", "₹1,299", "₹499", "₹799"][i % 5],
      vid: [
        "Pow-yUGYbVs",
        "O12p01-ITCY",
        "p1Zle7wRG7E",
        "5KgSWcPFXks",
        "Pow-yUGYbVs",
      ][i % 5],
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 max-w-6xl mx-auto"
    >
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
            className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            style={{
              background:
                activeFilter === f
                  ? `linear-gradient(135deg, ${C.primary}, #0080FF)`
                  : "white",
              color: activeFilter === f ? "white" : "#64748B",
              border: `1px solid ${activeFilter === f ? "transparent" : "rgba(0,87,255,0.1)"}`,
              boxShadow:
                activeFilter === f ? `0 4px 14px rgba(0,87,255,0.28)` : "none",
            }}
          >
            {f}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {allCourses.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
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
              <p className="text-xs mb-2" style={{ color: "#94A3B8" }}>
                {c.author}
              </p>
              <div
                className="flex items-center gap-1 text-xs font-bold mb-1"
                style={{ color: "#F59E0B" }}
              >
                <Star className="w-3 h-3 fill-current" /> {c.rating}
                <span
                  className="font-normal ml-0.5"
                  style={{ color: "#CBD5E1" }}
                >
                  ({c.reviews})
                </span>
              </div>
              <p
                className="text-[10px] font-bold uppercase tracking-wide mb-3"
                style={{ color: "#CBD5E1" }}
              >
                {c.enrolls} enrolled
              </p>
              <div
                className="mt-auto pt-3 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
              >
                <div>
                  <span
                    className="text-[10px] block line-through"
                    style={{ color: "#CBD5E1" }}
                  >
                    {c.oldPrice}
                  </span>
                  <span
                    className="font-black text-base"
                    style={{ color: C.dark }}
                  >
                    {c.price}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${C.primary}, #0080FF)`,
                    boxShadow: "0 3px 10px rgba(0,87,255,0.28)",
                  }}
                >
                  Enroll
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// MY PROGRAMS VIEW
// ============================================================================
const MyProgramsView = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div
        className="flex gap-1.5 p-1 rounded-2xl w-max"
        style={{ background: "white", border: "1px solid rgba(0,87,255,0.08)" }}
      >
        {["All", "In Progress", "Completed"].map((tab, i) => (
          <button
            key={tab}
            className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background:
                i === 0
                  ? `linear-gradient(135deg, ${C.primary}, #0080FF)`
                  : "transparent",
              color: i === 0 ? "white" : "#64748B",
              boxShadow: i === 0 ? "0 3px 10px rgba(0,87,255,0.25)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            t: "Psychometric Testing",
            v: "Pow-yUGYbVs",
            sessions: 4,
            progress: 50,
          },
          {
            t: "Career Options after 12th",
            v: "O12p01-ITCY",
            sessions: 6,
            progress: 30,
          },
        ].map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            onClick={() => navigate("/course")}
            className="rounded-2xl p-4 cursor-pointer group"
            style={{
              background: "white",
              border: "1px solid rgba(0,87,255,0.08)",
              boxShadow: "0 2px 16px rgba(0,87,255,0.04)",
            }}
          >
            <div className="h-32 rounded-xl overflow-hidden mb-4 bg-slate-100">
              <img
                src={`https://img.youtube.com/vi/${c.v}/maxresdefault.jpg`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                alt="course"
              />
            </div>
            <h4 className="font-bold text-sm mb-3" style={{ color: C.dark }}>
              {c.t}
            </h4>
            <div
              className="flex justify-between items-center text-xs mb-3"
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
                  background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// TUTOR FINANCIAL VIEW
// ============================================================================
const TutorFinancialView = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="space-y-8 max-w-5xl mx-auto"
  >
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {[
        {
          label: "Gross Revenue",
          val: "₹2,45,000",
          icon: DollarSign,
          color: "#10B981",
          bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)",
          trend: "+12.5%",
        },
        {
          label: "Active Scholars",
          val: "1,204",
          icon: Users,
          color: C.primary,
          bg: `linear-gradient(135deg,#EEF3FF,#DBEAFE)`,
          trend: "+8.2%",
        },
        {
          label: "Live Programs",
          val: "4",
          icon: MonitorPlay,
          color: C.secondary,
          bg: "linear-gradient(135deg,#EAF6FF,#BAE6FD)",
          trend: "Live",
        },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl relative overflow-hidden"
          style={{
            background: "white",
            border: "1px solid rgba(0,87,255,0.08)",
            boxShadow: `0 4px 20px rgba(0,87,255,0.06)`,
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
  </motion.div>
);

// ============================================================================
// ACCOUNT SETTINGS
// ============================================================================
const AccountSettingsView = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="max-w-3xl"
  >
    <div
      className="rounded-2xl p-8"
      style={{
        background: "white",
        border: "1px solid rgba(0,87,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,87,255,0.06)",
      }}
    >
      <div
        className="flex items-center gap-6 mb-8 pb-8"
        style={{ borderBottom: "1px solid rgba(0,87,255,0.06)" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
          }}
        >
          {user?.firstName?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="text-xl font-black mb-1.5" style={{ color: C.dark }}>
            {user?.firstName} {user?.lastName}
          </h3>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-max"
            style={{
              background: "#EEF3FF",
              color: C.primary,
              border: "1px solid rgba(0,87,255,0.12)",
            }}
          >
            <Shield className="w-3 h-3" /> Verified {user?.role}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {
            label: "Email Address",
            Icon: User,
            placeholder: user?.email,
            type: "email",
            disabled: true,
          },
          {
            label: "Mobile Number",
            Icon: Phone,
            placeholder: "+91 9876543210",
            type: "tel",
            disabled: false,
          },
        ].map((f, i) => (
          <div key={i}>
            <label
              className="text-[10px] font-black uppercase tracking-[0.15em] block mb-2"
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
        className="mt-7 pt-7 flex justify-end"
        style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-3 rounded-xl text-sm font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
            boxShadow: "0 4px 16px rgba(0,87,255,0.3)",
          }}
        >
          Update Preferences
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// ============================================================================
// ADMIN OVERVIEW
// ============================================================================
const AdminOverview = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="max-w-5xl mx-auto"
  >
    <div
      className="rounded-2xl p-16 flex flex-col items-center text-center"
      style={{ background: "white", border: "1px solid rgba(0,87,255,0.08)" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "linear-gradient(135deg, #EEF3FF, #DBEAFE)" }}
      >
        <Shield className="w-8 h-8" style={{ color: C.primary }} />
      </div>
      <h2 className="text-2xl font-black mb-2" style={{ color: C.dark }}>
        Platform Command Center
      </h2>
      <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>
        Super Admin features are accessible through the dedicated moderation
        route.
      </p>
    </div>
  </motion.div>
);

// ============================================================================
// RIGHT SIDEBAR
// ============================================================================
const RightSidebar = () => (
  <div className="w-[272px] h-full p-3 shrink-0 z-20 hidden xl:flex flex-col">
    <div
      className="flex-1 rounded-[28px] overflow-y-auto hide-scrollbar flex flex-col gap-4 p-4"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,87,255,0.08)",
        boxShadow:
          "0 8px 40px rgba(0,87,255,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* Consistency */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "#F8FAFF",
          border: "1px solid rgba(0,87,255,0.07)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
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
            <div key={i} className="flex flex-col items-center gap-2">
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
                    background: "linear-gradient(135deg, #FFF7ED, #FED7AA)",
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
                        ? "linear-gradient(135deg, #EEF3FF, #DBEAFE)"
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

      {/* Top Ranked */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", border: "1px solid rgba(0,87,255,0.08)" }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
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
            ✦ Special Offer
          </span>
        </div>
        <div className="p-3">
          <div className="h-20 rounded-xl overflow-hidden mb-3 bg-slate-100">
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
              background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
              boxShadow: "0 3px 10px rgba(0,87,255,0.25)",
            }}
          >
            View Curriculum
          </motion.button>
        </div>
      </div>

      {/* Daily Challenge */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${C.dark} 0%, #0D1A3E 100%)`,
          border: "1px solid rgba(0,194,255,0.14)",
          boxShadow: "0 8px 28px rgba(0,87,255,0.2)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-28 h-28 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(0,194,255,0.15), transparent)`,
            transform: "translate(30%,-30%)",
          }}
        />
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4" style={{ color: C.secondary }} />
          <p
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: C.secondary }}
          >
            Daily Challenge
          </p>
        </div>
        <h4 className="font-black text-white text-lg leading-tight mb-1.5">
          Logic Puzzle
        </h4>
        <p
          className="text-xs mb-4 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Solve today's reasoning puzzle and earn 50 XP towards your weekly
          goal.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider"
          style={{
            background: `linear-gradient(135deg, ${C.secondary}, ${C.primary})`,
            color: "white",
            boxShadow: "0 4px 16px rgba(0,194,255,0.28)",
          }}
        >
          Start Quiz (+50 XP)
        </motion.button>
      </div>

      {/* XP Progress */}
      <div
        className="rounded-2xl p-5"
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
            Weekly XP Goal
          </p>
          <span className="text-xs font-black" style={{ color: C.primary }}>
            320 / 500
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden mb-2"
          style={{ background: "#EEF3FF" }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "64%" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
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
// CREATE COURSE MODAL
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
}) => (
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
          <div
            className="px-8 py-5 flex items-center justify-between shrink-0"
            style={{
              borderBottom: "1px solid rgba(0,87,255,0.06)",
              background: "#F8FAFF",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                }}
              >
                <UploadCloud className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-black" style={{ color: C.dark }}>
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

          <div className="p-8 overflow-y-auto flex-1 hide-scrollbar space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p
                  className="text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: "#94A3B8" }}
                >
                  Course Meta
                </p>
                {[
                  "Course Title",
                  "Category (e.g. Science, Career)",
                  "Duration (e.g. 4 Weeks)",
                ].map((ph, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
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
                    placeholder="Selling Price"
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium outline-none"
                    style={{
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      color: "#065F46",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ borderTop: "1px solid rgba(0,87,255,0.06)" }}
              className="pt-6"
            >
              <div className="flex justify-between items-center mb-5">
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${C.primary}, #0080FF)`,
                  }}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Section
                </motion.button>
              </div>
              <div className="space-y-3">
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
                      className="px-5 py-3.5 flex justify-between items-center gap-3"
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
                        <button
                          onClick={() => removeMod(mi)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                          style={{ border: "1px solid #E2E8F0" }}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </button>
                        <button
                          onClick={() => addVideo(mi)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                          style={{
                            background: `linear-gradient(135deg, ${C.primary}, #0080FF)`,
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      {mod.videos.map((vid, vi) => (
                        <div
                          key={vi}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg group hover:bg-slate-50 transition-colors"
                        >
                          <Video className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          <input
                            type="text"
                            value={vid}
                            onChange={(e) => updateVid(mi, vi, e.target.value)}
                            placeholder="Video Title..."
                            className="bg-transparent border-none outline-none text-sm flex-1 font-medium"
                            style={{ color: C.dark }}
                          />
                          <button
                            onClick={() => removeVid(mi, vi)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="px-8 py-5 flex justify-end gap-3 shrink-0"
            style={{
              borderTop: "1px solid rgba(0,87,255,0.06)",
              background: "#F8FAFF",
            }}
          >
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold"
              style={{
                color: "#64748B",
                background: "white",
                border: "1px solid #E2E8F0",
              }}
            >
              Cancel
            </button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                boxShadow: "0 4px 16px rgba(0,87,255,0.3)",
              }}
            >
              Publish Content
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
