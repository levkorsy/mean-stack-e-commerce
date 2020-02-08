var express = require("express");
var router = express.Router();
var OrderController = require("../controllers/orderController");
var middleware = require("../middleware/middlevare");

/* GET ORDER */
router.get(
  "/all/num",
  
  OrderController.getNumberOfAllOrders
);

// ADD NEW ORDER

router.post("/add", [middleware.verifyToken], OrderController.addNewOrder);

// GET ORDERS BY ID
router.post("/date", [middleware.verifyToken], OrderController.postOrderByDate);

router.get("/date", [middleware.verifyToken], OrderController.getOrderByDate);

// GET ORDR BY ID

router.get("/:id", [middleware.verifyToken], OrderController.getOrder);


module.exports = router;
