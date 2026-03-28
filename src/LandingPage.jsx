// src/LandingPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
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
  Play,
  X,
  Clock,
  BarChart,
  ShoppingCart,
  LayoutTemplate,
  Lightbulb,
  Presentation,
  Quote,
  TrendingUp,
  Award,
  Zap,
  Target,
  Globe,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const fadeUpStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};
const fadeUpChild = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────
//  EXACT AnoAI SHADER — from minhxthanh/animated-shader-background
//  Stacking: section > [canvas z:0] [overlay z:1] [content z:2]
// ─────────────────────────────────────────────────────────────────
function AnoAIBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Position canvas absolutely inside the container
    const canvas = renderer.domElement;
    canvas.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;display:block;z-index:0;";
    container.appendChild(canvas);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      // ── Exact shader from 21st.dev/r/minhxthanh/animated-shader-background ──
      fragmentShader: `
        uniform float iTime;
        uniform vec2  iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u  = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          float res = mix(
            mix(rand(ip),              rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0,1.0)), rand(ip + vec2(1.0,1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2  shift = vec2(100.0);
          mat2  rot   = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x  = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(
            sin(iTime * 1.2) * 0.005,
            cos(iTime * 2.1) * 0.005
          );

          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5)
                   / iResolution.y
                   * mat2(6.0, -4.0, 4.0, 6.0);

          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 35.0; i++) {
            v = p
              + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5
              + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);

            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));

            vec4 auroraColors = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
              0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );

            vec4 contribution = auroraColors
              * exp(sin(i * i + iTime * 0.8))
              / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));

            float thin = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
            o += contribution * (1.0 + tailNoise * 0.8) * thin;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));

          // Multiply by 1.5 (original) then darken to 60% so text is legible
          gl_FragColor = o * 1.5 * 0.60;
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    let frameId;
    const animate = () => {
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(canvas)) container.removeChild(canvas);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}
    />
  );
}

// ─────────────────────────────────────────────
// TESTIMONIAL CARD
// ─────────────────────────────────────────────
function TestimonialCard({ testimonial }) {
  const { name, role, rating = 5, tag, content, result } = testimonial;
  return (
    <motion.div
      variants={fadeUpChild}
      className="break-inside-avoid bg-white border border-slate-200/80 rounded-[1.75rem] p-6 shadow-sm hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-400 group relative overflow-hidden mb-5"
    >
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-400/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
        ))}
        {tag && (
          <span className="ml-auto bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-blue-100">
            {tag}
          </span>
        )}
      </div>
      <Quote className="w-5 h-5 text-slate-200 mb-1.5" />
      <p className="text-slate-700 font-medium leading-relaxed text-sm mb-4">
        {content}
      </p>
      {result && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-4 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-emerald-800 text-[11px] font-bold">
            {result}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm leading-tight">
            {name}
          </p>
          <p className="text-slate-500 text-[11px] font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// FAQ ITEM
// ─────────────────────────────────────────────
function FaqItem({ q, a, isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isOpen
          ? "border-blue-500/40 bg-[#0d1a2d]"
          : "border-white/[0.08] bg-[#0d1520] hover:border-white/[0.15]"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <span
          className={`font-semibold text-[14px] leading-snug transition-colors ${isOpen ? "text-white" : "text-slate-300"}`}
        >
          {q}
        </span>
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-blue-600 text-white" : "bg-white/[0.08] text-slate-400"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3 h-3" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-5 text-slate-400 font-medium text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// CAROUSEL — arrows + hover-to-pause
// ─────────────────────────────────────────────
function CourseCarousel({ cards, onCardClick }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const fidRef = useRef(null);
  const CARD_W = 296; // min-width of each card + gap
  const SPEED = 0.7;

  const scroll = useCallback(() => {
    if (!trackRef.current) return;
    if (!pausedRef.current) {
      posRef.current += SPEED;
      const half = trackRef.current.scrollWidth / 2;
      if (posRef.current >= half) posRef.current = 0;
      trackRef.current.scrollLeft = posRef.current;
    }
  }, []);

  useEffect(() => {
  fidRef.current = requestAnimationFrame(scroll);
  
  return () => {
    cancelAnimationFrame(fidRef.current);
  };
  }, [scroll]);
  
  useEffect(() => {
    fidRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(fidRef.current);
  }, [scroll]);

  const step = (dir) => {
    posRef.current += dir * CARD_W;
    if (trackRef.current) trackRef.current.scrollLeft = posRef.current;
  };

  return (
    <div className="relative w-full">
      {/* Left arrow */}
      <button
        onClick={() => step(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 group"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => step(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 group"
      >
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
      </button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div
        ref={trackRef}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        className="flex gap-5 overflow-x-hidden whitespace-nowrap py-6 px-14"
        style={{ scrollBehavior: "auto" }}
      >
        {[...cards, ...cards, ...cards].map((card, idx) => (
          <div
            key={idx}
            onClick={() => onCardClick(card)}
            className="inline-flex flex-col min-w-[272px] max-w-[272px] bg-white rounded-[1.75rem] p-3 shadow-md hover:shadow-xl border border-slate-200 cursor-pointer group whitespace-normal transition-all duration-300 hover:-translate-y-2"
          >
            {/* Thumbnail */}
            <div
              className="w-full h-40 rounded-2xl bg-slate-200 relative overflow-hidden mb-3 bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/35">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2.5 left-2.5 z-10">
                <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {card.tag}
                </span>
              </div>
              {/* Price badge top-right */}
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded-lg">
                  {card.price}
                </span>
              </div>
            </div>

            <div className="px-1 flex flex-col flex-1">
              <h4 className="font-bold text-slate-900 text-[13px] leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {card.title}
              </h4>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {card.lectures}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart className="w-3 h-3" />
                  {card.level}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className="flex items-center text-slate-700 text-xs font-black">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current mr-1" />
                  {card.rating}
                </span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  View Details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const curatedPaths = [
  {
    title: "Secondary & Intermediate",
    desc: "Class 9–12. MPC, BiPC, Commerce, Arts — engineered to dominate board exams and unlock India's best colleges.",
    time: "200 hrs",
    icon: <Layers className="w-9 h-9 text-emerald-400" />,
    bgLeft: "from-emerald-600/30",
    architecture:
      "Class 9-10 Foundations → 11th Core Specialization → 12th Board & Entrance Prep",
    concepts: ["Mathematics", "Physics", "Chemistry", "Biology", "Commerce"],
    projects: ["Lab Simulations", "Previous Year Papers", "Mock Board Exams"],
  },
  {
    title: "Competitive Exams: UPSC",
    desc: "India's toughest exam, cracked methodically. GS, CSAT, Optional subjects, and State PSC Groups 1–4.",
    time: "350 hrs",
    icon: <ShieldCheck className="w-9 h-9 text-blue-400" />,
    bgLeft: "from-blue-600/30",
    architecture: "Prelims (GS + CSAT) → Mains (9 Papers) → Personality Test",
    concepts: ["Indian Polity", "Geography", "History", "Economy"],
    projects: [
      "Daily Answer Writing",
      "Current Affairs Analysis",
      "Mock Interviews",
    ],
  },
  {
    title: "Management: CAT & GMAT",
    desc: "Your gateway to the IIMs. Master VARC, DILR, QA, and Data Insights with India's top CAT faculty.",
    time: "180 hrs",
    icon: <BookOpen className="w-9 h-9 text-purple-400" />,
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
    title: "Higher Ed: GRE & IELTS",
    desc: "Study abroad, redefined. Verbal Reasoning, Quant, Analytical Writing, and English proficiency.",
    time: "150 hrs",
    icon: <GraduationCap className="w-9 h-9 text-rose-400" />,
    bgLeft: "from-rose-600/30",
    architecture:
      "Diagnostic → Vocab & Quant Drills → AWA Practice → Final Mocks",
    concepts: [
      "Text Completion",
      "Sentence Equivalence",
      "Algebra & Geometry",
      "Analytical Writing",
    ],
    projects: ["Flashcard Drills", "Essay Evaluations", "Adaptive Mock Tests"],
  },
];

const carouselCards = [
  {
    id: "c1",
    title: "Class 10 Mathematics — Complete Board Mastery",
    tag: "Secondary",
    rating: "4.9",
    lectures: "120 Lectures",
    level: "Class 10",
    price: "₹1,499",
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/7AvYL8R7XlI",
    desc: "Master the complete Class 10 Mathematics syllabus with step-by-step explanations and board-level mock tests.",
    notes: "Includes PDF revision notes and previous year paper solutions.",
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
    desc: "Deep dive into 1st Year Maths, Physics, and Chemistry — the strongest foundation for JEE, NEET, and boards.",
    notes: "Interactive lab simulations and daily practice sheets.",
    curriculum: [
      "Algebra & Calculus",
      "Kinematics & Dynamics",
      "Atomic Structure",
      "Thermodynamics",
    ],
  },
  {
    id: "c3",
    title: "UPSC General Studies & CSAT — Prelims Powerpack",
    tag: "Competitive",
    rating: "4.9",
    lectures: "200 Lectures",
    level: "Advanced",
    price: "₹4,999",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/e3dA11TlfnU",
    desc: "The definitive UPSC Prelims guide. Polity, History, Geography, Environment, and CSAT by rank-holders.",
    notes: "Daily current affairs updates and weekly mock test analysis.",
    curriculum: [
      "Indian Polity & Constitution",
      "Modern Indian History",
      "Physical Geography",
      "CSAT: Logical Reasoning",
    ],
  },
  {
    id: "c4",
    title: "CAT VARC & DILR — 99 Percentile Intensive",
    tag: "Management",
    rating: "4.7",
    lectures: "85 Lectures",
    level: "Graduate",
    price: "₹3,299",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/zhpcgpqWc1Q",
    desc: "Target 99+ percentile. RC, Data Interpretation, and Logical Reasoning with India's most trusted CAT faculty.",
    notes: "50+ full-length mock tests with all-India ranking.",
    curriculum: [
      "RC Strategies",
      "Para Jumbles & Summaries",
      "Complex Data Tables",
      "Seating Arrangements",
    ],
  },
  {
    id: "c5",
    title: "Class 12 Physics — JEE & Board Complete Prep",
    tag: "Secondary",
    rating: "4.8",
    lectures: "180 Lectures",
    level: "Class 12",
    price: "₹2,499",
    img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/7AvYL8R7XlI",
    desc: "Complete Class 12 Physics from basics to JEE Advanced level. Electrostatics, Optics, Modern Physics and more.",
    notes: "Chapter-wise solved examples and JEE previous year questions.",
    curriculum: [
      "Electrostatics",
      "Current Electricity",
      "Optics",
      "Modern Physics",
    ],
  },
  {
    id: "c6",
    title: "GRE Verbal & Quant — 320+ Score System",
    tag: "Higher Ed",
    rating: "4.6",
    lectures: "90 Lectures",
    level: "Graduate",
    price: "₹2,999",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/zhpcgpqWc1Q",
    desc: "Systematic GRE prep with vocabulary, RC strategies, and quant shortcuts for a 320+ score.",
    notes: "3000+ word flashcard system and 10 full-length adaptive tests.",
    curriculum: [
      "Text Completion",
      "RC Strategies",
      "Algebra & Geometry",
      "Data Analysis",
    ],
  },
];

const testimonials = [
  {
    name: "Venkata Ramaiah",
    role: "Class 12 MPC, Vijayawada",
    rating: 5,
    tag: "Secondary",
    content:
      "VSintellecta transformed how I study. Physics animations made Kinematics click in 20 minutes — something my coaching couldn't do in 3 months. Scored 97 in boards.",
    result: "97/100 in Physics Board Exam",
  },
  {
    name: "Priya Suresh",
    role: "UPSC Aspirant, Hyderabad",
    rating: 5,
    tag: "UPSC",
    content:
      "The GS modules are structured like no other platform. Daily answer writing feedback and current affairs integration saved me 6 months of scattered prep.",
    result: "Cleared UPSC Prelims 2024",
  },
  {
    name: "Ravi Shankar Yadav",
    role: "CAT Aspirant, Lucknow",
    rating: 5,
    tag: "CAT",
    content:
      "Went from 78 percentile to 97.4 in 4 months using the DILR modules. The mock analysis tools are elite — they show exactly where you're bleeding marks.",
    result: "CAT Score: 97.4 Percentile",
  },
  {
    name: "Surabhi Nair",
    role: "Tutor — Class 10 Maths, Kerala",
    rating: 5,
    tag: "Tutor",
    content:
      "The admin panel is a dream. Uploaded my entire course in one weekend, set my own pricing, and started receiving enrollments by Monday morning.",
    result: "₹1.2L earned in first month",
  },
  {
    name: "Arjun Reddy",
    role: "Class 11 BiPC, Guntur",
    rating: 5,
    tag: "Secondary",
    content:
      "Biology on VSintellecta is genuinely different. 3D cell diagrams and NEET-pattern MCQs after every chapter. My NEET mock scores jumped 80 marks in 6 weeks.",
    result: "+80 Marks in NEET Mocks",
  },
  {
    name: "Mohit Sharma",
    role: "Tutor — UPSC GS, Delhi",
    rating: 5,
    tag: "Tutor",
    content:
      "11 years of teaching and this platform gives tools offline institutes can't match — live polls, PDF bundles, doubt queues. My students' results speak for themselves.",
    result: "4 students cleared Mains 2024",
  },
];

const faqs = [
  {
    q: "Is VSintellecta free to use?",
    a: "Yes. Foundational content across all subjects is completely free. Premium courses with live doubt sessions, full-length mocks, and downloadable PDFs require a one-time purchase — no subscriptions.",
  },
  {
    q: "Which boards and exams does VSintellecta cover?",
    a: "CBSE, ICSE, AP & Telangana State Boards (Class 9–12), JEE, NEET, UPSC (GS + Optionals + State PSC Groups 1–4), CAT, GMAT, GRE, and IELTS. New programs added every quarter.",
  },
  {
    q: "How is the content different from other platforms?",
    a: "Every module is created or vetted by exam rank-holders. We use 3D animations, adaptive quizzes, and real exam-pattern simulations — not generic slide decks or re-uploaded YouTube videos.",
  },
  {
    q: "Can I become an educator on VSintellecta?",
    a: "Yes. Apply for a Tutor account, upload courses via our admin panel, set your own pricing, and start earning. Content goes live after a quality review — usually within 48 hours.",
  },
  {
    q: "Is the content available offline?",
    a: "Premium subscribers can download PDFs, notes, and exercise sheets. Video streams adaptively based on your connection speed and is optimised for mobile data.",
  },
  {
    q: "How do doubt sessions work?",
    a: "Every course has a structured doubt queue. Post your question and a subject mentor responds within 24 hours. Premium learners also access live weekly doubt-clearing sessions.",
  },
  {
    q: "What payment methods are accepted?",
    a: "UPI, Net Banking, Debit/Credit Cards, and EMI options through major Indian banks. All transactions are secured through PCI-DSS compliant gateways.",
  },
];

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.body.style.overflow =
      activeCourse || activePath ? "hidden" : "auto";
  }, [activeCourse, activePath]);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-blue-200 overflow-clip">
      <Header />

      {/* ══ COURSE MODAL ══ */}
      <AnimatePresence>
        {activeCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCourse(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 16, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl relative p-7 flex flex-col md:flex-row gap-7 border-4 border-blue-600"
            >
              <button
                onClick={() => setActiveCourse(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full p-1.5 z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-full md:w-[45%] flex flex-col gap-4">
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow border border-slate-200">
                  <iframe
                    src={activeCourse.video}
                    title="Course Video"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl">
                  <h3 className="text-xs font-bold text-blue-900 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Course Features
                  </h3>
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">
                    {activeCourse.notes}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-[55%] flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {activeCourse.tag}
                  </span>
                  <span className="flex items-center text-slate-700 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current mr-1" />
                    {activeCourse.rating}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                  {activeCourse.title}
                </h2>
                <p className="text-slate-600 font-medium leading-relaxed text-sm mb-5">
                  {activeCourse.desc}
                </p>
                <div className="flex items-center gap-5 text-xs font-semibold text-slate-500 mb-6 border-y border-slate-100 py-3">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {activeCourse.lectures}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart className="w-3.5 h-3.5 text-slate-400" />
                    {activeCourse.level}
                  </span>
                  <span className="text-2xl font-black text-slate-900 ml-auto">
                    {activeCourse.price}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Curriculum
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCourse.curriculum.map((c, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 text-sm"
                >
                  Login to Enroll <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ PATH MODAL ══ */}
      <AnimatePresence>
        {activePath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePath(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 16, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl relative p-7 border border-slate-100"
            >
              <button
                onClick={() => setActivePath(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full p-1.5 z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 border-b border-slate-100 pb-5">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${activePath.bgLeft} to-white rounded-xl flex items-center justify-center shadow-inner border border-slate-100 shrink-0`}
                >
                  {activePath.icon}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-black text-slate-900 mb-1">
                    {activePath.title}
                  </h2>
                  <p className="text-slate-600 font-medium text-sm">
                    {activePath.desc}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                  <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <LayoutTemplate className="w-3.5 h-3.5 text-blue-500" />{" "}
                    Architecture
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {activePath.architecture}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                  <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />{" "}
                    Concepts
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activePath.concepts.map((c, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                  <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Presentation className="w-3.5 h-3.5 text-emerald-500" />{" "}
                    Projects
                  </h3>
                  <ul className="space-y-2">
                    {activePath.projects.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-slate-600 text-xs font-medium"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════
          § 1  HERO  —  AnoAI Shader + Premium Layout
          z-stack: [shader z:0] [overlay z:1] [content z:2]
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#02060e",
        }}
      >
        <AnoAIBackground />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(2,6,14,0.55) 0%, rgba(2,6,14,0.08) 25%, rgba(2,6,14,0.08) 75%, rgba(2,6,14,0.72) 100%)",
          }}
        />

        {/* ── Hero content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpStagger}
          style={{ position: "relative", zIndex: 2 }}
          className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* LEFT — Text */}
          <div>
            {/* Badge */}
            <motion.div variants={fadeUpChild} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-semibold text-slate-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.14)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                India's most structured learning platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpChild}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5 text-white"
              style={{ fontFamily: "'Sora','DM Sans',system-ui,sans-serif" }}
            >
              Where ambition
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#60a5fa 0%,#38bdf8 45%,#2dd4bf 100%)",
                }}
              >
                meets a system.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUpChild}
              className="text-base text-slate-400 font-medium max-w-lg leading-relaxed mb-8"
            >
              From Class 9 board prep to UPSC, CAT & global university
              admissions — the infrastructure India's most serious students
              trust.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={fadeUpChild}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("courses-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl shadow-blue-700/30 transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2"
              >
                Browse Courses <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUpChild} className="flex flex-wrap gap-6">
              {[
                { v: "1.8M+", l: "Learners" },
                { v: "340+", l: "Courses" },
                { v: "12K+", l: "Toppers" },
                { v: "800+", l: "UPSC Clears" },
              ].map((s, i) => (
                <div key={i}>
                  <p
                    className="text-2xl font-black text-white leading-none"
                    style={{ fontFamily: "'Sora',system-ui" }}
                  >
                    {s.v}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {s.l}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Floating course preview card */}
          <motion.div
            variants={fadeUpChild}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Main glassy card */}
            <div
              className="rounded-[2rem] border p-6 backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <MonitorPlay className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Live right now</p>
                  <p className="text-slate-400 text-xs">
                    UPSC GS — Polity Module 4
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />{" "}
                  LIVE
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full mb-1">
                <div className="h-full w-[62%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>Module 4 of 12</span>
                <span>62% complete</span>
              </div>
            </div>

            {/* Mini cards row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Mock Tests",
                  val: "1,240 taken today",
                  icon: <Target className="w-4 h-4 text-blue-400" />,
                  col: "from-blue-600/20",
                },
                {
                  label: "Doubt Queue",
                  val: "avg 18 min reply",
                  icon: <Users className="w-4 h-4 text-emerald-400" />,
                  col: "from-emerald-600/20",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-4 backdrop-blur-xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.10)",
                  }}
                >
                  <div className="mb-2">{c.icon}</div>
                  <p className="text-white text-xs font-bold leading-tight">
                    {c.label}
                  </p>
                  <p className="text-slate-500 text-[10px] font-medium mt-0.5">
                    {c.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Learner avatars */}
            <div className="flex items-center gap-3 px-1">
              <div className="flex -space-x-2">
                {["V", "P", "R", "A", "M"].map((l, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 border-2 border-[#02060e] flex items-center justify-center text-white text-[10px] font-black"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs font-medium">
                <span className="text-white font-bold">4,200+</span> learners
                active now
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
          className="text-slate-600"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          § 2  COURSE CAROUSEL
      ════════════════════════════════════════ */}
      <section
        id="courses-section"
        className="relative bg-slate-50 border-b border-slate-200/60 py-14"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpStagger}
          className="max-w-6xl mx-auto px-6 flex items-end justify-between mb-8"
        >
          <div>
            <motion.p
              variants={fadeUpChild}
              className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1"
            >
              Featured Courses
            </motion.p>
            <motion.h2
              variants={fadeUpChild}
              className="text-2xl md:text-3xl font-extrabold text-slate-900"
            >
              Learn from India's best educators
            </motion.h2>
          </div>
          <motion.button
            variants={fadeUpChild}
            onClick={() => navigate("/login")}
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <CourseCarousel cards={carouselCards} onCardClick={setActiveCourse} />
      </section>

      {/* ════════════════════════════════════════
          § 3  CURATED PATHS (dark)
      ════════════════════════════════════════ */}
      <section className="bg-[#0B111A] py-16 border-y border-white/5 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-[90px] pointer-events-none"
          style={{ background: "rgba(37,99,235,0.09)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpStagger}
            className="mb-10"
          >
            <motion.p
              variants={fadeUpChild}
              className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2"
            >
              Learning Paths
            </motion.p>
            <motion.h2
              variants={fadeUpChild}
              className="text-2xl md:text-3xl font-extrabold text-white mb-2"
            >
              Structured paths to every goal
            </motion.h2>
            <motion.p
              variants={fadeUpChild}
              className="text-slate-400 font-medium text-base max-w-xl"
            >
              Complete learning architectures for board toppers, civil servants,
              and management leaders.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpStagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            {curatedPaths.map((path, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpChild}
                onClick={() => setActivePath(path)}
                className="border border-white/10 rounded-[1.25rem] overflow-hidden bg-[#161E2D] flex flex-col sm:flex-row group cursor-pointer hover:border-white/20 transition-all shadow-md hover:shadow-xl hover:shadow-black/40"
              >
                <div
                  className={`w-full sm:w-[30%] bg-gradient-to-br ${path.bgLeft} to-[#0B111A] flex items-center justify-center p-6 shrink-0 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10">
                    {path.icon}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <h4 className="text-base font-bold text-white flex items-center justify-between mb-1.5">
                    {path.title}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
                    {path.desc}
                  </p>
                  <div className="mt-auto border-t border-white/10 pt-3">
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Est. time:{" "}
                      <span className="text-blue-400">{path.time}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 4  FEATURES
      ════════════════════════════════════════ */}
      <section className="py-16 bg-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpStagger}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUpChild}
              className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2"
            >
              Why VSintellecta
            </motion.p>
            <motion.h2
              variants={fadeUpChild}
              className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3"
            >
              Learning that actually works.
            </motion.h2>
            <motion.p
              variants={fadeUpChild}
              className="text-base text-slate-500 font-medium max-w-xl mx-auto"
            >
              Built by rank-holders and veteran educators — every feature
              engineered for results.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpStagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Smart Video Lectures",
                desc: "3D animations, worked examples, and concept maps by rank-holding educators. Never a monotone slide deck.",
                icon: <MonitorPlay className="w-8 h-8 text-white" />,
                bg: "bg-gradient-to-br from-blue-600 to-cyan-500",
              },
              {
                title: "Adaptive Mock Tests",
                desc: "Board-pattern quizzes that adapt to your weak zones. Simulate real exam environments with surgical precision.",
                icon: <Target className="w-8 h-8 text-white" />,
                bg: "bg-gradient-to-br from-slate-700 to-slate-900",
              },
              {
                title: "Expert Doubt Resolution",
                desc: "Connect with subject mentors and a 1.8M-strong community within minutes of posting your question.",
                icon: <Users className="w-8 h-8 text-white" />,
                bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpChild}
                className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/50 rounded-[2rem] p-7 hover:-translate-y-1.5 hover:bg-white/90 transition-all duration-400 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 5  TESTIMONIALS
      ════════════════════════════════════════ */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpStagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUpChild}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4">
                <Award className="w-3.5 h-3.5" /> Real results. Real names.
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUpChild}
              className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3"
            >
              Trusted by toppers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                across India.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpChild}
              className="text-base text-slate-500 font-medium max-w-lg mx-auto"
            >
              From board exams to civil services — our learners don't just
              study, they transform.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpStagger}
            className="columns-1 md:columns-2 lg:columns-3 gap-5"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 6  THE PROMISE
      ════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[70px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                  Free for learners.
                  <br />
                  <span className="text-blue-400">
                    Transformative for educators.
                  </span>
                </h2>
                <p className="text-base text-slate-300 mb-6 font-medium leading-relaxed">
                  Foundational content is free for every learner. For educators,
                  our creator tools turn knowledge into a scalable, monetisable
                  asset.
                </p>
                <ul className="space-y-3 mb-7">
                  {[
                    {
                      icon: (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      ),
                      text: "Foundational courses — free for every student",
                    },
                    {
                      icon: (
                        <MonitorPlay className="w-5 h-5 text-blue-400 shrink-0" />
                      ),
                      text: "HD streaming across phones, tablets, and laptops",
                    },
                    {
                      icon: (
                        <UploadCloud className="w-5 h-5 text-cyan-400 shrink-0" />
                      ),
                      text: "Creator panel — upload, price, publish, and earn",
                    },
                  ].map((li, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-white font-medium text-sm"
                    >
                      {li.icon}
                      {li.text}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 text-sm"
                >
                  Become an Educator →
                </button>
              </div>
              <div className="flex justify-center">
                <motion.div
                  whileInView={{ rotate: 0 }}
                  initial={{ rotate: 4 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="w-full max-w-xs aspect-square bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-7 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                      Educator Dashboard
                    </span>
                  </div>
                  <div>
                    <div className="h-1.5 w-1/3 bg-white/20 rounded-full mb-2.5" />
                    <div className="h-1.5 w-3/4 bg-white/20 rounded-full mb-5" />
                    <h4 className="text-2xl font-black text-white">
                      Upload. Publish. Earn.
                    </h4>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 7  FAQ — Dark AI finish
      ════════════════════════════════════════ */}
      <section className="bg-[#070d18] py-20 relative overflow-hidden">
        <div
          className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full blur-[110px] pointer-events-none"
          style={{ background: "rgba(37,99,235,0.07)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[260px] h-[260px] rounded-full blur-[90px] pointer-events-none"
          style={{ background: "rgba(6,182,212,0.05)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpStagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUpChild}>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-slate-400 text-xs font-semibold mb-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Frequently Asked
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUpChild}
              className="text-2xl md:text-4xl font-extrabold text-white mb-3"
              style={{ fontFamily: "'Sora',system-ui,sans-serif" }}
            >
              Everything you need{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                to know.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpChild}
              className="text-slate-500 font-medium text-base max-w-md mx-auto"
            >
              Still unsure? Browse our most common questions below.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUpStagger}
            className="space-y-2.5"
          >
            {faqs.map((item, i) => (
              <motion.div key={i} variants={fadeUpChild}>
                <FaqItem
                  q={item.q}
                  a={item.a}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <p className="text-slate-500 text-xs font-medium mb-3">
              Still have questions? We're here.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 border text-white font-semibold rounded-xl backdrop-blur-md transition-all hover:-translate-y-0.5 text-sm inline-flex items-center gap-2"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <Globe className="w-4 h-4 text-cyan-400" /> Talk to our team
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
