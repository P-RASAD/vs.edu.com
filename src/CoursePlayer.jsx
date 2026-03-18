import React, { useState, useEffect } from "react";
import {
  PlayCircle,
  CheckCircle,
  Circle,
  ArrowLeft,
  Menu,
  X,
  MessageSquare,
  FileText,
  Download,
  ChevronDown,
  Award,
  FolderOpen,
  MonitorPlay,
  Bookmark,
  Share2,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

export default function CoursePlayer() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState("s1"); // Open first folder by default

  // Track active video
  const [activeVideo, setActiveVideo] = useState({
    id: 1,
    title: "1. Welcome to the Masterclass",
    url: "https://www.youtube.com/embed/e3dA11TlfnU", // Placeholder video
    duration: "10:24",
    completed: true,
    desc: "In this introductory lesson, we will cover the foundational strategy required to tackle this course and set you up for success.",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, []);

  // --- STRUCTURED COURSE DATA (Folders & Videos) ---
  const courseData = {
    title: "Advanced React Patterns & Architecture",
    progress: 12,
    instructor: "VSintellecta Premium",
    curriculum: [
      {
        id: "s1",
        title: "Section 1: The Foundation",
        totalTime: "45m",
        videos: [
          {
            id: 1,
            title: "1. Welcome to the Masterclass",
            duration: "10:24",
            completed: true,
            url: "https://www.youtube.com/embed/e3dA11TlfnU",
          },
          {
            id: 2,
            title: "2. Setting up the Environment",
            duration: "15:12",
            completed: true,
            url: "https://www.youtube.com/embed/7AvYL8R7XlI",
          },
          {
            id: 3,
            title: "3. React 19 Core Concepts",
            duration: "20:30",
            completed: false,
            url: "https://www.youtube.com/embed/Lk6K9BgzpPw",
          },
        ],
      },
      {
        id: "s2",
        title: "Section 2: Advanced Hooks & State",
        totalTime: "1h 12m",
        videos: [
          {
            id: 4,
            title: "4. Mastering useMemo & useCallback",
            duration: "25:00",
            completed: false,
            url: "https://www.youtube.com/embed/zhpcgpqWc1Q",
          },
          {
            id: 5,
            title: "5. Custom Hooks Architecture",
            duration: "47:00",
            completed: false,
            url: "https://www.youtube.com/embed/e3dA11TlfnU",
          },
        ],
      },
      {
        id: "s3",
        title: "Section 3: Framer Motion & Animations",
        totalTime: "2h 15m",
        videos: [
          {
            id: 6,
            title: "6. Introduction to Spring Physics",
            duration: "35:00",
            completed: false,
            url: "https://www.youtube.com/embed/7AvYL8R7XlI",
          },
          {
            id: 7,
            title: "7. Building a Layout Animation",
            duration: "55:00",
            completed: false,
            url: "https://www.youtube.com/embed/Lk6K9BgzpPw",
          },
          {
            id: 8,
            title: "8. Complex SVG Path Tracing",
            duration: "45:00",
            completed: false,
            url: "https://www.youtube.com/embed/zhpcgpqWc1Q",
          },
        ],
      },
    ],
  };

  return (
    // We use a dark theme specifically for the player so the video pops (Theater Mode)
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 font-sans flex flex-col overflow-hidden selection:bg-blue-500/30">
      {/* ========================================== */}
      {/* 1. CINEMATIC TOP NAVBAR                    */}
      {/* ========================================== */}
      <header className="h-16 bg-[#111111] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="hidden sm:block border-l border-white/10 h-8 mr-2"></div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md leading-tight">
              {courseData.title}
            </h1>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
              {courseData.instructor}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <Award className="w-4 h-4 text-blue-400" />
            <div className="flex flex-col">
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${courseData.progress}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {courseData.progress}% Completed
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 text-sm font-bold text-white hover:bg-white/10 transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
          >
            {isSidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
            <span className="hidden sm:block">
              {isSidebarOpen ? "Close Syllabus" : "Open Syllabus"}
            </span>
          </button>
        </div>
      </header>

      {/* ========================================== */}
      {/* 2. MAIN PLAYER & SIDEBAR LAYOUT            */}
      {/* ========================================== */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT AREA: Video & Tabs */}
        <div
          className={`flex-1 flex flex-col h-full overflow-y-auto hide-scrollbar transition-all duration-500 ease-in-out ${isSidebarOpen ? "lg:pr-[400px]" : ""}`}
        >
          {/* A. 16:9 Video Player Container */}
          <div className="w-full bg-black aspect-video relative shadow-2xl border-b border-white/5">
            <iframe
              src={activeVideo.url}
              title={activeVideo.title}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>

          {/* B. Content Area (Below Video) */}
          <div className="max-w-5xl w-full mx-auto p-6 sm:p-10 pb-24">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                  {activeVideo.title}
                </h2>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MonitorPlay className="w-4 h-4" /> Video Lesson
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {activeVideo.duration}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-slate-300 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-slate-300 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Smooth Animated Tabs */}
            <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto hide-scrollbar">
              {[
                {
                  id: "overview",
                  label: "Overview",
                  icon: <FileText className="w-4 h-4" />,
                },
                {
                  id: "qna",
                  label: "Discussion & Q&A",
                  icon: <MessageSquare className="w-4 h-4" />,
                },
                {
                  id: "downloads",
                  label: "Resources",
                  icon: <Download className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap relative transition-colors ${activeTab === tab.id ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                  {tab.icon} {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="playertab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    ></motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Rendering */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <p className="text-slate-300 leading-relaxed font-medium text-sm md:text-base">
                    {activeVideo.desc ||
                      "In this module, we will explore the core concepts necessary to master this topic. Follow along with the code editor and make sure to download the attached resources."}
                  </p>
                </motion.div>
              )}

              {activeTab === "qna" && (
                <motion.div
                  key="qna"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Search or ask a question..."
                      className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 text-white placeholder-slate-600"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shrink-0 shadow-lg shadow-blue-500/20">
                      Ask Question
                    </button>
                  </div>
                  <div className="space-y-6 pt-6">
                    {/* Mock Q&A Thread */}
                    <div className="border-b border-white/5 pb-6">
                      <div className="flex gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-black text-white text-sm">
                          AS
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">
                            Alex Sharma
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Lecture 1 • 2 days ago
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 mb-4 pl-13">
                        Why do we use `useMemo` here instead of just moving the
                        variable outside the component?
                      </p>
                      <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 pl-13">
                        <MessageSquare className="w-3.5 h-3.5" /> View
                        Instructor Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "downloads" && (
                <motion.div
                  key="downloads"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-blue-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                          Lecture Slide Notes
                        </h4>
                        <p className="text-xs font-medium text-slate-500 mt-1">
                          2.4 MB • PDF Document
                        </p>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT AREA: COURSE CURRICULUM SIDEBAR      */}
        {/* ========================================== */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-full sm:w-[350px] xl:w-[400px] bg-[#111111] border-l border-white/10 flex flex-col z-30 shadow-2xl"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h3 className="font-black text-white text-sm tracking-widest uppercase">
                  Course Folders
                </h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Folders & Videos Accordion */}
              <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
                {courseData.curriculum.map((section) => (
                  <div
                    key={section.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    {/* Folder / Section Header */}
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section.id ? null : section.id,
                        )
                      }
                      className={`w-full flex items-center justify-between p-5 transition-colors text-left ${expandedSection === section.id ? "bg-white/5" : "hover:bg-white/5"}`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1.5">
                          <FolderOpen
                            className={`w-4 h-4 ${expandedSection === section.id ? "text-blue-400" : "text-slate-500"}`}
                          />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {section.videos.length} Videos • {section.totalTime}
                          </p>
                        </div>
                        <h4
                          className={`text-sm font-bold leading-snug ${expandedSection === section.id ? "text-white" : "text-slate-300"}`}
                        >
                          {section.title}
                        </h4>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${expandedSection === section.id ? "rotate-180 text-white" : ""}`}
                      />
                    </button>

                    {/* Videos inside the Folder */}
                    <AnimatePresence>
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[#0A0A0A]"
                        >
                          {section.videos.map((video) => (
                            <div
                              key={video.id}
                              onClick={() => setActiveVideo(video)}
                              className={`flex gap-3 p-4 pl-6 border-b border-white/5 cursor-pointer transition-all ${activeVideo.id === video.id ? "bg-blue-900/20 border-l-2 border-l-blue-500" : "hover:bg-white/5 border-l-2 border-l-transparent"}`}
                            >
                              <div className="shrink-0 mt-0.5">
                                {video.completed ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`text-sm font-bold leading-snug mb-1 ${activeVideo.id === video.id ? "text-blue-400" : "text-slate-300"}`}
                                >
                                  {video.title}
                                </p>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                  <PlayCircle className="w-3.5 h-3.5" />{" "}
                                  {video.duration}
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
