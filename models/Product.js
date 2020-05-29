const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  sellerName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// productSchema.methods.genAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
//   return token;
// };

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(50).required(),
    img: Joi.string(),
    sellerName: Joi.string().min(3).max(50).required(),
    quantity: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
  });
  return schema.validate(product);
}

module.exports = { Product, validateProduct };
