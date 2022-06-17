const mongoose = require ('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: String,
    categoryN:Number,
    category: String,
    content: String,
    price_range:String,
});

module.exports = mongoose.model("Producto", ProductoSchema);