import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Award,
  LogOut,
  Camera,
  Save,
  ArrowLeft,
  AtSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState({
    firstName: "Student",
    lastName: "User",
    username: "student123",
    email: "student@example.com",
    mobile: "+91 00000 00000",
    role: "learner",
  });

  // Load real user data from our mock local storage database!
  useEffect(() => {
    const storedUser = localStorage.getItem("vsintellecta_active_user");
    console.log('storedUser: ', storedUser);
    if (storedUser) {
  //     setUserData({
  //   firstName: "Student",
  //   lastName: "User",
  //   username: "student123",
  //   email: "student@example.com",
  //   mobile: "+91 00000 00000",
  //   role: "learner",
  // });
    }
  }, [userData]);

  const handleLogout = () => {
    setUserData({})
    localStorage.removeItem("vsintellecta_active_user");
    navigate("/login");
  };

  const tabs = [
    {
      id: "account",
      label: "Personal Info",
      icon: <User className="w-5 h-5" />,
    },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    {
      id: "billing",
      label: "Purchases & Billing",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      <Header />

      {/* Decorative Header Background */}
      <div className="h-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 -mt-24 pb-20 z-10 relative">
        {/* Back to Dashboard Button */}
        <button
          onClick={() =>
            navigate(userData.role === "tutor" ? "/admin" : "/dashboard")
          }
          className="flex items-center gap-2 text-white/80 hover:text-white font-bold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ========================================== */}
          {/* LEFT SIDEBAR: Navigation & Mini Profile    */}
          {/* ========================================== */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-200 p-6 flex flex-col relative overflow-hidden">
              {/* Profile Avatar Area */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
                <div className="relative group cursor-pointer mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    <span className="text-3xl font-black text-blue-600">
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-2">
                  @{userData.username}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${userData.role === "tutor" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {userData.role} Account
                </span>
              </div>

              {/* Navigation Menu */}
              <nav className="py-6 space-y-2 flex-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all relative overflow-hidden ${
                      activeTab === tab.id
                        ? "text-blue-700 bg-blue-50"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-r-full"
                      ></motion.div>
                    )}
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* ========================================== */}
          {/* RIGHT CONTENT: Dynamic Settings Area       */}
          {/* ========================================== */}
          <main className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-200 overflow-hidden">
            <AnimatePresence mode="wait">
              {/* --- PERSONAL INFO TAB --- */}
              {activeTab === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10"
                >
                  <h3 className="text-2xl font-black text-slate-900 mb-1">
                    Personal Information
                  </h3>
                  <p className="text-slate-500 font-medium mb-8 text-sm">
                    Update your personal details and how we can reach you.
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            defaultValue={userData.firstName}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white focus:bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            defaultValue={userData.lastName}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <AtSign className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          defaultValue={userData.username}
                          disabled
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl font-medium bg-slate-100 text-slate-500 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-1.5 ml-1">
                        Usernames cannot be changed once created.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          defaultValue={userData.mobile}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-[1px]"
                      >
                        <Save className="w-5 h-5" /> Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* --- BILLING TAB --- */}
              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10"
                >
                  <h3 className="text-2xl font-black text-slate-900 mb-1">
                    Purchases & Billing
                  </h3>
                  <p className="text-slate-500 font-medium mb-8 text-sm">
                    View your past course purchases and receipts.
                  </p>

                  <div className="space-y-4">
                    {/* Mock Purchase Item */}
                    <div className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=200&q=80"
                            alt="course"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-snug">
                            UPSC General Studies & CSAT
                          </h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Purchased on Oct 12, 2025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <span className="font-black text-slate-900">
                          ₹4,999
                        </span>
                        <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-1.5 rounded-lg">
                          Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- SECURITY & CERTIFICATES TABS (Placeholders) --- */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 md:p-10 flex flex-col items-center justify-center text-center h-[500px]"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Security Settings
                  </h3>
                  <p className="text-slate-500 max-w-sm mb-6">
                    Manage your password and enable Two-Factor Authentication
                    (2FA) here.
                  </p>
                  <button className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors">
                    Change Password
                  </button>
                </motion.div>
              )}

              {activeTab === "certificates" && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 md:p-10 flex flex-col items-center justify-center text-center h-[500px]"
                >
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Your Certificates
                  </h3>
                  <p className="text-slate-500 max-w-sm">
                    Complete courses to 100% to generate your verifiable digital
                    certificates.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </main>

      <Footer />
    </div>
  );
}
