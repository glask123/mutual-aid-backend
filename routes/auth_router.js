const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("auth");
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch {
    res.send("Request Failed");
  }
});

router.post("/register", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.body.name) {
    res.end({
      success: false,
      message: "Error: Name cannot be blank",
    });
  }
  if (!req.body.email) {
    res.end({
      success: false,
      message: "Error: Email cannot be blank",
    });
  }
  if (!req.body.password) {
    res.end({
      success: false,
      message: "Error: Password cannot be blank",
    });
  }

  const email = req.body.email.toLowerCase();
  User.find(
    {
      email: email,
    },
    (err, prevUsers) => {
      if (err) {
        res.end({
          success: false,
          message: "Error: Server error",
        });
      } else if (prevUsers.length > 0) {
        res.end({
          success: false,
          message: "Error: User already exists with that email",
        });
      }

      const newUser = new User();

      newUser.email = email;
      newUser.name = req.body.name;
      newUser.password = newUser.generateHash(req.body.password);

      newUser.save((err, user) => {
        if (err) {
          res.end({
            success: false,
            message: "Error: Server error",
          });
        } else {
          res.end({
            success: true,
            message: "Signed up",
          });
        }
      });
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local", {
    successMessage: "Success",
    failureMessage: "Fail",
  })
);

module.exports = router;
