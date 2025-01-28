require("./tracing");

const express = require("express");
const mongoose = require("./db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = 3101;

app.listen(PORT, () => {
  console.log(`Product API running on http://localhost:${PORT}`);
});
