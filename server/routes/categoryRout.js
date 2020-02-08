var express = require('express');
var router = express.Router();
var CategoryController = require("../controllers/categoryController")


/* GET ALL Category */
router.get('/all', CategoryController.getAllCategories);


// ADD NEW Category
router.post("/add", CategoryController.addNewCategoty);

// EDIT Category
router.put("/edit/:id", CategoryController.editCategory);




module.exports = router;
