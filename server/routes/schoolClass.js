const express = require("express");
const router = express.Router();

const SchoolClass = require("../models/schoolClass");
const ClassController = require("../controllers/schoolClass");

router.get("/:email", async (req, res) => {
  console.log(req.params.email);
  const classes = await ClassController.getAllClassesOfUser(req.params.email);
  return res.json({ classes: classes }); // tra dang json
});

router.get("/byId/:classId", async (req, res) => {
  const students = await ClassController.studentsOfClass(req.params.classId);
  return res.json({ students: students });
});

module.exports = router;
