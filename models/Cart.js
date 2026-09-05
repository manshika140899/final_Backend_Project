const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
{
productId: {
type: mongoose.Schema.Types.Mixed,
required: true,
},

name: {
  type: String,
  required: true,
},

image: {
  type: String,
  required: true,
},

size: {
  type: String,
  default: "Large",
},

color: {
  type: String,
  default: "Green",
},

price: {
  type: Number,
  required: true,
},

quantity: {
  type: Number,
  default: 1,
  min: 1,
},

discount: {
  type: Number,
  default: 0,
},


},
{
timestamps: true,
}
);

module.exports = mongoose.model("Cart", cartSchema);