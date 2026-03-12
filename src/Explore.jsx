import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  BookOpen,
  Play,
  Check,
  Filter,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Explore() {
  const navigate = useNavigate();

  // Master Taxonomy based on Handwritten Notes
  const taxonomy = {
    "Primary Education": {
      sub: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
      subjects: ["Mathematics", "Language", "Basic Science", "Other"],
    },
    "Upper Primary": {
      sub: ["Class 6", "Class 7", "Class 8"],
      subjects: [
        "Mathematics",
        "Science",
        "Social Studies",
        "General Knowledge",
        "English",
        "Computer Basics",
        "Other",
      ],
    },
    "Secondary Education": {
      sub: ["Class 9", "Class 10"],
      subjects: [
        "Mathematics",
        "Social Studies",
        "Science",
        "Computer Science",
        "Languages",
        "Other",
      ],
    },
    Intermediate: {
      sub: ["1st Year", "2nd Year"],
      subjects: ["MPC", "BiPC", "Commerce", "Arts", "Other"],
    },
    "Competitive Exams": {
      sub: ["GRE", "GMAT", "CAT", "UPSC"],
      subjects: {
        GRE: [
          "Verbal Reasoning",
          "Quantitative Aptitude",
          "Analytical Writing",
        ],
        GMAT: ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
        CAT: ["VARC", "DILR", "QA"],
        UPSC: [
          "Options",
          "General Studies",
          "CSAT",
          "SPSC (Group 1, 2, 3 & 4)",
        ],
      },
    },
  };

  const [activeCategory, setActiveCategory] = useState("Competitive Exams");
  const [activeSub, setActiveSub] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allCourses = [
    {
      id: 1,
      title: "GRE Quantitative Aptitude Masterclass",
      category: "Competitive Exams",
      sub: "GRE",
      subject: "Quantitative Aptitude",
      rating: "4.9",
      lectures: "45",
      price: "₹2,499",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      tag: "Bestseller",
    },
    {
      id: 2,
      title: "Class 10 Mathematics Complete Board Prep",
      category: "Secondary Education",
      sub: "Class 10",
      subject: "Mathematics",
      rating: "4.8",
      lectures: "120",
      price: "₹1,499",
      img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
      tag: "CBSE/SSC",
    },
    {
      id: 3,
      title: "CAT VARC & DILR Intensive",
      category: "Competitive Exams",
      sub: "CAT",
      subject: "VARC",
      rating: "4.9",
      lectures: "85",
      price: "₹3,299",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      tag: "Trending",
    },
    {
      id: 4,
      title: "Intermediate 1st Year MPC Foundation",
      category: "Intermediate",
      sub: "1st Year",
      subject: "MPC",
      rating: "4.7",
      lectures: "90",
      price: "₹1,999",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      tag: "Hot",
    },
    {
      id: 5,
      title: "UPSC General Studies & CSAT",
      category: "Competitive Exams",
      sub: "UPSC",
      subject: "General Studies",
      rating: "4.9",
      lectures: "200",
      price: "₹4,999",
      img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
      tag: "Comprehensive",
    },
    {
      id: 6,
      title: "Upper Primary Computer Basics",
      category: "Upper Primary",
      sub: "Class 8",
      subject: "Computer Basics",
      rating: "4.6",
      lectures: "30",
      price: "₹999",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      tag: "Beginner",
    },
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesCat =
      activeCategory === "All" || course.category === activeCategory;
    const matchesSub = activeSub === "All" || course.sub === activeSub;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSub && matchesSearch;
  });

  // Get dynamic subjects based on selection
  const getDynamicSubjects = () => {
    if (activeCategory === "All") return [];
    if (activeCategory === "Competitive Exams" && activeSub !== "All") {
      return taxonomy[activeCategory].subjects[activeSub] || [];
    }
    return Array.isArray(taxonomy[activeCategory].subjects)
      ? taxonomy[activeCategory].subjects
      : [];
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      <Header />

      {/* 1. HERO SEARCH */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Explore the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Curriculum
              </span>
            </h1>
          </motion.div>

          <div className="w-full max-w-3xl relative group mt-6">
            <Search className="absolute left-6 top-5 h-6 w-6 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-bold shadow-2xl"
              placeholder="Search for subjects, exams, or classes..."
            />
          </div>
        </div>
      </section>

      {/* 2. TOP LEVEL CATEGORIES */}
      <div className="border-b border-slate-200 bg-white sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => {
              setActiveCategory("All");
              setActiveSub("All");
            }}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeCategory === "All" ? "bg-slate-900 border-slate-900 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            All
          </button>
          {Object.keys(taxonomy).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setActiveSub("All");
              }}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeCategory === category ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN CATALOG ARENA */}
      <section className="flex-1 max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 w-full relative">
        {/* SMART FILTER SIDEBAR */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-[160px]">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <Filter className="w-5 h-5 text-slate-900" />
              <h2 className="text-xl font-black text-slate-900">Filters</h2>
            </div>

            {activeCategory !== "All" && (
              <>
                {/* SUB-CATEGORY (Classes / Exams) */}
                <div className="mb-8">
                  <h3 className="text-sm font-extrabold text-blue-600 uppercase tracking-widest mb-4">
                    Select Level / Exam
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveSub("All")}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors ${activeSub === "All" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      All {activeCategory}
                    </button>
                    {taxonomy[activeCategory].sub.map((subItem) => (
                      <button
                        key={subItem}
                        onClick={() => setActiveSub(subItem)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors ${activeSub === subItem ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DYNAMIC SUBJECTS */}
                {getDynamicSubjects().length > 0 && (
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">
                      Subjects
                    </h3>
                    <div className="space-y-3">
                      {getDynamicSubjects().map((subject) => (
                        <label
                          key={subject}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="w-5 h-5 rounded-md border border-slate-300 flex items-center justify-center group-hover:border-blue-400 transition-colors"></div>
                          <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">
                            {subject}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>

        {/* GRID */}
        <main className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {activeSub !== "All" ? activeSub : activeCategory} Courses
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                Showing {filteredCourses.length} results
              </p>
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={course.id}
                  onClick={() => navigate("/course-detail")}
                  className="bg-white rounded-[2rem] p-3 shadow-md border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div
                    className="w-full h-44 rounded-3xl relative overflow-hidden mb-4 shadow-inner flex flex-col justify-end p-4 bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.img})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="relative z-10 flex justify-between items-end">
                      <span className="bg-blue-600 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        {course.tag}
                      </span>
                    </div>
                  </div>
                  <div className="px-3 flex flex-col flex-1 pb-2">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
                      {course.subject}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-600 line-clamp-2">
                      {course.title}
                    </h4>
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="flex items-center text-slate-700 text-sm font-black">
                        <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />{" "}
                        {course.rating}
                      </span>
                      <span className="text-lg font-black text-slate-900">
                        {course.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </section>
      <Footer />
    </div>
  );
}
