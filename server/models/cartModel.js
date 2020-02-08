var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const CartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  date: String, 
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }

});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
