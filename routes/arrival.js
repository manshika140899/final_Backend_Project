const express = require("express");

const router = express.Router();

const Arrival = require("../models/Arrival");

router.get("/", async (req, res) => {
  try {
    const products = await Arrival.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch arrival products",
      error: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await Arrival.findOne({ id });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

module.exports = router;