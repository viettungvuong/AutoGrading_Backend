const ExamSession = require("../models/examSession");
const getAllSessionsOfUser = (userEmail) => {
  ExamSession.find({ user: userEmail })
    .populate("user")
    .exec((err, sessions) => {
      if (err) {
        return null;
      }
      return sessions;
    });
};

module.exports = {
  getAllSessionsOfUser,
};
