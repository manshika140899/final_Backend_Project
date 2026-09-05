const express = require("express");

const router = express.Router();

const Home = require("../models/Home");

router.get("/", async (req, res) => {
  try {
    const homeData = await Home.find();

    res.json(homeData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch home data",
      error: error.message,
    });
  }
});

module.exports = router;