import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  CheckCircle,
  Mail,
  User,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Fetch logged-in user's email
  useEffect(() => {
    // const activeUser = JSON.parse(
    //   localStorage.getItem("vsintellecta_active_user"),
    // );
    // if (activeUser) {
    //   setUserEmail(activeUser.email);
    // }
  }, []);

  const cartItems = [
    {
      id: 1,
      title: "UPSC General Studies & CSAT Masterclass",
      instructor: "Career Guide",
      price: 4999,
      img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    // Fixed viewport container to prevent outer scrolling
    <div className="h-screen w-full flex items-center justify-center bg-[#F2F4F8] font-sans selection:bg-blue-200 p-4 relative overflow-hidden">
      {/* Colorful Background Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[100px] top-[-10%] left-[-10%]"
        ></motion.div>
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] bottom-[-10%] right-[-10%]"
        ></motion.div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors z-20 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Course
      </button>

      {/* MAIN CHECKOUT CARD - Strictly constrained height & compact layout */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[1050px] h-[85vh] max-h-[680px] min-h-[550px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden border border-slate-200/60"
      >
        {/* ========================================== */}
        {/* LEFT COLUMN: PAYMENT FORM                  */}
        {/* ========================================== */}
        <div className="w-full md:w-[55%] flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto px-8 py-8 md:px-10 hide-scrollbar">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Secure Checkout
                </h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                  Powered by VSintellecta
                </p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Contact Information
                </h3>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full border text-black border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
                    placeholder="Email address"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Payment Method
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`border-2 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${paymentMethod === "card" ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm" : "border-slate-200 hover:border-slate-300 text-slate-600"}`}
                  >
                    <CreditCard
                      className={`w-5 h-5 ${paymentMethod === "card" ? "text-blue-600" : "text-slate-400"}`}
                    />
                    <span className="text-sm font-bold">Card</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`border-2 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${paymentMethod === "upi" ? "border-purple-500 bg-purple-50/50 text-purple-700 shadow-sm" : "border-slate-200 hover:border-slate-300 text-slate-600"}`}
                  >
                    <Smartphone
                      className={`w-5 h-5 ${paymentMethod === "upi" ? "text-purple-600" : "text-slate-400"}`}
                    />
                    <span className="text-sm font-bold">UPI / QR</span>
                  </div>
                </div>

                {/* Dynamic Payment Fields */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <AnimatePresence mode="wait">
                    {paymentMethod === "card" && (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <div className="relative">
                          <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Card number"
                            className="w-full border text-black border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-medium focus:ring-2 focus:border-blue-500 bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full border text-black border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:border-blue-500 bg-white"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="w-full border text-black border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:border-blue-500 bg-white"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Name on card"
                          className="w-full border text-black border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:border-blue-500 bg-white"
                        />
                      </motion.div>
                    )}

                    {paymentMethod === "upi" && (
                      <motion.div
                        key="upi"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center justify-center text-center py-2"
                      >
                        <div className="w-12 h-12 bg-white shadow-sm border border-purple-100 rounded-xl flex items-center justify-center mb-3">
                          <Smartphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          Enter your UPI ID
                        </h4>
                        <p className="text-[11px] text-slate-500 font-bold mb-3">
                          Paytm, PhonePe, GPay supported
                        </p>
                        <input
                          type="text"
                          placeholder="username@upi"
                          className="w-full max-w-[200px] border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-center focus:ring-2 focus:border-purple-500 bg-white shadow-sm"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Pay Button Area (Pushed to bottom of left column) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full text-white py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-[15px] transform hover:-translate-y-0.5 ${paymentMethod === "upi" ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/30 hover:from-purple-700 hover:to-indigo-700" : "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/30 hover:from-blue-700 hover:to-cyan-700"}`}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    ></motion.div>
                  ) : (
                    <>
                      Pay ₹{total.toLocaleString()} securely{" "}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1 mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />{" "}
                  256-bit SSL Encrypted Payment
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: PREMIUM ORDER SUMMARY        */}
        {/* ========================================== */}
        <div className="w-full md:w-[45%] bg-[#0B1120] text-white p-8 md:p-10 flex flex-col relative overflow-hidden">
          {/* Stunning Background Effects inside Summary */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-900/20"></div>
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>

          {/* Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Order Summary
            </h3>

            {/* Glassmorphism Cart Item */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex gap-4 shadow-xl"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-16 rounded-xl object-cover border border-white/20"
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-white text-sm leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-blue-300 font-medium mt-1">
                      Instructor: {item.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                <span className="text-lg font-bold text-slate-200">
                  Total Due
                </span>
                <span className="text-3xl font-black text-white tracking-tight">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Premium Trust Guarantees */}
            <div className="mt-8 grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">
                    Lifetime Access
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    Watch on any device, anytime.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">
                    Money-Back Guarantee
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    7 days, no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
