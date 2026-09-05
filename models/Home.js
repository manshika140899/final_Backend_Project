const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    hero: {
      title: {
        type: [String],
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },

    stats: [
      {
        value: String,
        label: String,
      },
    ],

    brands: [
      {
        name: String,
        className: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homeSchema);