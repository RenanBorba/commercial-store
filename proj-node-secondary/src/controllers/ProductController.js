const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Exportar funcionalidades
module.exports = {
  // Listar (todos itens registrados)
  // Método Index (Consultar Todos)
  async index(req, res) {
    // desestruturar
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
