const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// GET: Admin Dashboard
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render("admin", { projects, skills }); 
  } catch (err) {
    console.error("Error fetching admin data:", err);
    res.status(500).send("Server Error");
  }
});


// GET: Add Project Page
router.get("/projects/add", (req, res) => {
  res.render("addProject"); 
});

// POST: Add a New Project
router.post("/projects/add", async (req, res) => {
  try {
    console.log("Received Data:", req.body); 

    const newProject = new Project({
      name: req.body.name,
      description: req.body.description,
      technologies: req.body.technologies, 
      link: req.body.link,
    });

    await newProject.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).send("Server Error");
  }
});



// ✏️ GET: Edit Project Page
router.get("/projects/edit/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("Project not found");
    res.render("editProject", { project });
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).send("Server Error");
  }
});

// POST: Update Project
router.post("/projects/edit/:id", async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).send("Server Error");
  }
});

// Delete Project Route
router.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect("/admin"); // Ensure it redirects back
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).send("Server Error");
  }
});




// GET: Add Skill Page
router.get("/skills/add", (req, res) => {
  res.render("addSkill"); // Ensure addSkill.pug exists
});

//POST: Add a New Skill
router.post("/skills/add", async (req, res) => {
  try {
    const newSkill = new Skill({
      name: req.body.name,
      proficiency: req.body.proficiency,
    });

    await newSkill.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding skill:", err);
    res.status(500).send("Server Error");
  }
});

// ✏️ GET: Edit Skill Page
router.get("/skills/edit/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).send("Skill not found");
    res.render("editSkill", { skill });
  } catch (err) {
    console.error("Error fetching skill:", err);
    res.status(500).send("Server Error");
  }
});

// POST: Update Skill
router.post("/skills/edit/:id", async (req, res) => {
  try {
    await Skill.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).send("Server Error");
  }
});

// DELETE: Delete Skill
router.delete("/skills/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect("/admin"); // Ensures the page reloads
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
