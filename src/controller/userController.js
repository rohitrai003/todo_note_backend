const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");
const dotenv = require("dotenv");

dotenv.config();

// Sign Up
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      res.status(400).json({ message: "Email already exist" });
    } else {
      await user.save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: `Error signing up ${err}` });
  }
};

// Sign In
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error signing in" });
  }
};

// Get User Details
const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { signup, signin, getUser };
