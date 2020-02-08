var mongoose = require("mongoose");

const Item = require("../models/itemModel");

class ItemController {
  // ADD NEW ITEM
  static addNewItem(req, res) {
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.productId,
      cart: req.body.cartId,
      totalPrice: req.body.totalPrice,
      quantity: req.body.quantity
    });
    item
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created item successfully",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  // GET ITEM BY ID
  static getItemById(req, res) {
    Item.find({ cart: req.params.id })
      .populate({
        path: "product",
        populate: {
          path: "category"
        }
      })
      .populate({
        path: "cart",
        populate: {
          path: "user",
          select: "-password"
        }
      })
      .exec(function(err, data) {
        res.json({ data });
      });
  }

  static editItem(req, res) {
    var query = { _id: req.params.id };
    Item.findOneAndUpdate(query, req.body, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });
      return res.send("Item succesfully edited");
    });
  }
  static deleteItem(req, res) {
    Item.find({ _id: req.params.id })
      .remove()
      .exec(function(err, data) {
        res.json({ page: "Item was deleted", data });
      });
  }

  static deleteAllItems(req, res) {
    Item.deleteMany({ cart: req.params.id }, function(err, data) {
      if (err) {
        res.json({ success: false, err });
      } else {
        res.json({ success: true, data });
      }
    });
  }
}
module.exports = ItemController;
