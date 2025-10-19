import Order from "../models/orders.model.js"
import Crop from "../models/crops.model.js";
import mongoose from "mongoose";

// ✅ Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { cropId, quantity } = req.body;
    const buyerId = req.user._id;

    // ✅ Restrict farmers from buying crops
    if (req.user.role === "farmer") {
      return res.status(403).json({
        success: false,
        message: "Farmers cannot place orders",
      });
    }

    // ✅ Find crop
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({ success: false, message: "Crop not found" });
    }

    // ✅ Prevent a farmer from buying their own crop
    if (crop.farmer.toString() === buyerId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot buy your own crop",
      });
    }

    // ✅ Check quantity
    if (crop.quantity < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient crop quantity" });
    }

    // ✅ Calculate total
      const totalPrice = crop.pricePerUnit * quantity;


    // ✅ Create order
    const order = await Order.create({
      crop: crop._id,
      buyer: buyerId,
      farmer: crop.farmer,
      quantity,
      totalPrice,
    });

    // ✅ Reduce available quantity
    crop.quantity -= quantity;
    await crop.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get all orders placed by logged-in user (buyer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("crop", "name pricePerUnit location")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all orders received by a farmer
export const getFarmerOrders = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id }).select("_id");
    const cropIds = crops.map((c) => c._id);

    const orders = await Order.find({ crop: { $in: cropIds } })
      .populate("crop", "name pricePerUnit")
      .populate("buyer", "name email");

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update order status (for admin or farmer)

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid order ID" });

    const validStatuses = ["Pending", "Accepted", "Rejected", "Delivered"];
    if (!validStatuses.includes(status))
      return res.status(400).json({ success: false, message: "Invalid status value" });

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({ status: order.status, updatedAt: new Date() });

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Delete an order (optional)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    await order.deleteOne();
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFarmerAnalytics = async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Total orders for this farmer
    const totalOrders = await Order.countDocuments({ farmer: farmerId });

    // Total revenue for this farmer
    const totalRevenueAgg = await Order.aggregate([
      { $match: { farmer: Order.db.bson_serializer.ObjectId(farmerId) } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

    // Count orders by status for this farmer
    const ordersByStatusAgg = await Order.aggregate([
      { $match: { farmer: Order.db.bson_serializer.ObjectId(farmerId) } },
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
