import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Flame,
  Play,
  ChevronRight,
  Sparkles,
  CheckCircle,
  MonitorPlay,
  BrainCircuit,
  UploadCloud,
  DollarSign,
  Star,
  Users,
  X,
  Plus,
  Folder,
  Video,
  Activity,
  Search,
  SlidersHorizontal,
  BarChart3,
  Shield,
  GraduationCap,
  Target,
  TrendingUp,
  Medal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ============================================================================
// 1. MASTER LAYOUT & CONTROLLER
// ============================================================================
export default function Dashboard() {
  const navigate = useNavigate();
  // const [activeUser, setActiveUser] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  // const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // const userStr = localStorage.getItem("vsintellecta_active_user");
    // if (userStr) {
    //   const user = JSON.parse(userStr);
    //   setActiveUser(user);
    //   if (user.role === "superadmin" || user.role === "admin")
    //     setCurrentView("admin-hub");
    // } else {
      navigate("/login");
    // }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vsintellecta_active_user");
    localStorage.removeItem("vsintellecta_token");
    navigate("/login");
  };

  const fName =  "Avinash";
  const role =  "learner";
  const isTutor = role === "tutor";
  const isAdminOrSuper = role === "admin" || role === "superadmin";

  // if (!activeUser) return <div className="min-h-screen bg-[#F4F7FE]"></div>;

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 font-sans text-slate-900 overflow-hidden selection:bg-blue-200 relative">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- COLUMN 1: FLOATING CURVY SIDEBAR --- */}
      <div className="p-4 z-20 h-full flex flex-col shrink-0 w-[280px]">
        <aside className="w-full h-full rounded-[2.5rem] bg-white/70 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col overflow-hidden">
          <div className="h-24 flex items-center px-8 cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center mr-3 shadow-md">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              <span className="text-cyan-500">VS</span>intellecta
            </h1>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-2 hide-scrollbar">
            <p className="px-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Main Menu
            </p>
            {!isAdminOrSuper && (
              <>
                <SidebarItem
                  id="dashboard"
                  icon={<LayoutDashboard />}
                  label="Dashboard"
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                />
                <SidebarItem
                  id="explore"
                  icon={<Compass />}
                  label="All Courses"
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                />
                <SidebarItem
                  id="my-programs"
                  icon={<BookOpen />}
                  label="My Programs"
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                />
              </>
            )}
            {isTutor && (
              <>
                <div className="my-6 border-t border-slate-200/50"></div>
                <p className="px-2 text-xs font-black text-blue-500 uppercase tracking-widest mb-4">
                  Teaching Hub
                </p>
                <SidebarItem
                  id="tutor-hub"
                  icon={<BarChart3 />}
                  label="Instructor Analytics"
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                />
              </>
            )}
            {isAdminOrSuper && (
              <>
                <SidebarItem
                  id="admin-hub"
                  icon={<Shield />}
                  label="Platform Command"
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                />
              </>
            )}
            <div className="my-6 border-t border-slate-200/50"></div>
            <p className="px-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Settings
            </p>
            <SidebarItem
              id="settings"
              icon={<Settings />}
              label="Account Settings"
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </nav>

          <div className="p-5">
            <div className="flex items-center justify-between p-3 rounded-[1.5rem] hover:bg-white/80 transition-all cursor-pointer group shadow-sm border border-slate-100 bg-white/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md border-2 border-white">
                  {fName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 truncate w-24">
                    {fName}
                  </p>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-white rounded-full text-slate-400 hover:text-rose-500 hover:shadow-md transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* --- COLUMN 2: MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <header className="h-28 px-10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              {currentView === "dashboard"
                ? `Good Morning, ${fName}`
                : currentView === "explore"
                  ? "All Courses Catalog"
                  : currentView === "my-programs"
                    ? "My Enrolled Programs"
                    : currentView === "tutor-hub"
                      ? "Instructor Financials"
                      : "Account Details"}
              {isTutor && currentView === "dashboard" && (
                <Medal className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-md" />
              )}
            </h2>
            {isTutor && currentView === "dashboard" ? (
              <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5 bg-emerald-50 w-max px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                <TrendingUp className="w-4 h-4" /> Profit increased by 18.5%
                from last month
              </p>
            ) : (
              <p className="text-sm font-medium text-slate-500 mt-1">
                Ready to enhance your skills today?
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isTutor && (
              <button
                // onClick={() => setIsCourseModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-black shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 transform hover:-translate-y-1"
              >
                <UploadCloud className="w-5 h-5" /> Create Course
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-10 pb-24 hide-scrollbar relative">
          <AnimatePresence mode="wait">
            {currentView === "dashboard" && (
              <UserHomeView setCurrentView={setCurrentView} />
            )}
            {currentView === "explore" && <ExploreView />}
            {currentView === "my-programs" && <MyProgramsView />}
            {currentView === "tutor-hub" && <TutorFinancialView />}
          </AnimatePresence>
        </div>
      </main>

      {/* --- COLUMN 3: RIGHT SIDEBAR --- */}
      {!isAdminOrSuper && currentView === "dashboard" && <RightSidebar />}
    </div>
  );
}

const SidebarItem = ({ id, icon, label, currentView, setCurrentView }) => {
  const isActive = currentView === id;
  return (
    <button
      onClick={() => setCurrentView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[1.2rem] font-bold text-sm transition-all duration-300 ${isActive ? "bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] scale-[1.02]" : "text-slate-500 hover:bg-white hover:shadow-sm hover:text-slate-900"}`}
    >
      <span className={`${isActive ? "text-white" : "text-slate-400"}`}>
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </span>
      {label}
    </button>
  );
};

// ============================================================================
// COMPONENT: USER DASHBOARD HOME
// ============================================================================
const UserHomeView = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-10 max-w-6xl mx-auto"
    >
      {/* IN PROGRESS */}
      <motion.section variants={fadeUp}>
        <h3 className="text-xl font-black text-slate-900 mb-6">In Progress</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Psychometric Testing Explained",
              next: "Career Assessment",
              perc: 65,
              grad: "from-[#e0e7ff] via-[#f3e8ff] to-[#fae8ff]",
              videoId: "bU5MvV1zX-Y",
            },
            {
              title: "How to Choose Right Career",
              next: "Goal Setting",
              perc: 33,
              grad: "from-[#dcfce7] via-[#ccfbf1] to-[#cffafe]",
              videoId: "Zt9OQ1R24S0",
            },
            {
              title: "Resume Building Masterclass",
              next: "Interview Tips",
              perc: 12,
              grad: "from-[#ffedd5] via-[#ffedd5] to-[#fef3c7]",
              videoId: "9U-6K_g8n8g",
            },
          ].map((course, i) => (
            <div
              key={i}
              onClick={() => navigate("/course")}
              className={`bg-gradient-to-br ${course.grad} rounded-[2rem] p-5 shadow-sm border border-white cursor-pointer hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/50 blur-3xl rounded-full"></div>

              <div className="w-full h-40 rounded-[1.5rem] overflow-hidden mb-5 relative shadow-md border-2 border-white">
                <img
                  src={`https://img.youtube.com/vi/${course.videoId}/maxresdefault.jpg`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="youtube-thumbnail"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-white ml-1 fill-white" />
                  </div>
                </div>
              </div>

              <h4 className="font-black text-slate-900 text-base leading-snug line-clamp-2 mb-2">
                {course.title}
              </h4>
              <p className="text-xs font-bold text-slate-600 mb-4 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" /> Next: {course.next}
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${course.perc}%` }}
                  ></div>
                </div>
                <span className="text-xs font-black text-slate-900">
                  {course.perc}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* AI NEURAL PATHWAYS */}
      <motion.section
        variants={fadeUp}
        onClick={() => navigate("/course")}
        className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-800 cursor-pointer group"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-all"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-black text-cyan-400 mb-3 uppercase tracking-widest">
              <BrainCircuit className="w-3 h-3" /> AI Personalized Module
            </div>
            <h2 className="text-3xl font-black text-white mb-3">
              Interview Preparation Mastery
            </h2>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-2xl">
              Based on your recent performance, our AI has generated a
              customized pathway to strengthen your communication and
              presentation skills.
            </p>
          </div>
          <button className="bg-cyan-500 text-slate-900 px-8 py-4 rounded-[1.5rem] text-sm font-black shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform flex items-center gap-2 shrink-0">
            Start Sequence <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>

      {/* RELATED PROGRAMS (Curvy Marquee) */}
      <motion.section variants={fadeUp} className="py-2 overflow-hidden">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-black text-slate-900">
            Related Programs
          </h3>
          <button
            onClick={() => setCurrentView("explore")}
            className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full"
          >
            View More
          </button>
        </div>

        <div className="relative w-full flex overflow-x-hidden pb-4">
          <div className="animate-marquee flex gap-6 whitespace-nowrap">
            {[
              {
                title: "Top 5 Career Options",
                author: "Surabhi Dewra",
                rating: 4.8,
                price: "Free",
                vid: "5X4M74a1MWM",
              },
              {
                title: "Psychometric Testing",
                author: "Surabhi Dewra",
                rating: 4.9,
                price: "Free",
                vid: "d_T9o9B0R9M",
              },
              {
                title: "After 12th Guidance",
                author: "Surabhi Dewra",
                rating: 4.7,
                price: "Free",
                vid: "E7A8z0O9gKk",
              },
              {
                title: "Engineering Careers",
                author: "Surabhi Dewra",
                rating: 4.6,
                price: "Free",
                vid: "v_hK9R0P5Yc",
              },
              {
                title: "Commerce Pathways",
                author: "Surabhi Dewra",
                rating: 4.8,
                price: "Free",
                vid: "_V0o0t5_5kQ",
              },
            ].map((course, i) => (
              <div
                key={i}
                onClick={() => navigate("/course")}
                className="w-72 bg-white border border-slate-100 rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all inline-block cursor-pointer"
              >
                <div className="w-full h-36 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner relative group">
                  <img
                    src={`https://img.youtube.com/vi/${course.vid}/maxresdefault.jpg`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="course"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white ml-0.5 fill-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-black text-slate-900 text-base truncate mb-1">
                  {course.title}
                </h4>
                <p className="text-xs font-bold text-slate-500 mb-3">
                  {course.author}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <span className="flex items-center gap-1.5 text-xs font-black text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" /> {course.rating}
                  </span>
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: EXPLORE PROGRAMS (High Density)
// ============================================================================
const ExploreView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const allCourses = Array(10)
    .fill()
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
      reviews: "(1.2k)",
      enrolls: "15k+",
      price: "Free",
      publisher: "CareerGuide",
      vid: [
        "5X4M74a1MWM",
        "_V0o0t5_5kQ",
        "v_hK9R0P5Yc",
        "d_T9o9B0R9M",
        "Zt9OQ1R24S0",
      ][i % 5],
    }));

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers, exams, or guides..."
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] pl-12 pr-4 py-4 text-sm font-bold focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
        <button className="bg-white border border-slate-200 px-6 py-4 rounded-[1.5rem] flex items-center gap-2 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 shrink-0">
          <SlidersHorizontal className="w-5 h-5" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4">
        {allCourses.map((course, i) => (
          <div
            key={i}
            onClick={() => navigate("/course")}
            className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col cursor-pointer group p-3"
          >
            <div className="h-36 overflow-hidden relative rounded-xl shadow-inner mb-3">
              <img
                src={`https://img.youtube.com/vi/${course.vid}/maxresdefault.jpg`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="course"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-black text-white uppercase tracking-widest">
                {course.publisher}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="font-black text-slate-900 text-sm leading-snug mb-1 line-clamp-2">
                {course.title}
              </h4>
              <p className="text-xs text-slate-500 font-bold mb-3">
                {course.author}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating}{" "}
                <span className="text-slate-400 font-medium">
                  {course.reviews}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                {course.enrolls}
              </p>

              <div className="mt-auto border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="font-black text-emerald-600 text-base">
                  {course.price}
                </span>
                <button className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: MY PROGRAMS
// ============================================================================
const MyProgramsView = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[1.5rem] border border-slate-200 shadow-sm">
        <div className="flex gap-2">
          <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black shadow-sm">
            All
          </button>
          <button className="bg-white text-slate-600 border border-slate-200 px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50">
            In Progress
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[
          { t: "Psychometric Testing", v: "d_T9o9B0R9M" },
          { t: "Career Options after 12th", v: "E7A8z0O9gKk" },
        ].map((course, i) => (
          <div
            key={i}
            onClick={() => navigate("/course")}
            className="bg-white border border-slate-200 rounded-[1.5rem] p-4 shadow-sm cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-full h-32 rounded-xl overflow-hidden mb-4 shadow-inner">
              <img
                src={`https://img.youtube.com/vi/${course.v}/maxresdefault.jpg`}
                alt="course"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-black text-slate-900 text-sm leading-snug mb-3">
              {course.t}
            </h4>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <MonitorPlay className="w-3.5 h-3.5" /> 4 Sessions
              </span>
              <span className="flex items-center gap-2">
                50%{" "}
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `50%` }}
                  ></div>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: TUTOR FINANCIAL HUB
// ============================================================================
const TutorFinancialView = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Gross Revenue",
            val: "₹2,45,000",
            icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
            bg: "bg-emerald-50 border-emerald-100",
            trend: "+12.5%",
          },
          {
            label: "Active Scholars",
            val: "1,204",
            icon: <Users className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50 border-blue-100",
            trend: "+8.2%",
          },
          {
            label: "Live Programs",
            val: "4",
            icon: <MonitorPlay className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-50 border-purple-100",
            trend: "Live",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-[2rem] border bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.bg}`}
              >
                {stat.icon}
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                {stat.trend}
              </span>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

// ============================================================================
// COMPONENT: RIGHT SIDEBAR (Top Ranked & Challenges)
// ============================================================================
const RightSidebar = () => {
  // const navigate = useNavigate();
  return (
    <div className="p-2 z-20 h-full flex flex-col shrink-0 w-[320px] hidden xl:flex">
      <aside className="w-full h-full rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-y-auto hide-scrollbar p-6 space-y-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-2 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">
              Consistency
            </h3>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex justify-between items-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-black text-slate-400">
                  {day}
                </span>
                {i === 3 ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-100 to-orange-100 flex items-center justify-center shadow-inner border border-orange-200">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-sm font-black text-slate-500 border border-slate-100">
                    {15 + i}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Ranked Block with Animated Offer */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden relative shadow-sm flex flex-col">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Top
              Ranked
            </h3>
            <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 shadow-sm z-10 border border-emerald-200">
              <Star className="w-3 h-3 fill-emerald-500 text-emerald-500 animate-[spin_4s_linear_infinite]" />{" "}
              Special Offer
            </div>
          </div>
          <div className="p-3">
            <div className="w-full h-24 bg-slate-100 rounded-lg mb-3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80"
                className="w-full h-full object-cover"
                alt="top"
              />
            </div>
            <h4 className="font-black text-slate-900 text-sm leading-snug">
              Astrophysics Fundamentals
            </h4>
            <p className="text-[10px] font-bold text-slate-500 mt-0.5 mb-2">
              By Dr. N. Tyson
            </p>
            <button className="w-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-md hover:bg-blue-600 transition-colors">
              View Curriculum
            </button>
          </div>
        </div>

        {/* Challenge Block */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
          <h4 className="font-black text-lg mb-2">Daily Logic Challenge</h4>
          <p className="text-xs font-medium text-indigo-100 mb-5 leading-relaxed">
            Solve today's reasoning puzzle to earn 50 XP towards your weekly
            goal.
          </p>
          <button className="w-full bg-cyan-500 text-slate-900 text-xs font-black uppercase tracking-widest px-2 py-2 rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30">
            Start Quiz (+50 XP)
          </button>
        </div>
      </aside>
    </div>
  );
};
