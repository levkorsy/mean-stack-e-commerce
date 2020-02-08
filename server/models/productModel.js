var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ProductSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  price: Number,
  image: String,
  
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
