const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/orders";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;