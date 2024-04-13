const express = require("express");
const router = express.Router();

const SchoolClass = require("../models/schoolClass");
const ClassController = require("../controllers/schoolClass");
const User = require("../models/user");

router.get("/:email", async (req, res) => {
  console.log(req.params.email);
  const classes = await ClassController.getAllClassesOfUser(req.params.email);
  return res.json({ classes: classes }); // tra dang json
});

router.get("/byId/:classId", async (req, res) => {
  const students = await ClassController.studentsOfClass(req.params.classId);
  return res.json({ students: students });
});

router.post("/", async (req, res) => {
  try {
    const { className, classId, userId } = req.body;
    const user = await User.findOne({ email: userId });
    if (!user) {
      throw "User does not exists";
    }
    const schoolClass = new SchoolClass({
      name: className,
      classId: classId,
      user: user._id,
    });
    await schoolClass.save();
    return res.status(200).send("Save successfully");
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
