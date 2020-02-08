const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

class CartController {
  // ADD NEW CART
  static addNewCart(req, res) {
    const cart = new Cart({
      _id: new mongoose.Types.ObjectId(),
      date: req.body.date,
      user: req.body.user
    });
    cart
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
  // GET CART BY ID
  static getCartById(req, res) {
    Cart.find({ _id: req.params.id })
      .populate("user", "-password")
      .exec(function(err, data) {
        res.json({ page: "GET cart by  id", data });
      });
  }
  static getCartByUserId(req, res) {
    Cart.find({ user: req.params.id })
      .populate("user", "-password")
      .exec(function(err, data) {
        res.json({ data });
      });
  }
  static editCart(req, res) {
    var query = { _id: req.params.id };
    Cart.findOneAndUpdate(query, req.body, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });
      return res.send("Card succesfully edited");
    });
  }
  
  static deleteCart(req, res) {
    console.log("Hi i am delet cart", req.params.id);

    Cart.find({ _id: req.params.id })
      .remove()
      .exec(function(err, data) {
        res.json({ page: "Cart was deleted", data });
      });
  }
}
module.exports = CartController;
