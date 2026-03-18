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
  PlusCircle,
  ArrowRight,
  Trash2,
  User,
  Phone,
  Lock,
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
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // Curriculum Builder State (For Modal)
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Section 1: Foundation",
      videos: ["Introduction to Syllabus"],
    },
  ]);

  // useEffect(() => {
    // window.scrollTo(0, 0);
    // const userStr = localStorage.getItem("vsintellecta_active_user");
    // if (userStr) {
    //   const user = JSON.parse(userStr);
    //   setActiveUser(user);
    //   if (user.role === "superadmin" || user.role === "admin")
    //     setCurrentView("admin-hub");
    // } else {
      // navigate("/login");
    // }
  // }, [navigate]);

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
  const addVideo = (modIndex) => {
    const newMods = [...modules];
    newMods[modIndex].videos.push("");
    setModules(newMods);
  };
  const updateMod = (i, text) => {
    const newMods = [...modules];
    newMods[i].title = text;
    setModules(newMods);
  };
  const updateVid = (mI, vI, text) => {
    const newMods = [...modules];
    newMods[mI].videos[vI] = text;
    setModules(newMods);
  };
  const removeMod = (modIndex) => {
    setModules(modules.filter((_, i) => i !== modIndex));
  };
  const removeVid = (modIndex, vidIndex) => {
    const newMods = [...modules];
    newMods[modIndex].videos = newMods[modIndex].videos.filter(
      (_, i) => i !== vidIndex,
    );
    setModules(newMods);
  };

  const fName = "Avinash";
  const role = "learner";
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
          <div
            className="h-24 flex items-center px-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
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
                <UploadCloud className="w-5 h-5" /> Add Course
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
            {/* {currentView === "settings" && (
              <AccountSettingsView user={activeUser} />
            )} */}
            {currentView === "admin-hub" && <AdminOverview />}
          </AnimatePresence>
        </div>
      </main>

      {/* --- COLUMN 3: RIGHT SIDEBAR --- */}
      {!isAdminOrSuper && currentView === "dashboard" && <RightSidebar />}

      {/* --- EDITABLE CREATE COURSE MODAL --- */}
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

  // Apple-style Accordion State with Hover-Pause
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // To pause auto-carousel on interaction

  const appleFeatures = [
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

  // Auto-scroll the Take a Closer Look section every 5 seconds, PAUSED if user hovers
  useEffect(() => {
    if (isHovered) return; // Pause carousel if hovered
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % appleFeatures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [appleFeatures.length, isHovered]);

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
              title: "Career Options Post 12th",
              next: "Engineering Pathways",
              perc: 65,
              grad: "from-[#e0e7ff] via-[#f3e8ff] to-[#fae8ff]",
              videoId: "Pow-yUGYbVs",
            },
            {
              title: "Resume Building Masterclass",
              next: "Formatting Secrets",
              perc: 33,
              grad: "from-[#dcfce7] via-[#ccfbf1] to-[#cffafe]",
              videoId: "O12p01-ITCY",
            },
            {
              title: "Psychometric Evaluation",
              next: "Test Preparation",
              perc: 12,
              grad: "from-[#ffedd5] via-[#ffedd5] to-[#fef3c7]",
              videoId: "p1Zle7wRG7E",
            },
          ].map((course, i) => (
            <div
              key={i}
              onClick={() => navigate("/course")}
              className={`bg-gradient-to-br ${course.grad} rounded-[2rem] p-5 shadow-sm border border-white cursor-pointer hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 blur-3xl rounded-full"></div>

              <div className="w-full h-44 rounded-[1.5rem] overflow-hidden mb-5 relative shadow-md border-2 border-white">
                <img
                  src={`https://img.youtube.com/vi/${course.videoId}/maxresdefault.jpg`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="youtube"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
                  </div>
                </div>
              </div>

              <h4 className="font-black text-slate-900 text-lg leading-snug line-clamp-2 mb-2">
                {course.title}
              </h4>
              <p className="text-sm font-bold text-slate-600 mb-5 flex items-center gap-2">
                <Play className="w-4 h-4" /> Next: {course.next}
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div className="flex-1 h-2.5 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${course.perc}%` }}
                  ></div>
                </div>
                <span className="text-sm font-black text-slate-900">
                  {course.perc}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* APPLE-STYLE "TAKE A CLOSER LOOK" SECTION WITH PLAYABLE IFRAMES */}
      <motion.section
        variants={fadeUp}
        className="bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <h2 className="text-4xl font-black text-white mb-8 tracking-tight">
          Take a closer look at your path.
        </h2>

        <div className="flex flex-col md:flex-row gap-10 relative z-10">
          {/* Left Vertical Accordion */}
          <div className="w-full md:w-[35%] flex flex-col gap-3">
            {appleFeatures.map((feat, i) => {
              const isActive = activeTab === i;
              return (
                <div key={i} className="flex flex-col">
                  <button
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center justify-between px-6 py-4 rounded-[2rem] text-sm font-black transition-all ${isActive ? "bg-white/10 text-white shadow-lg border border-white/20" : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"}`}
                  >
                    <span className="flex items-center gap-3">
                      <PlusCircle
                        className={`w-5 h-5 transition-transform duration-300 ${isActive ? "rotate-45 text-white" : "text-slate-500"}`}
                      />
                      {feat.title}
                    </span>
                    {isActive && (
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 mx-2 mt-2 bg-white/5 backdrop-blur-md rounded-[1.5rem] border border-white/10 text-sm font-medium text-slate-300 leading-relaxed">
                          {feat.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Display Area (Playable YouTube iFrame) */}
          <div className="w-full md:w-[65%] h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${appleFeatures[activeTab].videoId}?rel=0`}
                  title={appleFeatures[activeTab].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full rounded-[2.5rem]"
                ></iframe>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* RELATED PROGRAMS (Curvy Marquee with Actual vs Offer Pricing) */}
      <motion.section variants={fadeUp} className="py-4 overflow-hidden">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-black text-slate-900">
            Related Programs
          </h3>
          <button
            onClick={() => setCurrentView("explore")}
            className="text-sm font-black text-blue-600 hover:bg-blue-100 uppercase tracking-widest bg-blue-50 px-5 py-2.5 rounded-full transition-colors"
          >
            View More
          </button>
        </div>

        <div className="relative w-full flex overflow-x-hidden pb-6">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {[
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
            ].map((course, i) => (
              <div
                key={i}
                onClick={() => navigate("/course")}
                className="w-[340px] bg-white border border-slate-100 rounded-[2.5rem] p-5 shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all inline-block cursor-pointer group"
              >
                <div className="w-full h-44 rounded-[1.5rem] mb-5 overflow-hidden shadow-inner relative border border-slate-100">
                  <img
                    src={`https://img.youtube.com/vi/${course.vid}/maxresdefault.jpg`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="course"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Play className="w-5 h-5 text-white ml-1 fill-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-black text-slate-900 text-lg truncate mb-1">
                  {course.title}
                </h4>
                <p className="text-sm font-bold text-slate-500 mb-4">
                  {course.author}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="flex items-center gap-1.5 text-sm font-black text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" /> {course.rating}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 line-through">
                      {course.oldPrice}
                    </span>
                    <span className="text-base font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                      {course.price}
                    </span>
                  </div>
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
// COMPONENT: EXPLORE PROGRAMS (High Density eCommerce Grid)
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
      oldPrice: ["₹4,999", "₹2,999", "₹3,499", "₹1,999", "₹2,499"][i % 5],
      price: ["₹1,499", "₹999", "₹1,299", "₹499", "₹799"][i % 5],
      publisher: "CareerGuide",
      vid: [
        "Pow-yUGYbVs",
        "O12p01-ITCY",
        "p1Zle7wRG7E",
        "5KgSWcPFXks",
        "Pow-yUGYbVs",
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

      <div className="flex gap-3 pb-2 overflow-x-auto hide-scrollbar">
        {["All", "Newest", "Trending", "Most Popular"].map((f) => (
          <button
            key={f}
            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${f === "All" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4">
        {allCourses.map((course, i) => (
          <div
            key={i}
            onClick={() => navigate("/course")}
            className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col cursor-pointer group p-3.5"
          >
            <div className="h-40 overflow-hidden relative rounded-[1.5rem] shadow-inner mb-4 border border-slate-100">
              <img
                src={`https://img.youtube.com/vi/${course.vid}/maxresdefault.jpg`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="course"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">
                {course.publisher}
              </div>
            </div>
            <div className="flex flex-col flex-1 px-1">
              <h4 className="font-black text-slate-900 text-base leading-snug mb-1 line-clamp-2">
                {course.title}
              </h4>
              <p className="text-xs text-slate-500 font-bold mb-4">
                {course.author}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 mb-1">
                <Star className="w-4 h-4 fill-amber-500" /> {course.rating}{" "}
                <span className="text-slate-400 font-medium">
                  {course.reviews}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                {course.enrolls}
              </p>

              <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 line-through leading-none mb-0.5">
                    {course.oldPrice}
                  </span>
                  <span className="font-black text-emerald-600 text-lg leading-none">
                    {course.price}
                  </span>
                </div>
                <button className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-md">
                  Enroll
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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="flex gap-2">
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-sm">
            All
          </button>
          <button className="bg-white text-slate-600 border border-slate-200 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">
            In Progress
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[
          { t: "Psychometric Testing", v: "Pow-yUGYbVs" },
          { t: "Career Options after 12th", v: "O12p01-ITCY" },
        ].map((course, i) => (
          <div
            key={i}
            onClick={() => navigate("/course")}
            className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm cursor-pointer hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 group"
          >
            <div className="w-full h-36 rounded-[1.5rem] overflow-hidden mb-5 shadow-inner border border-slate-100">
              <img
                src={`https://img.youtube.com/vi/${course.v}/maxresdefault.jpg`}
                alt="course"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="font-black text-slate-900 text-base leading-snug mb-4">
              {course.t}
            </h4>
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <MonitorPlay className="w-4 h-4" /> 4 Sessions
              </span>
              <span className="flex items-center gap-2">
                50%{" "}
                <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
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
    <div className="space-y-10 max-w-6xl mx-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            className={`p-8 rounded-[2rem] border bg-white shadow-sm flex flex-col hover:shadow-lg transition-shadow`}
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${stat.bg}`}
              >
                {stat.icon}
              </div>
              <span className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                {stat.trend}
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

// ============================================================================
// COMPONENT: ACCOUNT SETTINGS
// ============================================================================
const AccountSettingsView = ({ user }) => (
  <div className="max-w-4xl space-y-6">
    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex items-center gap-8 mb-10 border-b border-slate-100 pb-10 relative z-10">
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-4xl font-black text-white shadow-lg border-2 border-white">
          {user?.firstName?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg w-max border border-emerald-100 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Verified {user?.role}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <div className="relative mt-2">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              disabled
              value={user?.email}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Mobile Number
          </label>
          <div className="relative mt-2">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full bg-white border border-blue-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end relative z-10">
        <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl text-sm font-black shadow-lg hover:bg-blue-600 transition-colors">
          Update Preferences
        </button>
      </div>
    </div>
  </div>
);

// ============================================================================
// COMPONENT: ADMIN OVERVIEW
// ============================================================================
const AdminOverview = () => (
  <div className="max-w-6xl mx-auto">
    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm flex flex-col items-center text-center">
      <Shield className="w-20 h-20 text-slate-300 mb-6" />
      <h2 className="text-3xl font-black text-slate-900 mb-3">
        Platform Command Center
      </h2>
      <p className="text-slate-500 font-medium">
        Super Admin features are accessible through the dedicated moderation
        route.
      </p>
    </div>
  </div>
);

// ============================================================================
// COMPONENT: RIGHT SIDEBAR (Top Ranked & Consistency)
// ============================================================================
const RightSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="p-2 z-20 h-full flex flex-col shrink-0 w-[320px] hidden xl:flex">
      <aside className="w-full h-full rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-y-auto hide-scrollbar p-6 space-y-6">
        {/* Consistency */}
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
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

        {/* Top Ranked Block */}
        <div
          onClick={() => navigate("/course")}
          className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
        >
          <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 shadow-sm z-10 border border-emerald-200">
            <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 animate-[spin_4s_linear_infinite]" />{" "}
            Special Offer
          </div>

          <div className="w-full h-36 bg-slate-100 rounded-[1.5rem] mb-4 overflow-hidden relative border border-slate-100 shadow-inner">
            <img
              src="https://img.youtube.com/vi/Pow-yUGYbVs/maxresdefault.jpg"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="top"
            />
          </div>
          <h4 className="font-black text-slate-900 text-base leading-snug">
            Career Guidance Masterclass
          </h4>
          <p className="text-xs font-bold text-slate-500 mt-1 mb-4">
            By Surabhi Dewra
          </p>
          <button className="w-full bg-slate-900 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-blue-600 transition-colors shadow-md">
            Enroll Now
          </button>
        </div>

        {/* Challenge Block */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
          <Target className="w-10 h-10 text-cyan-400 mb-5" />
          <h4 className="font-black text-xl mb-2">Daily Logic Challenge</h4>
          <p className="text-sm font-medium text-indigo-100 mb-6 leading-relaxed">
            Solve today's reasoning puzzle to earn 50 XP towards your weekly
            goal.
          </p>
          <button className="w-full bg-cyan-500 text-slate-900 text-xs font-black uppercase tracking-widest px-4 py-3.5 rounded-[1.2rem] hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30">
            Start Quiz (+50 XP)
          </button>
        </div>
      </aside>
    </div>
  );
};

// ============================================================================
// COMPONENT: ADD COURSE MODAL (Editable with Details & Delete)
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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white"
          >
            <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <UploadCloud className="w-6 h-6 text-blue-600" /> Add Course
              </h2>
              <button
                onClick={onClose}
                className="p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-10 overflow-y-auto flex-1 hide-scrollbar space-y-10 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Course Meta
                  </h3>
                  <input
                    type="text"
                    placeholder="Course Title"
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Course Category (e.g. Science, Career)"
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Estimated Duration (e.g. 4 Weeks)"
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 shadow-sm"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Pricing
                  </h3>
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    <input
                      type="text"
                      placeholder="Selling Price"
                      className="w-full bg-emerald-50/50 border border-emerald-200 pl-12 pr-5 py-4 rounded-xl text-sm font-bold focus:outline-none focus:border-emerald-500 shadow-sm text-emerald-700"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Curriculum
                  </h3>
                  <button
                    onClick={addModule}
                    className="text-xs font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-600 shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Section
                  </button>
                </div>

                <div className="space-y-5">
                  {modules.map((mod, modIdx) => (
                    <div
                      key={mod.id}
                      className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm"
                    >
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <Folder className="w-6 h-6 text-blue-500 fill-blue-500/20 shrink-0" />
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => updateMod(modIdx, e.target.value)}
                            className="bg-transparent border-none outline-none font-black text-slate-900 w-full focus:ring-0 placeholder-slate-400 text-base"
                          />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => removeMod(modIdx)}
                            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-rose-400 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addVideo(modIdx)}
                            className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 shadow-sm transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        {mod.videos.map((vid, vIdx) => (
                          <div
                            key={vIdx}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 rounded-xl group transition-colors"
                          >
                            <Video className="w-5 h-5 text-slate-400 shrink-0" />
                            <input
                              type="text"
                              value={vid}
                              onChange={(e) =>
                                updateVid(modIdx, vIdx, e.target.value)
                              }
                              placeholder="Video Title..."
                              className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full focus:ring-0"
                            />
                            <button
                              onClick={() => removeVid(modIdx, vIdx)}
                              className="text-rose-400 hover:text-rose-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-5">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-xl text-sm font-black text-slate-500 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-xl text-sm font-black bg-slate-900 text-white shadow-lg hover:bg-blue-600 transition-colors"
              >
                Publish Content
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
