// Initialize OpenTelemetry before everything else
require("./tracing");

const express = require("express");
const mongoose = require("./db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

// Use routes
app.use("/api/orders", orderRoutes);
app.use("/", require("./routes/optionalRoutes"));

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});