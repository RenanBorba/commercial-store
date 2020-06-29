const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
  // nome
  title: {
    // tipo
    type: String,
    //obrigatorio
    required: true
  },
  // descrição
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  // auto preenchimento da data de criação do produto
  createdAt: {
    // salvar data
    type: Date,
    // data atual
    default: Date.now
  }
});

ProductSchema.plugin(mongoosePaginate);

/*
  Registrando o Model na aplicação -- Onde o
  model Product obtem as caracteristicas acima
*/
mongoose.model('Product', ProductSchema);