const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");

// @desc    Post a New Note
// @route   /services/note
// @access  Private
const postNote = asyncHandler(async (req, res) => {
  const { title, folder, text } = req.body;

  //   Get user
  const user = await User.findById(req.user.id);

  const existNote = await Note.findOne({
    user: user._id,
    title: title,
    folder: folder,
  });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (!title) {
    res.status(400);
    throw new Error("Please add a title");
  }
  if (existNote) {
    const note = await Note.findByIdAndUpdate(existNote._id, { text: text });
    res.status(200).json(note);
  } else {
    const note = await Note.create({
      title,
      folder,
      text,
      user: user._id,
    });
    res.status(201).json(note);
  }
});

// @desc    Get notes by userId
// @route   /services/notes
// @access  Private
const getNotesbyId = asyncHandler(async (req, res) => {
  try {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const notes = await Note.find({ user: req.user.id });

    res.status(200).json(notes);
    //   const notes = await Note.find({ user });
    //   res.status(200).json(notes);
  } catch (error) {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    Get user notes
// @route   /services/note
// @access  Private
const getNotebyNoteId = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(note);
});

const editFolderName = asyncHandler(
  async ({ query: { user, newname, oldname } }, res) => {
    try {
      console.log(user);
      const loggedinUser = await User.find({ user });
      if (!loggedinUser) {
        res.status(401);
        throw new Error("User not found");
      }
      const notes = await Note.updateMany(
        { folder: oldname, loggedinUser },
        { $set: { folder: newname } }
      );

      res.status(200).json(notes);
    } catch (error) {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

const editNoteName = asyncHandler(
  async ({ query: { user, folder, newname, oldname } }, res) => {
    try {
      console.log(user);
      const loggedinUser = await User.find({ user });
      if (!loggedinUser) {
        res.status(401);
        throw new Error("User not found");
      }
      const notes = await Note.updateOne(
        { title: oldname, folder: folder, loggedinUser },
        { $set: { title: newname } }
      );

      res.status(200).json(notes);
    } catch (error) {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

const deleteFolder = asyncHandler(
  async ({ query: { user, foldername } }, res) => {
    try {
      const loggedinUser = await User.find({ user });
      if (!loggedinUser) {
        res.status(401);
        throw new Error("User not found");
      }
      const notes = await Note.deleteMany({ folder: foldername, user });

      res.status(200).json(notes);
    } catch (error) {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

const deleteNote = asyncHandler(
  async ({ query: { user, foldername, notename } }, res) => {
    try {
      const loggedinUser = await User.find({ user });
      if (!loggedinUser) {
        res.status(401);
        throw new Error("User not found");
      }
      const notes = await Note.deleteOne({
        folder: foldername,
        title: notename,
        loggedinUser,
      });

      res.status(200).json(notes);
    } catch (error) {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

const changeFav = asyncHandler(
  async ({ query: { user, foldername, notename, faviorite } }, res) => {
    try {
      var isTrueSet = !(faviorite.toLowerCase() === "true");
      const loggedinUser = await User.find({ user });
      if (!loggedinUser) {
        res.status(401);
        throw new Error("User not found");
      }
      const notes = await Note.updateOne(
        { title: notename, folder: foldername, loggedinUser },
        { $set: { favourite: isTrueSet } }
      );
      res.status(200).json(notes);
    } catch (error) {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

const getNotebyName = asyncHandler(
  async ({ query: { user, notename } }, res) => {
    try {
      // Get user using the id in the JWT
      const loggedinUser = await User.find({ user });
      if (!loggedinUser) {
        res.status(401);
        throw new Error("User not found");
      }
      // const notes = await Note.find({"title": {
      //   "$regex": notename,
      //   "$options": "i"
      // },loggedinUser});
      const notes = await Note.find({
        title: { $regex: notename, $options: "-i" },
        user,
      });

      res.status(200).json(notes);
      //   const notes = await Note.find({ user });
      //   res.status(200).json(notes);
    } catch (error) {
      res.status(400);
      throw new Error("User not found");
    }
  }
);

module.exports = {
  getNotesbyId,
  postNote,
  getNotebyNoteId,
  editFolderName,
  deleteFolder,
  changeFav,
  editNoteName,
  deleteNote,
  getNotebyName,
};
