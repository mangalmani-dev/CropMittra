import mongoose from "mongoose";
import Order from "../models/orders.model.js"

// 1️⃣ All Orders Analytics

export const getOrderAnalytics = async (req, res) => {
  try {
    // Total number of orders
    const totalOrders = await Order.countDocuments();

    // Total revenue
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

    // Orders by status
    const ordersByStatusAgg = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const ordersByStatus = {};
    ordersByStatusAgg.forEach(o => {
      ordersByStatus[o._id] = o.count;
    });

    res.status(200).json({
      success: true,
      totalOrders,
      totalRevenue,
      ordersByStatus
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2️⃣ Farmer-specific Analytics

export const getFarmerAnalytics = async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({ success: false, message: "Invalid farmer ID" });
    }

    const farmerObjectId = new mongoose.Types.ObjectId(farmerId);

    // Total orders for this farmer
    const totalOrders = await Order.countDocuments({ farmer: farmerObjectId });

    // Total revenue for this farmer
    const totalRevenueAgg = await Order.aggregate([
      { $match: { farmer: farmerObjectId } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

    // Orders by status
    const ordersByStatusAgg = await Order.aggregate([
      { $match: { farmer: farmerObjectId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const ordersByStatus = {};
    ordersByStatusAgg.forEach(o => {
      ordersByStatus[o._id] = o.count;
    });

    res.status(200).json({
      success: true,
      totalOrders,
      totalRevenue,
      ordersByStatus
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};