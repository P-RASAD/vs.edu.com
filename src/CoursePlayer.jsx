import React, { useState } from "react";
import {
  ChevronLeft,
  PlayCircle,
  CheckCircle,
  Lock,
  MessageSquare,
  FileText,
  Download,
  Star,
  Share2,
  MonitorPlay,
  Zap,
  Layers,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursePlayer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModules, setExpandedModules] = useState(["m1", "m2"]);

  // Mock Course Data
  const courseData = {
    title: "Master React & Next.js Architecture",
    instructor: "Career Guide",
    progress: 35,
    rating: 4.9,
    students: "12,450",
  };

  // Curriculum with videos from @careerguide2763
  const curriculum = [
    {
      id: "m1",
      title: "Phase 1: Architecture",
      duration: "45 min",
      lessons: [
        {
          id: "v1",
          title: "The Mental Model",
          duration: "5:00",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/7AvYL8R7XlI",
        },
        {
          id: "v2",
          title: "Environment Engineering",
          duration: "15:30",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/7AvYL8R7XlI",
        },
      ],
    },
    {
      id: "m2",
      title: "Phase 2: State Mechanics",
      duration: "2 hr 15 min",
      lessons: [
        {
          id: "v4",
          title: "Complex State & Props",
          duration: "25:00",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/7AvYL8R7XlI",
        },
        {
          id: "v5",
          title: "Side Effects & Lifecycles",
          duration: "30:00",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/7AvYL8R7XlI",
        },
      ],
    },
    {
      id: "m3",
      title: "Phase 3: Advanced Patterns",
      duration: "3 hr 40 min",
      locked: true,
      lessons: [
        {
          id: "v7",
          title: "Context API Integration",
          duration: "45:00",
          completed: false,
          videoUrl: "",
        },
        {
          id: "v8",
          title: "Custom Hooks Mastery",
          duration: "55:00",
          completed: false,
          videoUrl: "",
        },
      ],
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(curriculum[1].lessons[0]);

  const toggleModule = (id) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  return (
    <div className="h-screen w-full bg-[#030712] text-slate-300 font-sans overflow-hidden selection:bg-cyan-500/30 relative flex flex-col">
      {/* ========================================== */}
      {/* 1. CINEMATIC AMBIENT BACKGROUND              */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-blue-600/20 rounded-full blur-[150px]"
        ></motion.div>
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-cyan-500/10 rounded-full blur-[150px]"
        ></motion.div>
      </div>

      {/* ========================================== */}
      {/* 2. FLOATING HOLOGRAPHIC COMMAND BAR          */}
      {/* ========================================== */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl h-16 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full z-50 flex items-center justify-between px-2 pr-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <h1 className="text-white font-extrabold text-lg tracking-tight hidden sm:block">
            {courseData.title}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
              {courseData.progress}%{" "}
              <span className="text-slate-500">SYNCED</span>
            </span>
            <div className="w-24 md:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${courseData.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              ></motion.div>
            </div>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors border border-white/10">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </motion.header>

      {/* ========================================== */}
      {/* 3. MAIN ARENA: SPATIAL LAYOUT                */}
      {/* ========================================== */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto pt-28 pb-8 px-4 md:px-8 flex flex-col lg:flex-row gap-8 relative z-10 overflow-hidden">
        {/* LEFT COLUMN: Video Engine & Knowledge Base */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto hide-scrollbar space-y-6 pb-20">
          {/* Ambilight Video Container */}
          <div className="relative group rounded-[2.5rem] p-1">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-cyan-500/20 rounded-[2.5rem] blur-md group-hover:blur-xl transition-all duration-500"></div>

            <div className="w-full aspect-video bg-black rounded-[2.2rem] overflow-hidden relative z-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative"
                >
                  <iframe
                    src={currentVideo.videoUrl}
                    title="Course Video"
                    className="w-full h-full absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Knowledge Base */}
          <div className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 shrink-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-6 overflow-x-auto hide-scrollbar">
              {[
                {
                  id: "overview",
                  label: "Briefing",
                  icon: <MonitorPlay className="w-4 h-4" />,
                },
                {
                  id: "qa",
                  label: "Comms",
                  icon: <MessageSquare className="w-4 h-4" />,
                },
                {
                  id: "resources",
                  label: "Data Modules",
                  icon: <Download className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all relative ${
                    activeTab === tab.id
                      ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                      : "text-slate-500 hover:text-white border border-transparent"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                    <Zap className="w-6 h-6 text-amber-400" /> Current Sector:{" "}
                    {currentVideo.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    This module engages core mechanics and job strategies
                    provided by Career Guide. Ensure your environment is fully
                    synced before executing the build sequence.
                  </p>

                  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4 w-fit pr-8 mt-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      CG
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-0.5">
                        Transmitting From
                      </p>
                      <h4 className="text-white font-bold">
                        {courseData.instructor}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Establish Communications
                  </h3>
                  <p className="text-slate-500 mb-6 text-sm">
                    Open a secure channel to discuss this module with peers.
                  </p>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Start Thread
                  </button>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Career_Map.pdf", size: "2.4 MB" },
                    { name: "Study_Materials.zip", size: "15.1 MB" },
                  ].map((res, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-white/20 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center border border-cyan-500/20">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">
                            {res.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
                            {res.size}
                          </p>
                        </div>
                      </div>
                      <button className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Skill Tree Curriculum */}
        <div className="w-full lg:w-[400px] h-full flex flex-col shrink-0 relative z-10 pb-20">
          <div className="w-full h-full bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-6 flex flex-col relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="mb-6 z-10">
              <h2 className="text-lg font-black text-white uppercase tracking-widest mb-1 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" /> Neural Pathway
              </h2>
              <p className="text-xs text-slate-500 font-bold tracking-wide">
                3 Phases • 6 Synapses
              </p>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar z-10 pr-2">
              <div className="relative border-l-2 border-white/10 ml-4 space-y-8 pb-10">
                {curriculum.map((module, mIdx) => (
                  <div key={module.id} className="relative pl-6">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#030712] border-2 border-slate-600 flex items-center justify-center">
                      {module.locked ? (
                        <Lock className="w-2 h-2 text-slate-500" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      )}
                    </div>

                    <button
                      onClick={() => !module.locked && toggleModule(module.id)}
                      className={`flex flex-col text-left w-full -mt-1.5 mb-4 group ${module.locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <h3
                        className={`text-sm font-black uppercase tracking-wider transition-colors ${expandedModules.includes(module.id) && !module.locked ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
                      >
                        {module.title}
                      </h3>
                      <span className="text-xs text-slate-600 font-bold">
                        {module.duration}
                      </span>
                    </button>

                    <AnimatePresence>
                      {expandedModules.includes(module.id) &&
                        !module.locked && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-2 overflow-hidden"
                          >
                            {module.lessons.map((lesson) => {
                              const isPlaying = currentVideo.id === lesson.id;
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => setCurrentVideo(lesson)}
                                  className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                                    isPlaying
                                      ? "bg-cyan-500/10 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]"
                                      : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]"
                                  }`}
                                >
                                  <div className="shrink-0">
                                    {lesson.completed ? (
                                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    ) : isPlaying ? (
                                      <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                                        <Play className="w-2.5 h-2.5 text-black fill-current ml-0.5" />
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 rounded-full border-2 border-slate-600"></div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-start min-w-0">
                                    <p
                                      className={`text-sm font-bold truncate w-full text-left ${isPlaying ? "text-cyan-400" : "text-slate-300"}`}
                                    >
                                      {lesson.title}
                                    </p>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                      {lesson.duration}
                                    </span>
                                  </div>

                                  {/* Dynamic EQ Audio Bars for currently playing lesson */}
                                  {isPlaying && (
                                    <div className="ml-auto flex gap-0.5 h-3 items-end">
                                      <motion.div
                                        animate={{
                                          height: ["40%", "100%", "40%"],
                                        }}
                                        transition={{
                                          duration: 0.5,
                                          repeat: Infinity,
                                        }}
                                        className="w-1 bg-cyan-400 rounded-full"
                                      ></motion.div>
                                      <motion.div
                                        animate={{
                                          height: ["80%", "30%", "80%"],
                                        }}
                                        transition={{
                                          duration: 0.6,
                                          repeat: Infinity,
                                        }}
                                        className="w-1 bg-cyan-400 rounded-full"
                                      ></motion.div>
                                      <motion.div
                                        animate={{
                                          height: ["50%", "100%", "50%"],
                                        }}
                                        transition={{
                                          duration: 0.4,
                                          repeat: Infinity,
                                        }}
                                        className="w-1 bg-cyan-400 rounded-full"
                                      ></motion.div>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
