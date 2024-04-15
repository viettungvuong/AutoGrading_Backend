const SchoolClass = require("../models/schoolClass");
const Student = require("../models/student");

const getAllClassesOfUser = async (userEmail) => {
  try {
    const schoolClasses = await SchoolClass.aggregate([
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "user", // The field in ExamSession collection
          foreignField: "_id", // The field in User collection
          as: "user", // The alias for the joined documents
        },
      },
      { $unwind: "$user" }, // Unwind the array created by the $lookup stage
      { $match: { "user.email": userEmail } }, // match email
    ]);
    console.log(schoolClasses);
    return schoolClasses;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const studentsOfClass = async (classId) => {
  try {
    const schoolClass = await SchoolClass.findById(classId);
    if (!schoolClass) {
      throw "No class exists";
    }

    const res = [];
    for (const student of schoolClass.students) {
      const findStudent = await Student.findById(student._id);
      console.log(findStudent);
      if (findStudent) {
        res.push(findStudent);
      }
    }
    console.log(res);
    return res;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAllClassesOfUser,
  studentsOfClass,
};
