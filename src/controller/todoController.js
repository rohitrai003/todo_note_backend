const Todo = require("../model/todoModel.js");

// Create a new todo
const addTodo = async (req, res) => {
  try {
    const { title, isImportant } = req.body;
    const user = req.user._id;

    const updatedTodo = await Todo.findOneAndUpdate(
      { user: user },
      { $push: { todo: { title, isImportant } } },
      { new: true, upsert: true }
    );
    res.status(201).json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creating todo" });
  }
};

// Get all todos for the authenticated user
const getTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.findOne({ user: userId });
    if (!todos) {
      return res
        .status(404)
        .json({ message: "No todos found for this user. You can add now" });
    } else {
      res.status(200).json(todos.todo);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error fetching todos" });
  }
};

const updateTodo = async (req, res) => {
  const { title, isImportant, isCompleted } = req.body;
  const { userId, todoId } = req.params;

  if (!userId || !todoId) {
    return res.status(400).json({ error: "Todo ID and Item ID are required" });
  }

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { user: userId, "todo._id": todoId },
      {
        $set: {
          "todo.$.title": title,
          "todo.$.isImportant": isImportant,
          "todo.$.isCompleted": isCompleted,
        },
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  const { userId, todoId } = req.params;

  try {
    const todoDoc = await Todo.findOne({ user: userId });
    if (!todoDoc) {
      return res.status(404).json({ message: "User not found" });
    }
    const todoItem = todoDoc.todo.id(todoId);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todoItem.deleteOne();
    await todoDoc.save();
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const isCompletedToggle = async (req, res) => {
  const { userId, todoId } = req.params;

  try {
    const todo = await Todo.findOne({ user: userId, "todo._id": todoId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const todoItem = todo.todo.id(todoId);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    todoItem.isCompleted = !todoItem.isCompleted;
    await todo.save();
    res.status(200).json({ message: "Changed successfully", todo: todoItem });
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  isCompletedToggle,
};
