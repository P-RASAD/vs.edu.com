// src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Global auth state. Wrap <App /> with <AuthProvider>.
// Any component: const { user, login, logout, isLoggedIn } = useAuth();
// ─────────────────────────────────────────────────────────────────────────────
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AuthService } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // hydration guard

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("vsintellecta_token");
      const storedUser = localStorage.getItem("vsintellecta_active_user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      /* corrupt storage — ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Login ──
  const login = useCallback(async (credentials) => {
    // WIRE: AuthService.login → POST /auth/login
    const res = await AuthService.login(credentials);
    const { token: t, user: u } = res.data;
    setToken(t);
    setUser(u);
    localStorage.setItem("vsintellecta_token", t);
    localStorage.setItem("vsintellecta_active_user", JSON.stringify(u));
    return u; // return so callers can redirect by role
  }, []);

  // ── Register ──
  const register = useCallback(async (userData) => {
    // WIRE: AuthService.register → POST /auth/register
    await AuthService.register(userData);
    // After register, auto-populate identifier for login form
    return userData.email;
  }, []);

  // ── Logout ──
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("vsintellecta_token");
    localStorage.removeItem("vsintellecta_active_user");
  }, []);

  const isLoggedIn = !!user;
  const isLearner = user?.role === "learner";
  const isTutor = user?.role === "tutor";
  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superadmin";

  // Dashboard route per role
  const dashboardRoute = () => {
    if (isSuperAdmin) return "/super-admin";
    if (isAdmin) return "/user"; // AdminDashboard
    if (isTutor) return "/dashboard";
    return "/dashboard";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn,
        isLearner,
        isTutor,
        isAdmin,
        isSuperAdmin,
        login,
        register,
        logout,
        dashboardRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
