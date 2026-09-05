const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
  {
    price: {
      min: {
        type: Number,
        default: 0,
      },

      max: {
        type: Number,
        default: 0,
      },
    },

    colors: [
      {
        name: {
          type: String,
          required: true,
        },

        value: {
          type: String,
          required: true,
        },
      },
    ],

    sizes: {
      type: [String],
      default: [],
    },

    dressStyles: {
      type: [String],
      default: [],
    },

    categories: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Filter", filterSchema);