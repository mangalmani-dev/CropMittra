import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api" // 
      : "https://your-production-url.com/api",
  withCredentials: true, // important if using cookies or JWT in cookies
});
