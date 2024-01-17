const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  postCode,
  getCodebyOutput,
  getNumOfCode,
} = require("../controllers/codeController");

router.get("/service/code/:output", protect, getCodebyOutput);
router.post("/service/code", protect, postCode);
router.get("/service/code", protect, getNumOfCode);
module.exports = router;
