const express = require("express");

const router = express.Router();

const Selling = require("../models/Selling");


router.get("/", async (req, res) => {
  try {
    const products = await Selling.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch selling products",
      error: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await Selling.findOne({ id });

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