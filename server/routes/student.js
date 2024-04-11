const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const ExamSession = require("../models/examSession");
const ExamSessionController = require("../controllers/examSession");
const Exam = require("../models/exam");

// router.get("/", async (req, res) => {
//   try {
//     // lay moi entries trong bang Student
//     const students = await Student.find({});
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/:email", async (req, res) => {
  // trả về các student theo user
  try {
    const sessions = await ExamSessionController.getAllSessionsOfUser(
      req.params.email
    );
    const studentNames = new Set();
    for (const session of sessions) {
      for (const exam of session.exams) {
        const examData = await Exam.findById(exam._id);
        const student = await Student.findById(examData.student._id);
        studentNames.add(student.name);
      }
    }
    console.log(studentNames);
    return res.status(200).json({ students: [...studentNames] });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ student: "null" });
    } else {
      return res.status(200).json(student);
    }
  } catch (err) {}
});

router.post("/", async (req, res) => {
  // them student
  try {
    const { name, studentId } = req.body;
    const student = new Student({
      name: name,
      studentId: studentId,
    });
    await student.save();
    res.status(200).json({ id: student._id }); // tra ve id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
