const Products = require("../models/productos");
const fs = require("fs");
const verify = require("../routes/verifyToken.js");
module.exports = class API{
    //fetch all posts
    static async fetchAllProducts(req,res){
        try{
            const products = await Products.find();
            res.status(200).json(products);
        }catch(err){
            res.stataus(404).json({message: err.message});
        }
    }
    //fetch post by id
    static async fetchProductsById(req,res){
        const id = req.params.id;
        try{
            const products = await Products.findById(id);
            res.status(200).json(products);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a post
    static async createProducts(req,res){
        const products = req.body;
        try{
            await Products.create(products);
            res.status(201).json({message:"Products created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    //updated a post
    static async updateProducts(req,res){
        const id = req.params.id;
        const newProducts = req.body;
        try {
            await Products.findByIdAndUpdate(id,newProducts);
            res.status(200).json({message:"Products updated succesfully!!"});
            } catch (err) {
             res.status(400).json({message:err.message});
            }
    }
    //delete a posts
    static async deleteProducts(req,res){
        const id = req.params.id;
        try {
            const result = await Products.findByIdAndDelete(id);

            res.status(200).json({message:"Products deleted succesfully!!"});

        } catch (err) {
            res.status(400).json({message:err.message});
        }
    }


};
