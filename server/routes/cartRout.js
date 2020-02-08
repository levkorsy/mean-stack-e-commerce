var express = require('express');
var router = express.Router();
var CartController = require("../controllers/cartController")
var middleware = require("../middleware/middlevare");


/* GET CART BY ID */


// ADD NEW CART
router.post("/new", [middleware.verifyToken], CartController.addNewCart);

// EDIT cart
router.put("/:id", [middleware.verifyToken], CartController.editCart);
// Get cart by user id
router.get('/:id', CartController.getCartByUserId);
// Delete cart after submitting order
router.delete("/:id", [middleware.verifyToken], CartController.deleteCart);

module.exports = router;
