const router = require ('express').Router();
const User = require ('../models/User.js');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    console.log(req.body)
    const hashPassword = await bcrypt.hash(req.body.data.password,salt);
   
    const user = new User({
        username: req.body.data.username,
        email: req.body.data.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});


//LOGIN

router.post('/login',async (req,res) =>{
    
    const user =  await User.findOne({email: req.body.data.email});
    if(!user) return res.status(400).send('Email or password is incorrect')
    //correct
    const validPass = await bcrypt.compare(req.body.data.password, user.password);

    //token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    
    res.header('auth-token', token).send({token});

});

module.exports = router;