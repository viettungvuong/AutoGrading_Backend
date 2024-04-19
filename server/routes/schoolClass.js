const express = require("express");
const router = express.Router();

const SchoolClass = require("../models/schoolClass");
const ClassController = require("../controllers/schoolClass");
const User = require("../models/user");

const { verifyToken } = require("../controllers/auth");

router.use(verifyToken);

router.get("/:email", async (req, res) => {
  console.log(req.params.email);
  const classes = await ClassController.getAllClassesOfUser(req.params.email);
  return res.json({ classes: classes }); // tra dang json
});

router.get("/byId/:classId", async (req, res) => {
  // tim cac hoc sinh cua class
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
      user: user,
    });
    await schoolClass.save();
    return res.status(200).send("Save successfully");
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

// dung code de hoc sinh vao lop hoc
router.post("/join", async (req, res) => {
  try {
    const { code, userId } = req.body;
    const user = await User.findOne({ email: userId });
    if (!user) {
      throw "User does not exist";
    }
    const schoolClass = await SchoolClass.findOne({ code: code });
    if (!schoolClass) {
      throw "Class does not exist";
    }
    if (schoolClass.students.includes(user._id)) {
      throw "User is already a member of this class";
    }
    schoolClass.students.push(user._id);
    await schoolClass.save();
    return res.status(200).send("Joined class successfully");
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

// tao code rieng de gia nhap lop hoc
router.post("/generateCode", async (req, res) => {
  const generateRandomCode = () => {
    return crypto.randomBytes(32).toString("hex");
  };

  try {
    const { classId } = req.body;
    const schoolClass = await SchoolClass.findById(classId);
    if (!schoolClass) {
      throw "Class does not exist";
    }
    const code = generateRandomCode();
    schoolClass.code = code;
    await schoolClass.save();
    return res.status(200).json({ code: code });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

function generateCode() {
  // Replace with your code to generate a unique code
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

module.exports = router;
