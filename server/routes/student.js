const express = require("express");
const router = express.Router();

const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    // lay moi entries trong bang Student
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  // them student
  try {
    const { name, studentId } = req.body;
    const student = new Student({
      _id: ObjectId(studentId),
      name: name,
      studentId: studentId,
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
