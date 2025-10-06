import Cliente from "../Models/Cliente.js";
import Connect from "./connect.js";

export default class ClienteDAO{

    async gravar(cliente){
        if(cliente instanceof Cliente){
            const connection = await Connect();
            const sql = "INSERT INTO CLIENTES (cli_cpf, cli_nome, cli_telefone, cli_email) VALUES (?, ?, ?, ?)";
            const values = [cliente.cpf, cliente.nome, cliente.telefone, cliente.email];
            const [result] = await connection.query(sql, values);
            connection.release();
        }
    };

    async alterar(cliente){
        if (cliente instanceof Cliente){
            const connection = await Connect();
            const sql = "UPDATE CLIENTES SET cli_nome = ?, cli_telefone = ?, cli_email = ? WHERE cli_cpf = ?";
            const values = [cliente.nome, cliente.telefone, cliente.email, cliente.cpf];
            await connection.execute(sql, values);
            connection.release();
        };
    };

    async excluir(cpf){
        const connection = await Connect();
        const sql = "DELETE FROM CLIENTES WHERE cli_cpf = ?";
        const values = [cpf];
        await connection.execute(sql, values);
        connection.release();
    };

    async consultar(cpf) {
        const connection = await Connect();
        let sql, values;

        if (cpf) {
            sql = "SELECT * FROM CLIENTES WHERE cli_cpf = ?";
            values = [cpf];
        } else {
            sql = "SELECT * FROM CLIENTES";
            values = [];
        }

        const [rows] = await connection.query(sql, values);
        connection.release();

        let listaClientes = [];

        for (const row of rows) {
            const cliente = new Cliente(
                row.cli_cpf || row.CLI_CPF,
                row.cli_nome || row.CLI_NOME,
                row.cli_telefone || row.CLI_TELEFONE,
                row.cli_email || row.CLI_EMAIL
            );

            listaClientes.push(cliente.toJson());
        }
        return listaClientes;
    }
};