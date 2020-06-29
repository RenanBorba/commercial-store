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
