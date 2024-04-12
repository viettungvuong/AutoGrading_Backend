const Student = require("../models/student");
const Exam = require("../models/exam");

const getAllExamsOfStudent = async (studentId) => {
  try {
    console.log(studentId);
    const exams = await Exam.aggregate([
      {
        $lookup: {
          from: "students", // Name of the collection to join with
          localField: "student", // Field from the exams collection
          foreignField: "_id", // Field from the students collection
          as: "studentData", // Alias for the joined student data
        },
      },
      {
        $unwind: "$studentData", // Unwind the result array
      },
      {
        $match: {
          "studentData.studentId": studentId, // Match based on studentId
        },
      },
    ]);
    return exams;
  } catch (error) {
    console.error("Error finding exams:", error);
    return null;
  }
};

module.exports = {
  getAllExamsOfStudent,
};
