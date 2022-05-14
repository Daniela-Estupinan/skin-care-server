const mongoose = require ('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: String,
    category: String,
    content: String,
});

module.exports = mongoose.model("Producto", ProductoSchema);