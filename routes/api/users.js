const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { User, validateUser } = require("../../models/User");
const auth = require("../../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST     api/users       Public
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) return res.status(400).send("User already exists");

    user = new User({
      name: name,
      email: email,
      password: password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.genAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
