import React, { useState } from "react";
import {
  Layers,
  LayoutDashboard,
  Video,
  UploadCloud,
  BarChart3,
  Settings,
  DollarSign,
  Users,
  Star,
  Plus,
  MoreVertical,
  FileVideo,
  CheckCircle,
  X,
  Image as ImageIcon,
  TrendingUp,
  Search,
  Bell,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Smooth futuristic animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // Mock Data
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      trend: "+12.5%",
      isUp: true,
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
      shadow: "shadow-emerald-500/30",
      bg: "from-emerald-500 to-teal-400",
    },
    {
      title: "Total Enrollments",
      value: "1,204",
      trend: "+8.2%",
      isUp: true,
      icon: <Users className="w-6 h-6 text-blue-400" />,
      shadow: "shadow-blue-500/30",
      bg: "from-blue-500 to-cyan-400",
    },
    {
      title: "Active Courses",
      value: "4",
      trend: "Stable",
      isUp: true,
      icon: <Video className="w-6 h-6 text-purple-400" />,
      shadow: "shadow-purple-500/30",
      bg: "from-purple-500 to-fuchsia-400",
    },
    {
      title: "Average Rating",
      value: "4.8",
      trend: "+0.2",
      isUp: true,
      icon: <Star className="w-6 h-6 text-amber-400" />,
      shadow: "shadow-amber-500/30",
      bg: "from-amber-400 to-orange-400",
    },
  ];

  const myCourses = [
    {
      id: 1,
      title: "Advanced React Patterns & Architecture",
      price: "₹1,999",
      students: 450,
      revenue: "₹8,99,550",
      status: "Published",
      completion: 85,
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      title: "Class 10 Math Full Course (CBSE)",
      price: "₹999",
      students: 520,
      revenue: "₹5,19,480",
      status: "Published",
      completion: 60,
      img: "https://images.unsplash.com/photo-1596495578065-6e0763cb1150?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms in Java",
      price: "₹1,499",
      students: 234,
      revenue: "₹3,50,766",
      status: "Draft",
      completion: 25,
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <div className="flex h-screen bg-[#F0F4F8] font-sans text-slate-800 overflow-hidden selection:bg-blue-200 relative">
      {/* ========================================== */}
      {/* 1. FUTURISTIC ANIMATED BACKGROUND ORBS       */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px]"
        ></motion.div>
      </div>

      {/* ========================================== */}
      {/* 2. GLASSMORPHISM SIDEBAR                     */}
      {/* ========================================== */}
      <aside className="w-72 bg-white/40 backdrop-blur-2xl border-r border-white/60 flex flex-col hidden md:flex shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div
          className="h-24 flex items-center px-8 border-b border-white/50 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 mr-3">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            <span className="text-blue-600">VS</span>intellecta
          </h1>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3">
          <p className="px-4 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            Main Menu
          </p>
          {[
            {
              id: "dashboard",
              label: "Overview",
              icon: <LayoutDashboard className="w-5 h-5" />,
            },
            {
              id: "courses",
              label: "My Courses",
              icon: <Video className="w-5 h-5" />,
            },
            {
              id: "revenue",
              label: "Financials",
              icon: <BarChart3 className="w-5 h-5" />,
            },
            {
              id: "settings",
              label: "Settings",
              icon: <Settings className="w-5 h-5" />,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden group ${
                activeTab === item.id
                  ? "text-blue-700 bg-white/80 shadow-sm border border-white"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-r-full"
                ></motion.div>
              )}
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile Glass Card */}
        <div className="p-6">
          <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-xl rounded-[1.5rem] border border-white shadow-sm cursor-pointer hover:bg-white/80 transition-all group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-110 transition-transform">
              IN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-slate-900 truncate">
                Instructor Profile
              </p>
              <p className="text-xs text-blue-600 font-bold truncate">
                Premium Creator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================== */}
      {/* 3. MAIN CONTENT AREA                         */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-24 px-10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, Instructor!
            </h2>
            <p className="text-slate-500 font-medium mt-1">
              Here is what's happening with your courses today.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search data..."
                className="pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-md border border-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm font-medium w-64 transition-all focus:bg-white"
              />
            </div>
            <button className="relative p-2.5 bg-white/60 backdrop-blur-md border border-white rounded-full shadow-sm hover:bg-white transition-colors text-slate-500 hover:text-blue-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 transform hover:-translate-y-1"
            >
              <UploadCloud className="w-5 h-5" /> New Course
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 pt-4 hide-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* A. STATS GRID (Glass Cards) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col justify-between hover:bg-white transition-colors group relative overflow-hidden"
                >
                  <div
                    className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}
                  ></div>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md ${stat.shadow}`}
                    >
                      {stat.icon}
                    </div>
                    <span
                      className={`text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 ${stat.isUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                    >
                      {stat.isUp && <TrendingUp className="w-3 h-3" />}{" "}
                      {stat.trend}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-slate-500 font-bold text-sm mb-1">
                      {stat.title}
                    </h4>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* B. FUTURISTIC REVENUE CHART & QUICK UPLOAD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Glowing SVG Chart Area */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Revenue Growth
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      Earnings over the last 30 days
                    </p>
                  </div>
                  <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500">
                    <option>Last 30 Days</option>
                    <option>This Year</option>
                  </select>
                </div>
                {/* Beautiful CSS/SVG Mock Chart */}
                <div className="w-full h-64 relative">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 800 200"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M0,200 L0,150 C100,120 200,180 300,100 C400,20 500,80 600,60 C700,40 750,90 800,20 L800,200 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M0,150 C100,120 200,180 300,100 C400,20 500,80 600,60 C700,40 750,90 800,20"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      filter="url(#glow)"
                    />
                    {/* Glowing Data Point */}
                    <circle
                      cx="800"
                      cy="20"
                      r="6"
                      fill="#ffffff"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      filter="url(#glow)"
                    />
                  </svg>
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="w-full border-t border-slate-400"></div>
                    <div className="w-full border-t border-slate-400"></div>
                    <div className="w-full border-t border-slate-400"></div>
                    <div className="w-full border-t border-slate-400"></div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Action Hologram Card */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-600/30 flex flex-col justify-between"
              >
                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 mb-6">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">
                    Ready to inspire?
                  </h3>
                  <p className="text-blue-100 font-medium mb-8">
                    Upload your next masterpiece and reach thousands of students
                    instantly.
                  </p>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="relative z-10 w-full bg-white text-blue-700 py-3.5 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg"
                >
                  Create New Course
                </button>
              </motion.div>
            </div>

            {/* C. SMART COURSE LIST (Beautiful 3D Rows) */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Your Masterpieces
                </h3>
                <button className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white/60 backdrop-blur-md rounded-[1.5rem] p-4 flex flex-col md:flex-row items-center justify-between border border-white shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group cursor-pointer gap-6"
                  >
                    <div className="flex items-center gap-5 w-full md:w-auto">
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                        <img
                          src={course.img}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm font-semibold text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> {course.students}{" "}
                            Enrolled
                          </span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>{course.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                      {/* Status & Progress */}
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <span
                          className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${course.status === "Published" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600 border border-slate-200"}`}
                        >
                          {course.status}
                        </span>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.completion}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${course.status === "Published" ? "bg-emerald-500" : "bg-blue-500"}`}
                          ></motion.div>
                        </div>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                          Revenue
                        </p>
                        <p className="font-black text-slate-900 text-lg">
                          {course.revenue}
                        </p>
                      </div>

                      <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors border border-slate-200 group-hover:border-blue-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ========================================== */}
      {/* 4. HOLOGRAPHIC UPLOAD MODAL                  */}
      {/* ========================================== */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white/95 backdrop-blur-2xl w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Create New Course
                  </h2>
                  <p className="text-slate-500 font-medium mt-1">
                    Upload your masterpiece and set your pricing.
                  </p>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="bg-slate-50 hover:bg-slate-200 text-slate-600 p-2.5 rounded-full transition-colors border border-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-10 overflow-y-auto flex-1 space-y-8 hide-scrollbar">
                {/* Glowing Drop Zone */}
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-3">
                    Course Video File
                  </label>
                  <div className="relative overflow-hidden border-2 border-dashed border-blue-400 rounded-3xl p-12 flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-50 transition-colors group cursor-pointer">
                    {/* Animated Pulse */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-24 h-24 bg-blue-400 rounded-full blur-xl opacity-20"
                    ></motion.div>

                    <div className="relative z-10 w-20 h-20 bg-white shadow-xl border border-blue-100 rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                      <FileVideo className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="font-black text-lg text-slate-900 mb-1">
                      Drag & Drop your video here
                    </p>
                    <p className="text-sm text-slate-500 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm mt-2">
                      Browse Files
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-3">
                      Course Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white font-bold transition-all shadow-sm"
                      placeholder="e.g. Master Class 10 Math"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-3">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white font-bold transition-all shadow-sm"
                      placeholder="999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-3">
                    Course Description
                  </label>
                  <textarea
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white font-bold transition-all shadow-sm resize-none"
                    placeholder="What will students learn in this module?"
                  ></textarea>
                </div>
              </div>

              <div className="px-10 py-6 border-t border-slate-100 bg-white flex justify-end gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-10">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-8 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 transform hover:-translate-y-1">
                  <CheckCircle className="w-5 h-5" /> Publish Course
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
