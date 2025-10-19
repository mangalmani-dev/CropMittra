import express from "express";
import {
  placeOrder,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder); // place new order
router.get("/my-orders", protect, getMyOrders); // buyer orders
router.get("/farmer-orders", protect, getFarmerOrders); // farmer’s received orders
router.put("/:id/status", protect, updateOrderStatus); // update status
router.delete("/:id", protect, deleteOrder); // delete order


export default router;
