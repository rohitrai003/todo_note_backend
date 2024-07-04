const {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  isCompletedToggle,
} = require("../controller/todoController.js");
const router = require("express").Router();
const auth = require("../middleware/auth.js");

router.post("/addTodo", auth, addTodo);
router.get("/getTodo", auth, getTodo);
router.put("/updateTodo/:userId/:todoId", auth, updateTodo);
router.put("/toggleIsCompleted/:userId/:todoId", isCompletedToggle);
router.delete("/deleteTodo/:userId/:todoId", auth, deleteTodo);

module.exports = router;
