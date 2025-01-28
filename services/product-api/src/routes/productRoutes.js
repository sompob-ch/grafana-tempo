const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Route to check quantity
router.post("/check-quantity", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity >= quantity) {
      return res.json({ inStock: true, availableQuantity: product.quantity });
    } else {
      return res.json({ inStock: false, availableQuantity: product.quantity });
    }
  } catch (error) {
    console.error("Error checking quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;