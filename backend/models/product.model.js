const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: [String],
  age: [String],
  clothingCategories: { type: String, required: true },
  color: {
    type: [String],
    required: true,
  },
  material: {
    type: [String],
    required: true,
  },
  description: { type: String, required: true },
  images: {
    type: [String],
    required: true,
  },
  isFeatured: Boolean,
  price: {
    type: Number,
    required: true,
  },
  discount: Number,
  discountPrice: Number,
  discountStart: Date,
  discountEnd: Date,
  tax: Number,
  totalStockQuantity: { type: Number, required: true },
  availableStock: { type: Number, required: true },
  stockStatus: {
    type: String,
    required: true,
    enum: ["In Stock", "Out of Stock"],
  },
});

module.exports = mongoose.model("Product", productSchema);
