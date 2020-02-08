var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  totalPrice: Number,
  quantity: Number
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
