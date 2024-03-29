const Student = require("../models/student");
const Exam = require("../models/exam");

const getAllExamsOfStudent = (studentId) => {
  Exam.find({})
    .populate({
      path: "student",
      match: { studentId: studentId },
    })
    .exec((err, exams) => {
      if (err) {
        return null;
      }
      return exams;
    });
};
