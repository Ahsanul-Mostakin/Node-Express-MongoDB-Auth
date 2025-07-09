const express = require("express");
const mongoose = require("mongoose");
// The 'title' import from 'process' is unnecessary and can be removed.
// const { title } = require("process");
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
  rating: {
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
      rating: req.body.rating,
      description: req.body.description,
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
        message: "product not found with this id", // Changed message for clarity
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
    // findByIdAndDelete returns the deleted document, not a result object with deletedCount.
    // We check if the document was found and deleted by checking if 'product' is not null.
    const product = await Product.findByIdAndDelete(id);

    if (product) {
      // If product is not null, it means a document was found and deleted.
      res.status(200).send({
        success: true,
        message: "deleted single product successfully",
        data: product, // You might want to return the deleted product or just a success message.
      });
    } else {
      res.status(404).send({
        success: false,
        message: "product not found with this id", // Changed message for clarity
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
    const id = req.params.id; // Correctly get the ID from req.params
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          // Use req.body for update values, not req.params
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          rating: req.body.rating,
        },
      },
      { new: true } // Returns the modified document rather than the original.
    );

    // findByIdAndUpdate returns the updated document or null if not found.
    // Check if updatedProduct is not null to determine if an update occurred.
    if (updatedProduct) {
      res.status(200).send({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Product not found with this id", // Changed message for clarity
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
