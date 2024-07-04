const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todo: [
      {
        title: {
          type: String,
          required: true,
        },
        isImportant: {
          type: Boolean,
          default: false,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        createdOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
