const ExamSession = require("../models/examSession");
const mongoose = require("mongoose");

// lay cac session cua user
const getAllSessionsOfUser = async (userEmail) => {
  try {
    const examSessions = await ExamSession.aggregate([
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
    return examSessions;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  getAllSessionsOfUser,
};
