// src/CoursePlayer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// WIRING MAP
//   Mount       → CourseService.getCourseById(id)        GET  /courses/:id
//   Video click → CourseService.saveProgress(id, videoId) POST /courses/:id/progress
//   AI Chat     → simulated locally (swap stub for real LLM endpoint later)
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  CheckCircle,
  ListVideo,
  MessageSquare,
  FileText,
  PenTool,
  PlayCircle,
  Send,
  MoreVertical,
  ThumbsUp,
  Share2,
  Bookmark,
  GraduationCap,
  Sparkles,
  BrainCircuit,
  Video,
  Search,
  Loader2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Download,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// WIRE: real service layer
// import { CourseService } from "./services/api";

// ─────────────────────────────────────────────
// DUMMY COURSE SERVICE (mirrors api.js shape)
// Delete this block when real endpoints are ready.
// ─────────────────────────────────────────────
const simulateRequest = (data, delay = 900) =>
  new Promise((res) => setTimeout(() => res({ data }), delay));

const DummyCourseService = {
  // WIRE: replace with → import { CourseService } from "./services/api"
  //       then call    → CourseService.getCourseById(id)
  getCourseById: async (id) =>
    simulateRequest({
      id,
      title: "Career Guidance Masterclass",
      instructor: "Surabhi Dewra",
      tag: "CareerGuide",
      modules: [
        {
          id: 1,
          title: "Module 1: Foundation & Mindset",
          videos: [
            {
              id: "Pow-yUGYbVs",
              title: "Top 5 Career Options After 12th",
              duration: "12:45",
              completed: true,
            },
            {
              id: "O12p01-ITCY",
              title: "Psychometric Testing Explained",
              duration: "18:20",
              completed: true,
            },
            {
              id: "p1Zle7wRG7E",
              title: "How to Choose the Right Career",
              duration: "15:10",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Module 2: Deep Dive Pathways",
          videos: [
            {
              id: "5KgSWcPFXks",
              title: "Engineering Careers & Scope",
              duration: "22:15",
              completed: false,
            },
            {
              id: "Wy-_idAGHxc",
              title: "Commerce Pathways & Opportunities",
              duration: "19:30",
              completed: false,
            },
            {
              id: "4RjPZnatm8M",
              title: "Arts & Humanities Careers",
              duration: "14:50",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Module 3: Preparation Strategy",
          videos: [
            {
              id: "eAfqu9BiyxU",
              title: "Resume Building Masterclass",
              duration: "25:00",
              completed: false,
            },
            {
              id: "fBbjc9Pq_8Y",
              title: "Interview Strategy & Tips",
              duration: "21:10",
              completed: false,
            },
          ],
        },
      ],
      resources: [
        {
          id: "r1",
          name: "Career Decision Framework.pdf",
          size: "1.2 MB",
          type: "pdf",
        },
        {
          id: "r2",
          name: "Psychometric Test Guide.pdf",
          size: "840 KB",
          type: "pdf",
        },
        {
          id: "r3",
          name: "Resume Template.docx",
          size: "320 KB",
          type: "docx",
        },
        { id: "r4", name: "Module 1 Notes.pdf", size: "560 KB", type: "pdf" },
      ],
    }),

  // WIRE: replace with → CourseService.saveProgress(courseId, videoId)
  //       Backend: POST /courses/:id/progress  { videoId, completed: true }
  saveProgress: async () =>
    simulateRequest({ message: "Progress saved" }, 400),
};

// ─────────────────────────────────────────────
// AI RESPONSE STUBS  (swap for real LLM call)
// ─────────────────────────────────────────────
const AI_RESPONSES = [
  "Great question! This video covers the key frameworks for career decision-making. The core idea is to map your natural aptitude against market demand — what Surabhi calls the 'Career Matrix'.",
  "Based on the current session, the most important takeaway is that psychometric testing removes subjective bias from career choice. It gives you data, not just instinct.",
  "The Commerce pathway discussed in Module 2 is particularly relevant for students who score high in numerical reasoning. CA, CFA, and MBA Finance are the top three outcomes.",
  "Surabhi recommends spending at least 2 weeks on aptitude mapping before committing to a stream. The frameworks from this course dramatically reduce post-decision regret.",
  "That's covered in Module 3! The resume masterclass session specifically addresses ATS-optimised formatting, which is critical for engineering and finance roles.",
  "Think of this as a three-step process: (1) Know yourself through testing, (2) map yourself to the right market, (3) build the credentials that close the gap. This course walks through each step.",
];

const getAIResponse = (question) => {
  // In production: POST /api/ai/chat  { question, courseId, videoId }
  const idx =
    Math.abs(question.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) %
    AI_RESPONSES.length;
  return AI_RESPONSES[idx];
};

// ─────────────────────────────────────────────
// SPRING / EASE
// ─────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function CoursePlayer() {
  const navigate = useNavigate();
  const { id } = useParams(); // /course/:id  — fallback to "101"
  const location = useLocation();
  const courseId = id || location.state?.courseId || "101";

  // ── Layout state ──
  const [activeTab, setActiveTab] = useState("sessions");
  const [isExiting, setIsExiting] = useState(false);

  // ── Course data state ──
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentVid, setCurrentVid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null); // videoId being saved

  // ── AI chat state ──
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // ── Resources search ──
  const [resSearch, setResSearch] = useState("");

  // ─────────────────────────────────────────────
  // FETCH COURSE DATA
  // WIRE: DummyCourseService.getCourseById → CourseService.getCourseById
  // ─────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await DummyCourseService.getCourseById(courseId);
        setCourse(res.data);
        setModules(res.data.modules);
        // Auto-select first incomplete video, or first overall
        const allVids = res.data.modules.flatMap((m) => m.videos);
        const first = allVids.find((v) => !v.completed) || allVids[0];
        setCurrentVid(first);
      } catch (err) {
        console.log('err: ', err);
        toast.error("Could not load course. Try again.", {
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
          },
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  // Scroll AI chat to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  // ─────────────────────────────────────────────
  // PROGRESS TRACKING
  // Called when user clicks a new video — marks current as complete first.
  // WIRE: DummyCourseService.saveProgress → CourseService.saveProgress
  // ─────────────────────────────────────────────
  const markComplete = useCallback(
    async (videoId) => {
      if (!videoId) return;
      setSavingId(videoId);
      try {
        // WIRE: POST /courses/:courseId/progress  { videoId, completed: true }
        await DummyCourseService.saveProgress(courseId, videoId);
        // Optimistic UI update
        setModules((prev) =>
          prev.map((m) => ({
            ...m,
            videos: m.videos.map((v) =>
              v.id === videoId ? { ...v, completed: true } : v,
            ),
          })),
        );
      } catch {
        toast.error("Progress save failed — will retry", {
          style: {
            borderRadius: "12px",
            background: "#fff1f2",
            color: "#e11d48",
            fontSize: "13px",
          },
        });
      } finally {
        setSavingId(null);
      }
    },
    [courseId],
  );

  const handleSelectVideo = useCallback(
    async (video) => {
      // Mark the currently playing video as complete before switching
      if (currentVid && !currentVid.completed) {
        await markComplete(currentVid.id);
      }
      setCurrentVid(video);
    },
    [currentVid, markComplete],
  );

  // Navigate to next/prev video in flat list
  const allVideos = modules.flatMap((m) => m.videos);
  const currentIdx = allVideos.findIndex((v) => v.id === currentVid?.id);
  const canPrev = currentIdx > 0;
  const canNext = currentIdx < allVideos.length - 1;

  const goNext = () => canNext && handleSelectVideo(allVideos[currentIdx + 1]);
  const goPrev = () => canPrev && handleSelectVideo(allVideos[currentIdx - 1]);

  // ─────────────────────────────────────────────
  // AI CHAT
  // WIRE: swap getAIResponse() for → POST /api/ai/chat { question, courseId, videoId }
  // ─────────────────────────────────────────────
  const sendMessage = async () => {
    const q = chatInput.trim();
    if (!q || aiTyping) return;

    const userMsg = { id: Date.now(), role: "user", text: q };
    setMessages((p) => [...p, userMsg]);
    setChatInput("");
    setAiTyping(true);

    // Simulate network + LLM latency
    await new Promise((res) => setTimeout(res, 1400));

    const answer = getAIResponse(q); // WIRE: replace with real API call
    setMessages((p) => [
      ...p,
      { id: Date.now() + 1, role: "ai", text: answer },
    ]);
    setAiTyping(false);
  };

  const handleChatKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─────────────────────────────────────────────
  // CLOSE
  // ─────────────────────────────────────────────
  const handleClose = async () => {
    // Save progress on exit
    if (currentVid && !currentVid.completed) await markComplete(currentVid.id);
    setIsExiting(true);
    setTimeout(() => navigate("/dashboard"), 380);
  };

  // ─────────────────────────────────────────────
  // PROGRESS PERCENTAGE
  // ─────────────────────────────────────────────
  const totalVids = allVideos.length;
  const completedVids = modules
    .flatMap((m) => m.videos)
    .filter((v) => v.completed).length;
  const progressPct = totalVids
    ? Math.round((completedVids / totalVids) * 100)
    : 0;

  // ─────────────────────────────────────────────
  // LOADING SKELETON
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col h-screen w-full bg-[#0B0F19] text-white font-sans overflow-hidden">
        <header className="h-16 bg-[#050810] border-b border-white/5 flex items-center px-6">
          <div className="w-36 h-5 rounded-lg bg-white/10 animate-pulse" />
        </header>
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
          <p className="text-slate-400 text-sm font-semibold">
            Loading course…
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.99 : 1 }}
      transition={{ duration: 0.38, ease }}
      className="flex flex-col h-screen w-full bg-[#0B0F19] text-white font-sans overflow-hidden"
    >
      <Toaster position="top-right" />

      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <header className="h-14 bg-[#050810] border-b border-white/5 flex items-center justify-between px-5 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-500" />
            <span className="font-black text-base tracking-tight">
              <span className="text-cyan-500">VS</span>intellecta
            </span>
          </div>
          <div className="h-5 w-px bg-white/10 hidden md:block" />
          <h1 className="text-xs font-bold text-slate-400 hidden md:block truncate max-w-md">
            {course?.title} · {course?.instructor}
          </h1>
        </div>

        {/* Progress pill + close */}
        <div className="flex items-center gap-4">
          {/* Overall progress */}
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] font-black text-cyan-400">
              {progressPct}%
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-rose-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MAIN LAYOUT
      ════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── LEFT: Cinematic video player ── */}
        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar bg-black relative">
          {/* Video embed */}
          <div className="w-full aspect-video bg-black relative shadow-2xl shrink-0">
            <AnimatePresence mode="wait">
              {currentVid && (
                <motion.div
                  key={currentVid.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentVid.id}?autoplay=1&rel=0&modestbranding=1`}
                    title="Course Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prev / Next nav bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#080C14] border-b border-white/5">
            <button
              onClick={goPrev}
              disabled={!canPrev}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {/* Saving indicator */}
            {savingId && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400">
                <Loader2 className="w-3 h-3 animate-spin" /> Saving progress…
              </div>
            )}

            <button
              onClick={goNext}
              disabled={!canNext}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Video details */}
          <div className="p-7 max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-md mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">
                Premium Content
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-white mb-1.5">
              {currentVid?.title}
            </h2>
            <p className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2">
              By {course?.instructor} ({course?.tag})
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              {currentVid?.duration}
              {currentVid?.completed && (
                <>
                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Completed
                  </span>
                </>
              )}
            </p>

            {/* Engagement actions */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/8">
              {[
                { icon: ThumbsUp, label: "1.2k" },
                { icon: Bookmark, label: "Save" },
                { icon: Share2, label: "Share" },
              ].map(({ label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-colors"
                >
                  {/* <Icon className="w-3.5 h-3.5" /> {label} */}
                </motion.button>
              ))}
              <button className="ml-auto w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="mt-6 bg-white/[0.03] border border-white/5 rounded-[1.5rem] p-6">
              <h3 className="text-base font-black text-white mb-3">
                About this session
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                In this session, {course?.instructor} breaks down the exact
                frameworks needed to analyse and execute your optimal career
                path. You'll learn the difference between standard degrees and
                specialised skill-building, how to read market trends, and the
                psychology of decision-making under pressure.
                <br />
                <br />
                Take notes and use the{" "}
                <span className="text-purple-400 font-bold">AI Tutor</span> on
                the right if you need a quick summary or have questions about
                the topics covered.
              </p>
            </div>

            {/* Mark as complete button */}
            {!currentVid?.completed && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => markComplete(currentVid.id)}
                disabled={!!savingId}
                className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
                style={{
                  background: "linear-gradient(135deg,#059669,#10B981)",
                  boxShadow: "0 4px 16px rgba(16,185,129,0.25)",
                }}
              >
                {savingId === currentVid.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" /> Mark as Complete
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* ── RIGHT: Tabs ── */}
        <div className="w-full lg:w-[390px] xl:w-[430px] bg-[#050810] border-l border-white/5 flex flex-col shrink-0 z-10">
          {/* Tab bar */}
          <div className="flex border-b border-white/10 px-1 pt-1 shrink-0">
            {[
              {
                id: "sessions",
                icon: <ListVideo className="w-4 h-4" />,
                label: "Sessions",
              },
              {
                id: "chat",
                icon: <BrainCircuit className="w-4 h-4" />,
                label: "AI Chat",
              },
              {
                id: "assignments",
                icon: <PenTool className="w-4 h-4" />,
                label: "Tasks",
              },
              {
                id: "resources",
                icon: <FileText className="w-4 h-4" />,
                label: "Docs",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 border-b-2 transition-all duration-250 ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-400"
                    : "border-transparent text-slate-600 hover:text-slate-300 hover:bg-white/4"
                }`}
              >
                {tab.icon}
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden relative bg-[#0B0F19]">
            <AnimatePresence mode="wait">
              {/* ─────── SESSIONS TAB ─────── */}
              {activeTab === "sessions" && (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.26, ease }}
                  className="absolute inset-0 overflow-y-auto hide-scrollbar p-4 space-y-5"
                >
                  {/* Progress summary */}
                  <div
                    className="rounded-2xl p-4 flex items-center gap-4"
                    style={{
                      background: "rgba(6,182,212,0.07)",
                      border: "1px solid rgba(6,182,212,0.15)",
                    }}
                  >
                    <div className="relative w-12 h-12 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="3"
                          strokeDasharray={`${progressPct * 0.942} 94.2`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-cyan-400">
                        {progressPct}%
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">
                        {completedVids} of {totalVids} videos done
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                        Keep going — you're doing great!
                      </p>
                    </div>
                  </div>

                  {modules.map((module) => (
                    <div key={module.id} className="space-y-1.5">
                      <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1 mb-2">
                        {module.title}
                      </h4>
                      {module.videos.map((video) => {
                        const isActive = currentVid?.id === video.id;
                        const isSaving = savingId === video.id;
                        return (
                          <motion.div
                            key={video.id}
                            whileHover={{ x: 2 }}
                            onClick={() => handleSelectVideo(video)}
                            className={`flex gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                              isActive
                                ? "bg-cyan-500/10 border-cyan-500/30"
                                : "bg-white/[0.03] border-transparent hover:bg-white/[0.07]"
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isSaving ? (
                                <Loader2
                                  className="w-4.5 h-4.5 text-cyan-400 animate-spin"
                                  style={{ width: 18, height: 18 }}
                                />
                              ) : video.completed ? (
                                <CheckCircle
                                  className={`w-4.5 h-4.5 ${isActive ? "text-cyan-400" : "text-emerald-500"}`}
                                  style={{ width: 18, height: 18 }}
                                />
                              ) : (
                                <PlayCircle
                                  className={`w-4.5 h-4.5 ${isActive ? "text-cyan-400" : "text-slate-600"}`}
                                  style={{ width: 18, height: 18 }}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-xs font-bold leading-snug mb-1 truncate ${isActive ? "text-cyan-300" : "text-slate-300"}`}
                              >
                                {video.title}
                              </p>
                              <p className="text-[9px] font-bold text-slate-600 flex items-center gap-1">
                                <Video className="w-3 h-3" /> {video.duration}
                                {video.completed && !isActive && (
                                  <span className="ml-1 text-emerald-600">
                                    · Done
                                  </span>
                                )}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ─────── AI CHAT TAB ─────── */}
              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.26, ease }}
                  className="absolute inset-0 flex flex-col bg-[#100C1E]"
                >
                  {/* Chat header */}
                  <div
                    className="px-4 py-3 border-b border-purple-500/15 flex items-center justify-between shrink-0"
                    style={{ background: "rgba(88,28,135,0.18)" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                        }}
                      >
                        <BrainCircuit className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-purple-100">
                          AI Tutor
                        </p>
                        <p className="text-[9px] text-purple-400 font-medium">
                          Contextual to this course
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMessages([])}
                      className="text-[9px] font-black bg-white text-slate-900 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> New Chat
                    </motion.button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4 space-y-3">
                    {messages.length === 0 && !aiTyping && (
                      <div className="flex flex-col items-center justify-center h-full text-center pb-8">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                          style={{
                            background:
                              "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(168,85,247,0.10))",
                            border: "1px solid rgba(167,139,250,0.15)",
                          }}
                        >
                          <MessageSquare className="w-7 h-7 text-purple-500" />
                        </div>
                        <h3 className="text-sm font-black text-white mb-1">
                          Ask your AI Tutor
                        </h3>
                        <p className="text-xs text-slate-500 font-medium max-w-[200px] leading-relaxed">
                          Ask anything about this course — summaries, concepts,
                          or career questions.
                        </p>
                        {/* Suggestion chips */}
                        <div className="mt-5 flex flex-col gap-2 w-full">
                          {[
                            "Summarise this video for me",
                            "What are the top career paths discussed?",
                            "How do I prepare for psychometric tests?",
                          ].map((s) => (
                            <motion.button
                              key={s}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setChatInput(s);
                              }}
                              className="text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-purple-300 transition-all"
                              style={{
                                background: "rgba(124,58,237,0.10)",
                                border: "1px solid rgba(167,139,250,0.14)",
                              }}
                            >
                              {s}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "ai" && (
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mr-2 mt-0.5"
                            style={{
                              background:
                                "linear-gradient(135deg,#7c3aed,#a855f7)",
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                            msg.role === "user"
                              ? "text-white rounded-tr-sm"
                              : "text-slate-200 rounded-tl-sm"
                          }`}
                          style={
                            msg.role === "user"
                              ? {
                                  background:
                                    "linear-gradient(135deg,#4f46e5,#7c3aed)",
                                }
                              : {
                                  background: "rgba(255,255,255,0.06)",
                                  border: "1px solid rgba(255,255,255,0.06)",
                                }
                          }
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {aiTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2"
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg,#7c3aed,#a855f7)",
                          }}
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div
                          className="px-4 py-3 rounded-2xl rounded-tl-sm"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                  ease: "easeInOut",
                                }}
                                className="w-1.5 h-1.5 rounded-full bg-purple-400"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Input */}
                  <div
                    className="p-3 border-t border-white/5 shrink-0"
                    style={{ background: "#0A0816" }}
                  >
                    <div className="relative flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={handleChatKey}
                        placeholder="Ask Anything…"
                        disabled={aiTyping}
                        className="flex-1 bg-[#1A1535] border border-white/10 rounded-2xl pl-4 pr-3 py-3 text-xs font-medium text-white focus:outline-none focus:border-purple-500/60 placeholder:text-slate-600 disabled:opacity-50 transition-colors"
                      />
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={sendMessage}
                        disabled={aiTyping || !chatInput.trim()}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 transition-all"
                        style={{
                          background:
                            chatInput.trim() && !aiTyping
                              ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                              : "rgba(255,255,255,0.08)",
                        }}
                      >
                        {aiTyping ? (
                          <Loader2 className="w-4 h-4 text-purple-300 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 text-white" />
                        )}
                      </motion.button>
                    </div>
                    <p className="text-[9px] text-slate-700 font-medium mt-1.5 text-center">
                      AI responses are contextual to this course — not real-time
                      advice.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ─────── ASSIGNMENTS TAB ─────── */}
              {activeTab === "assignments" && (
                <motion.div
                  key="assignments"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.26, ease }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <PenTool className="w-7 h-7 text-slate-600" />
                  </div>
                  <p className="text-sm font-black text-slate-400">
                    No tasks for this module.
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 font-medium">
                    Check back when new content is released.
                  </p>
                </motion.div>
              )}

              {/* ─────── RESOURCES TAB ─────── */}
              {activeTab === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.26, ease }}
                  className="absolute inset-0 flex flex-col"
                >
                  {/* Search bar */}
                  <div
                    className="p-3 border-b border-white/5 shrink-0"
                    style={{ background: "rgba(255,107,53,0.06)" }}
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                      <input
                        type="text"
                        value={resSearch}
                        onChange={(e) => setResSearch(e.target.value)}
                        placeholder="Search resources…"
                        className="w-full bg-black/40 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:border-orange-500/50 placeholder:text-slate-700 text-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Resource list */}
                  <div className="flex-1 overflow-y-auto hide-scrollbar p-3 space-y-2">
                    {course?.resources
                      ?.filter(
                        (r) =>
                          !resSearch ||
                          r.name
                            .toLowerCase()
                            .includes(resSearch.toLowerCase()),
                      )
                      .map((r) => (
                        <motion.div
                          key={r.id}
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              background:
                                r.type === "pdf"
                                  ? "rgba(239,68,68,0.12)"
                                  : "rgba(59,130,246,0.12)",
                            }}
                          >
                            <FileText
                              className="w-4 h-4"
                              style={{
                                color: r.type === "pdf" ? "#ef4444" : "#3b82f6",
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-300 truncate">
                              {r.name}
                            </p>
                            <p className="text-[9px] font-bold text-slate-600 mt-0.5 uppercase">
                              {r.type} · {r.size}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() =>
                              toast.success(`Downloading ${r.name}`, {
                                style: {
                                  borderRadius: "12px",
                                  background: "#0f172a",
                                  color: "#fff",
                                  fontSize: "12px",
                                },
                              })
                            }
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-500" />
                          </motion.button>
                        </motion.div>
                      ))}

                    {course?.resources?.filter(
                      (r) =>
                        !resSearch ||
                        r.name.toLowerCase().includes(resSearch.toLowerCase()),
                    ).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <FileText className="w-10 h-10 text-slate-700 mb-3" />
                        <p className="text-xs font-bold text-slate-500">
                          No resources found.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
