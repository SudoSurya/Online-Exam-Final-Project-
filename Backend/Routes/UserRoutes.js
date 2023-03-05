const express = require("express");
const UserSchema = require("../Schemas/UserSchema");
let router = express.Router();
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
router.use(express.json());
// ! User Registration Route
router.post("/register", async (req, res) => {
  try {
    const {
      userID,
      userName,
      userEmail,
      userBranch,
      userNumber,
      userPassword,
      confirmPassword,
    } = req.body;
    let exist = await UserSchema.findOne({ userEmail: userEmail });
    if (exist) {
      // return res.status(400).send("User Already Exist");
      return res.status(400).send({ message: "Email already exists" });
      
    }
    if (userPassword != confirmPassword) {
      return res.status(400).send("Password MisMacth");
    }
    let NewUser = new UserSchema({
      userID,
      userName,
      userEmail,
      userBranch,
      userNumber,
      userPassword,
      confirmPassword,
    });
    await NewUser.save();
    res.status(200).send("User Registration Completed Succesfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});
// ! User Login Route

router.post("/login", async (req, res) => {
  try {
    const { userID, userPassword } = req.body;
    let exist = await UserSchema.findOne({ userID: userID });
    if (!exist) {
      return res.status(500).send("user Not found");
    }
    if (exist.userPassword !== userPassword) {
      return res.status(500).send("invalid password");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server Error");
  }
});
// ! user Dashboard Route
router.get("/dashboard", AuthMiddleware, async (req, res) => {
  try {
    let exist = await UserSchema.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("user not found");
    }
    res.send(exist);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server Error");
  }
});
module.exports = router;
