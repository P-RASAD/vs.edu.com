// src/Explore.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  Play,
  Filter,
  ChevronRight,
  ShoppingCart,
  BookOpen,
  Clock,
  BarChart2,
  Loader2,
  Heart,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CourseService, CartService } from "./services/api";
// import { useAuth } from "./context/AuthContext";

const toastOK = {
  borderRadius: "12px",
  background: "#0f172a",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
};
const toastErr = {
  borderRadius: "12px",
  background: "#fff1f2",
  color: "#e11d48",
  fontSize: "13px",
  fontWeight: 600,
  border: "1px solid #fecdd3",
};

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
      GRE: ["Verbal", "Quantitative", "Analytical Writing"],
      GMAT: ["Quant", "Verbal", "Data Insights"],
      CAT: ["VARC", "DILR", "QA"],
      UPSC: ["GS", "CSAT", "Optionals", "State PSC"],
    },
  },
};

export default function Explore() {
  const navigate = useNavigate();
  // const { isLoggedIn } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSub, setActiveSub] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await CourseService.getAllCourses({
          category: activeCategory,
          q: searchQuery,
        });
        setCourses(res.data);
      } catch {
        toast.error("Failed to load courses", { style: toastErr });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory, searchQuery]);

  const filteredCourses = courses.filter((c) => {
    const matchesCat =
      activeCategory === "All" || c.category === activeCategory;
    const matchesSub = activeSub === "All" || c.sub === activeSub;
    const matchesQ =
      !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSub && matchesQ;
  });

  const handleAddToCart = async (course, e) => {
    e.stopPropagation();
    // if (!isLoggedIn) {
    //   toast.error("Please log in to add to cart", { style: toastErr });
    //   navigate("/login");
    //   return;
    // }
    setAddingId(course.id);
    try {
      await CartService.addToCart(course);
      toast.success(`"${course.title}" added to cart 🛒`, { style: toastOK });
    } catch {
      toast.error("Could not add to cart", { style: toastErr });
    } finally {
      setAddingId(null);
    }
  };

  const toggleWishlist = (id) =>
    setWishlist((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const getDynamicSubjects = () => {
    if (activeCategory === "All" || !taxonomy[activeCategory]) return [];
    const s = taxonomy[activeCategory].subjects;
    if (activeCategory === "Competitive Exams" && activeSub !== "All")
      return s[activeSub] || [];
    return Array.isArray(s) ? s : [];
  };

  const tagColors = {
    Bestseller: "bg-amber-100 text-amber-700",
    Trending: "bg-rose-100 text-rose-700",
    Popular: "bg-purple-100 text-purple-700",
    "CBSE/SSC": "bg-blue-100 text-blue-700",
    Comprehensive: "bg-emerald-100 text-emerald-700",
    Hot: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-200 flex flex-col" style={{ background: "linear-gradient(160deg,#eaf2ff 0%,#f0f6ff 60%,#e4eeff 100%)" }}>
      <Header />

      {/* ── Hero search ── */}
      <section className="relative pt-24 pb-14 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[300px] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-slate-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> {courses.length}+
              courses available
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Explore the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Curriculum
              </span>
            </h1>
            <p className="text-slate-400 font-medium text-lg mb-8 max-w-xl mx-auto">
              From Class 1 to UPSC — India's most structured learning catalogue.
            </p>
          </motion.div>

          <div className="w-full max-w-3xl mx-auto relative group">
            <Search className="absolute left-6 top-5 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-16 pr-6 py-4.5 bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/25 font-bold text-base shadow-2xl"
              style={{ paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
              placeholder="Search subjects, exams, or classes..."
            />
          </div>
        </div>
      </section>

      {/* ── Category tabs ── */}
      <div className="border-b border-slate-200 bg-white sticky top-[68px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {["All", ...Object.keys(taxonomy)].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSub("All");
              }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat
                  ? cat === "All"
                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                    : "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main layout ── */}
      <section className="flex-1 max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-[1.75rem] border border-slate-200 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-[140px]">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
              <Filter className="w-4 h-4 text-slate-900" />
              <h2 className="text-base font-black text-slate-900">Filters</h2>
            </div>

            {activeCategory !== "All" && taxonomy[activeCategory] && (
              <>
                <div className="mb-6">
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">
                    Level / Exam
                  </h3>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setActiveSub("All")}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors ${activeSub === "All" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      All {activeCategory}
                    </button>
                    {taxonomy[activeCategory].sub.map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveSub(s)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors ${activeSub === s ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {getDynamicSubjects().length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                      Subjects
                    </h3>
                    <div className="space-y-2.5">
                      {getDynamicSubjects().map((sub) => (
                        <label
                          key={sub}
                          className="flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center group-hover:border-blue-400 transition-colors" />
                          <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">
                            {sub}
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

        {/* Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                {activeSub !== "All"
                  ? activeSub
                  : activeCategory === "All"
                    ? "All"
                    : activeCategory}{" "}
                Courses
              </h2>
              <p className="text-slate-500 font-medium text-sm mt-0.5">
                {loading
                  ? "Loading..."
                  : `${filteredCourses.length} result${filteredCourses.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-400">
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[1.75rem] overflow-hidden border border-slate-200 animate-pulse"
                  >
                    <div className="h-44 bg-slate-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-3 bg-slate-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              <AnimatePresence>
                {filteredCourses.map((course) => (
                  <motion.div
                    layout
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate("/course-detail")}
                    className="bg-white rounded-[1.75rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden bg-slate-200">
                      {course.img ? (
                        <img
                          src={course.img}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {course.tag && (
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${tagColors[course.tag] || "bg-blue-100 text-blue-700"}`}
                          >
                            {course.tag}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(course.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/40 transition-all"
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlist.includes(course.id) ? "text-rose-500 fill-rose-500" : "text-white"}`}
                        />
                      </button>

                      {/* Play hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {course.category && (
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1.5">
                          {course.category}
                        </span>
                      )}
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {course.title}
                      </h4>

                      {course.author && (
                        <p className="text-xs font-medium text-slate-500 mb-3">
                          {course.author}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-3">
                        {course.rating && (
                          <span className="flex items-center gap-1 text-amber-600">
                            <Star className="w-3.5 h-3.5 fill-current" />{" "}
                            {course.rating}
                          </span>
                        )}
                        {course.level && (
                          <span className="flex items-center gap-1">
                            <BarChart2 className="w-3.5 h-3.5" /> {course.level}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-slate-100">
                        <span className="text-xl font-black text-slate-900">
                          {course.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleAddToCart(course, e)}
                          disabled={addingId === course.id}
                          className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl text-white transition-all disabled:opacity-60"
                          style={{
                            background:
                              "linear-gradient(135deg,#2563eb,#0891b2)",
                            boxShadow: "0 3px 12px rgba(37,99,235,0.28)",
                          }}
                        >
                          {addingId === course.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" /> Add to
                              Cart
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredCourses.length === 0 && !loading && (
                <div className="col-span-full flex flex-col items-center py-20 text-center">
                  <BookOpen className="w-14 h-14 text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-600">
                    No courses found
                  </h3>
                  <p className="text-slate-400 font-medium mt-1 text-sm">
                    Try a different search term or category.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </section>
      <Footer />
    </div>
  );
}
