const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const Result = mongoose.model("ResultVote", ResultSchema);


