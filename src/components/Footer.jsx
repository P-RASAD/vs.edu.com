import React from "react";
import { Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div
              className="flex items-center gap-2 mb-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                <span className="text-blue-600">VS</span>intellecta
              </h1>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Empowering students across India with premium, accessible
              education for a brighter future.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Pricing & Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Student Success
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Instructors</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Teach with Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Revenue Share
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 font-medium">
            © 2026 VSintellecta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
