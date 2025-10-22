// src/store/authStore.js
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  // ✅ Register
  register: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ user: res.data.user }); // store user
      toast.success(res.data.message || "Registered successfully");
      return true; // indicate success
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Login
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data.user });
      toast.success(res.data.message || "Logged in successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  // ✅ Fetch current user
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ user: res.data.user });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
