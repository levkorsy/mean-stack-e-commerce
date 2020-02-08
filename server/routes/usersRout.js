var express = require('express');
var router = express.Router();
var UserController = require("../controllers/userController")



router.get('/cities', UserController.getCityList);
// LOGIN
router.post("/login", UserController.loginUser);

router.post("/tz", UserController.getUserByTz);

/* GET ALL users */
router.get('/all', UserController.getAllUser);

// ADD NEW USER
router.post("/add", UserController.addNewUser);

// EDIT USER
router.put("/edit/:id", UserController.editUser);





module.exports = router;
