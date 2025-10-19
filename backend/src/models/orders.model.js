import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.ObjectId,
    ref: "Crop",
    required: true
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  farmer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"]
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Delivered"],
    default: "Pending"
  },
  statusHistory: [
    {
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Delivered"]
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
