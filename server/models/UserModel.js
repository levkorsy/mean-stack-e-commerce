var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,

  fisrtName: String,
  lastName: String,
  email: String,
  tz: Number,// teudat zeut
  password: String,
  city: String,
  street: String,
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true }
 
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
