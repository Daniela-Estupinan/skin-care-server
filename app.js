//imports 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/routes.js');
const authRoute = require('./routes/auth.js');
const adminRoute = require('./routes/admin.js');
const app = express();



const port = process.env.PORT || 5000;


//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"));


//database connection

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: true,
    useCreateIndex : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));


//routes middlewares

app.use('/api/user', authRoute);

app.use('/api/admin', adminRoute);
//routes prefixs

app.use("/api/post", require("./routes/routes.js"));
app.use("/api/product", require("./routes/product.js"));

if(process.env.PORT === 'production'){
    app.use(express.static(__dirname + '/dist/'));
   app.get('*', (req,res)=>{
        res.sendFile(__dirname + '/dist/index.html')
    })
}

app.listen(port, () => console.log('Server running at http://localhost:'+port));

