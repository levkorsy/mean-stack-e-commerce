var express = require("express");
var router = express.Router();
var ItemController = require("../controllers/itemController");
var middleware = require("../middleware/middlevare");

// ADD NEW ITEM
router.post("/new", [middleware.verifyToken], ItemController.addNewItem);

// EDIT Item
router.put("/:id", [middleware.verifyToken], ItemController.editItem);
// DELETE ALL ITEMS BY CART ID
router.delete(
  "/cart/:id",
  [middleware.verifyToken],
  ItemController.deleteAllItems
);
// DELETE SINGLE ITEM BY ITEM ID
router.delete("/:id", [middleware.verifyToken], ItemController.deleteItem);

// GET ITEM BY CART ID
router.get("/:id", [middleware.verifyToken], ItemController.getItemById);

module.exports = router;
