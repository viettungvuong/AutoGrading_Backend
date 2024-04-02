const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const ExamRoute = require("./routes/exam");
const StudentRoute = require("./routes/student");
const ExamSessionRoute = require("./routes/examSession");
const LoginRoute = require("./routes/login");

// ket noi toi mongodb
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

app.use(bodyParser.json()); //middleware to interpret json

app.use("/login", LoginRoute);
app.use("/session", ExamSessionRoute);
app.use("/exam", ExamRoute);
app.use("/student", StudentRoute);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
