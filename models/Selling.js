const mongoose = require("mongoose");

const sellingSchema = new mongoose.Schema(
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

    price: String,

    oldPrice: String,

    discount: String,

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Selling", sellingSchema);