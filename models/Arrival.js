const mongoose = require("mongoose");

const arrivalSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    rating: String,

    ratingValue: Number,

    price: String,

    oldPrice: String,

    discount: String,

    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Arrival", arrivalSchema);