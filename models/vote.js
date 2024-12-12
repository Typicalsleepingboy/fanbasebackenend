const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voteCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  candidateId: { 
    type: String, 
    required: true 
  },
  used: { 
    type: Boolean, 
    default: true 
  },
  candidateName: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});



module.exports = mongoose.model("Vote", voteSchema);
