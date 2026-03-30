// src/components/Header.jsx
// Premium world-class header — light theme, animated VS logo, golden tagline
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  Menu,
  X,
  CheckCircle,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  TrendingUp,
  ShoppingCart,
  BookOpen,
  GraduationCap,
  Target,
  Shield,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { CartService } from "../services/api";

// ── Animated VS Logo component ──────────────────────────────────────────────
function VSLogo({ size = 38 }) {
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
          id="logoGrad"
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
          id="logoGlow"
          x1="0"
          y1="0"
          x2="44"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2.5"
            floodColor="#1d4ed8"
            floodOpacity="0.35"
          />
        </filter>
      </defs>
      {/* Box with rounded corners */}
      <rect
        width="44"
        height="40"
        rx="11"
        fill="url(#logoGrad)"
        filter="url(#logoShadow)"
      />
      {/* Subtle inner highlight */}
      <rect width="44" height="20" rx="11" fill="url(#logoGlow)" />
      {/* V stroke */}
      <polyline
        points="11,10 19.5,27 28,10"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* S stroke */}
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

const GOLD = "#b8922a";
const GOLD2 = "#d4a843";
const PRIMARY = "#1d4ed8";
const CYAN = "#0284c7";

export default function Header() {
  const userData = (() => {
    try {
      return JSON.parse(localStorage.getItem("user_details") || "null");
    } catch {
      return null;
    }
  })();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const profileRef = useRef(null);
  const notiRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
      if (notiRef.current && !notiRef.current.contains(e.target))
        setIsNotiOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cart sync
  useEffect(() => {
    const refresh = async () => {
      try {
        const r = await CartService.getCart();
        setCartCount(r.data.length);
      } catch {
        setCartCount(0);
      }
    };
    refresh();
    const id = setInterval(refresh, 3000);
    return () => clearInterval(id);
  }, [location]);

  const categories = [
    {
      name: "Primary Education",
      sub: "Class 1 to 5",
      icon: BookOpen,
      color: "#10b981",
    },
    {
      name: "Upper Primary",
      sub: "Class 6 to 8",
      icon: GraduationCap,
      color: PRIMARY,
    },
    {
      name: "Secondary Education",
      sub: "Class 9 & 10",
      icon: Target,
      color: "#8b5cf6",
    },
    {
      name: "Intermediate (10+2)",
      sub: "MPC, BiPC, Commerce",
      icon: Sparkles,
      color: CYAN,
    },
    {
      name: "Competitive Exams",
      sub: "UPSC, CAT, GRE, GMAT",
      icon: Shield,
      color: "#f59e0b",
    },
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const initial = userData?.first_name?.charAt(0).toUpperCase() || "U";

  const roleColor =
    {
      learner: PRIMARY,
      tutor: "#10b981",
      admin: "#8b5cf6",
      superadmin: "#dc2626",
      super_admin: "#dc2626",
    }[userData?.role] || PRIMARY;

  const roleLabel =
    {
      learner: "Learner",
      tutor: "Educator",
      admin: "Admin",
      superadmin: "Super Admin",
      super_admin: "Super Admin",
    }[userData?.role] || "Member";

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] py-3"
            : "bg-white/85 backdrop-blur-xl py-3.5"
        }`}
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-[1440px] mx-auto px-5 flex items-center justify-between gap-5">
          {/* ── LOGO ── */}
          <div className="flex items-center gap-7 shrink-0">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated logo box */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(29,78,216,0)",
                    "0 0 0 6px rgba(29,78,216,0.08)",
                    "0 0 0 0 rgba(29,78,216,0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-[11px]"
              >
                <VSLogo size={38} />
              </motion.div>

              <div>
                <p
                  className="text-[19px] font-black tracking-tight leading-none"
                  style={{
                    fontFamily: "'Sora','DM Sans',system-ui,sans-serif",
                  }}
                >
                  <span style={{ color: CYAN }}>VS</span>
                  <span style={{ color: "#0f172a" }}>intellecta</span>
                </p>
                {/* Golden tagline */}
                <p
                  className="text-[9px] font-black uppercase tracking-[0.22em] mt-0.5 flex items-center gap-1"
                  style={{ fontFamily: "'Sora',system-ui,sans-serif" }}
                >
                  <span style={{ color: GOLD }}>Learn</span>
                  <span style={{ color: "rgba(0,0,0,0.18)", fontSize: "5px" }}>
                    ◆
                  </span>
                  <span style={{ color: GOLD2 }}>Grow</span>
                  <span style={{ color: "rgba(0,0,0,0.18)", fontSize: "5px" }}>
                    ◆
                  </span>
                  <span style={{ color: GOLD }}>Lead</span>
                </p>
              </div>
            </motion.div>

            {/* ── Categories dropdown ── */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-bold py-2 px-1 transition-colors ${
                  isCategoryOpen
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-blue-700"
                }`}
              >
                Categories
                <motion.div
                  animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2.5 w-72 rounded-2xl overflow-hidden z-50"
                    style={{
                      background: "white",
                      border: "1px solid rgba(0,0,0,0.07)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div
                      className="px-4 py-3 flex items-center gap-2"
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                        background: "#f8faff",
                      }}
                    >
                      <Sparkles
                        className="w-3.5 h-3.5"
                        style={{ color: PRIMARY }}
                      />
                      <span
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: PRIMARY }}
                      >
                        All Categories
                      </span>
                    </div>
                    {categories.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <motion.div
                          key={idx}
                          onClick={() => {
                            navigate("/explore");
                            setIsCategoryOpen(false);
                          }}
                          whileHover={{ x: 3, backgroundColor: "#f0f4ff" }}
                          className="px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors group"
                          style={{
                            borderBottom:
                              idx < categories.length - 1
                                ? "1px solid rgba(0,0,0,0.04)"
                                : "none",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${cat.color}15` }}
                          >
                            <Icon
                              className="w-4 h-4"
                              style={{ color: cat.color }}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                              {cat.name}
                            </h4>
                            <p className="text-[11px] font-medium text-slate-400">
                              {cat.sub}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-blue-400 transition-colors" />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── SEARCH ── */}
          <div className="flex-1 max-w-xl hidden md:block relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-sm font-medium focus:outline-none transition-all"
                style={{
                  background: "rgba(248,250,255,0.9)",
                  border: isSearchOpen
                    ? "1.5px solid rgba(29,78,216,0.4)"
                    : "1.5px solid rgba(0,0,0,0.08)",
                  color: "#0f172a",
                  boxShadow: isSearchOpen
                    ? "0 0 0 3px rgba(29,78,216,0.08)"
                    : "none",
                }}
                placeholder="Search for courses, exams, or subjects..."
              />
            </div>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                  }}
                >
                  <div
                    className="px-4 py-3 flex items-center gap-2"
                    style={{
                      background: "#f8faff",
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <TrendingUp
                      className="w-3.5 h-3.5"
                      style={{ color: PRIMARY }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-widest"
                      style={{ color: PRIMARY }}
                    >
                      Trending Searches
                    </span>
                  </div>
                  <div className="p-2">
                    {trendingCourses.map((course, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate("/explore")}
                        className="flex items-center justify-between px-3 py-2.5 hover:bg-blue-50 rounded-xl cursor-pointer group transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
                          {course.title}
                        </span>
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider"
                          style={{ background: `${PRIMARY}15`, color: PRIMARY }}
                        >
                          {course.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() => navigate("/explore")}
                    className="p-3 text-white text-center text-sm font-bold cursor-pointer transition-colors"
                    style={{
                      background: `linear-gradient(135deg,${PRIMARY},${CYAN})`,
                    }}
                  >
                    View all results →
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cart */}
            {userData && (
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate("/checkout")}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-blue-50"
                style={{ border: "1.5px solid rgba(0,0,0,0.07)" }}
              >
                <ShoppingCart className="w-4 h-4 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            )}

            {/* Notifications */}
            {userData && (
              <div className="relative hidden sm:block" ref={notiRef}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setIsNotiOpen(!isNotiOpen);
                    setIsProfileOpen(false);
                  }}
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-blue-50"
                  style={{ border: "1.5px solid rgba(0,0,0,0.07)" }}
                >
                  <Bell className="w-4 h-4 text-slate-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {isNotiOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2.5 w-80 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: "white",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                      }}
                    >
                      <div
                        className="px-5 py-3.5 flex justify-between items-center"
                        style={{
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          background: "#f8faff",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Bell
                            className="w-4 h-4"
                            style={{ color: PRIMARY }}
                          />
                          <h3 className="font-black text-slate-900 text-sm">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white bg-rose-500">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            className="text-[11px] font-bold"
                            style={{ color: PRIMARY }}
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                            style={{
                              borderBottom: "1px solid rgba(0,0,0,0.04)",
                            }}
                          >
                            <div className="mt-0.5 shrink-0">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center ${n.read ? "bg-slate-100" : "bg-blue-50"}`}
                              >
                                <CheckCircle
                                  className={`w-4 h-4 ${n.read ? "text-slate-400" : "text-emerald-500"}`}
                                />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
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
                              <div
                                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                style={{ background: PRIMARY }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Profile avatar / Login */}
            {userData ? (
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotiOpen(false);
                  }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm cursor-pointer shadow-md border-2 border-white"
                  style={{
                    background: `linear-gradient(135deg,${roleColor},${CYAN})`,
                  }}
                >
                  {initial}
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2.5 w-64 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: "white",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                      }}
                    >
                      {/* Profile header */}
                      <div
                        className="px-5 py-4"
                        style={{
                          background: `linear-gradient(135deg,${PRIMARY}08,${CYAN}06)`,
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md"
                            style={{
                              background: `linear-gradient(135deg,${roleColor},${CYAN})`,
                            }}
                          >
                            {initial}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">
                              {userData?.first_name} {userData?.last_name}
                            </p>
                            <span
                              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white inline-block"
                              style={{
                                background: `linear-gradient(135deg,${roleColor},${CYAN})`,
                              }}
                            >
                              {roleLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-2">
                        {[
                          {
                            icon: LayoutDashboard,
                            label: "My Dashboard",
                            path: "/dashboard",
                          },
                          {
                            icon: User,
                            label: "Profile Settings",
                            path: "/profile",
                          },
                          {
                            icon: ShoppingCart,
                            label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}`,
                            path: "/checkout",
                          },
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={i}
                              onClick={() => {
                                navigate(item.path);
                                setIsProfileOpen(false);
                              }}
                              whileHover={{ x: 3, backgroundColor: "#f0f4ff" }}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer group transition-all"
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: `${PRIMARY}12` }}
                              >
                                <Icon
                                  className="w-3.5 h-3.5"
                                  style={{ color: PRIMARY }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
                                {item.label}
                              </span>
                              <ChevronRight className="w-3 h-3 text-slate-300 ml-auto group-hover:text-blue-400 transition-colors" />
                            </motion.div>
                          );
                        })}
                      </div>

                      <div
                        className="p-2 pt-0"
                        style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
                      >
                        <motion.div
                          onClick={handleLogout}
                          whileHover={{ x: 3, backgroundColor: "#fff1f2" }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer group transition-all mt-1"
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-rose-50">
                            <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          </div>
                          <span className="text-sm font-semibold text-rose-600">
                            Log Out
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/login")}
                  className="text-sm font-bold text-white px-5 py-2.5 rounded-xl hidden sm:block"
                  style={{
                    background: `linear-gradient(135deg,${PRIMARY},${CYAN})`,
                    boxShadow: "0 4px 14px rgba(29,78,216,0.25)",
                  }}
                >
                  Log In
                </motion.button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-slate-100"
              style={{ border: "1.5px solid rgba(0,0,0,0.07)" }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-4 h-4 text-slate-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-[60px] left-0 w-full z-40 md:hidden overflow-hidden"
            style={{
              background: "white",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
            }}
          >
            <div className="p-4 space-y-1">
              {/* Mobile search */}
              <div className="relative mb-3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none"
                  style={{
                    background: "#f8faff",
                    border: "1.5px solid rgba(0,0,0,0.07)",
                    color: "#0f172a",
                  }}
                />
              </div>

              {[
                {
                  label: "Explore Courses",
                  path: "/explore",
                  color: "#0f172a",
                },
                { label: "My Dashboard", path: "/dashboard", color: PRIMARY },
                { label: "My Programs", path: "/dashboard", color: "#0f172a" },
                { label: "Cart", path: "/checkout", color: "#0f172a" },
                { label: "Profile", path: "/profile", color: "#0f172a" },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors hover:bg-blue-50"
                  style={{ color: item.color }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div
                className="pt-2 pb-1 border-t mt-2"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                {userData ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    Log Out
                  </button>
                ) : (
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMobileOpen(false);
                      }}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center"
                      style={{
                        background: `linear-gradient(135deg,${PRIMARY},${CYAN})`,
                      }}
                    >
                      Log In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
