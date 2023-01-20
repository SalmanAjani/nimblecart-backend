const Cart = require("./cartModel");
const express = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const app = express.Router();

app.get("/", async (req, res) => {
  let { userid } = req.body;
  try {
    let carts = await Cart.find({ userid });
    return res.status(200).json(carts);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    return res.status(201).send({ message: cart });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

app.put("/", async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const cartItem = await Cart.findById(id);

    if (cartItem) {
      const cart = await Cart.findByIdAndUpdate(
        id,
        { quantity },
        { new: true }
      );
      return res
        .status(200)
        .send({ message: "Cart updated successfully", cart });
    } else {
      return res.status(404).send({ message: "Item does not exist in cart" });
    }
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

app.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const cartItem = await Cart.findById(id);
    if (cartItem) {
      await Cart.findByIdAndDelete(id);
      return res.send({
        message: `Deleted the product from cart successfully`,
      });
    } else {
      return res.status(404).send({ message: "Item does not exist in cart" });
    }
  } catch (error) {
    return res.send({ message: error });
  }
});

module.exports = app;
