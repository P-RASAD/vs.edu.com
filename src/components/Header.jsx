import React from "react";
import { Search, ChevronRight, Layers, Bell, BookOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Checks if the user is on the dashboard
  const isLoggedIn = location.pathname.includes("dashboard");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center gap-4">
        {/* LOGO */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              <span className="text-blue-600">VS</span>
              <span className="text-slate-900">intellecta</span>
            </h1>
          </div>

          {/* Show Categories only if logged in */}
          {isLoggedIn && (
            <div className="hidden lg:flex gap-6 font-semibold text-slate-600 text-sm">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Categories
              </a>
            </div>
          )}
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-2 bg-slate-100/50 border border-slate-200/60 rounded-full focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm font-medium transition-all outline-none"
              placeholder="Search courses, boards, or skills..."
            />
          </div>
        </div>

        {/* CONDITIONAL BUTTONS (Login vs Profile) */}
        <div className="flex items-center gap-4 shrink-0">
          {isLoggedIn ? (
            <>
              <button className="text-slate-500 hover:text-blue-700 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border border-white"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-9 h-9 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer border border-blue-200 hover:bg-blue-200 transition-colors">
                  JD
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-slate-600 font-bold hover:text-blue-600 transition-colors hidden sm:block px-2 text-sm"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                Join Us <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
