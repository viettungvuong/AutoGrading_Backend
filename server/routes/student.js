const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const ExamSession = require("../models/examSession");

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
  ExamSession.find({})
    .populate("exams")
    .exec((err, sessions) => {
      if (err) {
        return res.status(500).send(err);
      }

      const studentNames = new Set();
      sessions.forEach((session) => {
        // duyệt qua từng session
        session.exams.forEach((exam) => {
          // duyệt qua từng exam
          studentNames.add(exam.student.name); // trong exam có mục student từ đó có name
        });
      });

      return res.status(200).json({ students: [...studentNames] });
    });
});

router.get("/byId/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ student: "null" });
    } else {
      return res.status(200).json({ student: student });
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
