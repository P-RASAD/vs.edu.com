import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Star,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  UploadCloud,
  Layers,
  Users,
  Sparkles,
  MonitorPlay,
  Cpu,
  Briefcase,
  MousePointer2,
  Play,
  X,
  Clock,
  BarChart,
  Download,
  ShoppingCart,
  CreditCard,
  LayoutTemplate,
  Lightbulb,
  Presentation,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const marqueeRef = useRef(null);

  // Modal States
  const [activeCourse, setActiveCourse] = useState(null);
  const [activePath, setActivePath] = useState(null);

  useEffect(() => {
    if (activeCourse || activePath) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [activeCourse, activePath]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // FIXED: Added architecture, concepts, and projects back into the objects
  const curatedPaths = [
    {
      title: "Secondary & Intermediate",
      desc: "Class 9 to 12th. Deep dive into MPC, BiPC, Commerce, and Arts for board excellence.",
      time: "200 hours",
      icon: <Layers className="w-10 h-10 text-emerald-500" />,
      bgLeft: "from-emerald-600/30",
      architecture:
        "Class 9-10 Foundations → 11th Core Specialization → 12th Board & Entrance Prep",
      concepts: ["Mathematics", "Physics", "Chemistry", "Biology", "Commerce"],
      projects: ["Lab Simulations", "Previous Year Papers", "Mock Board Exams"],
    },
    {
      title: "Competitive Exams: UPSC",
      desc: "General Studies, CSAT, Options, and State Public Service Commissions (SPSC) Groups 1-4.",
      time: "350 hours",
      icon: <ShieldCheck className="w-10 h-10 text-blue-600/30" />,
      bgLeft: "from-blue-600/30",
      architecture:
        "Prelims (GS + CSAT) → Mains (9 Papers) → Personality Test (Interview)",
      concepts: ["Indian Polity", "Geography", "History", "Economy"],
      projects: [
        "Daily Answer Writing",
        "Current Affairs Analysis",
        "Mock Interviews",
      ],
    },
    {
      title: "Management: CAT & GMAT",
      desc: "Master VARC, DILR, QA, and Data Insights for top business school admissions.",
      time: "180 hours",
      icon: <BookOpen className="w-10 h-10 text-purple-500" />,
      bgLeft: "from-purple-600/30",
      architecture:
        "Concept Building → Speed & Accuracy → Full-length Mock Analysis",
      concepts: [
        "Quantitative Aptitude",
        "Data Interpretation",
        "Logical Reasoning",
        "Verbal Ability",
      ],
      projects: [
        "Sectional Tests",
        "B-School Case Studies",
        "Percentile Predictor",
      ],
    },
    {
      title: "Higher Ed: GRE",
      desc: "Verbal Reasoning, Quantitative Aptitude, and Analytical Writing.",
      time: "150 hours",
      icon: <GraduationCap className="w-10 h-10 text-rose-500" />,
      bgLeft: "from-rose-600/30",
      architecture:
        "Diagnostic Test → Vocabulary & Quant Drills → AWA Practice → Final Mocks",
      concepts: [
        "Text Completion",
        "Sentence Equivalence",
        "Algebra & Geometry",
        "Analytical Writing",
      ],
      projects: [
        "Flashcard Drills",
        "Essay Evaluations",
        "Adaptive Mock Tests",
      ],
    },
  ];

  const carouselCards = [
    {
      id: "c1",
      title: "Class 10 Mathematics Complete Board Prep",
      tag: "Secondary",
      rating: "4.9",
      lectures: "120 Lectures",
      level: "Class 10",
      price: "₹1,499",
      img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
      video: "https://www.youtube.com/embed/7AvYL8R7XlI",
      desc: "Master the complete Class 10 Mathematics syllabus with step-by-step explanations, formulas, and board-level mock tests.",
      notes:
        "Includes PDF revision notes and previous year question paper solutions.",
      curriculum: [
        "Real Numbers & Polynomials",
        "Linear Equations",
        "Quadratic Equations",
        "Trigonometry",
      ],
    },
    {
      id: "c2",
      title: "Intermediate 1st Year MPC Foundation",
      tag: "10+2",
      rating: "4.8",
      lectures: "150 Lectures",
      level: "1st Year",
      price: "₹1,999",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      video: "https://www.youtube.com/embed/Lk6K9BgzpPw",
      desc: "A deep dive into 1st Year Maths, Physics, and Chemistry. Perfect for board exams and building a foundation for JEE.",
      notes:
        "Features interactive lab simulations and daily practice problem sheets.",
      curriculum: [
        "Algebra & Calculus",
        "Kinematics & Dynamics",
        "Atomic Structure",
        "Thermodynamics",
      ],
    },
    {
      id: "c3",
      title: "UPSC General Studies & CSAT",
      tag: "Competitive",
      rating: "4.9",
      lectures: "200 Lectures",
      level: "Advanced",
      price: "₹4,999",
      img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
      video: "https://www.youtube.com/embed/e3dA11TlfnU",
      desc: "The ultimate guide to crack UPSC Prelims. Comprehensive coverage of Indian Polity, History, Geography, and CSAT aptitude.",
      notes:
        "Includes daily current affairs updates and weekly mock test analysis.",
      curriculum: [
        "Indian Polity & Constitution",
        "Modern Indian History",
        "Physical Geography",
        "CSAT: Logical Reasoning",
      ],
    },
    {
      id: "c4",
      title: "CAT VARC & DILR Intensive",
      tag: "Management",
      rating: "4.7",
      lectures: "85 Lectures",
      level: "Graduate",
      price: "₹3,299",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      video: "https://www.youtube.com/embed/zhpcgpqWc1Q",
      desc: "Target 99+ percentile in CAT. Master Verbal Ability, Reading Comprehension, Data Interpretation, and Logical Reasoning.",
      notes: "Includes 50+ full-length mock tests with all-India ranking.",
      curriculum: [
        "Reading Comprehension Strategies",
        "Para Jumbles & Summaries",
        "Complex Data Tables",
        "Seating Arrangements",
      ],
    },
  ];

  useEffect(() => {
    let animationFrameId;
    let scrollPosition = 0;
    const scrollMarquee = () => {
      if (marqueeRef.current) {
        scrollPosition += 0.8;
        if (scrollPosition >= marqueeRef.current.scrollWidth / 2) {
          scrollPosition = 0;
        }
        marqueeRef.current.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scrollMarquee);
    };
    animationFrameId = requestAnimationFrame(scrollMarquee);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-blue-200 overflow-clip">
      <Header />

      {/* COURSE MODAL */}
      <AnimatePresence>
        {activeCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCourse(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl relative p-8 flex flex-col md:flex-row gap-8 border-[6px] border-blue-600"
            >
              <button
                onClick={() => setActiveCourse(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full p-2 z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-[45%] flex flex-col gap-6">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <iframe
                    src={activeCourse.video}
                    title="Course Video"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                  <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Course Features
                  </h3>
                  <p className="text-sm text-blue-800 font-medium leading-relaxed">
                    {activeCourse.notes}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-[55%] flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {activeCourse.tag}
                  </span>
                  <span className="flex items-center text-slate-700 text-sm font-bold">
                    <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />{" "}
                    {activeCourse.rating}
                  </span>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                  {activeCourse.title}
                </h2>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {activeCourse.desc}
                </p>

                <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 mb-8 border-y border-slate-100 py-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />{" "}
                    {activeCourse.lectures}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart className="w-4 h-4 text-slate-400" />{" "}
                    {activeCourse.level}
                  </span>
                  <span className="text-3xl font-black text-slate-900 ml-auto">
                    {activeCourse.price}
                  </span>
                </div>

                <div className="flex gap-4 mt-auto">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors">
                    Login to Enroll <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PATH MODAL */}
      <AnimatePresence>
        {activePath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePath(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl relative p-8 border border-slate-100"
            >
              <button
                onClick={() => setActivePath(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full p-2 z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-slate-100 pb-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${activePath.bgLeft} to-white rounded-2xl flex items-center justify-center shadow-inner border border-slate-100 shrink-0`}
                >
                  {activePath.icon}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-black text-slate-900 mb-2">
                    {activePath.title}
                  </h2>
                  <p className="text-slate-600 font-medium">
                    {activePath.desc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-blue-500" />{" "}
                    Architecture
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {activePath.architecture}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Concepts to
                    Learn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activePath.concepts.map((concept, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded text-[11px] font-bold shadow-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-emerald-500" />{" "}
                    Hands-on Projects
                  </h3>
                  <ul className="space-y-3">
                    {activePath.projects.map((project, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-600 text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-12 lg:pt-12 lg:pb-16 bg-slate-50 border-b border-slate-200/50">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-5xl mx-auto px-6 relative z-10 text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-700 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" /> Education designed
            for your future.
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] text-slate-900">
            Empowering minds. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Transforming futures.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
            From SSC & CBSE board prep to Degree programs and professional
            careers. Accessible, high-quality education built for every student.
          </p>
        </motion.div>

        {/* INFINITE MARQUEE */}
        <div className="relative w-full mt-8 overflow-hidden">
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={marqueeRef}
            className="flex gap-6 overflow-x-hidden whitespace-nowrap py-8 px-4"
            style={{ width: "200%" }}
          >
            {[...carouselCards, ...carouselCards, ...carouselCards].map(
              (card, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setActiveCourse(card)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="inline-flex flex-col min-w-[300px] h-[380px] bg-white rounded-[2rem] p-3 shadow-md hover:shadow-2xl border border-slate-200 cursor-pointer group whitespace-normal transition-shadow duration-300"
                >
                  <div
                    className="w-full h-48 rounded-3xl bg-slate-200 relative overflow-hidden mb-4 shadow-inner flex flex-col justify-end p-4 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.img})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="relative z-10">
                      <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-block mb-2 shadow-sm">
                        {card.tag}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 flex flex-col flex-1">
                    <h4 className="font-extrabold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {card.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {card.lectures}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart className="w-3.5 h-3.5" /> {card.level}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="flex items-center text-slate-700 text-sm font-black">
                        <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />{" "}
                        {card.rating}
                      </span>
                      <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        View Details
                      </div>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CURATED PATHS */}
      <section className="bg-[#0B111A] py-16 border-y border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Popular Curated Learning Paths
              </h3>
              <p className="text-slate-400 font-medium text-lg max-w-2xl">
                Follow a structured, step-by-step path tailored specifically for
                your educational board or career goals.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {curatedPaths.map((path, idx) => (
              <motion.div
                key={idx}
                onClick={() => setActivePath(path)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-white/10 rounded-[1.5rem] overflow-hidden bg-[#161E2D] flex flex-col sm:flex-row group cursor-pointer hover:border-white/20 transition-all shadow-lg hover:shadow-2xl hover:shadow-black/50"
              >
                <div
                  className={`w-full sm:w-[35%] bg-gradient-to-br ${path.bgLeft} to-[#0B111A] flex items-center justify-center p-8 shrink-0 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10">
                    {path.icon}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-white flex items-center justify-between mb-2">
                    {path.title}{" "}
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                  </h4>
                  <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">
                    {path.desc}
                  </p>
                  <div className="mt-auto border-t border-white/10 pt-4">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Estimated time:{" "}
                      <span className="text-blue-400">{path.time}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIBRANT SECTION */}
      <section className="py-16 w-full bg-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Education tailored for you.
            </h3>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Interactive, high-quality content designed to make learning
              engaging rather than a chore.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Video Lectures",
                desc: "Crystal clear explanations by top educators using 3D animations and real-world examples.",
                icon: <MonitorPlay className="w-10 h-10 text-white" />,
                bg: "bg-gradient-to-br from-blue-500 to-cyan-400",
              },
              {
                title: "Interactive Mock Tests",
                desc: "Practice with timed quizzes that simulate real board and competitive exams perfectly.",
                icon: <ShieldCheck className="w-10 h-10 text-white" />,
                bg: "bg-gradient-to-br from-purple-500 to-indigo-400",
              },
              {
                title: "Doubt Solving",
                desc: "Get stuck? Connect with peers and premium mentors in our dedicated community forums.",
                icon: <Users className="w-10 h-10 text-white" />,
                bg: "bg-gradient-to-br from-emerald-400 to-teal-400",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-8 hover:-translate-y-2 hover:bg-white/90 transition-all duration-500 group cursor-pointer"
              >
                <div
                  className={`w-20 h-20 ${item.bg} rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROMISE */}
      <section className="py-16 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Free for learners. <br />
                  <span className="text-blue-400">Powerful for creators.</span>
                </h3>
                <p className="text-lg text-slate-300 mb-8 font-medium leading-relaxed">
                  We believe high-quality education should be accessible to
                  everyone. Foundational materials are free. For professionals
                  and instructors, our Premium plan unlocks the tools to
                  monetize your knowledge globally.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />{" "}
                    Accessible foundational courses for everyone
                  </li>
                  <li className="flex items-center gap-3 text-white font-medium">
                    <MonitorPlay className="w-6 h-6 text-blue-400" /> Seamless
                    streaming on Phones, Tabs & Laptops
                  </li>
                  <li className="flex items-center gap-3 text-white font-medium">
                    <UploadCloud className="w-6 h-6 text-purple-400" /> Premium
                    Admin Panel to upload & sell videos
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-sm aspect-square bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                      Instructor Dashboard
                    </span>
                  </div>
                  <div>
                    <div className="h-2 w-1/3 bg-white/20 rounded-full mb-3"></div>
                    <div className="h-2 w-3/4 bg-white/20 rounded-full mb-6"></div>
                    <h4 className="text-3xl font-black text-white">
                      Upload. Publish. Earn.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
