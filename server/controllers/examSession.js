const ExamSession = require("../models/examSession");

const getAllSessionsOfUser = async (userEmail) => {
  ExamSession.find({ user: userEmail })
    .populate("user")
    .exec((err, sessions) => {
      if (err) {
        return null;
      }
      console.log(sessions);
      return sessions;
    });
};

module.exports = {
  getAllSessionsOfUser,
};
