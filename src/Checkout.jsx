// src/Checkout.jsx
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
  Trash2,
  ShoppingCart,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useAuth } from "./context/AuthContext";
import { CartService, PaymentService } from "./services/api";

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

export default function Checkout() {
  const navigate = useNavigate();
  // const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("cart"); // "cart" | "payment" | "success"

  // Load cart from API/localStorage
  useEffect(() => {
    const load = async () => {
      setLoadingCart(true);
      try {
        const res = await CartService.getCart();
        // If cart is empty add demo item so checkout is usable
        if (!res.data.length) {
          await CartService.addToCart({
            id: 104,
            title: "UPSC GS & CSAT Masterclass",
            instructor: "Surabhi Dewra",
            price: 4999,
            img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=200&q=80",
          });
          const fresh = await CartService.getCart();
          setCartItems(fresh.data);
        } else {
          setCartItems(res.data);
        }
      } catch {
        toast.error("Could not load cart.", { style: toastErr });
      } finally {
        setLoadingCart(false);
      }
    };
    load();
  }, []);

  const handleRemove = async (courseId) => {
    setRemoving(courseId);
    try {
      await CartService.removeFromCart(courseId);
      setCartItems((p) => p.filter((c) => c.id !== courseId));
      toast.success("Removed from cart", { style: toastOK });
    } catch {
      toast.error("Remove failed", { style: toastErr });
    } finally {
      setRemoving(null);
    }
  };

  const subtotal = cartItems.reduce((a, c) => a + (c.price || 0), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required", { style: toastErr });
      return;
    }
    setIsProcessing(true);
    try {
      // WIRE: PaymentService.checkout → POST /payments/checkout
      await PaymentService.checkout({
        courseIds: cartItems.map((c) => c.id),
        paymentMethod,
        email,
        amount: total,
      });
      await CartService.clearCart();
      setStep("success");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Payment failed. Try again.",
        { style: toastErr },
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Success screen ──
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(160deg,#eaf2ff 0%,#f0f6ff 50%,#e4eeff 100%)" }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] shadow-2xl p-12 max-w-md w-full text-center border border-slate-200"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </motion.div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-slate-500 font-medium mb-6 text-sm">
            You're now enrolled in {cartItems.length} course
            {cartItems.length !== 1 ? "s" : ""}. Start learning now!
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/25 transition-all"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition-all"
            >
              Browse More Courses
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center font-sans selection:bg-blue-200 p-4 relative overflow-hidden" style={{ background: "linear-gradient(160deg,#eaf2ff 0%,#f0f6ff 50%,#e4eeff 100%)" }}>
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[100px] top-[-10%] left-[-10%]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[100px] bottom-[-10%] right-[-10%]"
        />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors z-20 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[1050px] h-[88vh] max-h-[700px] min-h-[560px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden border border-slate-200/60"
      >
        {/* ── LEFT: Payment form ── */}
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
              {/* Email */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Contact Information
                </h3>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border text-black border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
                    placeholder="Email address for receipt"
                  />
                </div>
              </div>

              {/* Payment method */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[
                    {
                      id: "card",
                      icon: CreditCard,
                      label: "Card",
                      color: "blue",
                    },
                    {
                      id: "upi",
                      icon: Smartphone,
                      label: "UPI / QR",
                      color: "purple",
                    },
                  ].map(({ id, label, color }) => (
                    <div
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={`border-2 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === id
                          ? `border-${color}-500 bg-${color}-50/50 text-${color}-700 shadow-sm`
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {/* <Icon
                        className={`w-5 h-5 ${paymentMethod === id ? `text-${color}-600` : "text-slate-400"}`}
                      /> */}
                      <span className="text-sm font-bold">{label}</span>
                    </div>
                  ))}
                </div>

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
                          className="w-full max-w-[200px] border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-center focus:ring-2 focus:border-purple-500 bg-white shadow-sm text-black"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing || cartItems.length === 0}
                  className={`w-full text-white py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-[15px] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed ${
                    paymentMethod === "upi"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/30"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/30"
                  }`}
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
                    />
                  ) : cartItems.length === 0 ? (
                    <>Cart is Empty</>
                  ) : (
                    <>
                      Pay ₹{total.toLocaleString("en-IN")} securely{" "}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1 mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />{" "}
                  256-bit SSL Encrypted · 7-Day Money-Back
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* ── RIGHT: Order summary ── */}
        <div className="w-full md:w-[45%] bg-[#0B1120] text-white p-8 md:p-10 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-900/20" />
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />

          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" /> Order Summary
              {cartItems.length > 0 && (
                <span className="ml-auto text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                </span>
              )}
            </h3>

            {/* Cart items */}
            <div className="space-y-3 mb-6 flex-1 overflow-y-auto hide-scrollbar">
              {loadingCart ? (
                <div className="flex items-center justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
                  />
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Package className="w-12 h-12 text-slate-600 mb-3" />
                  <p className="text-slate-400 font-semibold text-sm">
                    Your cart is empty.
                  </p>
                  <button
                    onClick={() => navigate("/explore")}
                    className="mt-3 text-cyan-400 text-sm font-bold hover:underline"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex gap-4 shadow-xl group"
                    >
                      {item.img && (
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-18 h-14 rounded-xl object-cover border border-white/20 shrink-0"
                          style={{ width: 72, height: 56 }}
                        />
                      )}
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <h4 className="font-bold text-white text-xs leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-blue-300 font-medium mt-0.5">
                          {item.instructor}
                        </p>
                        <p className="text-sm font-black text-cyan-400 mt-1">
                          ₹{(item.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={removing === item.id}
                        className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1 disabled:opacity-50"
                      >
                        {removing === item.id ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border border-rose-400 border-t-transparent rounded-full"
                          />
                        ) : (
                          <Trash2 className="w-4 h-4 text-rose-400 hover:text-rose-300 transition-colors" />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Pricing breakdown */}
            {cartItems.length > 0 && (
              <div className="space-y-3 border-t border-white/10 pt-5 mt-auto">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-base font-bold text-slate-200">
                    Total Due
                  </span>
                  <span className="text-2xl font-black text-white">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-1 gap-2">
              {[
                {
                  icon: CheckCircle,
                  color: "emerald",
                  title: "Lifetime Access",
                  sub: "Watch on any device, anytime.",
                },
                {
                  icon: ShieldCheck,
                  color: "amber",
                  title: "Money-Back Guarantee",
                  sub: "7 days, no questions asked.",
                },
              ].map(({ color, title, sub }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm"
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-${color}-500/20 flex items-center justify-center shrink-0`}
                  >
                    {/* <Icon className={`w-4 h-4 text-${color}-400`} /> */}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{title}</h5>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
