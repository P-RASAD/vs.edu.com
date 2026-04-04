import React, { useState, useEffect, useRef } from "react";
import {
  DollarSign,
  Users,
  MonitorPlay,
  Star,
  ArrowUpRight,
  Radio,
  Copy,
  Link2,
  Clock,
  UploadCloud,
  Upload,
  FileVideo,
  X,
  Trash2,
  Eye,
  Loader2,
  Calendar,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TutorService } from "../services/api";

const C = {
  primary: "#1d4ed8",
  secondary: "#0284c7",
  accent: "#f59e0b",
  emerald: "#10b981",
  dark: "#0f172a",
  textSub: "#64748b",
};

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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Skel = ({ w = "100%", h = 16, r = 8 }) => (
  <div
    className="animate-pulse"
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: "rgba(29,78,216,0.07)",
    }}
  />
);

// ── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="rounded-[20px] p-5 relative overflow-hidden"
      style={{
        background: "white",
        border: "1.5px solid rgba(29,78,216,0.09)",
        boxShadow: "0 4px 24px rgba(29,78,216,0.07)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && (
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: "#ecfdf5", color: "#059669" }}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-black mb-0.5" style={{ color: C.dark }}>
        {value}
      </p>
      <p className="text-xs font-semibold" style={{ color: C.textSub }}>
        {label}
      </p>
      {sub && (
        <p className="text-[10px] mt-1" style={{ color: "#94a3b8" }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TUTOR OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
export function TutorOverview({ user, onGoLive, onAddCourse }) {
  const navigate = useNavigate();
  const fName = user?.first_name || user?.firstName || "Tutor";

  const myCourses = [
    {
      id: 1,
      title: "Career Options Post 12th",
      students: 450,
      revenue: "₹6,74,550",
      status: "Published",
      rating: 4.8,
      vid: "Pow-yUGYbVs",
    },
    {
      id: 2,
      title: "Class 10 Math Complete",
      students: 312,
      revenue: "₹3,11,688",
      status: "Published",
      rating: 4.7,
      vid: "p1Zle7wRG7E",
    },
    {
      id: 3,
      title: "Resume Building Masterclass",
      students: 189,
      revenue: "₹1,89,000",
      status: "Draft",
      rating: 4.6,
      vid: "O12p01-ITCY",
    },
  ];

  const upcomingLive = [
    {
      title: "UPSC GS Doubt Session",
      time: "Today at 7:00 PM",
      students: 145,
      link: "https://meet.google.com/abc-defg-hij",
    },
    {
      title: "Career Guidance Workshop",
      time: "Tomorrow at 5:30 PM",
      students: 87,
      link: "https://meet.google.com/xyz-pqrs-tuv",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-7 max-w-5xl mx-auto pt-6"
    >
      <motion.div
        variants={fadeUp}
        className="rounded-[24px] p-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg,${C.dark} 0%,#0D1A3E 100%)`,
          border: "1px solid rgba(2,132,199,0.15)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(29,78,216,0.2),transparent)",
            transform: "translate(30%,-30%)",
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-1">
              Instructor Dashboard
            </p>
            <h2 className="text-2xl font-black text-white mb-1">
              Hello, {fName} 👋
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              📈 Revenue up 18.5% this month · 3 courses live
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoLive}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#dc2626,#ef4444)",
                boxShadow: "0 4px 14px rgba(220,38,38,0.3)",
              }}
            >
              <Radio className="w-4 h-4" /> Go Live
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onAddCourse}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                boxShadow: "0 4px 14px rgba(29,78,216,0.3)",
              }}
            >
              <UploadCloud className="w-4 h-4" /> Add Course
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value="₹11,75,238"
          sub="Last 6 months"
          color="#10b981"
          trend="+18.5%"
        />
        <StatCard
          icon={Users}
          label="Total Students"
          value="951"
          sub="Across all courses"
          color={C.primary}
          trend="+12%"
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value="4.74"
          sub="From 1,240 reviews"
          color="#f59e0b"
        />
        <StatCard
          icon={BookOpen}
          label="Courses"
          value="3"
          sub="2 Published · 1 Draft"
          color={C.secondary}
        />
      </div>

      <motion.section variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: "#94a3b8" }}
          >
            My Courses
          </p>
          <button
            className="text-xs font-bold flex items-center gap-1"
            style={{ color: C.primary }}
          >
            Manage All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {myCourses.map((c) => (
            <motion.div
              key={c.id}
              variants={fadeUp}
              whileHover={{ x: 3 }}
              className="rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 group cursor-pointer"
              style={{
                background: "white",
                border: "1.5px solid rgba(29,78,216,0.09)",
                boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
              }}
            >
              <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={`https://img.youtube.com/vi/${c.vid}/mqdefault.jpg`}
                  className="w-full h-full object-cover"
                  alt={c.title}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className="font-bold text-sm truncate mb-0.5"
                  style={{ color: C.dark }}
                >
                  {c.title}
                </h4>
                <div
                  className="flex items-center gap-3 text-xs"
                  style={{ color: C.textSub }}
                >
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {c.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {c.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="font-black text-sm"
                  style={{ color: C.emerald }}
                >
                  {c.revenue}
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                >
                  {c.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={fadeUp}>
        <p
          className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          style={{ color: "#94a3b8" }}
        >
          Upcoming Live Sessions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcomingLive.map((cls, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5"
              style={{
                background: "white",
                border: "1.5px solid rgba(29,78,216,0.09)",
                boxShadow: "0 4px 16px rgba(29,78,216,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#fee2e2" }}
                >
                  <Radio className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: C.dark }}>
                    {cls.title}
                  </h4>
                  <p className="text-[10px]" style={{ color: C.textSub }}>
                    {cls.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: C.textSub }}
                >
                  <Users className="w-3 h-3" />
                  {cls.students} registered
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(cls.link);
                    toast.success("Link copied!", { style: toastOK });
                  }}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl"
                  style={{ background: "#eef3ff", color: C.primary }}
                >
                  <Copy className="w-3 h-3" /> Copy Link
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TUTOR ANALYTICS VIEW
// ─────────────────────────────────────────────────────────────────────────────
export const TutorAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TutorService.getAnalytics()
      .then((r) => {
        setStats(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const myCourses = [
    {
      id: 1,
      title: "Career Options Post 12th",
      price: "₹1,499",
      students: 450,
      revenue: "₹6,74,550",
      status: "Published",
      completion: 85,
      rating: 4.8,
      vid: "Pow-yUGYbVs",
    },
    {
      id: 2,
      title: "Class 10 Math Complete",
      price: "₹999",
      students: 312,
      revenue: "₹3,11,688",
      status: "Published",
      completion: 70,
      rating: 4.6,
      vid: "O12p01-ITCY",
    },
    {
      id: 3,
      title: "Resume Building Masterclass",
      price: "₹799",
      students: 228,
      revenue: "₹1,82,172",
      status: "Draft",
      completion: 40,
      rating: 4.5,
      vid: "p1Zle7wRG7E",
    },
  ];

  const earningsBreakdown = [
    { month: "Jan", amount: 105000 },
    { month: "Feb", amount: 145000 },
    { month: "Mar", amount: 177500 },
    { month: "Apr", amount: 137500 },
    { month: "May", amount: 207500 },
    { month: "Jun", amount: 237500 },
  ];
  const maxEarning = Math.max(...earningsBreakdown.map((e) => e.amount));

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto pt-6"
    >
      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl animate-pulse"
              style={{
                background: "white",
                border: "1.5px solid rgba(29,78,216,0.09)",
                boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
              }}
            >
              <Skel h={60} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Revenue",
              val: stats?.totalRevenue || "₹2,45,000",
              icon: DollarSign,
              color: "#10b981",
              bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)",
              trend: "+12.5%",
              trendUp: true,
            },
            {
              label: "Active Scholars",
              val: String(stats?.activeScholars || 1204),
              icon: Users,
              color: C.primary,
              bg: `linear-gradient(135deg,#EEF3FF,#DBEAFE)`,
              trend: "+8.2%",
              trendUp: true,
            },
            {
              label: "Live Programs",
              val: String(stats?.livePrograms || 4),
              icon: MonitorPlay,
              color: C.secondary,
              bg: "linear-gradient(135deg,#EAF6FF,#BAE6FD)",
              trend: "Active",
              trendUp: true,
            },
            {
              label: "Avg Rating",
              val: "4.7 ⭐",
              icon: Star,
              color: "#f59e0b",
              bg: "linear-gradient(135deg,#FFFBEB,#FEF3C7)",
              trend: "+0.3",
              trendUp: true,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: "white",
                border: "1.5px solid rgba(29,78,216,0.1)",
                boxShadow: "0 4px 24px rgba(29,78,216,0.08)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"
                style={{ background: s.bg }}
              />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: s.bg }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-lg flex items-center gap-0.5"
                  style={{
                    background: s.trendUp
                      ? "rgba(16,185,129,0.1)"
                      : "rgba(239,68,68,0.1)",
                    color: s.trendUp ? "#10b981" : "#ef4444",
                  }}
                >
                  <ArrowUpRight className="w-2.5 h-2.5" /> {s.trend}
                </span>
              </div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.15em] mb-1 relative z-10"
                style={{ color: "#94a3b8" }}
              >
                {s.label}
              </p>
              <p
                className="text-2xl font-black relative z-10"
                style={{ color: C.dark }}
              >
                {s.val}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Revenue chart */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "white",
          border: "1.5px solid rgba(29,78,216,0.09)",
          boxShadow: "0 4px 20px rgba(29,78,216,0.06)",
        }}
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: "#94a3b8" }}
            >
              Monthly Revenue
            </p>
            <p className="text-xl font-black mt-0.5" style={{ color: C.dark }}>
              ₹10.10 L{" "}
              <span className="text-sm font-medium text-emerald-500">
                ↑ 18.5%
              </span>
            </p>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-lg"
            style={{ background: "#eef3ff", color: C.primary }}
          >
            Last 6 months
          </span>
        </div>
        <div className="flex items-end gap-3 h-28">
          {earningsBreakdown.map((e, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-xl relative group cursor-pointer"
              initial={{ height: 0 }}
              animate={{ height: `${(e.amount / maxEarning) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background:
                  i === 5
                    ? `linear-gradient(180deg,${C.primary},${C.secondary})`
                    : "rgba(29,78,216,0.09)",
                minHeight: 8,
              }}
            >
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black whitespace-nowrap px-2 py-0.5 rounded-md text-white"
                style={{ background: C.dark }}
              >
                ₹{(e.amount / 1000).toFixed(0)}K
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {earningsBreakdown.map((e) => (
            <span
              key={e.month}
              className="flex-1 text-center text-[9px] font-bold"
              style={{ color: "#cbd5e1" }}
            >
              {e.month}
            </span>
          ))}
        </div>
      </div>

      {/* My Courses table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "white",
          border: "1.5px solid rgba(29,78,216,0.09)",
          boxShadow: "0 4px 20px rgba(29,78,216,0.06)",
        }}
      >
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            borderBottom: "1px solid rgba(29,78,216,0.06)",
            background: "#f8faff",
          }}
        >
          <p className="text-sm font-black" style={{ color: C.dark }}>
            My Courses
          </p>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${C.primary}15`, color: C.primary }}
          >
            {myCourses.length} total
          </span>
        </div>
        <div
          className="divide-y"
          style={{ borderColor: "rgba(29,78,216,0.05)" }}
        >
          {myCourses.map((c) => (
            <div
              key={c.id}
              className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0">
                <img
                  src={`https://img.youtube.com/vi/${c.vid}/mqdefault.jpg`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-bold truncate"
                  style={{ color: C.dark }}
                >
                  {c.title}
                </p>
                <div
                  className="flex items-center gap-3 text-xs mt-0.5"
                  style={{ color: "#94a3b8" }}
                >
                  <span>{c.students} students</span>
                  <span>·</span>
                  <span>{c.price}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {c.rating}
                  </span>
                </div>
              </div>
              <div className="w-24 hidden sm:block">
                <div
                  className="flex justify-between text-[9px] font-bold mb-1"
                  style={{ color: "#94a3b8" }}
                >
                  <span>Completion</span>
                  <span style={{ color: C.primary }}>{c.completion}%</span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "#eef3ff" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.completion}%`,
                      background: `linear-gradient(90deg,${C.primary},${C.secondary})`,
                    }}
                  />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black" style={{ color: "#10b981" }}>
                  {c.revenue}
                </p>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LIVE CLASSES VIEW
// ─────────────────────────────────────────────────────────────────────────────
export const TutorLiveClasses = ({ onGoLive }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TutorService.getLiveClasses()
      .then((r) => {
        setClasses(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const fmt = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied!", { style: toastOK });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6 pt-6"
    >
      <div
        className="rounded-[2rem] p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#0a0f1e,#0d1a3e)",
          border: "1px solid rgba(2,132,199,0.15)",
          boxShadow: "0 20px 60px rgba(29,78,216,0.15)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle,rgba(29,78,216,0.3),transparent)",
            transform: "translate(30%,-30%)",
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-black text-red-400 uppercase tracking-widest">
                Ready to broadcast
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">
              Start a Live Class
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              Connect with students in real time via Google Meet.
            </p>
          </div>
          <motion.button
            onClick={onGoLive}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black text-white shrink-0"
            style={{
              background: "linear-gradient(135deg,#dc2626,#ef4444)",
              boxShadow: "0 8px 24px rgba(220,38,38,0.40)",
            }}
          >
            <Radio className="w-5 h-5" /> Go Live Now
          </motion.button>
        </div>
      </div>

      <div>
        <p
          className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          style={{ color: "#94a3b8" }}
        >
          Upcoming Sessions
        </p>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-5 animate-pulse"
                style={{
                  background: "white",
                  border: "1.5px solid rgba(29,78,216,0.09)",
                }}
              >
                <Skel h={60} />
              </div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div
            className="flex flex-col items-center py-14 text-center rounded-2xl"
            style={{
              background: "white",
              border: "1.5px solid rgba(29,78,216,0.09)",
            }}
          >
            <Calendar className="w-10 h-10 mb-3" style={{ color: "#cbd5e1" }} />
            <p className="font-bold text-slate-500 text-sm">
              No classes scheduled yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {classes.map((cls) => (
              <motion.div
                key={cls.id}
                whileHover={{ x: 2 }}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: "white",
                  border: "1.5px solid rgba(29,78,216,0.09)",
                  boxShadow: "0 4px 20px rgba(29,78,216,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#EEF3FF,#DBEAFE)",
                  }}
                >
                  <Radio className="w-5 h-5" style={{ color: C.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: C.dark }}>
                    {cls.title}
                  </p>
                  <p
                    className="text-xs mt-0.5 flex items-center gap-3"
                    style={{ color: "#94a3b8" }}
                  >
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {fmt(cls.scheduledAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cls.enrolled} enrolled
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => copyLink(cls.meetLink)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: "#eef3ff", color: C.primary }}
                  >
                    <Copy className="w-3 h-3" /> Copy Link
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => window.open(cls.meetLink, "_blank")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                    }}
                  >
                    <Link2 className="w-3 h-3" /> Join
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO UPLOAD VIEW
// ─────────────────────────────────────────────────────────────────────────────
export const TutorVideoUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [showYouTubeInput, setShowYouTubeInput] = useState(false);
  const [ytUrl, setYtUrl] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [singleUploading, setSingleUploading] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([
    {
      id: 1,
      title: "Introduction to Career Mapping",
      duration: "18:45",
      views: 1240,
      status: "Published",
      thumb: "Pow-yUGYbVs",
      size: "245 MB",
    },
    {
      id: 2,
      title: "Psychometric Testing Deep Dive",
      duration: "24:10",
      views: 890,
      status: "Published",
      thumb: "O12p01-ITCY",
      size: "312 MB",
    },
    {
      id: 3,
      title: "Engineering Scope 2025",
      duration: "15:30",
      views: 234,
      status: "Processing",
      thumb: "5KgSWcPFXks",
      size: "189 MB",
    },
  ]);

  const dropRef = useRef(null);
  const fileRef = useRef(null);

  const addFiles = (newFiles) => {
    const videoFiles = Array.from(newFiles).filter((f) =>
      f.type.startsWith("video/"),
    );
    setFiles((prev) => [
      ...prev,
      ...videoFiles.map((f) => ({
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(1) + " MB",
        progress: 0,
      })),
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleUploadAll = async () => {
    if (!files.length) return;
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 150));
      setFiles((prev) => prev.map((f) => ({ ...f, progress: i })));
    }
    toast.success(
      `${files.length} video${files.length > 1 ? "s" : ""} uploaded!`,
      { style: toastOK },
    );
    setFiles([]);
    setUploading(false);
  };

  const handleSingleUpload = async (videoId) => {
    setSingleUploading(videoId);
    await new Promise((r) => setTimeout(r, 2000));
    toast.success("Video replaced successfully!", { style: toastOK });
    setSingleUploading(null);
  };

  const deleteVideo = (id) => {
    setUploadedVideos((prev) => prev.filter((v) => v.id !== id));
    toast.success("Video deleted", { style: toastOK });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6 pt-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black" style={{ color: C.dark }}>
            Video Library
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
            Upload, manage and publish your course videos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowYouTubeInput((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
            style={{
              background: "white",
              border: "1.5px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
              boxShadow: "0 2px 8px rgba(239,68,68,0.1)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444">
              <path d="M21.8 8.001a2.752 2.752 0 0 0-1.938-1.95C18.157 5.6 12 5.6 12 5.6s-6.157 0-7.862.451A2.752 2.752 0 0 0 2.2 8.001C1.752 9.716 1.752 12 1.752 12s0 2.284.448 3.999a2.752 2.752 0 0 0 1.938 1.95C5.843 18.4 12 18.4 12 18.4s6.157 0 7.862-.451a2.752 2.752 0 0 0 1.938-1.95C22.248 14.284 22.248 12 22.248 12s0-2.284-.448-3.999zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
            Add YouTube Link
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
              boxShadow: "0 4px 14px rgba(29,78,216,0.28)",
            }}
          >
            <Upload className="w-4 h-4" /> Upload File
          </motion.button>
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      </div>

      <AnimatePresence>
        {showYouTubeInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "white",
              border: "1.5px solid rgba(239,68,68,0.2)",
              boxShadow: "0 4px 20px rgba(239,68,68,0.08)",
            }}
          >
            <div
              className="px-6 py-4 flex items-center gap-2"
              style={{
                borderBottom: "1px solid rgba(239,68,68,0.1)",
                background: "rgba(239,68,68,0.03)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444">
                <path d="M21.8 8.001a2.752 2.752 0 0 0-1.938-1.95C18.157 5.6 12 5.6 12 5.6s-6.157 0-7.862.451A2.752 2.752 0 0 0 2.2 8.001C1.752 9.716 1.752 12 1.752 12s0 2.284.448 3.999a2.752 2.752 0 0 0 1.938 1.95C5.843 18.4 12 18.4 12 18.4s6.157 0 7.862-.451a2.752 2.752 0 0 0 1.938-1.95C22.248 14.284 22.248 12 22.248 12s0-2.284-.448-3.999zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
              <p className="text-sm font-black" style={{ color: "#ef4444" }}>
                Add YouTube Video
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Link2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    placeholder="Paste YouTube URL: https://youtu.be/xxx"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                    style={{
                      background: "#f8faff",
                      border: "1.5px solid rgba(29,78,216,0.1)",
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const match = ytUrl.match(
                      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
                    );
                    if (!match)
                      return toast.error("Invalid YouTube URL", {
                        style: toastErr,
                      });
                    setUploadedVideos((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        title: ytTitle || `YouTube Video (${match[1]})`,
                        thumb: match[1],
                        duration: "YouTube",
                        views: 0,
                        size: "YouTube",
                        status: "Published",
                        youtubeId: match[1],
                      },
                    ]);
                    setYtUrl("");
                    setYtTitle("");
                    setShowYouTubeInput(false);
                    toast.success("YouTube video added! ✓", { style: toastOK });
                  }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#ef4444,#dc2626)",
                    boxShadow: "0 3px 12px rgba(239,68,68,0.28)",
                  }}
                >
                  Add Video
                </motion.button>
              </div>
              <input
                type="text"
                value={ytTitle}
                onChange={(e) => setYtTitle(e.target.value)}
                placeholder="Video title (optional — auto-filled from YouTube)"
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                style={{
                  background: "#f8faff",
                  border: "1.5px solid rgba(29,78,216,0.09)",
                }}
              />
              {(() => {
                const match = ytUrl.match(
                  /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
                );
                if (!match) return null;
                return (
                  <div
                    className="flex items-center gap-4 p-3 rounded-xl"
                    style={{
                      background: "#f0f5ff",
                      border: "1px solid rgba(29,78,216,0.1)",
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`}
                      className="w-24 h-16 rounded-lg object-cover"
                      alt="preview"
                    />
                    <div>
                      <p
                        className="text-xs font-black"
                        style={{ color: C.primary }}
                      >
                        ✓ Valid YouTube URL detected
                      </p>
                      <p className="text-xs mt-0.5 text-slate-400">
                        Video ID: {match[1]}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className="rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-4 py-12 cursor-pointer transition-all"
        style={{
          borderColor: dragOver ? C.primary : "rgba(29,78,216,0.18)",
          background: dragOver
            ? "rgba(29,78,216,0.04)"
            : "rgba(255,255,255,0.7)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
          style={{ background: dragOver ? C.primary : "#eef3ff" }}
        >
          <UploadCloud
            className="w-7 h-7 transition-colors"
            style={{ color: dragOver ? "white" : C.primary }}
          />
        </div>
        <div className="text-center">
          <p className="font-black text-slate-900 text-base mb-1">
            {dragOver ? "Drop videos here" : "Drag & drop videos"}
          </p>
          <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>
            or <span style={{ color: C.primary }}>click to browse</span> · MP4,
            MOV, AVI up to 4GB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "white",
            border: "1.5px solid rgba(29,78,216,0.1)",
            boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
          }}
        >
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              borderBottom: "1px solid rgba(29,78,216,0.06)",
              background: "#f8faff",
            }}
          >
            <div className="flex items-center gap-2">
              <FileVideo className="w-4 h-4" style={{ color: C.primary }} />
              <p className="text-sm font-black" style={{ color: C.dark }}>
                Upload Queue ({files.length} file{files.length !== 1 ? "s" : ""}
                )
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiles([])}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors px-3 py-1.5"
              >
                Clear All
              </button>
              <motion.button
                onClick={handleUploadAll}
                disabled={uploading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-60"
                style={{
                  background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                  boxShadow: "0 3px 12px rgba(29,78,216,0.25)",
                }}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" /> Upload All
                  </>
                )}
              </motion.button>
            </div>
          </div>
          <div
            className="divide-y"
            style={{ borderColor: "rgba(29,78,216,0.05)" }}
          >
            {files.map((f, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#eef3ff" }}
                >
                  <FileVideo className="w-5 h-5" style={{ color: C.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: C.dark }}
                  >
                    {f.name}
                  </p>
                  <p className="text-xs text-slate-400">{f.size}</p>
                  {f.progress > 0 && f.progress < 100 && (
                    <div className="mt-1.5 h-1.5 rounded-full overflow-hidden bg-blue-50">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${f.progress}%` }}
                        style={{
                          background: `linear-gradient(90deg,${C.primary},${C.secondary})`,
                        }}
                      />
                    </div>
                  )}
                  {f.progress === 100 && (
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">
                      ✓ Upload complete
                    </p>
                  )}
                </div>
                {!uploading && (
                  <button
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "white",
          border: "1.5px solid rgba(29,78,216,0.1)",
          boxShadow: "0 2px 12px rgba(29,78,216,0.05)",
        }}
      >
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            borderBottom: "1px solid rgba(29,78,216,0.06)",
            background: "#f8faff",
          }}
        >
          <div className="flex items-center gap-2">
            <FileVideo className="w-4 h-4" style={{ color: C.primary }} />
            <p className="text-sm font-black" style={{ color: C.dark }}>
              My Videos ({uploadedVideos.length})
            </p>
          </div>
          <p className="text-[10px] font-bold text-slate-400">
            Click upload icon to replace a video
          </p>
        </div>
        <div
          className="divide-y"
          style={{ borderColor: "rgba(29,78,216,0.05)" }}
        >
          {uploadedVideos.map((v) => (
            <motion.div
              key={v.id}
              whileHover={{ backgroundColor: "rgba(29,78,216,0.01)" }}
              className="px-6 py-4 flex items-center gap-4 transition-colors"
            >
              <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0">
                <img
                  src={`https://img.youtube.com/vi/${v.thumb}/mqdefault.jpg`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: C.dark }}>
                  {v.title}
                </p>
                <p className="text-xs mt-0.5 flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {v.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {v.views.toLocaleString()} views
                  </span>
                  <span>{v.size}</span>
                </p>
              </div>
              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 ${v.status === "Published" ? "bg-emerald-100 text-emerald-700" : v.status === "Processing" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}
              >
                {v.status}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id={`vid-upload-${v.id}`}
                  onChange={() => handleSingleUpload(v.id)}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() =>
                    document.getElementById(`vid-upload-${v.id}`)?.click()
                  }
                  disabled={singleUploading === v.id}
                  title="Replace video"
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors disabled:opacity-50"
                  style={{ border: "1.5px solid rgba(29,78,216,0.1)" }}
                >
                  {singleUploading === v.id ? (
                    <Loader2
                      className="w-3.5 h-3.5 animate-spin"
                      style={{ color: C.primary }}
                    />
                  ) : (
                    <Upload
                      className="w-3.5 h-3.5"
                      style={{ color: C.primary }}
                    />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  title="Preview video"
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors"
                  style={{ border: "1.5px solid rgba(0,0,0,0.06)" }}
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => deleteVideo(v.id)}
                  title="Delete video"
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors"
                  style={{ border: "1.5px solid rgba(239,68,68,0.12)" }}
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
