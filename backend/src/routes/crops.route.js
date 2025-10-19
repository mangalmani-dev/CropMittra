import express from "express"
import { addCrops,  deleteCrop,  getMyCrops, updateCrop } from "../controllers/crops.controllers.js"
import { protect } from "../middleware/authMiddleware.js"

const router =express.Router()
// to add the crops
router.post("/",protect,addCrops)
// to get all the crops listed by farmers
router.get("/my-crops", protect, getMyCrops);
// for updating crops details
router.put("/:id", protect, updateCrop);
// to delete the crops 
router.delete("/:id", protect, deleteCrop);

export default router