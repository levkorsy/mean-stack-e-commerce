var mongoose = require("mongoose");

const Category = require("../models/CategoryModel");

class CategoryController {
  // ADD NEW CATEGORY
  static addNewCategoty(req, res) {
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name
    });
    category
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Category created successfully"
       
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  // GET ALL CATEGORIES

  static getAllCategories(req, res) {
    Category.find().exec(function(err, data) {
      res.json({ page: "GET all category", data });
    });
  }

  // EDIT CATEGORY
  static editCategory(req, res) {
    var query = { _id: req.query.categoryId };

    Category.findOneAndUpdate(query, req.body, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });
      return res.send("Category succesfully changed");
    });
  }
}
module.exports = CategoryController;
