import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, MonitorPlay } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* LEFT SIDE: The Massive Background Image */}
      {/* We are using a high-quality coding/workspace image from Unsplash */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative items-end p-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-slate-900/40 bg-gradient-to-t from-slate-900/90 to-transparent"></div>

        {/* Image Text Content */}
        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-4xl font-extrabold mb-4">
            Empower your future with world-class skills.
          </h2>
          <p className="text-slate-200 text-lg">
            Join the VSintellecta community and learn from top mentors in tech,
            design, and business.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Light-Themed Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 relative overflow-hidden">
        {/* Subtle decorative background blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-0"></div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10 bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30">
              <MonitorPlay className="w-5 h-5 text-white ml-0.5" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              VS<span className="text-blue-600">intellecta</span>
            </h1>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-slate-500 mb-8 font-medium text-sm">
            {isLogin
              ? "Please enter your details to sign in."
              : "Start your learning journey right now."}
          </p>

          {/* Input Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <div className="pb-1">
                    <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                required
              />
            </div>

            {isLogin && (
              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20 mt-6"
            >
              {isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Toggle Button */}
          <div className="mt-8 text-center text-sm font-medium text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-900 font-extrabold hover:text-blue-600 transition-colors"
            >
              {isLogin ? "Sign up for free" : "Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
