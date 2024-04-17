const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const ExamSession = require("../models/examSession");
const ExamSessionController = require("../controllers/examSession");
const Exam = require("../models/exam");
const SchoolClass = require("../models/schoolClass");

const { verifyToken } = require("../controllers/auth");

router.use(verifyToken);

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
    ); // đầu tiên là lấy các session của user => các học sinh có liên quan
    const studentNames = new Set();
    for (const session of sessions) {
      for (const exam of session.exams) {
        const examData = await Exam.findById(exam._id);
        const student = await Student.findById(examData.student._id);
        studentNames.add({ name: student.name, studentId: student.studentId });
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
    const { name, studentId, classId } = req.body;
    // const { name, studentId } = req.body;
    const schoolClass = await SchoolClass.findOne({ classId: classId });
    if (!schoolClass) {
      throw "This class does not exists";
    }
    // student = new Student({
    //   name: name,
    //   studentId: studentId,
    //   schoolClass: [schoolClass._id],
    // });
    // await student.save();
    let student = await Student.findOne({ studentId: studentId });
    console.log(student);
    if (!student) {
      student = new Student({
        name: name,
        studentId: studentId,
        // schoolClass: [schoolClass._id],
      });
      await student.save();
    } else {
      let currentClasses = student.schoolClass;
      if (!currentClasses) {
        currentClasses = [];
      }
      currentClasses.push(schoolClass._id);
      await Student.findOneAndUpdate(
        { studentId: studentId },
        { schoolClass: currentClasses }
      ); // update neu da co
    }

    res.status(200).json({ id: student._id }); // tra ve id
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
