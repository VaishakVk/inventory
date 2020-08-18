const express = require("express");
const router = express.Router();
const productsLib = require("../lib/products");

router.post("/", productsLib.createProduct);
router.get("/:id", productsLib.getProductById);
router.get("/", productsLib.getAllProducts);
router.delete("/", productsLib.deleteProductsById);

module.exports = router;
