const express = require("express");
const UserSchema = require("../Schemas/UserSchema");
let router = express.Router();
router.use(express.json());

router.put("/admin/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findByIdAndUpdate(id, {
      status: "approved",
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to approve user" });
  }
});

router.put("/admin/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findByIdAndUpdate(id, {
      status: "Rejected",
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to approve user" });
  }
});

module.exports = router;
