const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  output: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  input: {
    type: String,
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Note",
  },
});

const code = mongoose.model("Code", codeSchema);
module.exports = code;
