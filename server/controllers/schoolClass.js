const SchoolClass = require("../models/schoolClass");
const Student = require("../models/student");
const User = require("../models/user");

const studentAffiliateUser = async (userId) => {
  // tim object student co lien ket truc tiep voi user
  const findStudent = await Student.aggregate([
    {
      $lookup: {
        from: "users", // Name of the collection to join with
        localField: "user", // Field from the exams collection
        foreignField: "_id", // Field from the students collection
        as: "userData", // Alias for the joined student data
      },
    },
    {
      $unwind: "$userData", // Unwind the result array
    },
    {
      $match: {
        "userData.email": userId, // Match based on userId
      },
    },
    {
      $limit: 1, // Limit the result to only one document
    },
  ]);
  if (!findStudent) {
    return res.status(404).json({ error: "Student does not exist" });
  }

  return findStudent[0];
};

const getAllClassesOfUser = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw "User not found";
    }

    if (user.isStudent == false) {
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
      return schoolClasses;
    } else {
      let student = await studentAffiliateUser(userEmail);

      const schoolClasses = await SchoolClass.find({
        students: { $elemMatch: { $eq: student._id } }, // tìm những lớp có lưu học sinh  này
      });

      return schoolClasses;
    }
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
      //console.log(findStudent);
      if (findStudent) {
        res.push(findStudent);
      }
    }
    //console.log(res);
    return res;
  } catch (err) {
    return null;
  }
};

const studentJoinClass = async (code, userId, res) => {
  let student = await studentAffiliateUser(userId);

  const schoolClass = await SchoolClass.findOne({ code: code });

  if (!schoolClass) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  if (schoolClass.students.includes(student._id)) {
    return res
      .status(400)
      .json({ error: "User is already a member of this class" });
  }

  await SchoolClass.findByIdAndUpdate(
    schoolClass._id,
    { $addToSet: { students: student._id } },
    { new: true }
  );

  await Student.findByIdAndUpdate(
    student._id,
    { $addToSet: { schoolClass: schoolClass._id } },
    { new: true }
  );
  return res.status(200).json({ class: schoolClass });
};

module.exports = {
  getAllClassesOfUser,
  studentsOfClass,
  studentJoinClass,
};
