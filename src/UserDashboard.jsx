import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Star,
  ChevronRight,
  ArrowRight,
  Award,
  Zap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Ace Your Board Exams",
      desc: "Complete syllabus coverage for Class 10 and Intermediate. Access mock tests and revision notes instantly.",
      bg: "from-blue-500 to-cyan-500",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "UPSC Prelims Strategy 2026",
      desc: "Join our live orientation session for General Studies and CSAT. Start your journey to public service.",
      bg: "from-emerald-400 to-green-500",
      img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Master CAT & GMAT",
      desc: "Learn from top percentile scorers. Unlock advanced strategies for Quantitative Aptitude and DILR.",
      bg: "from-violet-500 to-purple-600",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [activeCategory, setActiveCategory] = useState("Web Development");
  const categories = [
    "Primary",
    "Upper Primary",
    "Secondary",
    "Intermediate",
    "Competitive Exams",
  ];
  const courseScrollRef = useRef(null);

  const courses = [
    {
      id: 1,
      title: "Class 10 Mathematics Complete Prep",
      mentor: "Career Guide",
      rating: 4.9,
      price: "₹1,499",
      tag: "Secondary",
    },
    {
      id: 2,
      title: "UPSC General Studies & CSAT",
      mentor: "Career Guide",
      rating: 4.9,
      price: "₹4,999",
      tag: "Competitive",
    },
    {
      id: 3,
      title: "Intermediate 1st Year MPC",
      mentor: "VSintellecta Faculty",
      rating: 4.8,
      price: "₹1,999",
      tag: "Inter",
    },
    {
      id: 4,
      title: "GRE Verbal Reasoning",
      mentor: "Career Guide",
      rating: 4.7,
      price: "₹2,499",
      tag: "Competitive",
    },
  ];

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (courseScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          courseScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          courseScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          courseScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(scrollInterval);
  }, [activeCategory]);

  return (
    <div className="min-h-screen text-slate-800 font-sans overflow-x-hidden" style={{ background: "linear-gradient(160deg,#eaf2ff 0%,#f0f6ff 60%,#e4eeff 100%)" }}>
      <Header />

      <main>
        <div className="relative w-full overflow-hidden bg-slate-50 h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg} text-white flex items-center`}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between w-full relative z-10">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-full md:w-1/2 mb-10 md:mb-0"
                >
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block backdrop-blur-sm">
                    Announcement
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-lg text-white/90 mb-8 max-w-md font-medium">
                    {slides[currentSlide].desc}
                  </p>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-full md:w-5/12 flex justify-center md:justify-end"
                >
                  <div
                    className="w-72 h-72 md:w-86 md:h-86 bg-cover bg-center shadow-2xl overflow-hidden border-4 border-white/20"
                    style={{
                      backgroundImage: `url('${slides[currentSlide].img}')`,
                      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
                    }}
                  ></div>
                </motion.div>
              </div>

              <svg
                className="absolute bottom-[-1px] w-full h-16 md:h-32"
                style={{ color: "#eaf2ff" }}
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
                fill="currentColor"
              >
                <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,122.7C672,96,768,96,864,117.3C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === i ? "bg-blue-600 w-8" : "bg-slate-300"}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <h3 className="text-3xl font-extrabold text-slate-900 mb-2">
            A broad selection of courses
          </h3>
          <p className="text-slate-500 font-medium mb-8">
            Continue your learning journey.
          </p>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar border-b border-slate-200 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-3 text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
            ref={courseScrollRef}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate("/course")}
                className="min-w-[280px] max-w-[280px] snap-start bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
              >
                <div
                  className={`w-full h-40 rounded-xl bg-slate-100 relative overflow-hidden mb-4 flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors"></div>
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="font-extrabold text-lg leading-snug mb-2 text-slate-900 group-hover:text-blue-600 line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium mb-2">
                    {course.mentor}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center text-amber-500 text-sm font-extrabold">
                      {course.rating}{" "}
                      <Star className="w-4 h-4 fill-current ml-1" />
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900">
                      {course.price}
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm">
                      {course.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <section className="relative py-24 bg-gradient-to-b from-sky-50 via-sky-100 to-white overflow-hidden">
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[100px] pointer-events-none"
          ></motion.div>
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, -60, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-200/50 rounded-full blur-[120px] pointer-events-none"
          ></motion.div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
            <div className="lg:col-span-1 text-slate-900">
              <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                Learn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic">
                  essential
                </span>{" "}
                career and life skills
              </h2>
              <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                Build in-demand skills fast and advance your career with
                interactive modules designed for modern learners.
              </p>
              <button className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 hover:border-blue-200 transition-colors flex items-center gap-2 shadow-sm">
                Explore All Skills <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Generative AI",
                  desc: "Master prompt engineering.",
                  icon: <Zap className="w-10 h-10 text-amber-500" />,
                  bg: "from-amber-300 to-orange-400",
                  floatDelay: 0,
                },
                {
                  title: "IT Certifications",
                  desc: "AWS, Azure & Cloud skills.",
                  icon: <Award className="w-10 h-10 text-emerald-500" />,
                  bg: "from-emerald-300 to-teal-400",
                  floatDelay: 1,
                },
                {
                  title: "Data Science",
                  desc: "Python, SQL & Analytics.",
                  icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
                  bg: "from-blue-300 to-indigo-400",
                  floatDelay: 2,
                },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    delay: card.floatDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col h-[320px] group cursor-pointer hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 relative"
                >
                  <div className="absolute top-6 right-6 text-slate-300 group-hover:text-amber-400 group-hover:rotate-180 transition-all duration-700">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${card.bg} rounded-[1.5rem] flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {card.icon}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center text-blue-600 font-bold gap-2 group-hover:gap-3 transition-all">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
