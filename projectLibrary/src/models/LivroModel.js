const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  capitulostot: {type: String, required: true},
  capituloatu: {type: String, required: true},
  categoria: {type: String, required: true},
  idlogin: {type: String, required: true}
});

const LivroModel = mongoose.model('Livro', LivroSchema);

class Livro {
  constructor(body, loginid){
    this.body = body;
    this.erros = [];
    this.livro = null;
    this.loginid = loginid;
  }

  async adicionar(){
    this.validaLivro();

    if(this.erros.length > 0) return;

    const novoLivro = {
      titulo: this.body.titulo,
      capitulostot: this.body.capitulostot,
      capituloatu: this.body.capituloatu,
      categoria: this.body.categoria,
      idlogin: this.loginid
    }
    this.livro = await LivroModel.create(novoLivro);
  }

  static async buscaLivro(id){
    const livros = await LivroModel.find({idlogin: id});
    return livros;
  }

  static async delete(id){
    if(typeof id !== "string") return;

    const livro = LivroModel.findByIdAndDelete(id);
    return livro;
  }

  static async buscaLivroId(idLivro){
    const livro = await LivroModel.findById(idLivro);
    return livro;
  }

  async edit(idlivro){
    if(typeof idlivro !== "string") return;
    this.validaLivro();

    if(this.erros.length > 0) return;
    this.livro = await LivroModel.findByIdAndUpdate(idlivro, this.body, {new: true});
  }

  validaLivro(){
    this.cleanUp()
    //validacao se algum campo esta vazio
    if(!this.body.titulo) this.erros.push('titulo esta vazio');
    if(!this.body.capitulostot) this.erros.push('Quantidade de capitulos totais nao preenchida');
    if(!this.body.capituloatu) this.erros.push('Quantidade de capitulos lidos atual nao preenchida');
    if(!this.body.categoria) this.erros.push('seleciona uma categoria');
  }

  cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
          this.body[key] = '';
      }
    }

  this.body ={
      titulo: this.body.titulo,
      capitulostot: this.body.capitulostot,
      capituloatu: this.body.capituloatu,
      categoria: this.body.categoria
    };
  }
}

module.exports = Livro;
