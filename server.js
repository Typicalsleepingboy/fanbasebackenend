const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const adminRoutes = require("./routes/admin");
const voteRoutes = require("./routes/vote");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/vote", voteRoutes);

app.get("/", (req, res) => {
  const logMessage = `Welcome message sent to ${req.ip}.`;
  res.send({
      message: "Where are you going bitch?",
      author: "https://github.com/typicalsleepingboy",
  });
});

mongoose.connect(process.env.MONGGO_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
