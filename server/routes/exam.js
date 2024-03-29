const express = require("express");
const router = express.Router();

const Exam = require("../models/exam");
const ExamController = require("../controllers/exam");

// khong up le Exam len duoc ma Exam luon phu thuoc vao ExamSession
// router.post("/", async (req, res) => {
//   // them exam
//   try {
//     const { studentId, score } = req.body;
//     const student = await Exam.findOne({ _id: studentId });
//     if (!student) {
//       return res.status(404).json({ error: "Student not found" });
//     }
//     const newExam = new Exam({ student, score });
//     await newExam.save();
//     res.status(201).json(newExam);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create new exam entry" });
//   }
// });

router.get("/:studentId", async (req, res) => {
  try {
    await ExamController.getAllExamsOfStudent(req.params.studentId);
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
