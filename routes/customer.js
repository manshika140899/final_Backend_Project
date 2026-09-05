const express = require("express");

const router = express.Router();

const Customer = require("../models/Customer");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer reviews",
      error: error.message,
    });
  }
});

module.exports = router;