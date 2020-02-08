var mongoose = require("mongoose");

const Order = require("../models/orderModel");

class OrderController {
  // ADD NEW ORDER
  static addNewOrder(req, res) {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      dateDelivery: req.body.newOrder.dateDelivery,
      cart: req.body.cartId,
      totalPrice: req.body.newOrder.totalPrice,
      city: req.body.newOrder.city,
      street: req.body.newOrder.street,
      dateOrder: req.body.newOrder.dateOrder,
      creditCard: req.body.newOrder.creditCard,
      userId: req.body.newOrder.userId
    });
    order
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created order successfully"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  // GET ORDER BY ID
  static getOrder(req, res) {
    Order.find({ userId: req.params.id })
      .populate({
        path: "cart",
        populate: {
          path: "user",
          select: "-password"
        }
      })
      .exec(function(err, data) {
        res.json({ page: "GET oder by id", data });
      });
  }

  // GET ORDERS BY Date
  static postOrderByDate(req, res) {
    Order.find({ date: req.body.date })
      .populate({
        path: "cart",
        populate: {
          path: "user",
          select: "-password"
        }
      })
      .exec(function(err, data) {
        res.json({ page: "GET oders by date", data });
      });
  }

  static getOrderByDate(req, res) {
    Order.find({ date: req.query.date })
      .populate({
        path: "cart",
        populate: {
          path: "user",
          select: "-password"
        }
      })
      .exec(function(err, data) {
        res.json({ page: "GET oders by date", data: data.length });
      });
  }
  static getNumberOfAllOrders(req, res) {
    Order.find().estimatedDocumentCount(function(err, count) {
      console.log("Number of orders: ", count);
      res.json({ count });
    });
  }
}
module.exports = OrderController;
