const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "product title is required"],
    minlength: [3, "minimum length of the product title should be 3"],
    maxlength: [100, "maxlength length of the product title should be 100"],
    trim: true,
  },

  price: {
    type: Number,
    min: [10, "minlength length of the product price should be 10"],
    max: [100, "maxlength length of the product price should be 100"],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Products", productSchema);

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
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
      phone: req.body.phone,
    });

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
    const price = req.query.price;
    const rating = req.query.rating;
    let products;

    if (price && rating) {
      products = await Product.find({
        $or: [{ price: { $gt: price } }, { rating: { $gt: rating } }],
      }).sort({ price: -1 });
    } else {
      products = await Product.find().sort({ price: 1 });
    }

    if (products.length > 0) {
      res.status(200).send({
        success: true,
        message: "return all products",
        data: products,
      });
    } else {
      res.status(404).send({
        success: false,
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
      res.status(404).send({
        success: false,
        message: "product not found with this id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (product) {
      res.status(200).send({
        success: true,
        message: "deleted single product successfully",
        data: product,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "product not found with this id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          rating: req.body.rating,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).send({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Product not found with this id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
