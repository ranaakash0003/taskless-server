const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../../models/User");
const config = require("config");

// POST     api/auth       Public
router.post("/", async (req, res) => {
  try {
    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");
    const token = user.genAuthToken();
    res.json(token);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
