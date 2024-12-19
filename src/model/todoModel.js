const mongoose = require("mongoose");

let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

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
          required: false,
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
        deadline: {
          type: Date,
          default: tomorrow,
        },
      },
    ],
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
