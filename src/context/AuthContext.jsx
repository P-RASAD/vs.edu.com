// src/context/AuthContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { AuthService } from "../services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "vsintellecta_token";
const USER_KEY = "vsintellecta_active_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Hydrate from localStorage ──
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      // Read from vsintellecta_active_user OR fallback to user_details (set by Login.jsx)
      const storedUser =
        localStorage.getItem(USER_KEY) ||
        localStorage.getItem("user_details");

      if (storedToken) setToken(storedToken);

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        // Ensure both keys are in sync
        if (!localStorage.getItem(USER_KEY))
          localStorage.setItem(USER_KEY, storedUser);
        if (!localStorage.getItem(TOKEN_KEY))
          localStorage.setItem(TOKEN_KEY, `mock-token-${parsed.id}`);
      }
    } catch (err) {
      console.error("Auth hydration error:", err);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem("user_details");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Login ──
  const login = useCallback(async (credentials) => {
    try {
      const res = await AuthService.login(credentials);
      const { token: t, user: u } = res.data;

      setToken(t);
      setUser(u);

      localStorage.setItem(TOKEN_KEY, t);
      localStorage.setItem(USER_KEY, JSON.stringify(u));

      return u;
    } catch (err) {
      console.error("Login failed:", err);
      throw err; // important for UI handling
    }
  }, []);

  // ── Register ──
  const register = useCallback(async (userData) => {
    try {
      await AuthService.register(userData);
      return userData.email;
    } catch (err) {
      console.error("Register failed:", err);
      throw err;
    }
  }, []);

  // ── Logout ──
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("user_details"); // clear Login.jsx key too
  }, []);

  // ── Roles ──
  const isLoggedIn = !!token;
  const isLearner = user?.role === "learner";
  const isTutor = user?.role === "tutor";
  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "super_admin";

  // ── Dashboard Route ──
  const dashboardRoute = useCallback(() => {
    if (isSuperAdmin) return "/super-admin";
    if (isAdmin) return "/user";
    return "/dashboard";
  }, [isSuperAdmin, isAdmin]);

  // ── Memoized value (prevents re-renders) ──
  const value = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
