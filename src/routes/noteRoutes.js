const {
  addNote,
  getNote,
  deleteNote,
  updateNote,
} = require("../controller/noteController");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.post("/addNotes", auth, addNote);
router.get("/getNotes", auth, getNote);
router.put("/updateNote/:userId/:noteId", auth, updateNote);
router.delete("/deleteNote/:userId/:noteId", auth, deleteNote);

module.exports = router;
