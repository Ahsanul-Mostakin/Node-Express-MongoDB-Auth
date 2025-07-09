const express = require("express");
const mongoose = require("mongoose");
const { title } = require("process");
const app = express();

const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
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

app.post("/products", async (req, res) => {
  try {
    // get data from request body

    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    });

    // const productData = await Product.insertMany([
    //   {
    //     title: "iphone 5",
    //     price: 250,
    //     description: "beautiful phone",
    //   },
    //   {
    //     title: "iphone 6",
    //     price: 25,
    //     description: "beautiful phone",
    //   },
    // ]);

    const productData = await newProduct.save();
    res.status(201).send({ productData });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).send({
        success: true,
        message: "return all products",
        data: products,
      });
    } else {
      success: false,
        res.status(404).send({
          message: "products not found",
        });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    if (product) {
      res.status(200).send({
        success: true,
        message: "return single product",
        data: product,
      });
    } else {
      success: false,
        res.status(404).send({
          message: "product not found",
        });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// const loadRegister = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
