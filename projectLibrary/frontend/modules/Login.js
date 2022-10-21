import validator from "validator";

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            error = true
            alert('email invalido');
        }

        if(passwordInput.value.length <6 || passwordInput.length > 15){
            alert('senha tem entre 6 e 15 caracteres');
            error = true;
        }

        if(!error) el.submit();
    }
}