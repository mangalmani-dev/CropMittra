import Crop from "../models/crops.model.js"

export const addCrops = async (req, res) => {
  try {
    const { name, description, cropType, pricePerUnit, unitType, quantityAvailable, location, harvestDate } = req.body;

if (
  !name ||
  !cropType ||
  pricePerUnit === undefined ||
  !unitType ||
  quantityAvailable === undefined ||
  !location
) {
  return res.status(400).json({ success: false, message: "All required fields must be provided" });
}


    const farmer = req.user._id;

    const crop = await Crop.create({
      name,
      description,
      cropType,
      pricePerUnit,
      unitType,
      quantityAvailable,
      farmer,
      location,
      harvestDate,
      image: req.file ? req.file.path : null// save uploaded image path
    });

    res.status(201).json({ success: true, crop });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getMyCrops = async (req, res) => {
  try {
    const farmerId = req.user._id; // from protect middleware

    const crops = await Crop.find({ farmer: farmerId })
      .populate("farmer", "name email"); // optional, to include farmer info

    res.status(200).json({
      success: true,
      count: crops.length,
      crops
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// controllers/crops.controllers.js
export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params; // crop ID from URL
    const farmerId = req.user._id; // authenticated user ID

    // Find the crop
    const crop = await Crop.findById(id);

    if (!crop) {
      return res.status(404).json({ success: false, message: "Crop not found" });
    }

    // Ensure only the farmer who owns it can update
    if (crop.farmer.toString() !== farmerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this crop",
      });
    }

    // Update only the fields that are passed in req.body
    const { name, description, cropType, pricePerUnit, unitType, quantityAvailable, location, harvestDate, image } = req.body;

    if (quantityAvailable < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    // Update values if provided
    if (name) crop.name = name;
    if (description) crop.description = description;
    if (cropType) crop.cropType = cropType;
    if (pricePerUnit) crop.pricePerUnit = pricePerUnit;
    if (unitType) crop.unitType = unitType;
    if (quantityAvailable !== undefined) crop.quantityAvailable = quantityAvailable;
    if (location) crop.location = location;
    if (harvestDate) crop.harvestDate = harvestDate;
    if (image) crop.image = image;

    await crop.save();

    res.status(200).json({
      success: true,
      message: "Crop details updated successfully",
      crop,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/crops/:id
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user._id; // assuming JWT middleware adds req.user

    const crop = await Crop.findById(id);

    if (!crop) {
      return res.status(404).json({ success: false, message: "Crop not found" });
    }

    // ensure only the farmer who created it can delete
    if (crop.farmer.toString() !== farmerId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this crop" });
    }

    await crop.deleteOne();
    res.status(200).json({ success: true, message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
