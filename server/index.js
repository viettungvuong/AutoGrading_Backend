const { runDatabase } = require("./controllers/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
runDatabase().catch(console.dir);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
