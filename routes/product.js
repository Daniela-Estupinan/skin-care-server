const express = require('express');
const router = express.Router();
const API = require("../controllers/api-admin.js")


router.get("/:id",API.fetchProductsById);
router.get("/",API.fetchAllProducts);
router.post("/",upload,API.createProducts);
router.patch("/:id",upload,API.updateProducts);
router.delete("/:id",API.deleteProducts);

module.exports = router;