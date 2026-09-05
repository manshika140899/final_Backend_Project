const express = require("express");

const router = express.Router();

const Review = require("../models/Review");


router.get("/", async (req, res) => {
  try {
    const { productId } = req.query;

    let reviews;

    if (productId) {
      reviews = await Review.find({
        productId: Number(productId),
      }).sort({ createdAt: -1 });
    } else {
      reviews = await Review.find().sort({ createdAt: -1 });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);

    res.status(500).json({
      message: "Unable to load reviews",
    });
  }
});



router.post("/", async (req, res) => {
  try {
    const {
      productId,
      name,
      rating,
      text,
    } = req.body;

    // Validation
    if (!productId || !name || !rating || !text) {
      return res.status(400).json({
        message:
          "productId, name, rating and text are required",
      });
    }

    const numericProductId = Number(productId);
    const numericRating = Number(rating);

    if (
      Number.isNaN(numericProductId) ||
      Number.isNaN(numericRating)
    ) {
      return res.status(400).json({
        message:
          "productId and rating must be numbers",
      });
    }

    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Generate new numeric ID
    const lastReview = await Review.findOne()
      .sort({ id: -1 })
      .lean();

    const newId = lastReview ? lastReview.id + 1 : 1;

    const newReview = await Review.create({
      id: newId,
      productId: numericProductId,
      name: name.trim(),

      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),

      rating: numericRating,
      text: text.trim(),
    });

    console.log("NEW REVIEW SAVED:", newReview);

    res.status(201).json(newReview);
  } catch (error) {
    console.error("POST REVIEW ERROR:", error);

    res.status(500).json({
      message: "Unable to add review",
    });
  }
});

module.exports = router;