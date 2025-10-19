import FilhoteDAO from "../DB/FilhoteDAO.js";


export default class Filhote {
    #id;
    #especie;
    #raca;
    #id_interessado;

    constructor(id = 0, especie = "", raca = "", id_interessado = null) {
        this.#id = id;
        this.#especie = especie;
        this.#raca = raca;
        this.#id_interessado = id_interessado;
    }

    // Getters e Setters Filhote

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get especie() {
        return this.#especie;
    }
    set especie(especie) {
        this.#especie = especie;
    }

    get raca() {
        return this.#raca;
    }
    set raca(raca) {
        this.#raca = raca;
    }

    get id_interessado() {
        return this.#id_interessado;
    }
    set id_interessado(id_interessado) {
        this.#id_interessado = id_interessado;
    }

    // Métodos ToString e ToJson

    toString() {
        return `
        ID: ${this.#id}
        Espécie: ${this.#especie}
        Raça: ${this.#raca}
        ID Interessado: ${this.#id_interessado}
        `;
    }

    toJson() {
        return {
            id: this.#id,
            especie: this.#especie,
            raca: this.#raca,
            id_interessado: this.#id_interessado
        };
    }

    async gravar() {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.gravar(this);
    }

    async alterar() {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.alterar(this);
    }

    async excluir(id) {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.excluir(id);
    }

    async consultar(id) {
        const filhoteDAO = new FilhoteDAO();
        return await filhoteDAO.consultar(id);
    }
    async associarInteressado(filhoteId, idInteressado) {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.associarInteressado(filhoteId, idInteressado);
    }
}