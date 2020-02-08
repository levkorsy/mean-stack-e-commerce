var mongoose = require("mongoose");
const User = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const Product = require("../models/productModel");

class ProductsController {
  // ADD NEW PRODUCT
  static addNewProduct(req, res) {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      image: "/images/" + req.file.filename,
      category: req.body.category
    });

    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            image: result.image,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  // GET ALL PRODUCTS
  static getAllProducts(req, res) {
    Product.find()
      .populate("category")
      .exec(function(err, data) {
        res.json({ page: "GET allproducts", data });
      });
  }

  static getProductsByCategory(req, res) {
    Product.find({ category: req.params.id })
      .populate("category")
      .exec(function(err, data) {
        res.json({ page: "GET products by  category", data });
      });
  }
  static getProductsByName(req, res) {
    
    Product.find({ name: req.params.name })
      .populate("category")
      .exec(function(err, data) {
        
        res.json({ page: "GET product by  name", data });
      });
  }
  static editProduct(req, res) {
    req.body.image = "/images/" + req.file.originalname;

    var query = { _id: req.body.id };

    Product.findOneAndUpdate(query, req.body, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) {
        res.send(500, { error: err });
      } else {
        res.json({ message: "Product edited", doc });
      }
    });
  }

  static getNumberOfAllProducts(req, res) {
    Product.find().count(function(err, count) {
      console.log("Number of products: ", count);
      res.json({ count });
    });
  }
}
module.exports = ProductsController;
