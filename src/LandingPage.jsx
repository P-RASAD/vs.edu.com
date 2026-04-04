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
  MessageCircle,
  Send,
  Radio,
  Lock,
  BookMarked,
  Brain,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";

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

function AnoAIBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Performance: Keep alpha false to prevent scrolling lag
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });

    const getWidth = () => container.clientWidth || window.innerWidth;
    const getHeight = () => container.clientHeight || window.innerHeight;

    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(1); // Performance: Keep at 1

    const canvas = renderer.domElement;
    canvas.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;display:block;z-index:0;transform:translateZ(0);";
    container.appendChild(canvas);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(getWidth(), getHeight()),
        },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        precision highp float;
        uniform float iTime;
        uniform vec2  iResolution;

        // Random hash function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / iResolution.xy;
            uv.x *= iResolution.x / iResolution.y;

            vec3 color = vec3(0.0);

            // 3 Layers for 3D depth
            for (float i = 1.0; i < 4.0; i++) {
                // Grid scale
                vec2 st = uv * (40.0 * i);

                // 1. MAKE IT FALL: Move the grid vertically very fast, and slightly horizontally
                st.y += iTime * 4.0 * i;
                st.x += iTime * 0.5 * i;

                vec2 ipos = floor(st);
                vec2 fpos = fract(st);

                float rand = random(ipos);

                // Density of the falling streaks
                if (rand > 0.94) {
                    vec2 diff = fpos - vec2(0.5);

                    // 2. STRETCH THE SHAPE: Make the Y axis much smaller to stretch it into a falling streak
                    diff.y *= 0.12;
                    diff.x *= 1.5;

                    float dist = length(diff);

                    // Add a twinkle/pulsing effect
                    float twinkle = sin(iTime * 6.0 + rand * 100.0) * 0.5 + 0.5;

                    // 3. COLORFUL PALETTE: Generate distinct neon colors for each streak based on its random ID
                    vec3 streakColor = vec3(
                        0.2 + 0.6 * sin(rand * 15.0 + iTime * 0.5),  // Red/Pink channel
                        0.4 + 0.5 * cos(rand * 25.0 + iTime * 0.4),  // Green/Cyan channel
                        0.8 + 0.2 * sin(rand * 35.0)                 // Blue dominance
                    );

                    // Brightness based on distance to center of the streak
                    float brightness = (0.015 / dist) * twinkle;

                    // Add it to the final color, making closer streaks brighter
                    color += streakColor * brightness * (1.5 / i);
                }
            }

            // Deep, subtle dark blue/purple background gradient
            vec3 bg = mix(vec3(0.04, 0.01, 0.08), vec3(0.01, 0.02, 0.05), gl_FragCoord.y / iResolution.y);

            // Tone mapping to prevent blown-out whites
            color = color / (1.0 + color);

            gl_FragColor = vec4(color + bg, 1.0);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    let frameId;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const animate = () => {
      // Only render if the hero section is visible on screen
      if (isVisible) {
        material.uniforms.iTime.value += 0.012;
        renderer.render(scene, camera);
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const width = getWidth();
      const height = getHeight();
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (container.contains(canvas)) container.removeChild(canvas);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", backgroundColor: "#02060e" }}
    />
  );
}
// ─────────────────────────────────────────────
// HERO RIGHT — LOGGED IN PANEL (learner / tutor)
// ─────────────────────────────────────────────
function HeroPanelLoggedIn({ user }) {
  const navigate = useNavigate();
  const isTutor = user?.role === "tutor";
  return (
    <motion.div
      variants={fadeUpChild}
      className="hidden lg:flex flex-col gap-4"
    >
      {/* Main live card */}
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
            <p className="text-slate-400 text-xs">UPSC GS — Polity Module 4</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />{" "}
            LIVE
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full mb-1">
          <div className="h-full w-[62%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-4">
          <span>Module 4 of 12</span>
          <span>62% complete</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="w-full py-2.5 rounded-xl text-xs font-black text-white flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg,#0057FF,#00C2FF)",
            boxShadow: "0 4px 16px rgba(0,87,255,0.4)",
          }}
        >
          <Radio className="w-3.5 h-3.5" /> Join Live Session
        </motion.button>
      </div>

      {/* Role-specific mini cards */}
      <div className="grid grid-cols-2 gap-3">
        {isTutor ? (
          <>
            <div
              className="rounded-2xl border p-4 backdrop-blur-xl cursor-pointer hover:bg-white/10 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
              onClick={() => navigate("/dashboard")}
            >
              <div className="mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-white text-xs font-bold">Revenue Today</p>
              <p className="text-emerald-400 text-sm font-black mt-0.5">
                ₹12,450
              </p>
            </div>
            <div
              className="rounded-2xl border p-4 backdrop-blur-xl cursor-pointer hover:bg-white/10 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
              onClick={() => navigate("/dashboard")}
            >
              <div className="mb-2">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-white text-xs font-bold">Active Scholars</p>
              <p className="text-blue-400 text-sm font-black mt-0.5">1,204</p>
            </div>
          </>
        ) : (
          <>
            <div
              className="rounded-2xl border p-4 backdrop-blur-xl cursor-pointer hover:bg-white/10 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
              onClick={() => navigate("/dashboard")}
            >
              <div className="mb-2">
                <Target className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-white text-xs font-bold">Mock Tests</p>
              <p className="text-slate-400 text-[10px] font-medium mt-0.5">
                1,240 taken today
              </p>
            </div>
            <div
              className="rounded-2xl border p-4 backdrop-blur-xl cursor-pointer hover:bg-white/10 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
              onClick={() => navigate("/dashboard")}
            >
              <div className="mb-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-white text-xs font-bold">Doubt Queue</p>
              <p className="text-slate-400 text-[10px] font-medium mt-0.5">
                avg 18 min reply
              </p>
            </div>
          </>
        )}
      </div>

      {/* Learner avatars + welcome */}
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
          <span className="text-white font-bold">4,200+</span> learners active
          now
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// HERO RIGHT — LOGGED OUT PANEL
// ─────────────────────────────────────────────
function HeroPanelGuest() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={fadeUpChild}
      className="hidden lg:flex flex-col gap-4"
    >
      {/* Main visual card — learning illustration */}
      <div
        className="rounded-[2rem] border overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.10)",
          minHeight: 220,
        }}
      >
        {/* Background gradient illustration */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg,rgba(0,87,255,0.15) 0%,rgba(0,194,255,0.10) 50%,rgba(139,92,246,0.12) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Floating icons grid */}
          <div className="grid grid-cols-3 gap-4 p-6 w-full">
            {[
              {
                icon: BookOpen,
                label: "340+ Courses",
                color: "#38bdf8",
                delay: 0,
              },
              {
                icon: Trophy,
                label: "12K+ Toppers",
                color: "#f59e0b",
                delay: 0.1,
              },
              {
                icon: Brain,
                label: "AI-powered",
                color: "#8b5cf6",
                delay: 0.2,
              },
              {
                icon: GraduationCap,
                label: "UPSC Ready",
                color: "#10b981",
                delay: 0.15,
              },
              {
                icon: Target,
                label: "Mock Tests",
                color: "#ef4444",
                delay: 0.25,
              },
              {
                icon: BookMarked,
                label: "Live Classes",
                color: "#0057FF",
                delay: 0.05,
              },
            ].map(({ icon: Icon, label, color, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + delay, duration: 0.6 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl cursor-pointer backdrop-blur-md"
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}25`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}20` }}
                >
                  <Icon
                    className="w-4.5 h-4.5"
                    style={{ color, width: 18, height: 18 }}
                  />
                </div>
                <p className="text-[10px] font-bold text-center text-white leading-tight">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Top label */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(0,87,255,0.3)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,194,255,0.3)",
          }}
        >
          <Lock className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] font-black text-cyan-300 uppercase tracking-wider">
            Login to unlock
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Free Courses",
            val: "100+",
            color: "#38bdf8",
            icon: BookOpen,
          },
          {
            label: "Success Rate",
            val: "94%",
            color: "#10b981",
            icon: TrendingUp,
          },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border p-4 backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.10)",
            }}
          >
            <s.icon className="w-4 h-4 mb-2" style={{ color: s.color }} />
            <p className="text-white text-sm font-black">{s.val}</p>
            <p className="text-slate-500 text-[10px] font-medium mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/login")}
        className="w-full py-3 rounded-2xl text-sm font-black text-white flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg,#0057FF,#00C2FF)",
          boxShadow: "0 6px 24px rgba(0,87,255,0.45)",
        }}
      >
        <Sparkles className="w-4 h-4" /> Join Us — Start Learning Today
      </motion.button>

      {/* Social proof */}
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
          <span className="text-white font-bold">4,200+</span> learners active
          now
        </p>
      </div>
    </motion.div>
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
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(29,78,216,0.13)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="break-inside-avoid rounded-[2rem] p-6 group relative overflow-hidden mb-4"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px)",
        border: "1.5px solid rgba(255,255,255,0.95)",
        boxShadow:
          "0 4px 24px rgba(29,78,216,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(29,78,216,0.08),transparent)",
        }}
      />
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
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
          style={{
            background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
            boxShadow: "0 3px 10px rgba(29,78,216,0.3)",
          }}
        >
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
// NEW FAQ — Split interactive chat design
// ─────────────────────────────────────────────
function FaqChatSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  const faqs = [
    {
      q: "Is VSintellecta free to use?",
      a: "Yes — foundational content is completely free for every learner. Premium courses require a one-time purchase. No subscriptions, no hidden fees.",
    },
    {
      q: "What courses are available?",
      a: "We cover Class 9–12 board prep, UPSC, CAT, GRE, GMAT, IELTS, and specialised competitive exams. Over 340 courses taught by rank-holders and veteran educators.",
    },
    {
      q: "How do live classes work?",
      a: "Tutors schedule live sessions via Google Meet. Learners get a direct join link. Sessions are recorded and available within 24 hours.",
    },
    {
      q: "How do doubt sessions work?",
      a: "Every course has a structured doubt queue. Post your question and a subject mentor responds within 24 hours. Premium users also access live weekly doubt-clearing sessions.",
    },
    {
      q: "Can I become a tutor?",
      a: "Absolutely. Register as an Educator, upload your course content, set your price, and publish. Our sub-admin team reviews and approves within 48 hours.",
    },
    {
      q: "What payment methods are accepted?",
      a: "UPI, Net Banking, Debit/Credit Cards, and EMI options through major Indian banks. All transactions are PCI-DSS compliant.",
    },
    {
      q: "Is there a refund policy?",
      a: "Yes — 7-day money-back guarantee on all paid courses. No questions asked if you're unsatisfied.",
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!chatInput.trim() || sending) return;
    setSending(true);
    const msg = chatInput.trim();
    setChatInput("");
    setMessages((p) => [
      ...p,
      {
        role: "user",
        text: msg,
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    await new Promise((r) => setTimeout(r, 1200));
    setMessages((p) => [
      ...p,
      {
        role: "support",
        text: "Thanks for reaching out! Our team has received your message and will respond within a few hours. In the meantime, check if your question is answered in the FAQ on the left.",
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setSent(true);
    setSending(false);
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#050E2B 0%,#0a1628 100%)" }}
    >
      <div
        className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(37,99,235,0.07)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[260px] h-[260px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: "rgba(6,182,212,0.05)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpStagger}
          className="text-center mb-12"
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
            Browse FAQs on the left — or chat with us directly on the right.
          </motion.p>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Bento box FAQ questions */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUpStagger}
            className="space-y-2"
          >
            {faqs.map((item, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUpChild}
                  onClick={() => setActiveIdx(isActive ? null : i)}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg,rgba(0,87,255,0.18),rgba(0,194,255,0.08))"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? "rgba(0,194,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isActive
                      ? "0 4px 24px rgba(0,87,255,0.15)"
                      : "none",
                  }}
                >
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg,#0057FF,#00C2FF)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        {isActive ? (
                          <Minus className="w-2.5 h-2.5 text-white" />
                        ) : (
                          <Plus className="w-2.5 h-2.5 text-slate-400" />
                        )}
                      </div>
                      <span
                        className="font-semibold text-sm leading-snug transition-colors"
                        style={{
                          color: isActive ? "white" : "rgba(255,255,255,0.65)",
                        }}
                      >
                        {item.q}
                      </span>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p
                          className="px-5 pb-5 text-slate-400 font-medium text-sm leading-relaxed"
                          style={{ paddingLeft: "calc(1.25rem + 32px)" }}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT — Chat with support */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              minHeight: 440,
            }}
          >
            {/* Chat header */}
            <div
              className="px-5 py-4 flex items-center gap-3 shrink-0"
              style={{
                background: "rgba(0,87,255,0.12)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#0057FF,#00C2FF)",
                }}
              >
                <MessageCircle
                  className="w-4.5 h-4.5 text-white"
                  style={{ width: 18, height: 18 }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-white">
                  VSintellecta Support
                </p>
                <p
                  className="text-[10px] font-medium"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Reply reaches admin · typically within a few hours
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400">
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-5 space-y-3 hide-scrollbar"
              style={{ minHeight: 200 }}
            >
              {/* Bot intro */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#0057FF,#00C2FF)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm"
                  style={{
                    background: "rgba(0,87,255,0.15)",
                    border: "1px solid rgba(0,194,255,0.2)",
                  }}
                >
                  <p className="text-xs font-medium text-white leading-relaxed">
                    Hi! 👋 Can't find your answer in the FAQ? Send us your
                    question and our admin team will reply to your registered
                    email.
                  </p>
                </div>
              </div>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role !== "user" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#0057FF,#00C2FF)",
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm text-white"
                        : "rounded-tl-sm"
                    }`}
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg,#0057FF,#0080FF)"
                          : "rgba(255,255,255,0.05)",
                      border:
                        msg.role !== "user"
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "none",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {msg.text}
                    <p className="text-[9px] mt-1 opacity-50">{msg.time}</p>
                  </div>
                </motion.div>
              ))}

              {sending && (
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#0057FF,#00C2FF)",
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-blue-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-4 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {sent ? (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-xs font-bold text-emerald-400">
                    Message sent! Admin will be notified and reply via email.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && sendMessage()
                    }
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-3 rounded-xl text-xs font-medium focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(0,194,255,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={sendMessage}
                    disabled={!chatInput.trim() || sending}
                    className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all"
                    style={{
                      background: chatInput.trim()
                        ? "linear-gradient(135deg,#0057FF,#00C2FF)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              )}
              <p
                className="text-[10px] text-center mt-2"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Your message goes directly to our admin team
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CAROUSEL
// ─────────────────────────────────────────────
function CourseCarousel({ cards, onCardClick }) {
  const trackRef = useRef(null);
  const outerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velRef = useRef(0);
  const lastX = useRef(0);
  const rafRef = useRef(null);
  const autoRef = useRef(null);
  const CARD_W = 300;
  const GAP = 16;
  const SNAP = CARD_W + GAP;

  const startAuto = useCallback(() => {
    cancelAnimationFrame(autoRef.current);
    let pos = trackRef.current ? trackRef.current.scrollLeft : 0;
    const tick = () => {
      if (!trackRef.current || isDragging.current) return;
      pos += 0.55;
      const max = trackRef.current.scrollWidth / 2;
      if (pos >= max) pos = 0;
      trackRef.current.scrollLeft = pos;
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
  }, []);

  const stopAuto = () => cancelAnimationFrame(autoRef.current);

  useEffect(() => {
    startAuto();
    return () => cancelAnimationFrame(autoRef.current);
  }, [startAuto]);

  // ── Drag momentum ──
  const onMouseDown = (e) => {
    stopAuto();
    isDragging.current = true;
    startX.current = e.pageX - outerRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    lastX.current = e.pageX;
    velRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    outerRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - outerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    velRef.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    outerRef.current.style.cursor = "grab";
    // Momentum
    const decelerate = () => {
      if (Math.abs(velRef.current) < 0.5) {
        startAuto();
        return;
      }
      trackRef.current.scrollLeft -= velRef.current * 1.5;
      velRef.current *= 0.88;
      rafRef.current = requestAnimationFrame(decelerate);
    };
    rafRef.current = requestAnimationFrame(decelerate);
  };

  // ── Touch ──
  const onTouchStart = (e) => {
    stopAuto();
    startX.current = e.touches[0].pageX;
    scrollLeft.current = trackRef.current.scrollLeft;
    velRef.current = 0;
    lastX.current = e.touches[0].pageX;
  };
  const onTouchMove = (e) => {
    const dx = startX.current - e.touches[0].pageX;
    trackRef.current.scrollLeft = scrollLeft.current + dx * 1.2;
    velRef.current = lastX.current - e.touches[0].pageX;
    lastX.current = e.touches[0].pageX;
  };
  const onTouchEnd = () => {
    const decel = () => {
      if (Math.abs(velRef.current) < 0.5) {
        startAuto();
        return;
      }
      trackRef.current.scrollLeft += velRef.current * 1.5;
      velRef.current *= 0.88;
      rafRef.current = requestAnimationFrame(decel);
    };
    rafRef.current = requestAnimationFrame(decel);
  };

  // Arrow scroll — smooth snap to next card
  const scrollBy = (dir) => {
    stopAuto();
    trackRef.current.scrollBy({ left: dir * SNAP * 2.5, behavior: "smooth" });
    setTimeout(startAuto, 2200);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => scrollBy(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 4px 16px rgba(29,78,216,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
          border: "1.5px solid rgba(255,255,255,0.95)",
        }}
      >
        <ChevronLeft className="w-4 h-4" style={{ color: "#1d4ed8" }} />
      </motion.button>

      {/* Track outer */}
      <div
        ref={outerRef}
        className="overflow-hidden select-none"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar py-4 px-2"
          style={{ scrollBehavior: "auto", WebkitOverflowScrolling: "touch" }}
        >
          {[...cards, ...cards].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3) }}
              whileHover={{ y: -8, scale: 1.025 }}
              onClick={() => onCardClick(card)}
              className="rounded-[2rem] overflow-hidden cursor-pointer shrink-0 group"
              style={{
                width: `${CARD_W}px`,
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,0.96)",
                boxShadow:
                  "0 8px 32px rgba(29,78,216,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
              }}
            >
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${card.video?.split("/").pop()}/maxresdefault.jpg`;
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(10,22,40,0.65) 0%,transparent 55%)",
                  }}
                />
                {/* Top badge */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {card.tag && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                      style={{
                        background: "rgba(29,78,216,0.85)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {card.tag}
                    </span>
                  )}
                </div>
                {/* Price bottom-right */}
                {card.price && (
                  <div
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-sm font-black text-white"
                    style={{
                      background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
                      boxShadow: "0 3px 10px rgba(29,78,216,0.4)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {card.price}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h4
                  className="font-bold text-base leading-snug mb-1.5"
                  style={{ color: "#0f172a" }}
                >
                  {card.title}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {Array.from({ length: Math.round(card.rating || 5) }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-current"
                            style={{ color: "#f59e0b" }}
                          />
                        ),
                      )}
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#64748b" }}
                    >
                      ({card.rating})
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-1 text-xs font-bold"
                    style={{ color: "#1d4ed8" }}
                  >
                    View <ChevronRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* → Next arrow */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => scrollBy(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 4px 16px rgba(29,78,216,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
          border: "1.5px solid rgba(255,255,255,0.95)",
        }}
      >
        <ChevronRight className="w-4 h-4" style={{ color: "#1d4ed8" }} />
      </motion.button>
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
    projects: ["Timed Practice Sets", "Essay Evaluation", "Score Predictor"],
  },
];

const carouselCards = [
  {
    title: "UPSC General Studies & CSAT Masterclass",
    tag: "Bestseller",
    rating: "4.9",
    lectures: "200 hrs",
    level: "Advanced",
    price: "₹4,999",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/e3dA11TlfnU",
    notes:
      "200+ HD lectures, 50 mock tests, downloadable notes, mobile access, certificate.",
    desc: "The ultimate UPSC preparation course covering Polity, History, Geography, Economy, and CSAT. Crafted by AIR holders.",
    curriculum: [
      "Indian Polity",
      "Modern History",
      "Physical Geography",
      "Economy Basics",
      "CSAT Aptitude",
      "Current Affairs",
    ],
  },
  {
    title: "Class 10 Mathematics — Complete Board Prep",
    tag: "CBSE / SSC",
    rating: "4.8",
    lectures: "120 hrs",
    level: "Class 10",
    price: "₹1,499",
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/O12p01-ITCY",
    notes:
      "Chapter-wise videos, 3000+ practice problems, previous year papers, live doubt sessions.",
    desc: "Board-perfect prep for all Class 10 Math chapters with animated concept explanations.",
    curriculum: [
      "Real Numbers",
      "Polynomials",
      "Quadratics",
      "Triangles",
      "Trigonometry",
      "Statistics",
    ],
  },
  {
    title: "CAT VARC & DILR Intensive",
    tag: "Trending",
    rating: "4.9",
    lectures: "85 hrs",
    level: "Graduate",
    price: "₹3,299",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/5KgSWcPFXks",
    notes:
      "Sectional deep dives, 100-percentile strategies, 30 full mocks, B-school interview prep.",
    desc: "Crack VARC and DILR — the two most feared sections of CAT — with proven 99-percentile strategies.",
    curriculum: [
      "RC Strategies",
      "Para-jumbles",
      "Data Interpretation",
      "Logical Reasoning",
      "Time Management",
      "Mock Analysis",
    ],
  },
  {
    title: "Intermediate 1st Year MPC Foundation",
    tag: "Hot",
    rating: "4.7",
    lectures: "90 hrs",
    level: "Intermediate",
    price: "₹1,999",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/Wy-_idAGHxc",
    notes:
      "All MPC subjects covered with JEE-level depth, lab simulations, and chapter tests.",
    desc: "A solid foundation in Maths, Physics, and Chemistry for 1st Year students targeting JEE and EAMCET.",
    curriculum: [
      "Algebra",
      "Coordinate Geometry",
      "Laws of Motion",
      "Thermodynamics",
      "Organic Chemistry",
      "Electrochemistry",
    ],
  },
  {
    title: "GRE Quantitative Aptitude Masterclass",
    tag: "Premium",
    rating: "4.8",
    lectures: "45 hrs",
    level: "Graduate",
    price: "₹2,499",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    video: "https://www.youtube.com/embed/4RjPZnatm8M",
    notes:
      "Covers all GRE Quant topics, 20 full practice tests, flashcards, and score predictor.",
    desc: "Everything you need to ace GRE Quant — from arithmetic to data analysis — in one structured course.",
    curriculum: [
      "Arithmetic",
      "Algebra",
      "Geometry",
      "Data Analysis",
      "Word Problems",
      "Strategy & Timing",
    ],
  },
];

const testimonials = [
  {
    name: "Arun Krishnamurthy",
    role: "AIR 42, UPSC CSE",
    rating: 5,
    tag: "UPSC Cleared",
    content:
      "VSintellecta's structured approach to GS and Answer Writing transformed my preparation. The live sessions with mentors were worth every rupee.",
    result: "Selected for IAS — batch of 2024",
  },
  {
    name: "Priya Mehta",
    role: "99.2 percentile, CAT 2024",
    rating: 5,
    tag: "IIM Admit",
    content:
      "The DILR module alone moved me from 85th to 99th percentile. No other platform has content this targeted.",
    result: "Admitted to IIM Ahmedabad",
  },
  {
    name: "Ravi Shankar",
    role: "Class 12 CBSE Topper",
    rating: 5,
    tag: "Board Topper",
    content:
      "I scored 98.6% in boards using VSintellecta's chapter-wise videos. The doubt queue was always answered before my next study session.",
    result: "98.6% in CBSE Board Examination",
  },
  {
    name: "Sneha Reddy",
    role: "GRE 328/340",
    rating: 5,
    tag: "GRE Aced",
    content:
      "From 295 to 328 in 60 days. The adaptive mock tests found my weak zones immediately and the strategy sessions were gold.",
    result: "Full scholarship at University of Texas",
  },
  {
    name: "Mohammed Iqbal",
    role: "IBPS PO 2024",
    rating: 4,
    tag: "Banking Cleared",
    content:
      "Cleared IBPS PO on my first attempt. The reasoning and quant modules are exactly what the exam demands — no fluff.",
    result: "Joining Bank of Baroda — PO Cadre",
  },
  {
    name: "Divya Nair",
    role: "IELTS 8.5 Band",
    rating: 5,
    tag: "Study Abroad",
    content:
      "The writing module gave me exact feedback on my essays. I improved from 6.5 to 8.5 band in one preparation cycle.",
    result: "Masters admission — University of Edinburgh",
  },
];
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// §4 OUTCOMES — Apple-grade, sky-blue bg, gradient headings, smooth cards
// ─────────────────────────────────────────────
function OutcomesSection() {
  const stats = [
    { val: "1.8M+", label: "Active Learners", icon: "🎓", glow: "#1d4ed8" },
    { val: "94%", label: "Exam Pass Rate", icon: "🎯", glow: "#0891b2" },
    { val: "12K+", label: "Board Toppers", icon: "🏆", glow: "#b8922a" },
    { val: "340+", label: "Expert Courses", icon: "📚", glow: "#059669" },
    { val: "800+", label: "UPSC Selections", icon: "⭐", glow: "#7c3aed" },
    { val: "₹50Cr", label: "Earned by Tutors", icon: "💎", glow: "#0284c7" },
  ];

  const journey = [
    {
      step: "01",
      title: "Choose Your Path",
      desc: "Board prep, competitive exams, or professional skills — all structured, all in one place.",
      icon: "🗺️",
    },
    {
      step: "02",
      title: "Learn from Experts",
      desc: "HD lectures, animated explainers, and live doubt sessions by IIT rankers and UPSC toppers.",
      icon: "🎓",
    },
    {
      step: "03",
      title: "Practice & Test",
      desc: "Adaptive mocks, previous year papers, and 24/7 doubt resolution — real exam simulation.",
      icon: "⚡",
    },
    {
      step: "04",
      title: "Achieve & Certify",
      desc: "Earn verified certificates, track milestones, and unlock career opportunities.",
      icon: "🏆",
    },
  ];

  return (
    <section
      className="py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#e8f0fe 0%,#ddeeff 50%,#e4f0fb 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpStagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUpChild}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{
                background: "rgba(255,255,255,0.7)",
                color: "#1d4ed8",
                border: "1px solid rgba(29,78,216,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              ✦ The Results Speak
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUpChild}
            className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight"
          >
            Real outcomes.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "rgba(0,0,0,0)",
                backgroundClip: "text",
              }}
            >
              Measurable impact.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUpChild}
            className="text-base font-medium max-w-xl mx-auto leading-relaxed"
            style={{ color: "#475569" }}
          >
            From Class 9 boards to UPSC and IIM — every number here is a student
            who transformed their future with VSintellecta.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpStagger}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-24"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUpChild}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: `0 20px 40px ${s.glow}22`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col items-center text-center p-5 rounded-[1.75rem] cursor-default"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,0.9)",
                boxShadow:
                  "0 4px 24px rgba(29,78,216,0.07), 0 1px 0 rgba(255,255,255,0.8) inset",
              }}
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <p
                className="text-2xl font-black mb-0.5"
                style={{
                  backgroundImage: `linear-gradient(180deg,${s.glow} 40%,${s.glow}99 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "rgba(0,0,0,0)",
                  backgroundClip: "text",
                  fontFamily: "'Sora',system-ui",
                }}
              >
                {s.val}
              </p>
              <p
                className="text-[11px] font-semibold leading-tight"
                style={{ color: "#64748b" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Journey steps ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpStagger}
        >
          <motion.div variants={fadeUpChild} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#0090F7 8%,#BA62FC,#F2416B,#F55600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "rgba(0,0,0,0)",
                  backgroundClip: "text",
                }}
              >
                Your Learning Journey
              </span>
            </h3>
            <p className="text-sm font-medium" style={{ color: "#64748b" }}>
              Four steps from where you are, to where you want to be.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connector dashes */}
            <div className="hidden lg:flex absolute top-14 left-[12.5%] right-[12.5%] items-center justify-between pointer-events-none">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 flex items-center gap-1 px-4">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <div
                      key={j}
                      className="flex-1 h-px rounded-full"
                      style={{ background: "rgba(29,78,216,0.2)" }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {journey.map((j, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpChild}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 48px rgba(29,78,216,0.13)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex flex-col items-center text-center px-6 pt-7 pb-6 rounded-[2rem]"
                  style={{
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(20px)",
                    border: "1.5px solid rgba(255,255,255,0.95)",
                    boxShadow:
                      "0 4px 24px rgba(29,78,216,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
                  }}
                >
                  <div className="relative mb-5">
                    <div
                      className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-2xl"
                      style={{
                        background: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                        boxShadow: "0 4px 16px rgba(29,78,216,0.15)",
                      }}
                    >
                      {j.icon}
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white"
                      style={{
                        background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
                        boxShadow: "0 3px 10px rgba(29,78,216,0.4)",
                      }}
                    >
                      {j.step}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {j.title}
                  </h4>
                  <p
                    className="text-xs font-medium leading-relaxed"
                    style={{ color: "#64748b" }}
                  >
                    {j.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// §6 ROLE DASHBOARD PREVIEW — replaces "Free for learners. Transformative for educators."
// Personalised based on auth state + role
// ─────────────────────────────────────────────
function RoleDashboardSection({ user, isLoggedIn, navigate }) {
  const role = user?.role;

  // Config per role (or guest)
  const configs = {
    user: {
      badge: "Learner Dashboard",
      heading: "Your learning, your pace.",
      sub: "Pick up where you left off. Access your enrolled courses, track progress, and join live sessions — all from one clean dashboard.",
      cta: "Continue Learning →",
      ctaPath: "/dashboard",
      color: "#1d4ed8",
      bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
      cards: [
        {
          label: "Courses Enrolled",
          val: "3 Active",
          icon: "📚",
          col: "#1d4ed8",
        },
        { label: "Progress This Week", val: "62%", icon: "📈", col: "#0891b2" },
        { label: "Certificates", val: "1 Earned", icon: "🏅", col: "#b8922a" },
      ],
    },
    tutor: {
      badge: "Educator Dashboard",
      heading: "Teach. Earn. Inspire.",
      sub: "Upload courses, schedule live classes, track student progress and revenue — your complete educator toolkit in one place.",
      cta: "Go to Educator Hub →",
      ctaPath: "/dashboard",
      color: "#059669",
      bg: "linear-gradient(135deg,#ecfdf5,#d1fae5)",
      cards: [
        { label: "Total Revenue", val: "₹2.4L", icon: "💰", col: "#059669" },
        { label: "Active Scholars", val: "1,204", icon: "👨‍🎓", col: "#0891b2" },
        { label: "Live Programs", val: "4 Active", icon: "📡", col: "#7c3aed" },
      ],
    },
    admin: {
      badge: "Admin Panel",
      heading: "Platform at your fingertips.",
      sub: "Moderate content, manage users, review tutor submissions, and keep the platform running at peak quality.",
      cta: "Open Command Center →",
      ctaPath: "/super-admin",
      color: "#7c3aed",
      bg: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
      cards: [
        {
          label: "Pending Reviews",
          val: "12 Courses",
          icon: "⚠️",
          col: "#f59e0b",
        },
        { label: "Active Users", val: "24,592", icon: "👥", col: "#7c3aed" },
        {
          label: "Platform Revenue",
          val: "₹1.2Cr",
          icon: "📊",
          col: "#059669",
        },
      ],
    },
    super_admin: {
      badge: "Super Admin",
      heading: "Total control, total clarity.",
      sub: "Full platform oversight — traffic analytics, financial reports, team management, and the final approval gate for all content.",
      cta: "Open Command Center →",
      ctaPath: "/super-admin",
      color: "#dc2626",
      bg: "linear-gradient(135deg,#fef2f2,#fecaca)",
      cards: [
        { label: "Gross Revenue", val: "₹1.24Cr", icon: "💎", col: "#dc2626" },
        { label: "Sub-Admins", val: "5 Active", icon: "🛡️", col: "#7c3aed" },
        { label: "Platform Health", val: "99.9%", icon: "⚡", col: "#059669" },
      ],
    },
  };

  const guest = {
    badge: null,
    heading: null,
    sub: null,
    cta: null,
    ctaPath: null,
    color: "#1d4ed8",
    bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    cards: [],
  };

  const cfg = isLoggedIn && configs[role] ? configs[role] : null;
  const isGuestView = !cfg;

  // If not logged in, show a split panel for learner vs tutor benefits
  if (isGuestView) {
    return (
      <section
        className="py-20"
        style={{
          background: "linear-gradient(180deg,#e8f2fe 0%,#ddeeff 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpStagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUpChild}
              className="text-3xl font-extrabold text-slate-900 mb-3"
            >
              Built for every{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg,#1d4ed8,#0891b2)",
                }}
              >
                kind of learner.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpChild}
              className="text-base text-slate-500 font-medium max-w-md mx-auto"
            >
              Whether you're here to learn or to teach — VSintellecta has a
              dedicated space built just for you.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                role: "Learner",
                emoji: "🎓",
                color: "#1d4ed8",
                bg: "white",
                border: "rgba(29,78,216,0.12)",
                headline: "Learn at your own pace.",
                desc: "Access 340+ courses, join live doubt sessions, get personalised mock tests, and earn verified certificates — all in one beautiful platform.",
                perks: [
                  "Personal progress tracker",
                  "Live doubt resolution",
                  "Adaptive mock tests",
                  "Verified certificates",
                ],
                cta: "Join Us & Start Learning",
                ctaStyle: {
                  background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
                  color: "white",
                },
              },
              {
                role: "Educator",
                emoji: "📡",
                color: "#059669",
                bg: "linear-gradient(135deg,#050E2B,#0D1A3E)",
                border: "rgba(2,132,199,0.2)",
                headline: "Teach India. Earn from anywhere.",
                desc: "Upload courses, schedule live classes, set your own pricing, and reach 1.8M+ motivated learners — with zero platform fee on your first ₹1L.",
                perks: [
                  "Own your pricing",
                  "Live class scheduler",
                  "Revenue analytics",
                  "24h content review",
                ],
                cta: "Become an Educator",
                ctaStyle: {
                  background: "linear-gradient(135deg,#059669,#10b981)",
                  color: "white",
                },
                dark: true,
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUpChild}
                whileHover={{ y: -4 }}
                className="rounded-[2rem] p-8"
                style={{
                  background: c.bg,
                  border: `1.5px solid ${c.border}`,
                  boxShadow: c.dark
                    ? "0 24px 60px rgba(29,78,216,0.2)"
                    : "0 4px 24px rgba(29,78,216,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: c.dark
                        ? "rgba(255,255,255,0.08)"
                        : `${c.color}12`,
                    }}
                  >
                    {c.emoji}
                  </div>
                  <span
                    className="text-xs font-black uppercase tracking-widest"
                    style={{
                      color: c.dark ? "rgba(255,255,255,0.45)" : c.color,
                    }}
                  >
                    For {c.role}s
                  </span>
                </div>
                <h3
                  className="text-xl font-extrabold mb-3 leading-tight"
                  style={{ color: c.dark ? "white" : "#0f172a" }}
                >
                  {c.headline}
                </h3>
                <p
                  className="text-sm font-medium leading-relaxed mb-6"
                  style={{
                    color: c.dark ? "rgba(255,255,255,0.5)" : "#64748b",
                  }}
                >
                  {c.desc}
                </p>
                <ul className="space-y-2 mb-7">
                  {c.perks.map((p, pi) => (
                    <li
                      key={pi}
                      className="flex items-center gap-2.5 text-sm font-medium"
                      style={{
                        color: c.dark ? "rgba(255,255,255,0.7)" : "#475569",
                      }}
                    >
                      <CheckCircle
                        className="w-4 h-4 shrink-0"
                        style={{ color: c.color }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-2xl text-sm font-bold"
                  style={{
                    ...c.ctaStyle,
                    boxShadow: `0 4px 16px ${c.color}35`,
                  }}
                >
                  {c.cta} →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Logged-in personalised view
  return (
    <section
      className="py-16"
      style={{ background: "linear-gradient(180deg,#e4f0fd,#ddeeff)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="rounded-[2.5rem] overflow-hidden relative"
          style={{
            background: "linear-gradient(145deg,#050E2B,#0D1A3E)",
            border: "1px solid rgba(29,78,216,0.2)",
            boxShadow: "0 24px 80px rgba(29,78,216,0.2)",
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle,${cfg.color}22,transparent 65%)`,
              transform: "translate(30%,-30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(0,194,255,0.07),transparent 60%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-5"
                  style={{
                    background: `${cfg.color}20`,
                    color: cfg.color,
                    border: `1px solid ${cfg.color}35`,
                  }}
                >
                  <Sparkles className="w-3 h-3" /> {cfg.badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                  Welcome back,
                  <br />
                  <span style={{ color: cfg.color }}>
                    {user?.first_name || user?.firstName || "there"} 👋
                  </span>
                </h2>
                <p className="text-slate-400 text-base font-medium mb-7 leading-relaxed">
                  {cfg.sub}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(cfg.ctaPath)}
                  className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg,${cfg.color},${cfg.color}CC)`,
                    boxShadow: `0 6px 20px ${cfg.color}40`,
                  }}
                >
                  {cfg.cta}
                </motion.button>
              </div>
              {/* Right: mini stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {cfg.cards.map((card, ci) => (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.12 }}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl p-4 text-center"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <p
                      className="text-base font-black text-white mb-0.5"
                      style={{ color: card.col }}
                    >
                      {card.val}
                    </p>
                    <p
                      className="text-[10px] font-medium"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {card.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [activeCourse, setActiveCourse] = useState(null);
  const [activePath, setActivePath] = useState(null);

  // Scroll to top on mount — prevents refresh landing on FAQ section
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      activeCourse || activePath ? "hidden" : "auto";
  }, [activeCourse, activePath]);

  return (
    <div
      className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-blue-200 overflow-hidden"
      style={{ background: "#eaf2ff" }}
    >
      <Header />

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
              className="w-full max-w-5xl rounded-[2rem] shadow-2xl relative p-7 flex flex-col md:flex-row gap-7"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(24px)",
                border: "2px solid rgba(29,78,216,0.15)",
                boxShadow: "0 32px 80px rgba(29,78,216,0.25)",
              }}
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
                  onClick={() => navigate(isLoggedIn ? "/checkout" : "/login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 text-sm"
                >
                  {isLoggedIn ? "Enroll Now" : "Login to Enroll"}{" "}
                  <ShoppingCart className="w-4 h-4" />
                </button>
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

      {/* §1 HERO */}
      <section
        style={{
          position: "relative",
          width: "100%",
          // minHeight: "50vh",
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpStagger}
          style={{ position: "relative", zIndex: 2 }}
          className="w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* LEFT */}
          <div>
            <motion.div variants={fadeUpChild} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-semibold text-slate-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.14)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> India's most
                structured learning platform
              </span>
            </motion.div>
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
            <motion.p
              variants={fadeUpChild}
              className="text-base text-slate-400 font-medium max-w-lg leading-relaxed mb-8"
            >
              From Class 9 board prep to UPSC, CAT & global university
              admissions — the infrastructure India's most serious students
              trust.
            </motion.p>
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
                className="px-6 py-3 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
                  boxShadow: "0 8px 24px rgba(29,78,216,0.4)",
                }}
              >
                Browse Courses <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
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

          {/* RIGHT — conditional on auth */}
          {isLoggedIn &&
          (user?.role === "learner" || user?.role === "tutor") ? (
            <HeroPanelLoggedIn user={user} />
          ) : (
            <HeroPanelGuest />
          )}
        </motion.div>

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

      {/* §2 CAROUSEL */}
      <section
        id="courses-section"
        className="relative py-14"
        style={{
          background: "linear-gradient(180deg,#deeeff 0%,#e4f2ff 100%)",
          borderBottom: "1px solid rgba(29,78,216,0.08)",
        }}
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
              className="text-[10px] font-black uppercase tracking-widest mb-2"
              style={{ color: "#0284c7", letterSpacing: "0.2em" }}
            >
              Featured Courses
            </motion.p>
            <motion.h2
              variants={fadeUpChild}
              className="text-2xl md:text-3xl font-black tracking-tight"
            >
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "rgba(0,0,0,0)",
                  backgroundClip: "text",
                }}
              >
                The latest.
              </span>{" "}
              <span style={{ color: "#475569", fontWeight: 500 }}>
                India's best educators, right now.
              </span>
            </motion.h2>
          </div>
          <motion.button
            variants={fadeUpChild}
            onClick={() => navigate("/explore")}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
            style={{ color: "#1d4ed8" }}
          >
            View all <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
        <CourseCarousel cards={carouselCards} onCardClick={setActiveCourse} />
      </section>

      {/* §3 CURATED PATHS */}
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

      {/* ════════════════════ §4 OUTCOMES (new section) ════════════════════ */}
      <OutcomesSection />

      {/* ════════════════════ §5 TESTIMONIALS ════════════════════ */}
      {/* §5 TESTIMONIALS */}
      <section
        className="py-20 overflow-hidden"
        style={{
          background: "linear-gradient(180deg,#e4eeff 0%,#ddeeff 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpStagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUpChild}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  color: "#059669",
                  border: "1px solid rgba(5,150,105,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Award className="w-3.5 h-3.5" /> Real results. Real names.
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUpChild}
              className="text-3xl md:text-4xl font-black mb-3 tracking-tight"
            >
              Trusted by toppers{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(180deg,#004C94 45%,#297BC4 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "rgba(0,0,0,0)",
                  backgroundClip: "text",
                }}
              >
                across India.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpChild}
              className="text-base font-medium max-w-lg mx-auto leading-relaxed"
              style={{ color: "#475569" }}
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

      {/* ════════════════════ §6 ROLE DASHBOARD PREVIEW (new section) ════════════════════ */}
      <RoleDashboardSection
        user={user}
        isLoggedIn={isLoggedIn}
        navigate={navigate}
      />

      {/* §7 FAQ — new split chat design */}
      <FaqChatSection />

      <Footer />
    </div>
  );
}
