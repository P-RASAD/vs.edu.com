import React, { useState, useEffect } from "react";
import {
  Layers,
  Search,
  Bell,
  Menu,
  X,
  CheckCircle,
  Zap,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Fetch user and make sure it doesn't crash if data is weird
    try {
      const userStr = localStorage.getItem("vsintellecta_active_user");
      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        setActiveUser(parsedUser);
      }
    } catch (e) {
      console.error("Failed to parse user from local storage");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const categories = [
    { name: "Primary Education", sub: "Class 1 to 5" },
    { name: "Upper Primary", sub: "Class 6 to 8" },
    { name: "Secondary Education", sub: "Class 9 & 10" },
    { name: "Intermediate (10+2)", sub: "MPC, BiPC, Commerce" },
    { name: "Competitive Exams", sub: "UPSC, CAT, GRE, GMAT" },
  ];

  const trendingCourses = [
    { title: "UPSC General Studies & CSAT", tag: "Bestseller" },
    { title: "Class 10 Mathematics Board Prep", tag: "Trending" },
    { title: "CAT VARC & DILR Intensive", tag: "Popular" },
  ];

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Payment Successful",
      desc: "Your purchase of UPSC General Studies is complete.",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "update",
      title: "New Module Unlocked",
      desc: "Phase 2 is now available to watch.",
      time: "1h ago",
      read: false,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("vsintellecta_active_user");
    localStorage.removeItem("vsintellecta_token");
    setActiveUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  // --- BULLETPROOF SAFE DATA EXTRACTION ---
  // Safely grab names, checking for both camelCase and snake_case variations
  const fName = activeUser?.firstName || activeUser?.first_name || "User";
  const lName = activeUser?.lastName || activeUser?.last_name || "";
  const initial1 = fName.charAt(0).toUpperCase();
  const initial2 = lName ? lName.charAt(0).toUpperCase() : "";
  const role = activeUser?.role || "learner";

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-md py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-6">
          {/* LEFT: LOGO & CATEGORIES */}
          <div className="flex items-center gap-8 shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-black tracking-tight ${isScrolled ? "text-slate-900" : "text-slate-900"} drop-shadow-sm hidden sm:block`}
              >
                <span className="text-blue-600">VS</span>intellecta
              </span>
            </div>

            <div
              className="relative hidden md:block"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 font-bold text-sm py-2 transition-colors ${isCategoryOpen ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
              >
                Categories{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden py-2"
                  >
                    {categories.map((cat, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate("/explore")}
                        className="px-5 py-3 hover:bg-blue-50 cursor-pointer group transition-colors"
                      >
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                          {cat.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 group-hover:text-blue-500">
                          {cat.sub}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CENTER: SEARCH BAR */}
          <div className="flex-1 max-w-2xl hidden md:block relative z-50">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                className="w-full bg-slate-100/80 border border-slate-200 text-slate-900 rounded-full pl-11 pr-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white focus:border-blue-300 transition-all placeholder-slate-500"
                placeholder="Search for courses, exams, or subjects..."
              />
            </div>
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4" /> Trending Searches
                  </div>
                  <div className="p-2">
                    {trendingCourses.map((course, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate("/explore")}
                        className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                      >
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
                          {course.title}
                        </span>
                        <span className="text-[10px] font-black px-2 py-1 bg-blue-100 text-blue-700 rounded-md uppercase tracking-wider">
                          {course.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() => navigate("/explore")}
                    className="p-3 bg-blue-600 text-white text-center text-sm font-bold cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    View all results
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: ACTIONS & AUTH */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigate("/explore")}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {activeUser ? (
              <>
                {/* Logged In State */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"
                      ></motion.span>
                    )}
                  </button>
                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden z-50"
                      >
                        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <h3 className="font-extrabold text-slate-900 text-sm">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <button className="text-xs font-bold text-blue-600 hover:text-blue-800">
                              Mark all read
                            </button>
                          )}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
                          {notifications.map((note) => (
                            <div
                              key={note.id}
                              className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 cursor-pointer"
                            >
                              <div className="mt-0.5 shrink-0">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">
                                  {note.title}
                                </h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">
                                  {note.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  {/* SAFE AVATAR RENDER */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-sm cursor-pointer shadow-md border-2 border-white">
                    {initial1}
                    {initial2}
                  </div>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden py-2"
                      >
                        <div className="px-5 py-3 border-b border-slate-100 mb-2">
                          <p className="text-sm font-extrabold text-slate-900">
                            {fName} {lName}
                          </p>
                          <p className="text-xs font-bold text-slate-500">
                            @{activeUser?.username || "user"}
                          </p>
                        </div>
                        <div
                          onClick={() =>
                            navigate(role === "tutor" ? "/admin" : "/dashboard")
                          }
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 cursor-pointer group"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
                            My Dashboard
                          </span>
                        </div>
                        <div
                          onClick={() => navigate("/profile")}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 cursor-pointer group"
                        >
                          <User className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
                            Profile Settings
                          </span>
                        </div>
                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <div
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-rose-50 cursor-pointer group"
                          >
                            <LogOut className="w-4 h-4 text-rose-400 group-hover:text-rose-600" />
                            <span className="text-sm font-bold text-rose-600">
                              Sign Out
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* Logged Out State */
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block text-sm font-extrabold text-slate-700 hover:text-blue-600 transition-colors px-2 py-2"
                >
                  Log In
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="relative overflow-hidden bg-slate-900 text-white px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-900/20 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="relative z-10 flex items-center gap-1.5">
                    Sign Up{" "}
                    <Zap className="w-3.5 h-3.5 text-amber-400 hidden sm:block" />
                  </span>
                </motion.button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-40 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-4 font-bold text-slate-700">
              <button
                onClick={() => {
                  navigate("/explore");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-slate-100"
              >
                Categories & Explore
              </button>

              {activeUser ? (
                <>
                  <button
                    onClick={() => {
                      navigate(role === "tutor" ? "/admin" : "/dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 border-b border-slate-100 text-blue-600"
                  >
                    My Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 border-b border-slate-100"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left py-2 text-rose-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-slate-100 text-slate-900 py-3 rounded-xl text-center"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-slate-900 text-white py-3 rounded-xl shadow-lg text-center"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
