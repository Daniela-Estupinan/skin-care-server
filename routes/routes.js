const express = require('express');
const router = express.Router();
const API = require("../controllers/api.js")
const multer = require('multer');
const verify = require("./verifyToken.js");
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

router.get("/:id",API.fetchPostById);
router.get("/",verify,API.fetchAllPost);
router.post("/",verify,upload,API.createPost);

router.patch("/:id",verify,upload,API.updatePost);
router.delete("/:id",verify,API.deletePost);

module.exports = router;

