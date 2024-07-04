const NoteModel = require("../model/noteModel.js");

const addNote = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const user = req.user._id;

    const updatedNote = await NoteModel.findOneAndUpdate(
      { user },
      { $push: { notes: { title, subtitle } } },
      { new: true, upsert: true } // 'upsert' creates the document if it doesn't exist
    );

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNote = async (req, res) => {
  try {
    const notes = await NoteModel.findOne({ user: req.user._id });
    if (!notes) {
      res.status(404).json({ error: "No Notes Created Yet" });
    } else {
      res.status(200).json(notes.notes);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "An error occured" });
  }
};

const updateNote = async (req, res) => {
  const { title, subtitle } = req.body;
  const { userId, noteId } = req.params;
  try {
    const notes = await NoteModel.findOneAndUpdate(
      { user: userId, "notes._id": noteId },
      {
        title,
        subtitle,
      },
      { new: true }
    );
    if (!notes) {
      return res.status(404).json({ error: "Notes not found" });
    }

    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error updating notes" });
  }
};

const deleteNote = async (req, res) => {
  const { userId, noteId } = req.params;
  try {
    const notes = await NoteModel.findOneAndDelete({
      user: userId,
      "notes._id": noteId,
    });
    if (!notes) {
      return res.status(404).json({ error: "Notes not found" });
    }

    res.status(200).json({ message: "Notes deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error deleting Notes" });
  }
};

module.exports = { addNote, getNote, updateNote, deleteNote };
