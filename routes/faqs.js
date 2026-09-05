const express = require("express");

const router = express.Router();

const FAQ = require("../models/FAQ");

router.get("/", async (req, res) => {
  try {
    const { productId } =
      req.query;

    let faqs;

    if (productId) {
      faqs = await FAQ.find({
        productId: Number(productId),
      });
    } else {
      faqs = await FAQ.find();
    }

    res.status(200).json(faqs);
  } catch (error) {
    console.error(
      "GET FAQ ERROR:",
      error
    );

    res.status(500).json({
      message: "Unable to load FAQs",
    });
  }
});

module.exports = router;