const express = require("express");
const router = express.Router();

const ExamSession = require("../models/examSession");
const ExamSessionController = require("../controllers/examSession");

router.get("/:email", async (req, res) => {
  const sessions = await ExamSessionController.getAllSessionsOfUser(
    req.params.email
  );
  return res.json(sessions);
});

router.post("/", async (req, res) => {
  // exams la mang chua cac entry o dang {studentId, score}
  try {
    const { exams, userId } = req.body;
    if (!exams || !userId) {
      return res
        .status(400)
        .json({ error: "Both examIds and userId are required." });
    }
    let savedExams = [];
    for (var i = 0; i < exams.length; i++) {
      var entry = exams[i]; // bai thi

      const { studentId, score } = entry;
      const student = await Exam.findOne({ _id: studentId });
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      const newExam = new Exam({ student, score });
      await newExam.save();
      savedExams.push(newExam); //them _id de refer trong examSession
    }

    const user = await User.findOne({ _id: userId }); // tim user cho examSession
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const examSession = new ExamSession({
      exams: savedExams,
      user: user,
    });

    const savedExamSession = await examSession.save();

    res.status(201).json(savedExamSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
