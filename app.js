//imports 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



const port = process.env.PORT || 4000;


//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//database connection

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: true,
    useCreateIndex : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));


//routes middlewares


//routes prefixs

app.use("/api/post", require("./routes/routes.js"));



app.listen(port, () => console.log('Server running at http://localhost:'+port));

