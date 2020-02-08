var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const RoleSchema = new Schema({
  _id: Schema.Types.ObjectId,

  name: String
});

const Role = mongoose.model("Role", RoleSchema, "Role");

module.exports = Role;
