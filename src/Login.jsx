import React, { useState } from "react";
import {
  Layers,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  User,
  GraduationCap,
  UploadCloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Toggle between Sign In and Sign Up
  const [isLogin, setIsLogin] = useState(true);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // 'student' or 'instructor'

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would authenticate here.
    // For now, route directly to the dashboard!
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full relative flex flex-col justify-center items-center bg-[#F6F9FC] font-sans selection:bg-blue-200 overflow-hidden px-4">
      {/* 1. HIGHLY VISIBLE ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Purple Swirl */}
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -150, 100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[#7a73ff]/25 rounded-full blur-[100px] will-change-transform"
        ></motion.div>

        {/* Cyan Swirl */}
        <motion.div
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 100, -150, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[#00d4ff]/25 rounded-full blur-[100px] will-change-transform"
        ></motion.div>

        {/* Peach Center Pulse */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#ff8d5c]/20 rounded-full blur-[120px] will-change-transform"
        ></motion.div>
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center mb-6"
        >
          <div
            className="flex items-center gap-2 cursor-pointer mt-2 mb-1"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 drop-shadow-sm">
              <span className="text-blue-600">VS</span>intellecta
            </h1>
          </div>
        </motion.div>

        {/* Smart Expandable Card */}
        <motion.div
          layout // This tells Framer Motion to smoothly animate height changes!
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full bg-white/90 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] border border-white/60 relative overflow-hidden"
        >
          <motion.h2
            layout
            className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 text-center"
          >
            {isLogin ? "Sign in to your account" : "Create your free account"}
          </motion.h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Conditional Sign Up Fields */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-slate-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        required={!isLogin}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm font-medium transition-all bg-white hover:border-slate-300 shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      I want to...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setRole("student")}
                        className={`border ${role === "student" ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"} rounded-xl p-3 flex items-center gap-2 cursor-pointer transition-colors`}
                      >
                        <GraduationCap
                          className={`w-5 h-5 ${role === "student" ? "text-blue-600" : "text-slate-400"}`}
                        />
                        <span
                          className={`text-sm font-bold ${role === "student" ? "text-blue-900" : "text-slate-600"}`}
                        >
                          Learn
                        </span>
                      </div>
                      <div
                        onClick={() => setRole("instructor")}
                        className={`border ${role === "instructor" ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"} rounded-xl p-3 flex items-center gap-2 cursor-pointer transition-colors`}
                      >
                        <UploadCloud
                          className={`w-5 h-5 ${role === "instructor" ? "text-blue-600" : "text-slate-400"}`}
                        />
                        <span
                          className={`text-sm font-bold ${role === "instructor" ? "text-blue-900" : "text-slate-600"}`}
                        >
                          Teach
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <motion.div layout>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm font-medium transition-all bg-white hover:border-slate-300 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div layout>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-700"
                >
                  Password
                </label>
                {isLogin && (
                  <a
                    href="#"
                    className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm font-medium transition-all bg-white hover:border-slate-300 shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div layout className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-[1px]"
              >
                {isLogin ? "Sign In" : "Create Account"}{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </form>

          {/* Social Divider */}
          <motion.div layout className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={handleSubmit}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <Chrome className="w-5 h-5 text-slate-600" />
                Google
              </button>
            </div>
          </motion.div>

          {/* Toggle Login/Signup */}
          <motion.div
            layout
            className="mt-6 text-center text-sm text-slate-600 font-medium border-t border-slate-100 pt-5"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              {isLogin ? "Sign up for free" : "Sign in instead"}
            </button>
          </motion.div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center gap-6 text-xs text-slate-500 font-medium"
        >
          <a href="#" className="hover:text-slate-900 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Security
          </a>
        </motion.div>
      </div>
    </div>
  );
}
