const express = require("express");
const Admin = require("../models/admin");
const csvGenerator = require("../utils/csvGenerator");
const Vote = require("../models/vote");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    res.status(200).json({ message: "Login successful", admin });
  } else {
    res.status(401).json({ message: "Login Failed please input correct password" });
  }
});


router.get("/candidates", (req, res) => {
  const filePath = path.join(__dirname, "../json/cand.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read candidates file", error: err });
    }

    try {
      const candidates = JSON.parse(data);
      res.status(200).json(candidates);
    } catch (parseError) {
      res.status(500).json({ message: "Failed to parse candidates data", error: parseError });
    }
  });
});


router.get("/votes", async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: "$candidateName",
          voteCount: { $sum: 1 },
        }
      },
      {
        $sort: { voteCount: -1 }
      }
    ]);

    res.status(200).json(votes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ message: "Failed to fetch votes data" });
  }
});


router.get("/results/csv", async (req, res) => {
  try {
    const votes = await Vote.find();
    const csv = csvGenerator(votes);

    res.header("Content-Type", "text/csv");
    res.attachment("results.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate CSV", error });
  }
});


module.exports = router;
