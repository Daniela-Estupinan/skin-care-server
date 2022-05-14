const express = require('express');
const router = express.Router();
const API = require("../controllers/api-admin.js")
const multer = require('multer');

//multer middleware
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+ Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage : storage,
}).single("image");

router.get("/:id",API.fetchProductsById);
router.get("/",API.fetchAllProducts);
router.post("/",upload,API.createProducts);
router.patch("/:id",upload,API.updateProducts);
router.delete("/:id",API.deleteProducts);

module.exports = router;