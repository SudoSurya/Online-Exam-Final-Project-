const express = require("express");
const UserSchema = require("../Schemas/UserReg");
let router = express.Router();
router.use(express.json());

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
      return res.status(400).send("User Already Exist");
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

module.exports = router;
