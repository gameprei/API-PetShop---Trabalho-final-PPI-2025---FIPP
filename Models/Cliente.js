export default class Cliente{
    #cli_cpf; 
    #cli_nome;
    #cli_telefone;
    #cli_email;

    constructor(cpf = "", nome = "", telefone = "", email = ""){
        this.#cli_cpf = cpf;
        this.#cli_nome = nome;
        this.#cli_telefone = telefone;
        this.#cli_email = email;
    }

    // Setter e Getters Cliente //

    get cpf(){
        return this.#cli_cpf
    };
    set cpf(cpf){
        this.#cli_cpf = cpf;
    };
    get nome(){
        return this.#cli_nome;
    };
    set nome(nome){
        this.#cli_nome = nome;
    };
    get telefone(){
        return this.#cli_telefone
    };
    set telefone(telefone){
        this.#cli_telefone = telefone;
    };
    get email(){
        return this.#cli_email;
    };
    set email(email){
        this.#cli_email = email;    
    };

    // Métodos ToJson e ToString //

    toString(){
        return`\n
        CPF: ${this.#cli_cpf}\n
        Nome: ${this.#cli_nome}\n
        Telefone: ${this.#cli_telefone}\n
        Email: ${this.#cli_email}\n`;
    };

    toJson(){
        return{
            cpf: this.#cli_cpf,
            nome: this.#cli_nome,
            telefone: this.#cli_telefone,
            email: this.#cli_email
        };
    };


}