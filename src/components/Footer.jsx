import React from "react";
import {
  Layers,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Mesh Gradient Background (Futuristic accent) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand & Newsletter (Takes up 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="flex items-center gap-2.5 cursor-pointer mb-5"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
                VS<span className="text-slate-500">intellecta</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm">
              Empowering minds and transforming futures. Premium, accessible
              education Neural Paths tailored for Indian Board and Competitive
              Examinations.
            </p>

            {/* Newsletter Input (Futuristic design) */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
                Subscribe to Neural Updates
              </p>
              <div className="flex max-w-sm border border-white/10 rounded-2xl bg-slate-900 overflow-hidden focus-within:border-purple-500/50 transition-colors shadow-inner">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent text-white px-5 py-3.5 focus:outline-none w-full text-sm font-medium placeholder-slate-600"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3.5 font-bold transition-all flex items-center justify-center hover:opacity-90">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Cognitive Catalog",
              icon: <Zap className="w-4 h-4 text-purple-400" />,
              links: [
                "Competitive Exams",
                "School Boards (9-12)",
                "Undergrad Courses",
                "Free Neural Resources",
              ],
            },
            {
              title: "Platform Core",
              icon: <BrainCircuit className="w-4 h-4 text-blue-400" />,
              links: [
                "About Us",
                "Become a Tutor AI",
                "Success Stories",
                "Neural Help Center",
              ],
            },
            {
              title: "Governance",
              icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
              links: [
                "Terms of Service",
                "Privacy Policy",
                "Refund Policy",
                "Cookie Settings",
              ],
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-extrabold mb-7 flex items-center gap-2.5 text-lg tracking-tight">
                {col.icon} {col.title}
              </h4>
              <ul className="space-y-4.5 text-sm font-medium text-slate-400">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => navigate("/explore")}
                      className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 transition-all"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-sm font-medium text-slate-600">
          <p>
            © {new Date().getFullYear()} VSintellecta. A Next-Gen Intelligence
            Network.
          </p>

          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all shadow-md"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
