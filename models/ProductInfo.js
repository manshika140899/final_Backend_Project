const mongoose = require("mongoose");

const productInfoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    productType: String,

    material: String,

    fit: String,

    neckType: String,

    sleeveType: String,

    style: String,

    description: String,

    productDescription: String,

    care: [
      {
        title: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProductInfo",
  productInfoSchema
);