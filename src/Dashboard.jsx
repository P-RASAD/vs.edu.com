import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  User,
  Play,
  Star,
  MonitorPlay,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Award,
  Zap,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  // --- 1. HERO CAROUSEL STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Rapid Reporting™ To Your Dashboard",
      desc: "We have the newest and best technology for completing your modules. Your certificates are generated within seconds.",
      bg: "from-emerald-400 to-green-500",
      img: "https://images.unsplash.com/photo-1576091160399-11cb953bfffc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Master React & Next.js Architecture",
      desc: "Build scalable web applications. Join the new batch starting this week and upgrade your frontend skills.",
      bg: "from-blue-500 to-cyan-500",
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Data Science & AI Bootcamp",
      desc: "Learn Python, Machine Learning, and Neural Networks. The most requested skills in the job market today.",
      bg: "from-violet-500 to-purple-600",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Advanced UI/UX Principles",
      desc: "Design interfaces that convert. Master Figma, Prototyping, and user psychology in 30 days.",
      bg: "from-orange-400 to-rose-500",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Cloud Computing Mastery",
      desc: "Deploy seamlessly to AWS, Azure, and Google Cloud. Get certified and boost your professional credibility.",
      bg: "from-teal-400 to-emerald-600",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Auto-advance Hero Carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // --- 2. COURSE CAROUSEL STATE ---
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const categories = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Business",
    "Marketing",
  ];
  const courseScrollRef = useRef(null);

  const courses = [
    {
      id: 1,
      title: "The Complete 2026 Web Development Bootcamp",
      mentor: "Dr. Angela Yu",
      rating: 4.8,
      price: "$14.99",
      tag: "Bestseller",
    },
    {
      id: 2,
      title: "Python for Data Science and Machine Learning",
      mentor: "Jose Portilla",
      rating: 4.7,
      price: "$12.99",
      tag: "Highest Rated",
    },
    {
      id: 3,
      title: "Mastering UI/UX Design with Figma",
      mentor: "Gary Simon",
      rating: 4.9,
      price: "$15.99",
      tag: "Hot & New",
    },
    {
      id: 4,
      title: "The Complete Digital Marketing Course",
      mentor: "Rob Percival",
      rating: 4.6,
      price: "$13.99",
      tag: "Bestseller",
    },
    {
      id: 5,
      title: "Advanced React & Framer Motion",
      mentor: "VSintellecta Mentors",
      rating: 4.9,
      price: "$19.99",
      tag: "Featured",
    },
  ];

  // Auto-scroll the Courses every 3 seconds
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (courseScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          courseScrollRef.current;
        // If we reached the end, snap back to start. Otherwise, scroll right by one card (~320px)
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          courseScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          courseScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(scrollInterval);
  }, [activeCategory]); // Reset interval if they change tabs

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-x-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <MonitorPlay className="w-5 h-5 text-white ml-0.5" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                VS<span className="text-blue-600">intellecta</span>
              </h1>
            </div>
            <div className="hidden lg:flex gap-6 font-semibold text-slate-600 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Categories
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Business
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-full bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                placeholder="Search for any skill..."
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-slate-500 hover:text-blue-600 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-rose-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold cursor-pointer">
              JD
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO CAROUSEL (Announcements & Updates) */}
        <div className="relative w-full overflow-hidden bg-slate-50 h-[500px] md:h-[450px]">
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
                {/* Text Content */}
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

                {/* Organic Blob Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-full md:w-4/8 flex justify-center md:justify-end"
                >
                  <div
                    className="w-65 h-65 md:w-80 md:h-80 bg-cover bg-center shadow-2xl overflow-hidden border-4 border-white/20"
                    style={{
                      backgroundImage: `url('${slides[currentSlide].img}')`,
                      // This creates the organic blob shape!
                      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
                    }}
                  ></div>
                </motion.div>
              </div>

              {/* White SVG Wave at the bottom */}
              <svg
                className="absolute bottom-0 w-full h-16 md:h-24 text-[#F8FAFC]"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
                fill="currentColor"
              >
                <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,122.7C672,96,768,96,864,117.3C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
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

        {/* 2. AUTO-SCROLLING COURSES */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <h3 className="text-3xl font-extrabold text-slate-900 mb-2">
            A broad selection of courses
          </h3>
          <p className="text-slate-500 font-medium mb-8">
            Choose from 100,000 online video courses with new additions
            published every month.
          </p>

          {/* Category Tabs */}
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

          {/* Auto-scrolling Wrapper */}
          <motion.div
            key={activeCategory} // Fades in newly selected category
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
            ref={courseScrollRef}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="min-w-[280px] max-w-[280px] snap-start bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-xl transition-all cursor-pointer group flex flex-col"
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
                    <span className="flex items-center text-amber-600 text-sm font-extrabold">
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

        {/* 3. GLASSY ESSENTIAL SKILLS (Split Layout) */}
        {/* We use a colorful background here so the glass effect actually has something to blur */}
        <div className="relative py-20 bg-slate-900 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[150px]"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
            {/* Left Side: Text */}
            <div className="lg:col-span-1 text-white">
              <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                Learn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">
                  essential
                </span>{" "}
                career and life skills
              </h2>
              <p className="text-slate-300 mb-8 font-medium">
                VSintellecta helps you build in-demand skills fast and advance
                your career in a changing job market.
              </p>
              <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                Explore All Skills <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Side: Glassy Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Generative AI",
                  icon: <Zap className="w-10 h-10 text-amber-400" />,
                },
                {
                  title: "IT Certifications",
                  icon: <Award className="w-10 h-10 text-emerald-400" />,
                },
                {
                  title: "Data Science",
                  icon: <Shield className="w-10 h-10 text-blue-400" />,
                },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col justify-between h-64 group cursor-pointer"
                >
                  <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div className="flex items-center justify-between mt-auto bg-white/5 p-4 rounded-xl border border-white/10 group-hover:bg-white/20 transition-colors">
                    <span className="text-white font-bold">{card.title}</span>
                    <ArrowRight className="w-5 h-5 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
