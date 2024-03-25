const express = require("express");
const router = express.Router();

const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    // lay moi entries trong bang Student
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
