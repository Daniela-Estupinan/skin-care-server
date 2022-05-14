const router = require ('express').Router();
const Admin = require ('../models/Admin.js');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    console.log(req.body);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
   
    const admin = new Admin({

        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedAdmin = await admin.save();
        res.send(savedAdmin);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});
router.post('/login',async (req,res) =>{
    const admin =  await Admin.findOne({email: req.body.email});
    console.log(req.body);
    if(!admin) return res.status(401).send('Email or password is incorrect')
    //correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);

    //token

    const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
    
    res.header('auth-token', token).send({token});

});
module.exports = router;