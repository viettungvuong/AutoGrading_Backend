const express = require("express");
const router = express.Router();

const ExamSession = require("../models/examSession");
const express = require("express");
const ExamSessionController = require("../controllers/examSession");

router.get("/:email", async (req, res) => {
  const sessions = await ExamSessionController.getAllSessionsOfUser(
    req.params.email
  );
  return res.status(201).json(sessions);
});
