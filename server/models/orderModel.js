var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const OrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  dateDelivery: String,
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  totalPrice: Number,
  city: String,
  street: String,
  dateOrder: String,
  creditCard: Number,
  userId: String
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
