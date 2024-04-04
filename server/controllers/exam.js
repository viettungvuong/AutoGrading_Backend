const Student = require("../models/student");
const Exam = require("../models/exam");

const getAllExamsOfStudent = async (studentId) => {
  try {
    const exams = await Exam.find({ student: studentId })
      .populate("student")
      .exec();
    return exams;
  } catch (error) {
    console.error("Error finding exams:", error);
    return null;
  }
};

module.exports = {
  getAllExamsOfStudent,
};
