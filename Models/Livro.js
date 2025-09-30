export default class Livro{
    #liv_id;
    #liv_titulo;
    #liv_autor;
    #cli_cpf; // Chave estrangeira Cliente // verificar como esse parâmetro vai se comportar depois.

    constructor(id = 0, titulo = "", autor = "", cliente = ""){
        this.#liv_id = id;
        this.#liv_titulo = titulo;
        this.#liv_autor = autor;
        this.#cli_cpf = cliente;
    }

    // Gets e Setters Livro //

    get id(){ 
        return this.#liv_id;
    };
    set id(id){ 
        this.#liv_id = id 
    };
    get titulo(){
        return this.#liv_titulo;
    };
    set titulo(titulo){
        this.#liv_titulo = titulo;
    };
    get autor(){
        return this.#liv_autor;
    };
    set autor(autor){
        this.#liv_autor = this.autor;
    };
    get cliente(){ // CPF cliente Chave estrangeira - verificar depois
        return this.#cli_cpf;
    };
    set cliente(cliente){
        this.#cli_cpf = cliente;
    };

    // Métodos To String e To Json //

    toString(){
        return`\n
        ID: ${this.#liv_id}\n
        Título: ${this.#liv_titulo}\n
        Autor: ${this.#liv_autor}\n
        Cliente Interessado: ${this.#cli_cpf}\n`;
    };

    toJson(){
        return{
            id: this.#liv_id,
            Título: this.#liv_titulo,
            Autor: this.#liv_autor,
            Cliente: this.#cli_cpf 
        };
    };

}