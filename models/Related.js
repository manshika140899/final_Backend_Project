const mongoose = require("mongoose");

const relatedSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
    },

    price: {
      type: String,
    },

    oldPrice: {
      type: String,
      default: "",
    },

    discount: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Related", relatedSchema);