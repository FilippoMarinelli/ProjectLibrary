const Livro = require("../models/LivroModel");

exports.paginaInicial = async  (req, res) => {
  // const livros = await Livro.buscaLivro(req.session.user._id)
  // {livros}
  res.render('index');
  return;
};

