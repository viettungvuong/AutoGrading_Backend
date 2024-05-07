const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws"); // Import WebSocket library
const wss = new WebSocket.Server({ server }); // Create WebSocket server
const ExamRoute = require("./routes/exam");
const StudentRoute = require("./routes/student");
const ExamSessionRoute = require("./routes/examSession");
const LoginRoute = require("./routes/login");
const ClassRoute = require("./routes/schoolClass");

// Socket.io implementation
// const { Server } = require("socket.io");
// const io = new Server(server);

// Ket noi toi mongodb
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// io.on("connection", (socket) => {
//   console.log("A client connected");

//   socket.on("connect", () => {
//     console.log("Client connected to server");
//   });
// });

wss.on("connection", (ws) => {
  console.log("A client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on("close", () => {
    console.log("A client disconnected");
  });
});

db.once("open", () => {
  console.log("Connected to MongoDB");

  // Change stream, bao thay doi
  const collection = db.collection("exams");
  const changeStream = collection.watch();

  // Khi co exam moi thi truyen qua WebSocket de bao
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      console.log("New exam inserted:", change.fullDocument);
      // Emit the new exam data to all WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              event: "newExam",
              exam: change.fullDocument,
            })
          );
        }
      });
    }
  });
});

app.use(bodyParser.json()); // Middleware to interpret JSON

app.use("/login", LoginRoute);
app.use("/session", ExamSessionRoute);
app.use("/exam", ExamRoute);
app.use("/student", StudentRoute);
app.use("/class", ClassRoute);

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = {
  db,
};
