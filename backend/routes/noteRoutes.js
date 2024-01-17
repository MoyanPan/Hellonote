const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getNotesbyId,
  postNote,
  getNotebyNoteId,
  editFolderName,
  deleteFolder,
  changeFav,
  editNoteName,
  deleteNote,
  getNotebyName
} = require("../controllers/noteController");

router.get("/service/notes", protect, getNotesbyId);
router.get("/service/note/:id", protect, getNotebyNoteId);
router.post("/service/note", protect, postNote);
router.post("/service/editfolder/", protect, editFolderName);
router.post("/service/deletefolder/", protect, deleteFolder);
router.post("/service/changeFav/", protect, changeFav);
router.post("/service/editnote/", protect, editNoteName);
router.post("/service/deletenote/", protect, deleteNote);
router.get("/service/getNotebyName/", protect, getNotebyName);

module.exports = router;
