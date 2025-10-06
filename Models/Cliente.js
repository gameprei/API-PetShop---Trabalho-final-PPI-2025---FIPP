export default class Cliente{
    #cli_cpf; 
    #cli_nome;
    #cli_telefone;
    #cli_email;

    constructor(cli_cpf = "", cli_nome = "", cli_telefone = "", cli_email = ""){
        this.#cli_cpf = cli_cpf;
        this.#cli_nome = cli_nome;
        this.#cli_telefone = cli_telefone;
        this.#cli_email = cli_email;
    }

    // Setter e Getters Cliente //

    get cpf(){
        return this.#cli_cpf
    };
    set cpf(cli_cpf){
        this.#cli_cpf = cli_cpf;
    };
    get nome(){
        return this.#cli_nome;
    };
    set nome(cli_nome){
        this.#cli_nome = cli_nome;
    };
    get telefone(){
        return this.#cli_telefone
    };
    set telefone(cli_telefone){
        this.#cli_telefone = cli_telefone;
    };
    get email(){
        return this.#cli_email;
    };
    set email(cli_email){
        this.#cli_email = cli_email;    
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