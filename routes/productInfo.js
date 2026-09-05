const express = require("express");

const router = express.Router();

const ProductInfo =
  require("../models/ProductInfo");

router.get("/", async (req, res) => {
  try {
    const productInfo =
      await ProductInfo.find();

    res.status(200).json(productInfo);
  } catch (error) {
    console.error(
      "GET PRODUCT INFO ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Unable to load product information",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id =
      Number(req.params.id);

    const product =
      await ProductInfo.findOne({
        id,
      });

    if (!product) {
      return res.status(404).json({
        message:
          "Product information not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(
      "GET PRODUCT INFO BY ID ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Unable to load product information",
    });
  }
});

module.exports = router;