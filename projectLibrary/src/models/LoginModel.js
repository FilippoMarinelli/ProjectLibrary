const validator = require('validator');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async login(){
        this.validaLogin();
        if(this.erros.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user){
            this.erros.push('usuario nao existe');
            return;
        }
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.erros.push('senha invalida');
            this.user = null;
            return
        }
    }

    cleanUpLogin(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body ={
            email: this.body.email,
            password: this.body.password
        };
    }

    validaLogin(){
        this.cleanUpLogin();
        //validação
        //o email precisa ser valido
        if(!validator.isEmail(this.body.email)){
            this.erros.push('email invalido');
        }

        //senha de 6 a 15 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 15){
            this.erros.push('senha invalida');
        }
    }

    async register(){
        this.valida();
        if(this.erros.length > 0) return;

        await this.userExists();
        if(this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user) this.erros.push('email ja utilizado');
    }

    valida(){
        this.cleanUp();
        //validação
        //o nome nao pode estar vazio
        if(!this.body.name) this.erros.push('nome esta vazio');

        //o email precisa ser valido
        if(!validator.isEmail(this.body.email)){
            this.erros.push('email invalido');
        }

        //senha de 6 a 15 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 15){
            this.erros.push('a senha pode ter somente entre 6 e 15 caracteres');
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body ={
            name: this.body.name,
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;
