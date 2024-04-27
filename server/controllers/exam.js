const Student = require("../models/student");
const Exam = require("../models/exam");

const getAllExamsOfStudent = async (studentEmail) => {
  try {
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
        $lookup: {
          from: "users", // Name of the collection to join with
          localField: "studentData.user", // Field from the students collection
          foreignField: "_id", // Field from the users collection
          as: "userData", // Alias for the joined user data
        },
      },
      {
        $unwind: "$userData", // Unwind the result array
      },
      {
        $match: {
          "userData.email": studentEmail, // Match based on userEmail
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
