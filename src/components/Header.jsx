// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import {
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
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { CartService } from "../services/api";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { user, isLoggedIn, logout, dashboardRoute } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Keep cart badge in sync
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await CartService.getCart();
        setCartCount(res.data.length);
      } catch {
        setCartCount(0);
      }
    };
    refresh();
    // Re-check when navigating (simple polling alternative)
    const id = setInterval(refresh, 3000);
    return () => clearInterval(id);
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
      title: "Payment Successful",
      desc: "UPSC General Studies purchase complete.",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      title: "New Module Unlocked",
      desc: "Phase 2 is now available to watch.",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      title: "Live Class Tonight",
      desc: "UPSC Doubt Session at 7 PM — join now.",
      time: "3h ago",
      read: true,
    },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  // const handleLogout = () => {
  //   logout();
  //   setIsProfileOpen(false);
  //   navigate("/");
  // };

  const fName = "User";
  const lName =  "";
  const initial = fName.charAt(0).toUpperCase();
  const role = "learner";

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-md py-3" : "bg-white/70 backdrop-blur-md py-4"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <div className="flex items-center gap-8 shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg
                width="38"
                height="35"
                viewBox="0 0 44 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <rect width="44" height="40" rx="10" fill="url(#hGrad)" />
                <polyline
                  points="12,10 20,28 28,10"
                  stroke="white"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M30 14 C26 10,20 10,20 15 C20 19,30 19,30 24 C30 29,24 30,20 27"
                  stroke="#38bdf8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="hGrad" x1="0" y1="0" x2="44" y2="40">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <p
                  className="text-[18px] font-black tracking-tight leading-none"
                  style={{ fontFamily: "'Sora','DM Sans',sans-serif" }}
                >
                  <span className="text-cyan-500">VS</span>intellecta
                </p>
                <p className="text-[9px] font-medium uppercase tracking-widest text-slate-500 mt-0.5">
                  Learn · Grow · Lead
                </p>
              </div>
            </div>

            {/* Categories dropdown */}
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
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 z-50"
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

          {/* ── Search ── */}
          <div className="flex-1 max-w-2xl hidden md:block relative z-50">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
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
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
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

          {/* ── Right actions ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* {isLoggedIn ? ( */}
              <>
                {/* Cart */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Notifications */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setIsNotiOpen(!isNotiOpen)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isNotiOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                      >
                        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <h3 className="font-extrabold text-slate-900 text-sm">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <button className="text-xs font-bold text-blue-600">
                              Mark all read
                            </button>
                          )}
                        </div>
                        <div className="max-h-[280px] overflow-y-auto hide-scrollbar">
                          {notifications.map((n) => (
                            <div
                              key={n.id}
                              className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 cursor-pointer"
                            >
                              <div className="mt-0.5 shrink-0">
                                <CheckCircle
                                  className={`w-4 h-4 ${n.read ? "text-slate-400" : "text-emerald-500"}`}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">
                                  {n.title}
                                </h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">
                                  {n.desc}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                  {n.time}
                                </p>
                              </div>
                              {!n.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm cursor-pointer shadow-md border-2 border-white">
                    {initial}
                  </div>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 z-50"
                      >
                        <div className="px-5 py-3 border-b border-slate-100 mb-2">
                          <p className="text-sm font-extrabold text-slate-900">
                            {fName} {lName}
                          </p>
                          <p className="text-xs font-bold text-blue-600 capitalize">
                            {role}
                          </p>
                        </div>
                        <div
                          // onClick={() => navigate(dashboardRoute())}
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
                        <div
                          onClick={() => navigate("/checkout")}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 cursor-pointer group"
                        >
                          <ShoppingCart className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
                            Cart{" "}
                            {cartCount > 0 && (
                              <span className="ml-1 bg-rose-100 text-rose-600 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                                {cartCount}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <div
                            // onClick={handleLogout}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 transition-colors hidden sm:block"
                >
                  Log In
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5"
                >
                  Join Us <Zap className="w-3.5 h-3.5 text-amber-400" />
                </motion.button>
              </div>
            {/* )} */}

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[68px] left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-40 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-4 font-bold text-slate-700">
              <button
                onClick={() => {
                  navigate("/explore");
                  setIsMobileOpen(false);
                }}
                className="text-left py-2 border-b border-slate-100"
              >
                Explore Courses
              </button>
              {/* {isLoggedIn ? (
                <> */}
                  <button
                    onClick={() => {
                      // navigate(dashboardRoute());
                      setIsMobileOpen(false);
                    }}
                    className="text-left py-2 border-b border-slate-100 text-blue-600"
                  >
                    My Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate("/checkout");
                      setIsMobileOpen(false);
                    }}
                    className="text-left py-2 border-b border-slate-100"
                  >
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileOpen(false);
                    }}
                    className="text-left py-2 border-b border-slate-100"
                  >
                    Profile Settings
                  </button>
                  <button
                    // onClick={handleLogout}
                    className="text-left py-2 text-rose-600"
                  >
                    Sign Out
                  </button>
                {/* </>
              ) : ( */}
                <div className="flex flex-col gap-3 mt-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileOpen(false);
                    }}
                    className="bg-slate-900 text-white py-3 rounded-xl text-center"
                  >
                    Log In / Join Us
                  </button>
                </div>
              {/* )} */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
