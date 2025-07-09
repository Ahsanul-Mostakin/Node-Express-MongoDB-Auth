const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3002;

// create product schema
const productSchema = new mongoose.Schema({
  tittle: String,

  price: Number,
  describtion: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create Product model
const Product = mongoose.model("Products", productSchema);

// mongoose
//   .connect("mongodb://127.0.0.1:27017/testProductDB")
//   .then(() => console.log("db is connected"))
//   .catch((error) => {
//     console.log("db is not connected");
//     console.log(error);
//     process.exit(1);
//   });

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testProductDB");
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error.message);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("welcome to home page!");
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
