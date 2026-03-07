import React, { useState } from "react";
import {
  Search,
  Star,
  Clock,
  ChevronDown,
  Play,
  BarChart,
  SlidersHorizontal,
  Check,
  Sparkles,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Explore() {
  const navigate = useNavigate();

  // Filter States
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Categories
  const categories = [
    "All",
    "Class 10th Board",
    "Intermediate (10+2)",
    "Degree Programs",
    "Govt. Exams",
    "IT & Software",
  ];

  // Mock Course Database
  const allCourses = [
    {
      id: 1,
      title: "Class 10 Mathematics Mastery (CBSE)",
      category: "Class 10th Board",
      instructor: "Dr. Angela Yu",
      rating: 4.9,
      reviews: "1.2k",
      duration: "45h 30m",
      level: "Beginner",
      price: "₹1,499",
      isFree: false,
      img: "https://images.unsplash.com/photo-1596495578065-6e0763cb1150?auto=format&fit=crop&w=600&q=80",
      tag: "Bestseller",
    },
    {
      id: 2,
      title: "Inter Physics Fundamentals",
      category: "Intermediate (10+2)",
      instructor: "Prof. HC Verma",
      rating: 4.8,
      reviews: "850",
      duration: "60h 15m",
      level: "Intermediate",
      price: "₹1,999",
      isFree: false,
      img: "https://images.unsplash.com/photo-1636466497217-26c8cba09afa?auto=format&fit=crop&w=600&q=80",
      tag: "Highest Rated",
    },
    {
      id: 3,
      title: "B.Tech Computer Science Core",
      category: "Degree Programs",
      instructor: "VSintellecta Premium",
      rating: 4.9,
      reviews: "2.1k",
      duration: "120h 0m",
      level: "Advanced",
      price: "₹2,499",
      isFree: false,
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      tag: "Hot & New",
    },
    {
      id: 4,
      title: "SSC CGL Crack Course 2026",
      category: "Govt. Exams",
      instructor: "Rakesh Yadav",
      rating: 4.7,
      reviews: "3.4k",
      duration: "85h 0m",
      level: "All Levels",
      price: "₹1,299",
      isFree: false,
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      tag: "Trending",
    },
    {
      id: 5,
      title: "English Grammar Basics",
      category: "Class 10th Board",
      instructor: "Neetu Singh",
      rating: 4.6,
      reviews: "500",
      duration: "20h 0m",
      level: "Beginner",
      price: "Free",
      isFree: true,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      tag: "Free",
    },
    {
      id: 6,
      title: "Fullstack Web Development",
      category: "IT & Software",
      instructor: "Colt Steele",
      rating: 4.9,
      reviews: "5.5k",
      duration: "70h 45m",
      level: "All Levels",
      price: "₹3,499",
      isFree: false,
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      tag: "Bestseller",
    },
  ];

  // Smart Filtering Logic
  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      priceFilter === "All"
        ? true
        : priceFilter === "Free"
          ? course.isFree
          : !course.isFree;
    const matchesLevel =
      levelFilter === "All" ? true : course.level === levelFilter;

    return matchesCategory && matchesSearch && matchesPrice && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-800 font-sans selection:bg-blue-200 flex flex-col">
      <Header />

      <section className="relative pt-12 pb-16 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-bold text-blue-300 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" /> Discover Your Path
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Explore our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Universe of Knowledge
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              From foundational board exams to advanced career skills. Find
              exactly what you need to master your future.
            </p>
          </motion.div>

          {/* Massive Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-3xl relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:bg-white/20 sm:text-lg font-bold transition-all shadow-2xl"
              placeholder="What do you want to learn today?"
            />
            <button className="absolute inset-y-2 right-2 bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-full font-bold transition-colors shadow-lg shadow-blue-600/30">
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-12 flex flex-col lg:flex-row gap-8">
        {/* LEFT: Powerful Sticky Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-28 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center gap-2 font-black text-slate-900 mb-6 text-lg border-b border-slate-100 pb-4">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" /> Filters
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                Board & Category
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                Price
              </h3>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {["All", "Free", "Paid"].map((price) => (
                  <button
                    key={price}
                    onClick={() => setPriceFilter(price)}
                    className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${priceFilter === price ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                Difficulty Level
              </h3>
              <div className="space-y-3">
                {["All", "Beginner", "Intermediate", "Advanced"].map(
                  (level) => (
                    <label
                      key={level}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${levelFilter === level ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300 group-hover:border-blue-400"}`}
                      >
                        {levelFilter === level && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${levelFilter === level ? "text-slate-900 font-bold" : "text-slate-600 group-hover:text-slate-900"}`}
                      >
                        {level}
                      </span>
                      <input
                        type="radio"
                        className="hidden"
                        name="level"
                        checked={levelFilter === level}
                        onChange={() => setLevelFilter(level)}
                      />
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT: Course Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "Result" : "Results"} Found
            </h2>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              Sort by: Most Popular <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                No courses found
              </h3>
              <p className="text-slate-500 font-medium">
                Try adjusting your filters or searching for a different keyword.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setPriceFilter("All");
                  setLevelFilter("All");
                  setSearchQuery("");
                }}
                className="mt-6 text-blue-600 font-bold hover:text-blue-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    onClick={() => navigate("/course")}
                    className="bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-2xl border border-slate-200 cursor-pointer group flex flex-col h-full transition-shadow duration-300"
                  >
                    {/* Image Area */}
                    <div
                      className="w-full h-44 rounded-3xl bg-slate-200 relative overflow-hidden mb-4 shadow-inner bg-cover bg-center"
                      style={{ backgroundImage: `url(${course.img})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>

                      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                            {course.tag}
                          </span>
                          {course.isFree && (
                            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                              FREE
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="px-2 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500">
                        <span className="truncate">{course.category}</span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-slate-500 text-sm font-medium mb-4">
                        {course.instructor}
                      </p>

                      {/* Meta stats */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4 mt-auto">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart className="w-3.5 h-3.5" /> {course.level}
                        </span>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />
                          <span className="font-black text-slate-800 text-sm">
                            {course.rating}
                          </span>
                          <span className="text-slate-400 text-xs ml-1">
                            ({course.reviews})
                          </span>
                        </div>
                        <span className="text-xl font-black text-slate-900">
                          {course.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
