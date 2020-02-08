var express = require("express");
var router = express.Router();
var ProductsController = require("../controllers/productsController");
var middleware = require("../middleware/middlevare");

var multer = require("multer");
const DIR = "./public/images/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, fileName);
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

/* GET ALL users */
router.get("/all", [middleware.verifyToken], ProductsController.getAllProducts);
router.get(
  "/all/available/num",

  ProductsController.getNumberOfAllProducts
);

router.get(
  "/category/:id",
  [middleware.verifyToken],
  ProductsController.getProductsByCategory
);

// ADD NEW PRODUCT
router.post(
  "/add",
  [middleware.verifyToken],
  upload.single("image"),
  ProductsController.addNewProduct
);

// EDIT Product
router.put(
  "/edit",
  [middleware.verifyToken],
  upload.single("image"),
  ProductsController.editProduct
);

router.get(
  "/:name",
  [middleware.verifyToken],
  ProductsController.getProductsByName
);

module.exports = router;
