import React, { useState } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CoursePlayer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sessions");
  const [chatInput, setChatInput] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  // Real CareerGuide Videos
  const courseModules = [
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
  ];

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 400); // Waits for the fade-out animation to finish
  };

  const [currentVideo, setCurrentVideo] = useState(courseModules[0].videos[0]);

  return (
    <div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.98 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-screen w-full bg-[#0B0F19] text-white font-sans overflow-hidden"
    >
      {/* --- TOP HEADER (Matches Screenshot) --- */}
      <header className="h-16 bg-[#050810] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-500" />
            <span className="font-black text-lg tracking-tight">
              <span className="text-cyan-500">VS</span>intellecta
            </span>
          </div>
          <div className="h-6 w-px bg-white/10 hidden md:block"></div>
          <h1 className="text-sm font-bold text-slate-300 hidden md:block truncate max-w-lg">
            Career Guidance Masterclass | Surabhi Dewra
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleClose}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-rose-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* --- MAIN LAYOUT (Video Left, Tabs Right) --- */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT: CINEMATIC VIDEO PLAYER */}
        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar bg-black relative">
          {/* iFrame Container */}
          <div className="w-full aspect-video bg-black relative shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0&modestbranding=1`}
              title="Course Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          {/* Video Details Below */}
          <div className="p-8 max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-md mb-4">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
                Premium Content
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              {currentVideo.title}
            </h2>
            <p className="text-sm font-bold text-slate-400 mb-8 flex items-center gap-2">
              By Surabhi Dewra (CareerGuide){" "}
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>{" "}
              {currentVideo.duration}
            </p>

            {/* Engagement Actions */}
            <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-white/10">
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-sm font-bold transition-colors">
                <ThumbsUp className="w-4 h-4" /> 1.2k
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-sm font-bold transition-colors">
                <Bookmark className="w-4 h-4" /> Save
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-sm font-bold transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="ml-auto w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="mt-8 bg-white/5 border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-black text-white mb-4">
                About this session
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                In this comprehensive session, Surabhi Dewra breaks down the
                exact frameworks needed to analyze and execute your optimal
                career path. You will learn the difference between standard
                degrees and specialized skill-building, how to read market
                trends, and the psychological aspects of decision-making under
                pressure.
                <br />
                <br />
                Make sure to take notes and utilize the AI Chat on the right if
                you need a quick summary or have specific questions about the
                topics discussed!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: TABS & CONTENT AREA (Matches requested layout) */}
        <div className="w-full lg:w-[400px] xl:w-[450px] bg-[#050810] border-l border-white/5 flex flex-col shrink-0 z-10">
          {/* Top Tabs Bar */}
          <div className="flex border-b border-white/10 px-2 pt-2">
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
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 border-b-2 transition-all duration-300 ${activeTab === tab.id ? "border-cyan-500 text-cyan-400" : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"}`}
              >
                {tab.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content Area */}
          <div className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#0B0F19]">
            <AnimatePresence mode="wait">
              {/* --- SESSIONS TAB (Curriculum) --- */}
              {activeTab === "sessions" && (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 space-y-6"
                >
                  {courseModules.map((module) => (
                    <div key={module.id} className="space-y-2">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 mb-3">
                        {module.title}
                      </h4>
                      {module.videos.map((video) => {
                        const isActive = currentVideo.id === video.id;
                        return (
                          <div
                            key={video.id}
                            onClick={() => setCurrentVideo(video)}
                            className={`flex gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${isActive ? "bg-cyan-500/10 border-cyan-500/30" : "bg-white/5 border-transparent hover:bg-white/10"}`}
                          >
                            <div className="mt-1 shrink-0">
                              {video.completed ? (
                                <CheckCircle
                                  className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-emerald-500"}`}
                                />
                              ) : (
                                <PlayCircle
                                  className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-slate-500"}`}
                                />
                              )}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold leading-snug mb-1 ${isActive ? "text-cyan-400" : "text-slate-200"}`}
                              >
                                {video.title}
                              </p>
                              <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                                <Video className="w-3 h-3" /> {video.duration}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              )}

              {/* --- AI CHAT TAB (From your screenshot) --- */}
              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 flex flex-col bg-[#1A1025]"
                >
                  <div className="p-4 bg-purple-900/20 border-b border-purple-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-black text-purple-100">
                        AI Tutor
                      </span>
                    </div>
                    <button className="text-[10px] font-black bg-white text-slate-900 px-3 py-1.5 rounded flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> New Chat
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <MessageSquare className="w-12 h-12 text-slate-700 mb-4" />
                    <h3 className="text-lg font-black text-white mb-1">
                      No messages found
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      Send a message to start the conversation about this video.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0B0F1A] border-t border-white/5">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask Anything..."
                        className="w-full bg-[#1A2035] border border-white/10 rounded-2xl pl-4 pr-12 py-4 text-sm font-medium text-white focus:outline-none focus:border-purple-500"
                      />
                      <button className="absolute right-2 w-10 h-10 bg-white/10 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-colors">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- RESOURCES TAB --- */}
              {activeTab === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="p-4 bg-[#1A1010] border-b border-orange-500/20">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search resources..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="w-12 h-12 text-slate-700 mb-4" />
                    <p className="text-sm font-bold text-slate-400">
                      No resources found.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* --- ASSIGNMENTS TAB --- */}
              {activeTab === "assignments" && (
                <motion.div
                  key="assignments"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                >
                  <PenTool className="w-12 h-12 text-slate-700 mb-4" />
                  <p className="text-sm font-bold text-slate-400">
                    No assignments for this module.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
