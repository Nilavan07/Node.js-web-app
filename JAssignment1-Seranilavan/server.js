const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const methodOverride = require("method-override");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import models
const Project = require("./models/Project");
const Skill = require("./models/Skill");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Set Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected!"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Routes
app.use("/admin", require("./routes/admin"));
app.use("/api", require("./routes/api"));

// Home Page
app.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();

    res.render("portfolio", { projects, skills }); // Render portfolio page
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server Error");
  }
});

// Portfolio Page
app.get("/portfolio", async (req, res) => {
  try {
    const projects = await Project.find() || [];
    const skills = await Skill.find() || [];

    res.render("portfolio", { projects, skills });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server Error");
  }
});

// Add Project Page (Form)
app.get("/admin/projects/add", (req, res) => {
  res.render("addProject");
});

//Delete

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(methodOverride("_method")); // Enable DELETE and PUT methods via forms

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
