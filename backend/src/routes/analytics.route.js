import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrderAnalytics, getFarmerAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// All orders analytics (for admin)
router.get("/orders", protect, getOrderAnalytics);

// Farmer-specific analytics
router.get("/farmer/:farmerId", protect, getFarmerAnalytics);

export default router;
