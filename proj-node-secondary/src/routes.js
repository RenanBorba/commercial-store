const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');

/*
  Primeira Rota
  requisição e resposta
*/

routes.get('/products', ProductController.index);

/*
  Inserindo produto
  (req, res) => {
    Product.create({
      title: 'React Native',
      description: 'Build native apps with React',
      url: 'http//github.com/facebook/react-native'
    });
  return res.send('Hello Rocketseat!');
  };
*/

// HTTP Routes
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update )
routes.delete('/products/:id', ProductController.destroy )

module.exports = routes;
