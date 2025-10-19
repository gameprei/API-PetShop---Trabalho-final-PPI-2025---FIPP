import InteressadoDAO from "../DB/InteressadoDAO.js";

export default class Interessado {
    #id;
    #cpf;
    #nome;
    #telefone;
    #email;

    constructor(id = 0, cpf = "", nome = "", telefone = "", email = "") {
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
    }

    // Getters e Setters

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(cpf) {
        this.#cpf = cpf;
    }

    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(telefone) {
        this.#telefone = telefone;
    }

    get email() {
        return this.#email;
    }
    set email(email) {
        this.#email = email;
    }

    // Métodos utilitários

    toString() {
        return `
        ID: ${this.#id}
        CPF: ${this.#cpf}
        Nome: ${this.#nome}
        Telefone: ${this.#telefone}
        Email: ${this.#email}
        `;
    }

    toJson() {
        return {
            id: this.#id,
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            email: this.#email
        };
    }

    // Métodos de persistência

    async gravar() {
        const interessadoDAO = new InteressadoDAO();
        await interessadoDAO.gravar(this);
    }

    async alterar() {
        const interessadoDAO = new InteressadoDAO();
        await interessadoDAO.alterar(this);
    }

    async excluir(id) {
        const interessadoDAO = new InteressadoDAO();
        await interessadoDAO.excluir(id);
    }

    async consultar(id) {
        const interessadoDAO = new InteressadoDAO();
        return await interessadoDAO.consultar(id);
    }
}