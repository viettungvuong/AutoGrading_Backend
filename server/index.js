const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const ExamRoute = require("./routes/exam");
const StudentRoute = require("./routes/student");
const ExamSessionRoute = require("./routes/examSession");
const LoginRoute = require("./routes/login");
const ClassRoute = require("./routes/schoolClass");

// ket noi toi mongodb
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");

  // change stream, bao thay doi
  const collection = db.collection("exam");
  const changeStream = collection.watch();

  // khi co exam moi thi truyen qua socket de bao
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      console.log("New exam inserted:", change.fullDocument);
      io.emit("newExam", change.fullDocument);
    }
  });
});

module.exports = {
  db,
};

app.use(bodyParser.json()); //middleware to interpret json

app.use("/login", LoginRoute);
app.use("/session", ExamSessionRoute);
app.use("/exam", ExamRoute);
app.use("/student", StudentRoute);
app.use("/class", ClassRoute);

// const userSocketMap = new Map(); // dung cho socket
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // socket de dang nhap
//   socket.on("login", (userId) => {
//     console.log(`User ${userId} logged in`);
//     userSocketMap.set(userId, socket.id);
//   });

//   // Handle custom events (chat message, etc.)
//   socket.on("exam", (data) => {
//     const recipientStudentId = data.studentId;
//     const recipientSocket = userSocketMap.get(recipientStudentId);
//     if (recipientSocket) {
//       // gui thong tin toi hoc sinh
//       io.emit("exam", data);
//     }
//   });

//   // ngat ket noi
//   socket.on("disconnect", () => {
//     userSocketMap.forEach((value, key) => {
//       if (value === socket.id) {
//         userSocketMap.delete(key);
//       }
//     });
//     console.log("A user disconnected");
//   });
// });

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
