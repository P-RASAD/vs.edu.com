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
  Image as ImageIcon,
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

// ─────────────────────────────────────────────
// AnoAI WEBGL SHADER (exact — untouched)
// ─────────────────────────────────────────────
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
      fragmentShader: `
        uniform float iTime;
        uniform vec2  iResolution;
        #define NUM_OCTAVES 3
        float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 ip = floor(p); vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          float res = mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
          return res * res;
        }
        float fbm(vec2 x) {
          float v=0.0; float a=0.3; vec2 shift=vec2(100.0);
          mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
          for(int i=0;i<NUM_OCTAVES;++i){ v+=a*noise(x); x=rot*x*2.0+shift; a*=0.4; }
          return v;
        }
        void main() {
          vec2 shake=vec2(sin(iTime*1.2)*0.005,cos(iTime*2.1)*0.005);
          vec2 p=((gl_FragCoord.xy+shake*iResolution.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.0,-4.0,4.0,6.0);
          vec2 v; vec4 o=vec4(0.0);
          float f=2.0+fbm(p+vec2(iTime*5.0,0.0))*0.5;
          for(float i=0.0;i<35.0;i++){
            v=p+cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13.0,11.0))*3.5+vec2(sin(iTime*3.0+i)*0.003,cos(iTime*3.5-i)*0.003);
            float tailNoise=fbm(v+vec2(iTime*0.5,i))*0.3*(1.0-(i/35.0));
            vec4 auroraColors=vec4(0.1+0.3*sin(i*0.2+iTime*0.4),0.3+0.5*cos(i*0.3+iTime*0.5),0.7+0.3*sin(i*0.4+iTime*0.3),1.0);
            vec4 contribution=auroraColors*exp(sin(i*i+iTime*0.8))/length(max(v,vec2(v.x*f*0.015,v.y*1.5)));
            float thin=smoothstep(0.0,1.0,i/35.0)*0.6;
            o+=contribution*(1.0+tailNoise*0.8)*thin;
          }
          o=tanh(pow(o/100.0,vec4(1.6)));
          gl_FragColor=o*1.5*0.60;
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
// HERO RIGHT — LOGGED OUT PANEL (beautiful visual)
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
// TESTIMONIAL CARD (unchanged)
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
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const fidRef = useRef(null);
  const CARD_W = 296;
  const SPEED = 0.7;
  const scroll = useCallback(() => {
    if (!trackRef.current) return;
    if (!pausedRef.current) {
      posRef.current += SPEED;
      const half = trackRef.current.scrollWidth / 2;
      if (posRef.current >= half) posRef.current = 0;
      trackRef.current.scrollLeft = posRef.current;
    }
    fidRef.current = requestAnimationFrame(scroll);
  }, []);
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
      <button
        onClick={() => step(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 group"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white" />
      </button>
      <button
        onClick={() => step(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 group"
      >
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
      </button>
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
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
// MAIN
// ─────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [activeCourse, setActiveCourse] = useState(null);
  const [activePath, setActivePath] = useState(null);

  useEffect(() => {
    document.body.style.overflow =
      activeCourse || activePath ? "hidden" : "auto";
  }, [activeCourse, activePath]);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-blue-200 overflow-clip">
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
          minHeight: "50vh",
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
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl shadow-blue-700/30 transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2"
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
            onClick={() => navigate("/explore")}
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
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

      {/* §4 FEATURES */}
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

      {/* §5 TESTIMONIALS */}
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

      {/* §6 THE PROMISE */}
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
                    learners.
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
                      text: "Foundational courses —  for every student",
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
                  onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 text-sm"
                >
                  {isLoggedIn ? "Go to Dashboard →" : "Become an Educator →"}
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

      {/* §7 FAQ — new split chat design */}
      <FaqChatSection />

      <Footer />
    </div>
  );
}
