const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: String, required: true }, // Should be a string
  link: { type: String } // Should be a string
});

module.exports = mongoose.model("Project", ProjectSchema);
