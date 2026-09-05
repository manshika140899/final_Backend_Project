const express = require("express");

const router = express.Router();

const Browse = require("../models/Browse");

// Get all browse styles
router.get("/", async (req, res) => {
  try {
    const styles = await Browse.find();

    res.json(styles);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch browse styles",
      error: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const style = await Browse.findOne({ id });

    if (!style) {
      return res.status(404).json({
        message: "Browse style not found",
      });
    }

    res.json(style);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch browse style",
      error: error.message,
    });
  }
});

module.exports = router;