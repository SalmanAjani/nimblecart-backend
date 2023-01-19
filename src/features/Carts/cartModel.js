const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    discounted_price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
