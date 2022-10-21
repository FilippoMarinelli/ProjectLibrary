const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const livrosController = require('./src/controllers/livrosController');

const {loginRequired} = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.paginaInicial);

//rotas login
route.get('/login/', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas livros
route.get('/livros',loginRequired, livrosController.index);
route.post('/livros/addlivro',loginRequired, livrosController.addLivro);
route.get('/livros/colecao',loginRequired, livrosController.colecao);
route.get('/livros/colecao/:id',loginRequired, livrosController.editIndex);
route.post('/livros/colecao/edit/:id',loginRequired, livrosController.edit);
route.get('/livros/colecao/delete/:id',loginRequired, livrosController.delete);


module.exports = route;
