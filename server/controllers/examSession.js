const ExamSession = require("../models/examSession");
const getAllSessionsOfUser = (userEmail) => {
  ExamSession.find({})
    .populate({
      path: "user",
      match: { email: email },
    })
    .exec((err, sessions) => {
      if (err) {
        return null;
      }
      return sessions;
    });
};
