const Livro = require('../models/LivroModel');
const Login = require('../models/LoginModel')

exports.index = (req, res)=>{
    res.render('login');
};

exports.login = async (req, res)=>{
    try{
        const login = new Login(req.body);
        await login.login();

        if(login.erros.length>0){
            req.flash('erros', login.erros);
            req.session.save(function(){
                return res.redirect('http://localhost:3000/login/');
            });
            return
        }
        req.flash('success', 'login realizado com sucesso');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('http://localhost:3000/');
        });
    } catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.logout = async (req, res) =>{
    try{
        await req.session.destroy();
        res.redirect('http://localhost:3000/');
    } catch(e){
        console.log(e);
        res.render('404');
    }
}

exports.register = async (req, res)=>{
    try{
        const login = new Login(req.body)
        await login.register();
    
        if(login.erros.length > 0){
            req.flash('erros', login.erros)
            req.session.save(function(){
                return res.redirect('http://localhost:3000/login/');
            });
            return
        }
        req.flash('success', 'Usuario criado com sucesso');
        req.session.save(function(){
            return res.redirect('http://localhost:3000/login/');
        });
    } catch(e){
        console.log(e)
        return res.render('404')
    }
};