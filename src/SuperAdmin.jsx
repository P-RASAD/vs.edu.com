// src/SuperAdmin.jsx
import React, { useState, useEffect } from "react";
import {
  Layers, Users, DollarSign, BookOpen, Shield, Search, Bell, Activity,
  ArrowUpRight, ArrowDownRight, CheckCircle, XCircle, TrendingUp, PlayCircle,
  AlertTriangle, ArrowLeft, Ban, CheckSquare, RefreshCw, Loader2,
  FileText, Download, Eye, Clock, BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useAuth } from "./context/AuthContext";
import { AdminService } from "./services/api";

const toastOK  = { borderRadius: "12px", background: "#0f172a", color: "#fff", fontSize: "13px", fontWeight: 600 };
const toastErr = { borderRadius: "12px", background: "#fff1f2", color: "#e11d48", fontSize: "13px", fontWeight: 600, border: "1px solid #fecdd3" };

const pageV = { initial: { opacity: 0, y: 12 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -12 } };

export default function SuperAdmin() {
  const userData = JSON.parse(localStorage.getItem("user_details"));
  const navigate        = useNavigate();
  const [activeTab,     setActiveTab]     = useState("overview");
  const [reviewingCourse, setReviewingCourse] = useState(null);
  const [activeVideo,   setActiveVideo]   = useState("");
  // API state
  const [stats,         setStats]         = useState(null);
  const [users,         setUsers]         = useState([]);
  const [pending,       setPending]       = useState([]);
  const [transactions,  setTransactions]  = useState([]);
  const [loadingStats,  setLoadingStats]  = useState(true);
  const [loadingUsers,  setLoadingUsers]  = useState(false);
  const [loadingPending,setLoadingPending]= useState(false);
  const [actioning,     setActioning]     = useState(null);
  const [checklist,     setChecklist]     = useState({ copyright: false, content: false, quality: false });
  // Load stats on mount
  useEffect(() => {
    const load = async () => {
      setLoadingStats(true);
      try {
        const [sRes, tRes] = await Promise.all([
          AdminService.getPlatformStats(),
          AdminService.getTransactions(),
        ]);
        setStats(sRes.data);
        setTransactions(tRes.data);
      } catch { toast.error("Failed to load stats", { style: toastErr }); }
      finally { setLoadingStats(false); }
    };
    load();
  }, []);

  // Load users when tab switches
  useEffect(() => {
    if (activeTab !== "users") return;
    const load = async () => {
      setLoadingUsers(true);
      try { const res = await AdminService.getUsers(); setUsers(res.data); }
      catch { toast.error("Failed to load users", { style: toastErr }); }
      finally { setLoadingUsers(false); }
    };
    load();
  }, [activeTab]);

  // Load pending courses when tab switches
  useEffect(() => {
    if (activeTab !== "moderation") return;
    const load = async () => {
      setLoadingPending(true);
      try { const res = await AdminService.getPendingCourses(); setPending(res.data); }
      catch { toast.error("Failed to load pending courses", { style: toastErr }); }
      finally { setLoadingPending(false); }
    };
    load();
  }, [activeTab]);

  const handleReview = (course) => {
    setReviewingCourse(course);
    setActiveVideo(course.curriculum[0].video);
    setChecklist({ copyright: false, content: false, quality: false });
  };

  const handleModerate = async (action) => {
    const allChecked = Object.values(checklist).every(Boolean);
    if (action === "approved" && !allChecked) {
      toast.error("Complete the safety checklist before approving.", { style: toastErr }); return;
    }
    setActioning(reviewingCourse.id);
    try {
      // WIRE: AdminService.moderateCourse → PATCH /admin/courses/:id/moderate
      await AdminService.moderateCourse(reviewingCourse.id, action);
      setPending(p => p.filter(c => c.id !== reviewingCourse.id));
      setReviewingCourse(null);
      toast.success(`Course ${action === "approved" ? "approved ✓" : "rejected"}`, {
        style: toastOK,
        iconTheme: { primary: action === "approved" ? "#34d399" : "#f87171", secondary: "#0f172a" },
      });
    } catch { toast.error("Action failed — try again", { style: toastErr }); }
    finally { setActioning(null); }
  };

  const statCards = stats ? [
    { title: "Total Revenue",     value: stats.totalPlatformRevenue, trend: "+14.2%", isUp: true,  icon: <DollarSign className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100" },
    { title: "Active Students",   value: stats.totalActiveUsers,     trend: "+5.4%",  isUp: true,  icon: <Users      className="w-6 h-6 text-blue-600" />,   bg: "bg-blue-100"   },
    { title: "Published Courses", value: String(stats.publishedCourses), trend: "+12",isUp: true,  icon: <BookOpen   className="w-6 h-6 text-cyan-600" />,   bg: "bg-cyan-100"   },
    { title: "Platform Profit",   value: stats.platformProfit,       trend: "+18.1%", isUp: true,  icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,bg: "bg-emerald-100"},
  ] : [];

  const navItems = [
    { id: "overview",    label: "Platform Overview", icon: <Activity className="w-5 h-5" />  },
    { id: "users",       label: "User Management",   icon: <Users     className="w-5 h-5" />  },
    { id: "moderation",  label: "Course Moderation", icon: <Shield    className="w-5 h-5" />, badge: pending.length },
    { id: "finance",     label: "Financial Reports", icon: <DollarSign className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_details")
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden selection:bg-purple-200">
      {/* ── Sidebar ── */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 shadow-xl shadow-slate-200/20">
        <div className="h-20 flex items-center px-7 border-b border-slate-100 cursor-pointer gap-3" onClick={() => navigate("/")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            <span className="text-purple-600">VS</span>intellecta
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
          <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Command Center</p>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setReviewingCourse(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-purple-600"
              }`}>
              {item.icon} {item.label}
              {item.badge > 0 && (
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-black ${activeTab === item.id ? "bg-white text-purple-600" : "bg-rose-100 text-rose-600"}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200 flex items-center justify-center text-purple-700 font-black text-sm shadow-sm">SA</div>
            <div>
              <p className="text-sm font-bold text-slate-900">{userData?.role }</p>
              <p className="text-xs text-slate-500 font-medium">{userData?.first_name} { userData?.last_name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors">
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Top bar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 capitalize">
            {activeTab.replace("-", " ")}
            {reviewingCourse && ` — Reviewing`}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input type="text" placeholder="Search anything..."
                className="pl-11 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-full focus:outline-none focus:border-purple-300 focus:bg-white text-sm font-bold w-56 text-slate-900 transition-all shadow-inner" />
            </div>
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-purple-600 hover:shadow-md transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-red-600 hover:text-red-700 px-4 py-2 transition-colors hidden sm:block"
            >
              Log out
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 hide-scrollbar relative z-10">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">

              {/* ── OVERVIEW ── */}
              {activeTab === "overview" && (
                <motion.div key="overview" variants={pageV} initial="initial" animate="in" exit="out" transition={{ duration: 0.3 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loadingStats ? (
                      Array(4).fill(0).map((_, i) => (
                        <div key={i} className="bg-white border border-slate-100 p-6 rounded-[1.5rem] shadow-sm animate-pulse">
                          <div className="w-12 h-12 rounded-2xl bg-slate-200 mb-4" />
                          <div className="h-4 bg-slate-200 rounded mb-2 w-1/2" />
                          <div className="h-8 bg-slate-200 rounded w-3/4" />
                        </div>
                      ))
                    ) : statCards.map((stat, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="bg-white border border-slate-100 p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>{stat.icon}</div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${stat.isUp ? "text-emerald-700 bg-emerald-100" : "text-rose-700 bg-rose-100"}`}>
                            {stat.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />} {stat.trend}
                          </span>
                        </div>
                        <h4 className="text-slate-500 font-bold text-sm mb-1">{stat.title}</h4>
                        <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent transactions */}
                  <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="text-lg font-extrabold text-slate-900">Recent Transactions</h3>
                      <button onClick={() => setActiveTab("finance")} className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Item</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {transactions.map((t, i) => (
                            <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-6 py-4 text-xs font-black text-slate-500">{t.id}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">{t.user}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{t.item}</td>
                              <td className={`px-6 py-4 text-sm font-black ${t.amount.startsWith("-") ? "text-rose-600" : "text-emerald-600"}`}>{t.amount}</td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── USERS ── */}
              {activeTab === "users" && (
                <motion.div key="users" variants={pageV} initial="initial" animate="in" exit="out" transition={{ duration: 0.3 }}>
                  <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900">Platform Users</h3>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">Manage learners, tutors, and admins</p>
                      </div>
                      {loadingUsers && <Loader2 className="w-5 h-5 animate-spin text-purple-600" />}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-black shrink-0">
                                    {user.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                  user.role === "Tutor" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                }`}>{user.role}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                  user.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                }`}>{user.status}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500 font-medium">{user.joined}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
                                    <Eye className="w-4 h-4 text-blue-500" />
                                  </motion.button>
                                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-rose-50 transition-colors">
                                    <Ban className="w-4 h-4 text-rose-400" />
                                  </motion.button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── MODERATION ── */}
              {activeTab === "moderation" && (
                <motion.div key="moderation" variants={pageV} initial="initial" animate="in" exit="out" transition={{ duration: 0.3 }}>
                  {!reviewingCourse ? (
                    <>
                      <div className="mb-6 flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-extrabold text-slate-900">Moderation Queue</h3>
                          <p className="text-sm text-slate-500 font-medium mt-1">Review courses submitted by Tutors before they go live.</p>
                        </div>
                        {loadingPending
                          ? <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                          : <button onClick={() => { setLoadingPending(true); AdminService.getPendingCourses().then(r => { setPending(r.data); setLoadingPending(false); }); }}
                              className="flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
                              <RefreshCw className="w-4 h-4" /> Refresh
                            </button>}
                      </div>

                      {pending.length === 0 && !loadingPending ? (
                        <div className="flex flex-col items-center py-20 text-center">
                          <CheckCircle className="w-14 h-14 text-emerald-400 mb-4" />
                          <h3 className="text-xl font-bold text-slate-700">Queue is clear!</h3>
                          <p className="text-slate-500 font-medium mt-1">No courses pending review right now.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <AnimatePresence>
                            {pending.map(course => (
                              <motion.div key={course.id}
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
                                <div className="p-6 flex-1 flex flex-col">
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">Pending Review</span>
                                    <span className="text-[10px] text-slate-400 font-medium ml-auto flex items-center gap-1"><Clock className="w-3 h-3" />{course.submitted}</span>
                                  </div>
                                  <h4 className="font-extrabold text-slate-900 text-base leading-snug mb-2">{course.title}</h4>
                                  <p className="text-sm text-slate-600 font-medium line-clamp-2 mb-4">{course.description}</p>
                                  <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-4">
                                    {[["Tutor", course.instructor],["Price", course.price],["Length", course.length]].map(([k,v]) => (
                                      <p key={k} className="text-xs font-bold text-slate-500 flex justify-between">
                                        <span>{k}:</span><span className="text-slate-900">{v}</span>
                                      </p>
                                    ))}
                                    <p className="text-xs font-bold text-slate-500 flex justify-between">
                                      <span>Videos:</span><span className="text-slate-900">{course.curriculum.length} lesson{course.curriculum.length !== 1 ? "s" : ""}</span>
                                    </p>
                                  </div>
                                  <div className="mt-auto flex gap-2">
                                    <button onClick={() => handleReview(course)}
                                      className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                                      <PlayCircle className="w-4 h-4" /> Review
                                    </button>
                                    <button onClick={async () => { setActioning(course.id); await AdminService.moderateCourse(course.id,"rejected"); setPending(p => p.filter(c => c.id !== course.id)); setActioning(null); toast.success("Course rejected", { style: toastOK }); }}
                                      disabled={actioning === course.id}
                                      className="w-10 h-10 rounded-xl border border-rose-200 hover:bg-rose-50 flex items-center justify-center transition-all disabled:opacity-50">
                                      {actioning === course.id ? <Loader2 className="w-4 h-4 animate-spin text-rose-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
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
                    /* ── Detailed review view ── */
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
                      {/* Header */}
                      <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setReviewingCourse(null)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <div>
                            <h3 className="text-lg font-black">{reviewingCourse.title}</h3>
                            <p className="text-sm text-slate-400 font-medium">
                              {reviewingCourse.instructor} · {reviewingCourse.price} · {reviewingCourse.length}
                            </p>
                          </div>
                        </div>
                        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/50 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Moderation Active
                        </span>
                      </div>

                      {/* Content split */}
                      <div className="flex flex-col lg:flex-row" style={{ height: 580 }}>
                        {/* Video player */}
                        <div className="w-full lg:w-[65%] bg-black flex flex-col border-r border-slate-200">
                          <div className="flex-1 relative">
                            <iframe src={activeVideo} className="absolute inset-0 w-full h-full" allowFullScreen />
                          </div>
                        </div>

                        {/* Moderation panel */}
                        <div className="w-full lg:w-[35%] bg-slate-50 flex flex-col overflow-hidden">
                          {/* Curriculum */}
                          <div className="p-5 border-b border-slate-200 flex-1 overflow-y-auto hide-scrollbar">
                            <h4 className="font-extrabold text-slate-900 mb-3 text-sm flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-blue-500" /> Course Content
                            </h4>
                            <div className="space-y-2">
                              {reviewingCourse.curriculum.map((lesson, idx) => (
                                <motion.button key={idx} whileHover={{ x: 2 }}
                                  onClick={() => setActiveVideo(lesson.video)}
                                  className={`w-full text-left p-3 rounded-xl border flex justify-between items-center transition-all ${
                                    activeVideo === lesson.video
                                      ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                      : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
                                  }`}>
                                  <span className="text-xs font-bold truncate pr-3 flex items-center gap-2">
                                    <PlayCircle className="w-3.5 h-3.5 shrink-0" /> {lesson.title}
                                  </span>
                                  <span className={`text-[10px] font-black shrink-0 ${activeVideo === lesson.video ? "text-blue-200" : "text-slate-400"}`}>
                                    {lesson.duration}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Checklist + actions */}
                          <div className="p-5 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                            <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-purple-600" /> Safety Checklist
                            </h4>
                            <div className="space-y-2 mb-5">
                              {[
                                ["copyright", "No Copyright Infringement detected"],
                                ["content",   "No 18+ or inappropriate content"],
                                ["quality",   "Audio & Video quality meets standards"],
                              ].map(([key, label]) => (
                                <label key={key} className="flex items-center gap-3 text-xs font-bold text-slate-600 cursor-pointer group">
                                  <input type="checkbox" checked={checklist[key]}
                                    onChange={e => setChecklist(p => ({ ...p, [key]: e.target.checked }))}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                                  <span className="group-hover:text-slate-900 transition-colors">{label}</span>
                                </label>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                onClick={() => handleModerate("approved")} disabled={!!actioning}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 disabled:opacity-60">
                                {actioning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />} Approve
                              </motion.button>
                              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                onClick={() => handleModerate("rejected")} disabled={!!actioning}
                                className="flex-1 bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-500 text-rose-600 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-60">
                                {actioning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />} Reject
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ── FINANCE ── */}
              {activeTab === "finance" && (
                <motion.div key="finance" variants={pageV} initial="initial" animate="in" exit="out" transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900">Financial Reports</h3>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">All platform revenue and tutor payouts</p>
                      </div>
                      <button className="flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
                        <Download className="w-4 h-4" /> Export CSV
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black border-b border-slate-200">
                          <tr>
                            {["Transaction ID","User","Item","Amount","Date","Status"].map(h => (
                              <th key={h} className="px-6 py-4">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {transactions.map((t, i) => (
                            <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-6 py-4 text-xs font-black text-slate-500">{t.id}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">{t.user}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{t.item}</td>
                              <td className={`px-6 py-4 text-sm font-black ${t.amount.startsWith("-") ? "text-rose-600" : "text-emerald-600"}`}>{t.amount}</td>
                              <td className="px-6 py-4 text-sm text-slate-500 font-medium">{t.date}</td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}