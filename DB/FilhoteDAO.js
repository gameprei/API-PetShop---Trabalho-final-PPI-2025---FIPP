import Filhote from "../Models/Filhote.js";
import Connect from "./connect.js";

export default class FilhoteDAO {

    async gravar(filhote) {
        if (filhote instanceof Filhote) {
            const connection = await Connect();
            const sql = "INSERT INTO FILHOTE (especie, raca, id_interessado) VALUES (?, ?, ?)";
            const values = [filhote.especie, filhote.raca, filhote.id_interessado];
            await connection.query(sql, values);
            connection.release();
        }
    }

    async alterar(filhote) {
        if (filhote instanceof Filhote) {
            const connection = await Connect();
            const sql = "UPDATE FILHOTE SET especie = ?, raca = ?, id_interessado = ? WHERE id = ?";
            const values = [filhote.especie, filhote.raca, filhote.id_interessado, filhote.id];
            await connection.execute(sql, values);
            connection.release();
        }
    }

    async excluir(id) {
        const connection = await Connect();
        const sql = "DELETE FROM FILHOTE WHERE id = ?";
        const values = [id];
        await connection.execute(sql, values);
        connection.release();
    }

    async consultar(id) {
        const connection = await Connect();
        let sql, values;

        if (id) {
            sql = "SELECT * FROM FILHOTE WHERE id = ?";
            values = [id];
        } else {
            sql = "SELECT * FROM FILHOTE";
            values = [];
        }

        const [rows] = await connection.query(sql, values);
        connection.release();

        let listaFilhotes = [];

        for (const row of rows) {
            const filhote = new Filhote(
                row.id || row.ID,
                row.especie || row.ESPECIE,
                row.raca || row.RACA,
                row.id_interessado || row.ID_INTERESSADO
            );

            listaFilhotes.push(filhote.toJson());
        }

        return listaFilhotes;
    }

    async consultarFilhotePorInteressado(idInteressado) {
        const connection = await Connect();
        const sql = `
            SELECT F.id, F.especie, F.raca, I.nome AS interessado_nome
            FROM FILHOTE F
            INNER JOIN INTERESSADO I ON I.id = F.id_interessado
            WHERE I.id = ?;
        `;
        const values = [idInteressado];
        const [rows] = await connection.query(sql, values);
        connection.release();

        let listaFilhotes = [];

        for (const row of rows) {
            const filhote = new Filhote(
                row.id,
                row.especie,
                row.raca,
                idInteressado
            );
            const filhoteJson = filhote.toJson();
            filhoteJson.interessado_nome = row.interessado_nome;
            listaFilhotes.push(filhoteJson);
        }

        return listaFilhotes;
    }

    async associarInteressado(filhoteId, idInteressado) {
        const connection = await Connect();
        try {
            const sql = "UPDATE FILHOTE SET id_interessado = ? WHERE id = ?";
            const values = [idInteressado, filhoteId];
            const [result] = await connection.execute(sql, values);
            return result;
        } catch (err) {
            console.error("Erro ao associar interessado:", err);
        } finally {
            connection.release();
        }
    }
}