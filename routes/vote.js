const express = require("express");
const Vote = require('../models/vote');

const router = express.Router();

router.post("/submit-vote", async (req, res) => {
    const { voteCodes, candidateId, candidateName } = req.body;
    if (!voteCodes || !Array.isArray(voteCodes)) {
        return res.status(400).json({ message: "voteCodes harus berupa array." });
    }

    if (!candidateName || typeof candidateName !== "string") {
        return res.status(400).json({ message: "candidateName harus berupa string." });
    }

    try {
        const results = [];
        for (const voteCode of voteCodes) {
            const existingVote = await Vote.findOne({ voteCode });

            if (existingVote) {
                return res.status(400).json({ message: `Vote code ${voteCode} sudah digunakan.` });
            }
            const vote = new Vote({
                voteCode,
                candidateId,
                candidateName,
                voteCount: 1,
            });
            await vote.save();
            await Vote.updateOne(
                { candidateId }, 
                { $inc: { voteCount: 1 } }
            );

            results.push(vote);
        }
        res.status(201).json({ message: "Votes berhasil dikirim.", results });
    } catch (error) {
        console.error("Error submitting votes:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat menyimpan vote." });
    }
});

module.exports = router;
