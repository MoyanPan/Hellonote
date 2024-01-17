const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Code = require("../models/codeModel");
const Note = require("../models/noteModel");
// @desc    Post a New Code
// @route   /services/code
// @access  Private
const postCode = asyncHandler(async (req, res) => {
  const { content, output, input, userId, noteId } = req.body;

  //   Get user
  const user = await User.findById(mongoose.Types.ObjectId(userId.toString()));
  const note = await Note.findById(mongoose.Types.ObjectId(noteId.toString()));
  const existCode = await Code.findById(req.params.id);
  //   {
  //   content: content,
  //   output: output,
  //   input: input,
  //   user: userId,
  // });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (note.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (!content) {
    res.status(400);
    throw new Error("Please add the code");
  }
  if (existCode) {
    const code = await Code.findByIdAndUpdate(req.params.id, {
      content: content,
      output: output,
      input: input,
      note: noteId,
      user: userId,
    });
    res.status(200).json(code);
  } else {
    const code = await Code.create({
      content,
      output,
      input,
      note: noteId,
      user: userId,
    });
    res.status(201).json(code);
  }
});

// @desc    Get code by output
// @route   /service/code/:output
// @access  Private
const getCodebyOutput = asyncHandler(async (req, res) => {
  try {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const codes = await Code.find({
      user: req.user.id,
      output: { $regex: req.params.output },
    });

    res.status(200).json(codes);
  } catch (error) {
    res.status(400);
    throw new Error("Code not found");
  }
});

const getNumOfCode = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const codes = await Code.find({
      user: req.user.id,
    });
    const numOfCode = codes.length;
    res.status(200).json(numOfCode);
  } catch (error) {
    res.status(400);
    throw new Error("Code not found");
  }
});
module.exports = {
  getCodebyOutput,
  postCode,
  getNumOfCode,
};
