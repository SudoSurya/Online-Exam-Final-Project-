const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
router.use(express.json());

const AdminSchema = require("../Schemas/AdminSchema");

router.post("/new", async (req, res) => {
  try {
    const { adminID, adminPass } = req.body;
    let exist = await AdminSchema.findOne({ adminID: adminID });
    if (exist) {
      return res.status(400).send("id already existed");
    }
    let newAdmin = new AdminSchema({
      adminID,
      adminPass,
    });
    await newAdmin.save();
    res.status(200).send("Admin Added");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { adminID, adminPass } = req.body;
    let exist = await AdminSchema.findOne({ adminID: adminID });
    if (!exist) {
      return res.status(500).send("Admin Not found");
    }
    if (exist.adminPass !== adminPass) {
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
    let exist = await AdminSchema.findById(req.user.id);
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
