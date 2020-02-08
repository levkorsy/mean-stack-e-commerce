var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const CategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
