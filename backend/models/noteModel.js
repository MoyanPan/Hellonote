const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  folder: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: () => Date.now(),
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const note = mongoose.model("Note", noteSchema);
module.exports = note;
