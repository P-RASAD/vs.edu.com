// src/components/Footer.jsx
// Premium redesign — lighter navy (#0d1729), animated VS logo, gold tagline,
// same links + newsletter kept, Apple-grade typography & spacing
import React from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ── Animated VS Logo ──────────────────────────────────────────────────────
function VSLogoFooter() {
  return (
    <motion.div
      animate={{
        rotate: [0, -6, 6, -6, 0],
        boxShadow: [
          "0 4px 20px rgba(29,78,216,0.3)",
          "0 4px 28px rgba(29,78,216,0.55)",
          "0 4px 20px rgba(29,78,216,0.3)",
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 44,
        height: 40,
        borderRadius: 12,
        flexShrink: 0,
        background: "linear-gradient(135deg,#1d4ed8 0%,#0284c7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 28% 22%,rgba(255,255,255,0.25),transparent 58%)",
        }}
      />
      <svg
        width="22"
        height="20"
        viewBox="0 0 44 40"
        fill="none"
        style={{ position: "relative", zIndex: 1 }}
      >
        <polyline
          points="12,10 20,28 28,10"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M30 14 C26 10,20 10,20 15 C20 19,30 19,30 24 C30 29,24 30,20 27"
          stroke="#7dd3fc"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

const GOLD = "#c9a227";
const GOLD2 = "#e4b840";
const BLUE = "#3b82f6";

const linkCols = [
  {
    title: "Learning Catalog",
    icon: <Zap className="w-3.5 h-3.5" style={{ color: GOLD }} />,
    links: [
      { label: "Competitive Exams", path: "/explore" },
      { label: "School Boards (9–12)", path: "/explore" },
      { label: "Undergrad Courses", path: "/explore" },
      { label: "Free Resources", path: "/explore" },
      { label: "Live Classes", path: "/explore" },
    ],
  },
  {
    title: "Platform",
    icon: <BrainCircuit className="w-3.5 h-3.5" style={{ color: BLUE }} />,
    links: [
      { label: "About VSintellecta", path: "/" },
      { label: "Become a Tutor", path: "/login" },
      { label: "Success Stories", path: "/" },
      { label: "Help Centre", path: "/" },
      { label: "Blog & Updates", path: "/" },
    ],
  },
  {
    title: "Legal",
    icon: <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#10b981" }} />,
    links: [
      { label: "Terms of Service", path: "/" },
      { label: "Privacy Policy", path: "/" },
      { label: "Refund Policy", path: "/" },
      { label: "Cookie Settings", path: "/" },
      { label: "Accessibility", path: "/" },
    ],
  },
];

const socials = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#0d1729 0%,#0a1220 100%)",
        borderTop: "1px solid rgba(59,130,246,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(29,78,216,0.09),transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(201,162,39,0.06),transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* ── Top divider line ── */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(29,78,216,0.35),rgba(201,162,39,0.2),rgba(29,78,216,0.35),transparent)",
            marginBottom: 64,
          }}
        />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand col (spans 2) */}
          <div className="lg:col-span-2 space-y-7">
            {/* Logo + wordmark */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer w-max"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <VSLogoFooter />
              <div>
                <p
                  style={{
                    fontFamily: "'Sora','DM Sans',system-ui,sans-serif",
                    fontSize: 20,
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "white",
                    margin: 0,
                  }}
                >
                  <span style={{ color: "#38bdf8" }}>VS</span>intellecta
                </p>
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginTop: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <span style={{ color: GOLD }}>Learn</span>
                  <span
                    style={{ color: "rgba(255,255,255,0.18)", fontSize: 4 }}
                  >
                    ◆
                  </span>
                  <span style={{ color: GOLD2 }}>Grow</span>
                  <span
                    style={{ color: "rgba(255,255,255,0.18)", fontSize: 4 }}
                  >
                    ◆
                  </span>
                  <span style={{ color: GOLD }}>Lead</span>
                </p>
              </div>
            </motion.div>

            {/* Tagline */}
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: 340,
              }}
            >
              India's most structured learning platform — trusted by 1.8M+
              learners, 12,000+ toppers, and 340+ expert educators across every
              major exam.
            </p>

            {/* Contact mini-list */}
            <div className="space-y-2.5">
              {[
                {
                  icon: <Mail className="w-3.5 h-3.5" />,
                  text: "support@vsintellecta.com",
                },
                {
                  icon: <Phone className="w-3.5 h-3.5" />,
                  text: "+91 90000 00000",
                },
                {
                  icon: <MapPin className="w-3.5 h-3.5" />,
                  text: "Hyderabad, Andhra Pradesh, India",
                },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div style={{ color: GOLD, opacity: 0.8 }}>{c.icon}</div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.38)",
                      fontWeight: 500,
                    }}
                  >
                    {c.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  marginBottom: 12,
                }}
              >
                Subscribe for updates
              </p>
              <div
                style={{
                  display: "flex",
                  maxWidth: 340,
                  border: "1px solid rgba(29,78,216,0.3)",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  overflow: "hidden",
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    background: "transparent",
                    color: "white",
                    padding: "12px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    border: "none",
                    outline: "none",
                    flex: 1,
                    minWidth: 0,
                  }}
                  className="placeholder-slate-600"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "linear-gradient(135deg,#1d4ed8,#0284c7)",
                    border: "none",
                    cursor: "pointer",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {linkCols.map((col, ci) => (
            <div key={ci}>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {col.icon} {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => navigate(link.path)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.38)",
                        transition: "color 0.2s",
                      }}
                      className="group hover:text-white"
                    >
                      <ChevronRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: GOLD }}
                      />
                      <span className="group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Awards / Trust strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            borderRadius: 20,
            padding: "20px 28px",
            marginBottom: 40,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(29,78,216,0.15)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {[
            { val: "1.8M+", label: "Active Learners" },
            { val: "340+", label: "Expert Courses" },
            { val: "12K+", label: "Competitive Toppers" },
            { val: "800+", label: "UPSC Selections" },
            { val: "₹50Cr+", label: "Earned by Tutors" },
            { val: "99.9%", label: "Platform Uptime" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1,
                  fontFamily: "'Sora',system-ui",
                }}
              >
                {s.val}
              </p>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 28,
            paddingBottom: 36,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} VSintellecta Pvt. Ltd. · All rights
            reserved.
            <span style={{ marginLeft: 12, color: GOLD + "55" }}>
              Made with ♥ in India
            </span>
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {socials.map(({ Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.4)",
                  transition: "color 0.2s, background 0.2s",
                }}
                className="hover:bg-blue-700/30 hover:text-white hover:border-blue-500/40"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
