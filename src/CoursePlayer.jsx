import React, { useState } from "react";
import {
  Play,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  FileText,
  MonitorPlay,
  ArrowLeft,
  Share2,
  Lock,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursePlayer() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedModule, setExpandedModule] = useState(1); // Keeps track of which folder is open

  // Fake course curriculum data
  const curriculum = [
    {
      id: 1,
      title: "Module 1: Getting Started",
      duration: "45 mins",
      lessons: [
        {
          id: 101,
          title: "Welcome to the Course",
          time: "5:00",
          type: "video",
          completed: true,
        },
        {
          id: 102,
          title: "Environment Setup (Mac & Windows)",
          time: "15:20",
          type: "video",
          completed: true,
        },
        {
          id: 103,
          title: "Download Course Assets",
          time: "2:00",
          type: "file",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: "Module 2: Core Concepts",
      duration: "1 hr 15 mins",
      lessons: [
        {
          id: 201,
          title: "Understanding the Basics",
          time: "12:45",
          type: "video",
          completed: false,
        },
        {
          id: 202,
          title: "Writing your first lines of code",
          time: "25:30",
          type: "video",
          completed: false,
        },
        {
          id: 203,
          title: "Section Quiz",
          time: "10:00",
          type: "quiz",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Module 3: Advanced Techniques",
      duration: "2 hrs",
      locked: true,
      lessons: [
        {
          id: 301,
          title: "Deep Dive into Frameworks",
          time: "45:00",
          type: "video",
          completed: false,
        },
        {
          id: 302,
          title: "Performance Optimization",
          time: "30:00",
          type: "video",
          completed: false,
        },
      ],
    },
  ];

  const toggleModule = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* 1. DARK MODE HEADER FOR FOCUS */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <div className="hidden md:block h-6 w-px bg-slate-700"></div>
            <h1 className="text-lg font-bold tracking-tight hidden md:block">
              The Complete 2026 Web Development Bootcamp
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-800 px-4 py-1.5 rounded-full">
              <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-xs font-bold text-slate-300">
                30% Complete
              </span>
            </div>
            <button className="text-slate-300 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start">
        {/* 2. LEFT SIDE: VIDEO PLAYER & TABS (Takes up more space) */}
        <div className="w-full lg:flex-1 p-0 lg:p-6">
          {/* Custom Video Player Placeholder */}
          <div className="w-full aspect-video bg-black lg:rounded-2xl relative overflow-hidden group shadow-lg border border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <div className="w-16 h-16 bg-blue-600/90 backdrop-blur-md rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] text-white">
                <Play className="w-8 h-8 ml-1" />
              </div>

              {/* Fake Video Controls */}
              <div className="w-full flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-5 h-5 cursor-pointer" />
                <div className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer relative">
                  <div className="absolute top-0 left-0 h-full w-[45%] bg-blue-500 rounded-full"></div>
                  <div className="absolute top-1/2 left-[45%] transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                </div>
                <span className="text-xs font-medium">12:45 / 25:30</span>
              </div>
            </div>
          </div>

          {/* Video Information & Tabs */}
          <div className="p-6 lg:px-2">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              Writing your first lines of code
            </h2>

            <div className="flex gap-6 border-b border-slate-200 mb-6">
              {["Overview", "Q&A", "Notes", "Announcements"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-slate-600"
              >
                {activeTab === "Overview" && (
                  <div className="space-y-4">
                    <p>
                      In this lesson, we will write our very first lines of
                      React code. We will learn about components, state, and how
                      to structure our files for maximum efficiency.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-4 items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Angela"
                          alt="Instructor"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          Dr. Angela Yu
                        </h4>
                        <p className="text-sm font-medium text-slate-500 mb-2">
                          Lead Instructor, App Brewery
                        </p>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" /> 4.8
                          Instructor Rating
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Q&A" && (
                  <div className="text-center py-10">
                    <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h4 className="font-bold text-slate-900">
                      Have a question?
                    </h4>
                    <p className="text-sm">
                      Search previous questions or ask the community.
                    </p>
                    <button className="mt-4 bg-white border border-slate-300 text-slate-700 font-bold px-4 py-2 rounded-lg hover:bg-slate-50">
                      Ask a Question
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. RIGHT SIDE: COURSE CONTENT ACCORDION */}
        <div className="w-full lg:w-[400px] shrink-0 bg-white border-l border-slate-200 min-h-[calc(100vh-60px)] flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="font-extrabold text-slate-900">Course Content</h3>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {curriculum.map((module) => (
              <div key={module.id} className="border-b border-slate-100">
                {/* Accordion Header */}
                <button
                  onClick={() => !module.locked && toggleModule(module.id)}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${
                    expandedModule === module.id
                      ? "bg-blue-50/50"
                      : "hover:bg-slate-50"
                  } ${module.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex flex-col items-start text-left">
                    <h4
                      className={`font-bold text-sm ${expandedModule === module.id ? "text-blue-700" : "text-slate-800"}`}
                    >
                      {module.title}
                    </h4>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">
                      {module.lessons.length} lectures • {module.duration}
                    </span>
                  </div>
                  {module.locked ? (
                    <Lock className="w-4 h-4 text-slate-400" />
                  ) : expandedModule === module.id ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {/* Accordion Content (Lessons) */}
                <AnimatePresence>
                  {expandedModule === module.id && !module.locked && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white"
                    >
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className="w-full flex items-start gap-3 p-3 pl-6 hover:bg-slate-50 transition-colors group text-left"
                        >
                          {/* Status Icon */}
                          <div className="mt-0.5 shrink-0">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-blue-400"></div>
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1">
                            <h5
                              className={`text-sm ${lesson.id === 202 ? "font-bold text-blue-700" : "font-medium text-slate-700 group-hover:text-slate-900"}`}
                            >
                              {lesson.title}
                            </h5>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                              {lesson.type === "video" && (
                                <Play className="w-3 h-3" />
                              )}
                              {lesson.type === "file" && (
                                <FileText className="w-3 h-3" />
                              )}
                              {lesson.type === "quiz" && (
                                <MessageSquare className="w-3 h-3" />
                              )}
                              {lesson.time}
                            </div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
