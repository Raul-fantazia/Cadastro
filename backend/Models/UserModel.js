const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    // requisitos para a criação do usuario
    nome: { type: String, required: true} ,
    email: { type: String, required: true} ,
    senha: { type: String,  required: true} ,

});

const Usuario = mongoose.model('Usuario' , newSchema);

module.exports = Usuario;