const Livro = require('../models/LivroModel');

exports.index = (req, res)=>{
    res.render('livros');
}

exports.colecao = async (req,res) =>{
    const livros = await Livro.buscaLivro(req.session.user._id);
    res.render('colecao', {livros});
}

exports.addLivro = async (req,res)=>{
    try{
        const livro = new Livro(req.body, req.session.user._id);
        await livro.adicionar();
    
        if(livro.erros.length > 0){
            req.flash('erros', livro.erros);
            req.session.save(function(){
            return res.redirect('http://localhost:3000/livros/')
            })
        return
        }
        req.flash('success', 'livro adicionado com sucesso');
        req.session.save(function(){
        return res.redirect('http://localhost:3000/livros/colecao');
        });
    } catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.editIndex = async (req,res)=>{
    if(!req.params.id) return res.render('404');
    const livro = await Livro.buscaLivroId(req.params.id);

    if(!livro) res.render('404');
    res.render('editLivro', {livro});
};

exports.edit = async (req,res)=>{
    try{
        if(!req.params.id) return res.render('404');

        const livro = new Livro(req.body, req.session.user._id);
        await livro.edit(req.params.id);
    
        if(livro.erros.length > 0){
            req.flash('erros', livro.erros);
            req.session.save(function(){
            return res.redirect('http://localhost:3000/livros/colecao/')
            })
        return
        }
        req.flash('success', 'livro editado com sucesso');
        req.session.save(function(){
        return res.redirect('http://localhost:3000/livros/colecao');
        });
    } catch(e){
        console.log(e)
        return res.render('404');
    }
}

exports.delete = async (req,res)=>{
    if(!req.params.id) return res.render('404');

    const livro = await Livro.delete(req.params.id);
    if(!livro) return res.render('404');

    req.flash('success', 'livro apagado com sucesso');
    req.session.save(()=> res.redirect("http://localhost:3000/livros/colecao"));
    return; 
}