const express = require("express");

const router = express.Router();

const Related = require("../models/Related");


router.get("/", async (req, res) => {
  try {
    const products = await Related.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(
      "GET RELATED PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      message: "Unable to load related products",
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await Related.findOne({ id });

    if (!product) {
      return res.status(404).json({
        message: "Related product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(
      "GET RELATED PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message: "Unable to load related product",
    });
  }
});

module.exports = router;