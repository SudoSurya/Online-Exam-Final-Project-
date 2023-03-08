const express = require("express");
const UserSchema = require("../Schemas/UserSchema");
let router = express.Router();
router.use(express.json());

router.get("/student/pending", async (req, res) => {
  try {
    const userData = await UserSchema.find({ status: "PENDING" });

    if (userData.length < 1) {
      res.status(200).send("No Pending Requests Available");
    }
    res.send(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server Error");
  }
});

router.get("/student/approved", async (req, res) => {
  try {
    const userData = await UserSchema.find({ status: "approved" });

    if (userData.length < 1) {
      res.status(200).send("No Pending Requests Available");
    }
    res.send(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server Error");
  }
});

module.exports = router;
