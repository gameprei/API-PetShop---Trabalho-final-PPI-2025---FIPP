import Interessado from "../Models/Interessado.js";
import Connect from "./connect.js";

export default class InteressadoDAO {

    async gravar(interessado) {
        if (interessado instanceof Interessado) {
            const connection = await Connect();
            const sql = "INSERT INTO INTERESSADO (cpf, nome, telefone, email) VALUES (?, ?, ?, ?)";
            const values = [
                interessado.cpf,
                interessado.nome,
                interessado.telefone,
                interessado.email
            ];
            await connection.query(sql, values);
            connection.release();
        }
    }

    async alterar(interessado) {
        if (interessado instanceof Interessado) {
            const connection = await Connect();
            const sql = "UPDATE INTERESSADO SET nome = ?, telefone = ?, email = ? WHERE cpf = ?";
            const values = [
                interessado.nome,
                interessado.telefone,
                interessado.email,
                interessado.cpf
            ];
            await connection.execute(sql, values);
            connection.release();
        }
    }

    async excluir(id) {
        const connection = await Connect();
        const sql = "DELETE FROM INTERESSADO WHERE id = ?";
        const values = [id];
        await connection.execute(sql, values);
        connection.release();
    }

    async consultar(id) {
        const connection = await Connect();
        let sql, values;

        if (id) {
            sql = "SELECT * FROM INTERESSADO WHERE id = ?";
            values = [id];
        } else {
            sql = "SELECT * FROM INTERESSADO";
            values = [];
        }

        const [rows] = await connection.query(sql, values);
        connection.release();

        let listaInteressados = [];

        for (const row of rows) {
            const interessado = new Interessado(
                row.id || row.ID,
                row.cpf || row.CPF,
                row.nome || row.NOME,
                row.telefone || row.TELEFONE,
                row.email || row.EMAIL
            );
            listaInteressados.push(interessado.toJson());
        }

        return listaInteressados;
    }
}