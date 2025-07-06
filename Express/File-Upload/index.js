const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose"); // fixed import
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8005;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/usersTestDB");
    console.log("Database is connected!");
  } catch (error) {
    console.log("Database is not connected!");
    console.log(error);
    process.exit(1);
  }
};

// Define schema & model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

// model

const User = mongoose.model("User", userSchema);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// Parse form data (for req.body.name)
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get("/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

// Handle file upload and save user to DB
app.post("/register", upload.single("image"), async (req, res) => {
  if (!req.file || !req.body.name) {
    return res.status(400).send("Name and file are required.");
  }

  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename, // store filename, not full path
    });

    await newUser.save();
    res.status(200).send("User registered and file uploaded successfully.");
  } catch (error) {
    res.status(500).send("Error saving to database.");
    console.error(error);
  }
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  await connectDB();
});
