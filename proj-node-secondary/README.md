<div align="center">

# Projeto - API Node Armazenamento de Produtos

</div>

<br>

<div align="center">

[![Generic badge](https://img.shields.io/badge/Made%20by-Renan%20Borba-purple.svg)](https://shields.io/) [![Build Status](https://img.shields.io/github/stars/RenanBorba/commercial-store.svg)](https://github.com/RenanBorba/commercial-store) [![Build Status](https://img.shields.io/github/forks/RenanBorba/commercial-store.svg)](https://github.com/RenanBorba/commercial-store) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

</div>

<br>

API REST de dados Back-end em Node.js MVC, desenvolvida para aplicação de armazenamento de produtos.

<br><br>

## :rocket: Tecnologias
<ul>
  <li>Nodemon</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>Conexão com Banco de Dados (Database)</li>
  <li>Routes</li>
  <li>Model do Produto</li>
  <li>Paginação de itens</li>
</ul>

<br><br>

## :arrow_forward: Start
<ul>
  <li>npm install</li>
  <li>npm run dev / npm dev</li>
</ul>

<br><br><br>

## :mega: ⬇ Abaixo, as principais estruturas:

<br><br><br>

## server.js
```js
// Imports
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando o App - após sessão Import, executar express
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB --> user@passw
mongoose.connect('mongodb://localhost:27017/nodeapi',
  { useNewUrlParser: true }
);

/*
  Instalar para automatizar esse processo, ao importar:
*/

// require('./src/models/Product');
requireDir('./src/models');

// const Product = mongoose.model('Product');

// Rotas
app.use('/api', require('./src/routes'));

// porta 3001 do navegador
app.listen(3001);
```

<br><br>

## src/models/Product.js
```js
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
```

<br><br>  

## src/controllers/ProductController.js
```js
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Exportar funcionalidades
module.exports = {
  // Listar (todos itens registrados)
  // Método Index (Consultar Todos)
  async index(req, res) {
    // destruturação
    const { page = 1 } = req.query;
    // pagina atual, limite de registros na pagina
    const products = await Product.paginate({}, {page, limit: 10});

    return res.json(products);
  },

  // Detalhar (por parametro Id)
  async show(req, res) {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  async store(req, res) {
    // Adicionar (no corpo de requisição)
    const product = await Product.create(req.body);

    return res.json(product);
  },

  // Alterar (por Id, e atualizar no corpo de requisição)
  async update(req, res) {
    //{new: true} --> atualizar registro
    const product = await Product.findByIdAndUpdate(req.params.id,
      req.body, {new: true})

    return res.json(product);
  },

  // Remover
  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    // resposta de sucesso sem conteudo
    return res.send();
  }
};
```
