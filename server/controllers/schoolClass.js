const SchoolClass = require("../models/schoolClass");
const Student = require("../models/student");
const User = require("../models/user");

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

const studentsOfClass = async (classId, userEmail) => {
  try {
    const schoolClass = await SchoolClass.findOne({
      _id: classId,
      "user.email": userEmail,
    });
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

const studentJoinClass = async (code, userId, res) => {
  // const user = await User.findOne({ email: userId });
  // if (!user) {
  //   return res.status(400).json({ error: "User does not exist" });
  // }
  // if (user.isStudent == false) {
  //   return res.status(400).json({ error: "Not a student" });
  // }
  const student = Student.findOne({})
    .populate({
      path: "user",
      match: { email: userId },
    })
    .then((student) => {
      if (student) {
        console.log("Found student:", student);
      } else {
        console.log("No student found with the given name.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  const schoolClass = await SchoolClass.findOne({ code: code });
  if (!schoolClass) {
    return res.status(400).json({ error: "Class does not exist" });
  }
  if (schoolClass.students.includes(student._id)) {
    return res
      .status(400)
      .json({ error: "User is already a member of this class" });
  }
  schoolClass.students.push(student._id);
  await schoolClass.save();
  return res.status(200).json({ message: "Joining class successfully" });
};

module.exports = {
  getAllClassesOfUser,
  studentsOfClass,
  studentJoinClass,
};
