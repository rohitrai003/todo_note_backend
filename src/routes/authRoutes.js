const { signup, signin, getUser } = require("../controller/userController");
const auth = require("../middleware/auth.js");
const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, getUser);

module.exports = router;
