const express = require("express");
const router = express.Router();
const { Product } = require("../../models/Product");
const { Cart } = require("../../models/Cart");
const auth = require("../../middleware/auth");

let currentUser = "5ece9e98d37e157871126793";

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/order", async (req, res) => {
  try {
    const { orderList } = req.body;
    console.log("bodyyyyyy", req.body);
    let orderedProducts = orderList.map((item) => ({
      _id: item.id,
      quantity: item.quantity,
    }));

    const cart = new Cart({
      user: currentUser,
      products: orderedProducts,
    });
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
