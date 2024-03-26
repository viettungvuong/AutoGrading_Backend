const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const ExamRoute = require("./routes/exam");
const StudentRoute = require("./routes/student");

// ket noi toi mongodb
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

app.route("/exam", ExamRoute);
app.route("/student", StudentRoute);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
