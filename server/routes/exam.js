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
  // lay tat ca exam cua student
  try {
    const exams = await ExamController.getAllExamsOfStudent(
      req.params.studentId
    );
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate(student);
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
