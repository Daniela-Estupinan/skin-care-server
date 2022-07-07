const express = require('express');
const router = express.Router();
const API = require("../controllers/api.js")
const multer = require('multer');

//multer middleware

router.get("/:id",API.fetchPostById);
router.get("/",API.fetchAllPost);
router.post("/",API.createPost);
module.exports = router;

