const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const User = require("../models/UserModel");
const Role = require("../models/roleModel");
const Category = require("../models/CategoryModel");
const Product = require("../models/productModel");

class UserController {
  // LOGIN
  static loginUser(req, res) {
    User.find({ email: req.body.data.emailFormCtrl })
      .populate("role")
      .exec(function(err, result) {
        if (result == "") {
          res.json({ msg: "No user with such name", success: false });
        } else {
          if (result[0].password == req.body.data.pwdFormCtrl) {
            console.log(result);
            let data = result;
            data[0].password = undefined;

            let token = jwt.sign(data[0].toJSON(), "searchingJuniorPosition");
            res.json({ success: true, data, token });
          } else {
            res.json({ msg: "Please check your password", success: false });
          }
        }
      });
  }
  // ADD NEW USER
  static addNewUser(req, res) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      fisrtName: req.body.data[1].firstNameFormCtrl,
      lastName: req.body.data[1].lastNameFormCtrl,
      email: req.body.data[0].emailFormCtrl,
      tz: req.body.data[0].idFormCtrl,
      password: req.body.data[0].pwdConfirmFormCtrl,
      city: req.body.data[1].cityFormCtrl,
      street: req.body.data[1].streetFormCtrl,
      role: "5dc6de79cf25e824f806ced5"
    });

    user
      .save()
      .then(result => {
        let token = jwt.sign(result.toJSON(), "searchingJuniorPosition");
        res.status(201).json({
          message: "Created user successfully",
          success: true,
          createdUser: {
            firstName: result.firstName,
            lastName: result.lastName,
            tz: result.tz,
            _id: result._id,
            email: result.email,
            password: result.password,
            city: result.city,
            street: result.street,
            role: result.role,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + result._id
            }
          },
          token: token
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  static editUser(req, res) {
    console.log(req.query.userId, req.body);
    var query = { _id: req.query.userId };

    User.findOneAndUpdate(query, req.body, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });
      return res.send("User succesfully changed");
    });
  }

  // LOGIN USER
  static getAllUser(req, res) {
    User.find()
      .populate("role")
      .exec(function(err, data) {
        res.json({ page: "GET alluserse", data });
      });
  }

  static getCityList(req, res) {
    var cities = JSON.parse(fs.readFileSync("city_list.json", "utf8"));
    res.status(2001).json({
      cities
    });
  }

  static getUserByTz(req, res) {
    User.find({ tz: req.body.tz })
      .populate("role")
      .exec(function(err, result) {
        console.log(result);

        if (result.length == 0) {
          res.json({ msg: "No user with such TZ", success: true });
        } else {
          res.json({
            msg: "Sorry but user with such tz already exsist",
            success: false
          });
        }
      });
  }
}
module.exports = UserController;
