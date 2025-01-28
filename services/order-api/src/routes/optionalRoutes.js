const express = require("express");
const checkStock = require("../client/product-api");
const router = express.Router();

router.get("/health", async (req, res) => {
  res.json({ status: "Order API is working" });
});

router.get("/metrics", async (req, res) => {
  res.json({ status: "Order API is working" });
});

router.get("/healthz", async (req, res) => {
  res.json({ status: "Order API is working" });
});

module.exports = router;
