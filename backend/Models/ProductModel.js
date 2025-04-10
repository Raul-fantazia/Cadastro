const mongoose = require('mongoose');

// modelo para criar produto 

const newSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true },
});

const Product = mongoose.model('Product', newSchema);

module.exports = Product;