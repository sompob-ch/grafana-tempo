const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }, // ใช้ quantity แทน stock
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;