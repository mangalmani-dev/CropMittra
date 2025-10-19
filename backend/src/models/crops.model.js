import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Crop name is required.'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    cropType: {
        type: String,
        required: [true, 'Crop type is required.'],
        enum: ['Grain', 'Vegetable', 'Fruit', 'Spice', 'Other']
    },
    pricePerUnit: {
        type: Number,
        required: [true, 'Price per unit is required.'],
        min: [0, 'Price cannot be negative.']
    },
    unitType: { 
        type: String,
        required: [true, 'Unit type is required.']
    },
    quantityAvailable: {
        type: Number,
        required: [true, 'Initial quantity is required.'],
        min: [0, 'Quantity cannot be negative.'],
        default: 0
    },
    farmer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Crop must belong to a farmer.']
    },
    location: {
        type: String,
        required: [true, 'Location/Farm name is required.']
    },
    harvestDate: {
        type: Date,
        required: false
    },
    image: {
  type: String, // store image path or URL
  required: false,
  default:null
}
}, { 
    timestamps: true
});

// ✅ Export as default for ES Module
export default mongoose.model('Crop', CropSchema);
