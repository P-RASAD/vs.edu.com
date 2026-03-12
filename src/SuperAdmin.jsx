import React, { useState } from "react";
import {
  Layers,
  Users,
  DollarSign,
  BookOpen,
  Shield,
  Search,
  Bell,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  TrendingUp,
  PlayCircle,
  AlertTriangle,
  ArrowLeft,
  CheckSquare,
  Ban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SuperAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("moderation"); // Defaulting to moderation for you to see it
  const [reviewingCourse, setReviewingCourse] = useState(null); // State for the detailed review view
  const [activeVideo, setActiveVideo] = useState("");

  // Platform-Wide Mock Data
  const platformStats = [
    {
      title: "Total Revenue",
      value: "₹1.24 Cr",
      trend: "+14.2%",
      isUp: true,
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Active Students",
      value: "24,592",
      trend: "+5.4%",
      isUp: true,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Published Courses",
      value: "142",
      trend: "+12",
      isUp: true,
      icon: <BookOpen className="w-6 h-6 text-cyan-600" />,
      bg: "bg-cyan-100",
    },
    {
      title: "Platform Profit",
      value: "₹37.2 L",
      trend: "+18.1%",
      isUp: true,
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-100",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Learner",
      status: "Active",
      joined: "Today",
      courses: 3,
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.tutor@example.com",
      role: "Tutor",
      status: "Active",
      joined: "Yesterday",
      courses: 5,
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.k@example.com",
      role: "Learner",
      status: "Suspended",
      joined: "Oct 12",
      courses: 0,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.r@example.com",
      role: "Tutor",
      status: "Active",
      joined: "Oct 10",
      courses: 2,
    },
  ];

  // UPGRADED MOCK DATA: Now includes curriculum and video links for review
  const pendingCourses = [
    {
      id: 1,
      title: "Advanced Data Structures in C++",
      instructor: "Tech Academy",
      price: "₹2,499",
      submitted: "2 hours ago",
      length: "45 Hours",
      description:
        "A complete deep dive into Trees, Graphs, and Dynamic Programming.",
      curriculum: [
        {
          title: "1. Introduction to Trees",
          duration: "45:00",
          video: "https://www.youtube.com/embed/7AvYL8R7XlI",
        },
        {
          title: "2. Graph Traversal Algorithms",
          duration: "55:30",
          video: "https://www.youtube.com/embed/Lk6K9BgzpPw",
        },
      ],
    },
    {
      id: 2,
      title: "IBPS PO Complete Strategy",
      instructor: "Banking Prep Co.",
      price: "₹1,999",
      submitted: "5 hours ago",
      length: "30 Hours",
      description: "Master quantitative aptitude and reasoning for IBPS PO.",
      curriculum: [
        {
          title: "1. Syllogisms Masterclass",
          duration: "50:00",
          video: "https://www.youtube.com/embed/e3dA11TlfnU",
        },
        {
          title: "2. Data Interpretation",
          duration: "40:00",
          video: "https://www.youtube.com/embed/zhpcgpqWc1Q",
        },
      ],
    },
  ];

  const transactions = [
    {
      id: "TXN-8921",
      user: "Rahul Sharma",
      item: "UPSC General Studies",
      amount: "₹4,999",
      date: "Today, 10:24 AM",
      status: "Completed",
    },
    {
      id: "TXN-8920",
      user: "Sneha Reddy",
      item: "Tutor Payout",
      amount: "-₹12,450",
      date: "Yesterday",
      status: "Processed",
    },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 },
  };

  const handleReviewCourse = (course) => {
    setReviewingCourse(course);
    setActiveVideo(course.curriculum[0].video);
  };

  const handleAction = (action) => {
    alert(`Course ${action} successfully! (This would update the database)`);
    setReviewingCourse(null);
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden selection:bg-purple-200">
      {/* ========================================== */}
      {/* 1. LIGHT/PREMIUM SIDEBAR                   */}
      {/* ========================================== */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 relative z-20 shadow-xl shadow-slate-200/20">
        <div
          className="h-20 flex items-center px-8 border-b border-slate-100 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mr-3">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            <span className="text-purple-600">VS</span>intellecta
          </h1>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="px-4 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            Command Center
          </p>
          {[
            {
              id: "overview",
              label: "Platform Overview",
              icon: <Activity className="w-5 h-5" />,
            },
            {
              id: "users",
              label: "User Management",
              icon: <Users className="w-5 h-5" />,
            },
            {
              id: "moderation",
              label: "Course Moderation",
              icon: <Shield className="w-5 h-5" />,
            },
            {
              id: "finance",
              label: "Financial Reports",
              icon: <DollarSign className="w-5 h-5" />,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setReviewingCourse(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-purple-600"
              }`}
            >
              {item.icon} {item.label}
              {item.id === "moderation" && pendingCourses.length > 0 && (
                <span
                  className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${activeTab === item.id ? "bg-white text-purple-600" : "bg-rose-100 text-rose-600"}`}
                >
                  {pendingCourses.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200 flex items-center justify-center text-purple-700 font-black text-sm shadow-sm">
              SA
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Super Admin</p>
              <p className="text-xs text-slate-500 font-medium">System Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================== */}
      {/* 2. MAIN CONTENT DASHBOARD                  */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>

        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 capitalize">
            {activeTab.replace("-", " ")}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-11 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-full focus:outline-none focus:border-purple-300 focus:bg-white text-sm font-bold w-64 text-slate-900 transition-all shadow-inner"
              />
            </div>
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-purple-600 hover:shadow-md transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 hide-scrollbar relative z-10">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {platformStats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-100 p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group"
                      >
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}
                          >
                            {stat.icon}
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${stat.isUp ? "text-emerald-700 bg-emerald-100" : "text-rose-700 bg-rose-100"}`}
                          >
                            {stat.isUp ? (
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            ) : (
                              <ArrowDownRight className="w-3.5 h-3.5" />
                            )}{" "}
                            {stat.trend}
                          </span>
                        </div>
                        <div className="relative z-10">
                          <h4 className="text-slate-500 font-bold text-sm mb-1">
                            {stat.title}
                          </h4>
                          <span className="text-3xl font-black text-slate-900">
                            {stat.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: USER MANAGEMENT */}
              {activeTab === "users" && (
                <motion.div
                  key="users"
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900">
                          Platform Users
                        </h3>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {recentUsers.map((user) => (
                            <tr
                              key={user.id}
                              className="hover:bg-slate-50/80 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <p className="font-bold text-slate-900">
                                  {user.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {user.email}
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs font-bold text-emerald-600">
                                  {user.status}
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

              {/* ========================================== */}
              {/* TAB 3: COURSE MODERATION (Upgraded)        */}
              {/* ========================================== */}
              {activeTab === "moderation" && (
                <motion.div
                  key="moderation"
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={{ duration: 0.3 }}
                >
                  {/* QUEUE VIEW (If no course is selected) */}
                  {!reviewingCourse ? (
                    <>
                      <div className="mb-6 flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-extrabold text-slate-900">
                            Moderation Queue
                          </h3>
                          <p className="text-sm text-slate-500 font-medium mt-1">
                            Review courses submitted by Tutors to ensure they
                            meet platform standards.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingCourses.map((course) => (
                          <div
                            key={course.id}
                            className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-md flex flex-col hover:shadow-lg transition-shadow"
                          >
                            <div className="p-6 flex-1 flex flex-col">
                              <span className="w-max bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full mb-3">
                                Pending Review
                              </span>
                              <h4 className="font-extrabold text-slate-900 text-lg leading-snug mb-2">
                                {course.title}
                              </h4>
                              <p className="text-sm text-slate-600 font-medium line-clamp-2 mb-4">
                                {course.description}
                              </p>
                              <div className="space-y-1 mb-6 border-t border-slate-100 pt-4">
                                <p className="text-xs font-bold text-slate-500 flex justify-between">
                                  <span>Tutor:</span>{" "}
                                  <span className="text-slate-900">
                                    {course.instructor}
                                  </span>
                                </p>
                                <p className="text-xs font-bold text-slate-500 flex justify-between">
                                  <span>Price:</span>{" "}
                                  <span className="text-slate-900">
                                    {course.price}
                                  </span>
                                </p>
                              </div>

                              <div className="mt-auto">
                                <button
                                  onClick={() => handleReviewCourse(course)}
                                  className="w-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                                >
                                  <PlayCircle className="w-5 h-5" /> Review
                                  Content
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* DETAILED REVIEW VIEW (When a course is selected) */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden flex flex-col"
                    >
                      {/* Review Header */}
                      <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setReviewingCourse(null)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <div>
                            <h3 className="text-xl font-black">
                              {reviewingCourse.title}
                            </h3>
                            <p className="text-sm text-slate-400 font-medium">
                              Submitted by {reviewingCourse.instructor} •{" "}
                              {reviewingCourse.price}
                            </p>
                          </div>
                        </div>
                        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Moderation Mode
                          Active
                        </span>
                      </div>

                      {/* Review Content Split */}
                      <div className="flex flex-col lg:flex-row h-[600px]">
                        {/* Left: Video Player Area */}
                        <div className="w-full lg:w-[65%] bg-black flex flex-col border-r border-slate-200">
                          <div className="w-full flex-1 relative">
                            <iframe
                              src={activeVideo}
                              className="absolute inset-0 w-full h-full"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>

                        {/* Right: Moderation Tools & Curriculum */}
                        <div className="w-full lg:w-[35%] bg-slate-50 flex flex-col">
                          {/* Curriculum List to check different videos */}
                          <div className="p-6 border-b border-slate-200 flex-1 overflow-y-auto">
                            <h4 className="font-extrabold text-slate-900 mb-4">
                              Course Content
                            </h4>
                            <div className="space-y-2">
                              {reviewingCourse.curriculum.map((lesson, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveVideo(lesson.video)}
                                  className={`w-full text-left p-3 rounded-xl border flex justify-between items-center transition-all ${activeVideo === lesson.video ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"}`}
                                >
                                  <span className="text-sm font-bold truncate pr-4">
                                    {lesson.title}
                                  </span>
                                  <span
                                    className={`text-xs font-black shrink-0 ${activeVideo === lesson.video ? "text-blue-200" : "text-slate-400"}`}
                                  >
                                    {lesson.duration}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Moderation Actions Checklist */}
                          <div className="p-6 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                            <h4 className="font-extrabold text-slate-900 mb-3 text-sm uppercase tracking-widest">
                              Safety Checklist
                            </h4>
                            <div className="space-y-2 mb-6">
                              <label className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />{" "}
                                No Copyright Infringement detected
                              </label>
                              <label className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />{" "}
                                No 18+ or inappropriate content
                              </label>
                              <label className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />{" "}
                                Audio & Video quality meets standards
                              </label>
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={() => handleAction("Approved")}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                              >
                                <CheckCircle className="w-4 h-4" /> Approve
                              </button>
                              <button
                                onClick={() => handleAction("Rejected")}
                                className="flex-1 bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-500 text-rose-600 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                              >
                                <XCircle className="w-4 h-4" /> Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: FINANCE (Placeholder for brevity) */}
              {activeTab === "finance" && (
                <motion.div
                  key="finance"
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  className="p-10 text-center text-slate-500 font-bold"
                >
                  Financial Reports View
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
