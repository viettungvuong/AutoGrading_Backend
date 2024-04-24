const Student = require("../models/student");
const Exam = require("../models/exam");

const calculateStudentAvg = (studentId) => {
  Exam.find({})
    .populate({
      path: "student",
      match: { studentId: studentId },
    })
    .exec((err, exams) => {
      if (err) {
        return null;
      }
      var sum = 0.0;
      const n = exams.length();
      exams.forEach((exam, index) => {
        sum += exam.score;
      });
      return sum / n;
    });
};

const addStudent = async (name, studentId, user = null) => {
  const student = new Student({
    name: name,
    studentId: studentId,
  });
  if (user != null) {
    student.user = user;
  }
  await student.save();
};

module.exports = {
  calculateStudentAvg,
  addStudent,
};
