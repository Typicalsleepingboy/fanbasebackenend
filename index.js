const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const voteRoutes = require("./routes/vote");
const connectDB = require('./config/database');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/vote", voteRoutes);

app.get("/", (req, res) => {
  const logMessage = `Welcome message sent to ${req.ip}.`;
  res.send({
    message: "Where are you going bitch?",
    author: "https://github.com/typicalsleepingboy",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
