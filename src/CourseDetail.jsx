import React, { useState, useEffect } from "react";
import {
  Play,
  Star,
  Clock,
  BarChart,
  CheckCircle,
  MonitorPlay,
  FileText,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function CourseDetail() {
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState(0);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    title: "UPSC General Studies & CSAT Masterclass",
    badge: "Bestseller",
    category: "Competitive Exams",
    rating: "4.9",
    reviews: "1,245",
    students: "14,500+",
    instructor: "Career Guide",
    price: "₹4,999",
    originalPrice: "₹8,999",
    duration: "200 Hours",
    level: "Advanced",
    video: "https://www.youtube.com/embed/e3dA11TlfnU",
    lastUpdated: "March 2026",
    features: [
      "200+ Hours of On-Demand Video",
      "50+ Full-Length Mock Tests",
      "Downloadable PDF Notes",
      "Access on Mobile and Desktop",
      "Certificate of Completion",
    ],
    learnings: [
      "Master Indian Polity and the complete Constitution.",
      "Develop rapid problem-solving skills for CSAT.",
      "Analyze Current Affairs from an administrative perspective.",
      "Understand Physical and Human Geography deeply.",
      "Practice daily answer writing for Mains.",
      "Prepare for the final Personality Test (Interview).",
    ],
    curriculum: [
      {
        title: "Phase 1: Indian Polity & Constitution",
        lessons: 12,
        time: "15 hrs",
      },
      { title: "Phase 2: CSAT Logical Reasoning", lessons: 8, time: "10 hrs" },
      {
        title: "Phase 3: Physical & Human Geography",
        lessons: 15,
        time: "22 hrs",
      },
      { title: "Phase 4: Modern Indian History", lessons: 10, time: "14 hrs" },
      {
        title: "Phase 5: Economy & Current Affairs",
        lessons: 20,
        time: "30 hrs",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] font-sans text-slate-900 selection:bg-blue-200 flex flex-col">
      <Header />

      {/* ========================================== */}
      {/* 1. CINEMATIC HERO SECTION                  */}
      {/* ========================================== */}
      <section className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900 z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12">
          {/* Left Hero Content */}
          <div className="w-full lg:w-[60%]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400 mb-6">
              <span
                className="hover:text-blue-300 cursor-pointer transition-colors"
                onClick={() => navigate("/explore")}
              >
                Explore
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span
                className="hover:text-blue-300 cursor-pointer transition-colors"
                onClick={() => navigate("/explore")}
              >
                {course.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              {course.title}
            </h1>

            <p className="text-lg text-slate-300 font-medium mb-6 leading-relaxed">
              The ultimate guide to crack UPSC Prelims and Mains. Comprehensive
              coverage of Indian Polity, History, Geography, and CSAT aptitude.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-300 mb-6">
              <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-md tracking-wider uppercase text-[11px] font-black">
                {course.badge}
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" /> {course.rating}
              </span>
              <span className="text-slate-400 underline decoration-slate-600 cursor-pointer hover:text-white">
                ({course.reviews} ratings)
              </span>
              <span>{course.students} students</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <span>
                Created by{" "}
                <span className="text-blue-400 font-bold underline decoration-blue-500/30 cursor-pointer">
                  {course.instructor}
                </span>
              </span>
              <span className="w-1 h-1 bg-slate-600 rounded-full mx-2"></span>
              <span>Last updated {course.lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. MAIN CONTENT & FLOATING BUY CARD        */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative flex flex-col lg:flex-row gap-12 w-full">
        {/* Left Content Area */}
        <div className="w-full lg:w-[60%] space-y-12">
          {/* What you'll learn */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              What you'll learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.learnings.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 font-medium text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Accordion */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              Course Content
            </h2>
            <div className="flex items-center justify-between text-sm font-bold text-slate-500 mb-4 px-2">
              <span>
                {course.curriculum.length} Phases • {course.duration} Total
                Length
              </span>
              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                Expand all
              </button>
            </div>

            <div className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
              {course.curriculum.map((module, idx) => (
                <div
                  key={idx}
                  className="border-b border-slate-100 last:border-0"
                >
                  <button
                    onClick={() =>
                      setExpandedModule(expandedModule === idx ? null : idx)
                    }
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedModule === idx ? "rotate-180" : ""}`}
                      />
                      <h3 className="font-extrabold text-slate-900">
                        {module.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 hidden sm:block">
                      {module.lessons} lectures • {module.time}
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedModule === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50"
                      >
                        <div className="p-4 space-y-2">
                          {[1, 2, 3].map((lesson) => (
                            <div
                              key={lesson}
                              className="flex items-center justify-between py-2 px-4 bg-white rounded-xl border border-slate-100 shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <MonitorPlay className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-medium text-slate-700">
                                  Detailed Lesson Video {lesson}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-slate-400">
                                45:00
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Bio */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              Your Instructor
            </h2>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-3xl shadow-lg shrink-0">
                CG
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {course.instructor}
                </h3>
                <p className="text-sm font-bold text-blue-600 mb-3">
                  Premium Educational Partner
                </p>
                <p className="text-slate-600 font-medium text-sm leading-relaxed mb-4">
                  Career Guide is a premier educational institution dedicated to
                  helping students crack the toughest competitive exams in
                  India. With over 10 years of experience, our specialized
                  methodologies ensure high success rates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* Right Sticky Floating Card                 */}
        {/* ========================================== */}
        <div className="w-full lg:w-[35%] lg:-mt-64 z-20">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden sticky top-24">
            {/* Video Preview */}
            <div className="w-full aspect-video bg-slate-900 relative group cursor-pointer border-b border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80"
                alt="Preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center font-bold text-white tracking-widest text-xs uppercase drop-shadow-md">
                Preview this course
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="p-8">
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  {course.price}
                </span>
                <span className="text-lg font-bold text-slate-400 line-through mb-1">
                  {course.originalPrice}
                </span>
                <span className="text-sm font-black text-emerald-600 mb-1.5 ml-1">
                  45% OFF
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                >
                  <CreditCard className="w-5 h-5" /> Buy Now
                </button>
              </div>

              <p className="text-center text-xs font-bold text-slate-500 mb-6 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 7-Day
                Money-Back Guarantee
              </p>

              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm mb-3">
                  This course includes:
                </h4>
                {course.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-slate-600 font-medium"
                  >
                    <MonitorPlay className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-sm font-bold text-slate-600">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Share
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Gift this course
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
