const express = require("express");
const Order = require("../models/Order");
const checkStock = require("../client/product-api");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post("/", async (req, res) => {
  const { customerName, product } = req.body;

  try {
    await checkStock(product.productId, product.quantity);
    const newOrder = new Order({ customerName, product });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;