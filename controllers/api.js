const Post = require("../models/User");
const fs = require("fs");
module.exports = class API{
    //fetch all posts
    static async fetchAllPost(req,res){
        try{
            const posts = await Post.find();
            res.status(200).json(posts);
        }catch(err){
            res.stataus(404).json({message: err.message});
        }
    }
    //fetch post by id
    static async fetchPostById(req,res){
        const id = req.params.id;
        try{
            const post = await Post.findById(id);
            res.status(200).json(post);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a post
    static async createPost(req,res){
        const post = req.body;
        try{
            await Post.create(post);
            res.status(201).json({message:"Post created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    

};
