import React, { useState, useEffect } from "react";
import {
  Play, Star, ArrowRight, PlusCircle, BookOpen, MonitorPlay,
  ShoppingCart, Loader2, Search, BookMarked
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CourseService } from "../services/api";

const C = {
  primary: "#1d4ed8",
  secondary: "#0284c7",
  accent: "#f59e0b",
  emerald: "#10b981",
  dark: "#0f172a",
  textSub: "#64748b",
};

const toastOK = {
  borderRadius: "12px", background: "#0f172a", color: "#fff",
  fontSize: "13px", fontWeight: 600,
};

const toastErr = {
  borderRadius: "12px", background: "#fff1f2", color: "#e11d48",
  fontSize: "13px", fontWeight: 600, border: "1px solid #fecdd3",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const spring = { type: "spring", stiffness: 420, damping: 32 };

const Skel = ({ w = "100%", h = 16, r = 8 }) => (
  <div
    className="animate-pulse"
    style={{
      width: w, height: h, borderRadius: r,
      background: "rgba(29,78,216,0.07)",
    }}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// LEARNER HOME VIEW
// ─────────────────────────────────────────────────────────────────────────────
export const LearnerHome = ({ user, setCurrentView, isTutor }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState(false);

  const features = [
    { title: "Psychometric Testing", desc: "Discover your true potential with our advanced testing framework.", videoId: "Pow-yUGYbVs" },
    { title: "Career Options after 12th", desc: "Detailed breakdowns of every major pathway post-secondary.", videoId: "O12p01-ITCY" },
    { title: "Resume Building", desc: "Industry secrets to crafting a resume that gets you hired.", videoId: "p1Zle7wRG7E" },
    { title: "Engineering Insights", desc: "A complete guide to the engineering landscape and scope.", videoId: "5KgSWcPFXks" },
  ];

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setActiveTab((p) => (p + 1) % features.length), 5000);
    return () => clearInterval(t);
  }, [hovered, features.length]);

  const courses = [
    { title: "Career Options Post 12th", next: "Engineering Pathways", perc: 65, videoId: "Pow-yUGYbVs", color: C.primary },
    { title: "Resume Building Masterclass", next: "Formatting Secrets", perc: 33, videoId: "O12p01-ITCY", color: C.secondary },
    { title: "Psychometric Evaluation", next: "Test Preparation", perc: 12, videoId: "p1Zle7wRG7E", color: "#f59e0b" },
  ];

  const marqueeItems = [
    { title: "Top 5 Career Options", author: "Sujatha Kancharla", rating: 4.8, oldPrice: "₹2,999", price: "₹999", vid: "Pow-yUGYbVs" },
    { title: "Psychometric Testing", author: "Sujatha Kancharla", rating: 4.9, oldPrice: "₹4,999", price: "₹1,499", vid: "O12p01-ITCY" },
    { title: "After 12th Guidance", author: "Sujatha Kancharla", rating: 4.7, oldPrice: "₹1,999", price: "₹499", vid: "p1Zle7wRG7E" },
    { title: "Engineering Careers", author: "Sujatha Kancharla", rating: 4.6, oldPrice: "₹3,499", price: "₹1,299", vid: "5KgSWcPFXks" },
    { title: "Commerce Pathways", author: "Sujatha Kancharla", rating: 4.8, oldPrice: "₹2,499", price: "₹799", vid: "Pow-yUGYbVs" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-8 max-w-5xl mx-auto pt-6">
      {/* Continue Learning */}
      <motion.section variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "#94a3b8" }}>
            Continue Learning
          </p>
          <motion.button whileHover={{ x: 2 }} onClick={() => setCurrentView("my-programs")} className="text-xs font-bold flex items-center gap-1" style={{ color: C.primary }}>
            View all <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {courses.map((c, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }} onClick={() => navigate("/course")} className="rounded-[20px] overflow-hidden cursor-pointer group relative"
              style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.1)", boxShadow: "0 4px 24px rgba(29,78,216,0.07)" }}>
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${c.color},${c.color}88)` }} />
              <div className="p-4">
                <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="course" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)" }}>
                      <Play className="w-4 h-4 ml-0.5" style={{ color: c.color, fill: c.color }} />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-sm leading-snug mb-1" style={{ color: C.dark }}>{c.title}</h4>
                <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: "#94a3b8" }}>
                  <Play className="w-3 h-3" /> Next: {c.next}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                    <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${c.perc}%` }} transition={{ duration: 1.2, delay: 0.6 + i * 0.12, ease: "easeOut" }} style={{ background: `linear-gradient(90deg,${c.color},${c.color}BB)` }} />
                  </div>
                  <span className="text-xs font-black" style={{ color: c.color }}>{c.perc}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Take a Closer Look */}
      <motion.section variants={fadeUp} className="rounded-[26px] overflow-hidden relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ background: `linear-gradient(145deg,${C.dark} 0%,#0D1A3E 60%,#071428 100%)`, border: "1px solid rgba(2,132,199,0.15)", boxShadow: "0 24px 64px rgba(29,78,216,0.14)" }}>
        <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(29,78,216,0.12) 0%,transparent 65%)", transform: "translate(30%,-30%)" }} />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg,${C.primary},${C.secondary})` }}>
              <Star className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.secondary }}>Featured Content</p>
          </div>
          <h2 className="text-2xl font-black text-white mb-7 leading-tight">Take a closer look<br />at your path.</h2>
          <div className="flex flex-col md:flex-row gap-7">
            <div className="w-full md:w-[36%] flex flex-col gap-1">
              {features.map((f, i) => {
                const isAct = activeTab === i;
                return (
                  <div key={i}>
                    <motion.button onClick={() => setActiveTab(i)} whileHover={{ x: 3 }} className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
                      style={{ background: isAct ? "rgba(29,78,216,0.25)" : "transparent", border: isAct ? "1px solid rgba(29,78,216,0.35)" : "1px solid transparent", color: isAct ? "white" : "rgba(255,255,255,0.4)" }}>
                      <span className="flex items-center gap-2.5">
                        <motion.span animate={{ rotate: isAct ? 45 : 0 }} transition={spring}>
                          <PlusCircle className="w-4 h-4" style={{ color: isAct ? C.secondary : "rgba(255,255,255,0.25)" }} />
                        </motion.span>
                        {f.title}
                      </span>
                      {isAct && <ArrowRight className="w-3.5 h-3.5" style={{ color: C.secondary }} />}
                    </motion.button>
                    <AnimatePresence>
                      {isAct && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="mx-2 mt-1 mb-1 p-3.5 rounded-xl text-xs leading-relaxed" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                            {f.desc}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="flex gap-1.5 px-4 mt-3">
                {features.map((_, i) => (
                  <motion.button key={i} onClick={() => setActiveTab(i)} animate={{ width: activeTab === i ? 22 : 5, opacity: activeTab === i ? 1 : 0.3 }} transition={spring} className="h-1 rounded-full" style={{ background: activeTab === i ? C.secondary : "rgba(255,255,255,0.4)" }} />
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-[64%]">
              <div className="absolute -inset-[3px] rounded-[22px] blur-sm opacity-40" style={{ background: `linear-gradient(135deg,${C.primary},${C.secondary})` }} />
              <div className="relative h-[280px] md:h-[340px] rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(2,132,199,0.2)" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${features[activeTab].videoId}?rel=0`} title={features[activeTab].title} frameBorder="0" allowFullScreen className="w-full h-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Related Programs marquee */}
      <motion.section variants={fadeUp} className="overflow-hidden pb-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "#94a3b8" }}>Related Programs</p>
          <motion.button whileHover={{ x: 2 }} onClick={() => setCurrentView("explore")} className="text-xs font-bold flex items-center gap-1" style={{ color: C.primary }}>
            View More <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
        <div className="flex overflow-x-hidden">
          <div className="animate-marquee flex gap-4">
            {[...marqueeItems, ...marqueeItems].map((c, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} onClick={() => navigate("/course")} className="w-[240px] rounded-2xl p-3.5 shrink-0 cursor-pointer group"
                style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", boxShadow: "0 4px 20px rgba(29,78,216,0.06)" }}>
                <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-100" style={{ height: "120px" }}>
                  <img src={`https://img.youtube.com/vi/${c.vid}/maxresdefault.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="course" />
                  <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.4),transparent)" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.92)" }}>
                      <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: C.primary, fill: C.primary }} />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-sm truncate mb-0.5" style={{ color: C.dark }}>{c.title}</h4>
                <p className="text-xs mb-2.5" style={{ color: "#94a3b8" }}>{c.author}</p>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(29,78,216,0.06)" }}>
                  <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "#f59e0b" }}>
                    <Star className="w-3 h-3 fill-current" /> {c.rating}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] line-through" style={{ color: "#cbd5e1" }}>{c.oldPrice}</span>
                    <span className="text-sm font-black px-2 py-0.5 rounded-lg" style={{ color: C.primary, background: "#eef3ff" }}>{c.price}</span>
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

// ─────────────────────────────────────────────────────────────────────────────
// EXPLORE VIEW
// ─────────────────────────────────────────────────────────────────────────────
export const LearnerExplore = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    CourseService.getAllCourses()
      .then((r) => {
        setCourses(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const visible = courses.filter((c) => !search || c.title?.toLowerCase().includes(search.toLowerCase()));

  const handleEnroll = async (id, e) => {
    e.stopPropagation();
    setEnrolling(id);
    try {
      await CourseService.enroll(id);
      toast.success("Enrolled successfully! 🎉", { style: toastOK });
    } catch {
      toast.error("Enrollment failed", { style: toastErr });
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-5 max-w-5xl mx-auto pt-6">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none"
            style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", color: C.dark }} />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", boxShadow: "0 2px 12px rgba(29,78,216,0.05)" }}>
              <Skel w="100%" h={144} r={0} />
              <div className="p-3 space-y-2">
                <Skel h={14} />
                <Skel w="60%" h={10} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visible.map((c, i) => (
            <motion.div key={c.id || i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }} onClick={() => navigate("/course-detail")}
              className="rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
              style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", boxShadow: "0 4px 20px rgba(29,78,216,0.06)" }}>
              <div className="relative h-36 overflow-hidden bg-slate-100">
                {c.img ? (
                  <img src={c.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="course" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg,${C.primary},${C.secondary})` }}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-white" style={{ background: "rgba(15,23,42,0.72)", backdropFilter: "blur(4px)" }}>
                  {c.category || "Course"}
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h4 className="font-bold text-sm leading-snug line-clamp-2 mb-1.5" style={{ color: C.dark }}>{c.title}</h4>
                <p className="text-xs mb-2" style={{ color: "#94a3b8" }}>{c.author || "Sujatha Kancharla"}</p>
                <div className="mt-auto pt-2.5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(29,78,216,0.05)" }}>
                  <span className="font-black text-base" style={{ color: C.dark }}>{c.price}</span>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => handleEnroll(c.id, e)} disabled={enrolling === c.id}
                    className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl text-white flex items-center gap-1 disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg,${C.primary},${C.secondary})`, boxShadow: "0 3px 10px rgba(29,78,216,0.25)" }}>
                    {enrolling === c.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <><ShoppingCart className="w-3 h-3" /> Enroll</>}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MY PROGRAMS VIEW
// ─────────────────────────────────────────────────────────────────────────────
export const LearnerMyPrograms = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CourseService.getMyPrograms()
      .then((r) => {
        setPrograms(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const demo = [
    { id: 101, title: "Career Guidance Post 12th", videoId: "Pow-yUGYbVs", sessions: 6, progress: 65 },
    { id: 102, title: "Class 10 Math Complete Prep", videoId: "p1Zle7wRG7E", sessions: 8, progress: 30 },
  ];

  const merged = programs.length ? programs.map((p) => ({ ...p, videoId: "Pow-yUGYbVs", sessions: 5, progress: p.progress ?? 0 })) : demo;
  const filtered = tab === "All" ? merged : tab === "In Progress" ? merged.filter((p) => p.progress > 0 && p.progress < 100) : merged.filter((p) => p.progress === 100);

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto space-y-5 pt-6">
      <div className="flex gap-1.5 p-1 rounded-2xl w-max" style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", boxShadow: "0 2px 12px rgba(29,78,216,0.05)" }}>
        {["All", "In Progress", "Completed"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background: tab === t ? `linear-gradient(135deg,${C.primary},${C.secondary})` : "rgba(248,250,255,0.8)",
              color: tab === t ? "white" : "#64748b",
              boxShadow: tab === t ? "0 3px 10px rgba(29,78,216,0.22)" : "none",
            }}>
            {t}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl p-4 animate-pulse" style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", boxShadow: "0 2px 12px rgba(29,78,216,0.05)" }}>
              <Skel h={128} r={12} />
              <div className="mt-3 space-y-2"><Skel h={14} /><Skel w="50%" h={10} /></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <BookMarked className="w-12 h-12 mb-3" style={{ color: "#cbd5e1" }} />
          <p className="font-bold text-slate-500">No programs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }} onClick={() => navigate("/course")} className="rounded-2xl p-4 cursor-pointer group"
              style={{ background: "white", border: "1.5px solid rgba(29,78,216,0.09)", boxShadow: "0 4px 20px rgba(29,78,216,0.06)" }}>
              <div className="h-32 rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="course" />
              </div>
              <h4 className="font-bold text-sm mb-2.5" style={{ color: C.dark }}>{c.title}</h4>
              <div className="flex justify-between items-center text-xs mb-2.5" style={{ color: "#94a3b8" }}>
                <span className="flex items-center gap-1.5"><MonitorPlay className="w-3.5 h-3.5" /> {c.sessions} Sessions</span>
                <span className="font-bold" style={{ color: C.primary }}>{c.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#eef3ff" }}>
                <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  style={{ background: `linear-gradient(90deg,${C.primary},${C.secondary})` }} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};