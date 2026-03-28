import React, { useState } from "react";
import {
  Layers,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  User,
  AlertCircle,
  AtSign,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
        // 🔹 Fetch users.json from public folder
        const res = await fetch("/users.json");
        const data = await res.json();
        // 🔹 Find matching user
        const matchedUser = data.users.find(
          (user) =>
            user.email === formData.email &&
            user.password === formData.password
      );
      
      localStorage.setItem("user_details", JSON.stringify(matchedUser));

        // 🔹 Role-based routing
        if (matchedUser.role === "tutor") {
          navigate("/admin");
        } else if (matchedUser.role === "super_admin") {
          navigate("/super-admin");
        } else {
          navigate("/dashboard");
        }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg(""); // Clear success message on typing
  };

  // const handleGoogleLogin = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     navigate("/dashboard");
  //   }, 1500);
  // };

  // YOUR EXACT UI CODE BELOW - UNTOUCHED
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F2F4F7] p-4 md:p-8 font-sans selection:bg-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[1100px] h-[90vh] max-h-[750px] min-h-[600px] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden border border-slate-200/60"
      >
        {/* ========================================== */}
        {/* LEFT PANEL: Branding & Learning Image      */}
        {/* ========================================== */}
        <div className="hidden md:flex md:w-[45%] relative bg-slate-900 flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-blue-900/80"></div>

          <div
            className="relative z-10 p-10 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-[0.8rem] bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
                <span className="text-blue-400">VS</span>intellecta
              </h1>
            </div>
          </div>

          <div className="relative z-10 p-10 pb-12">
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Welcome to the <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Intellect Network.
              </span>
            </h2>
            <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm">
              Accessible, high-quality education built for your modern future.
              Explore a universe of curated learning paths today.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT PANEL: Compact Form Area             */}
        {/* ========================================== */}
        <div className="w-full md:w-[55%] h-full flex flex-col bg-white relative">
          <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 hide-scrollbar">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Sign In
              </h3>

              {/* FIXED: White Text on Blue Background for Active Toggles */}
              <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200/50">
                {/* <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMsg("");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${text-slate-500 hover:text-slate-800}`}
                >
                  Sign In
                </button> */}
                {/* <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="px-4 py-1.5 rounded-lg text-sm font-bold transition-all text-slate-500 hover:text-slate-800"
                >
                  Join Us
                </button> */}
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="bg-rose-50 text-rose-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-rose-100">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message (Shows after account creation) */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-100">
                    <CheckCircle className="w-4 h-4 shrink-0" /> {successMsg}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                  // LOGIN FIELDS
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email or Username
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                          name="email"
                          type="text"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2.5 text-black border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                          placeholder="Enter you email or username"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Password
                        </label>
                        {/* <a
                          href="#"
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Forgot?
                        </a> */}
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                          name="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2.5 text-black border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // REGISTRATION FIELDS
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          First Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Last Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Username
                        </label>
                        <div className="relative group">
                          <AtSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="johndoe12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="mobile"
                            type="tel"
                            required
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="+91 98765"
                          />
                        </div>
                      </div> */}

                      {/* FIXED: White Text on Blue Background for Active Toggles */}
                      {/* <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          I am a...
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-lg shadow-inner border border-slate-200/50 w-full h-[38px]">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, role: "learner" })
                            }
                            className={`flex-1 rounded-md text-xs font-bold transition-all ${formData.role === "learner" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                          >
                            Learner
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, role: "tutor" })
                            }
                            className={`flex-1 rounded-md text-xs font-bold transition-all ${formData.role === "tutor" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                          >
                            Tutor
                          </button>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 mt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Confirm
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <input
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 text-black border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div> */}
                  </motion.div>
              </AnimatePresence>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* <div className="mt-6 flex items-center justify-center">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-3 bg-white text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Or continue with
              </span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div> */}

            {/* <div className="mt-5 pb-4">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <Chrome className="w-4 h-4 text-slate-600" />
                Google
              </button>
            </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
