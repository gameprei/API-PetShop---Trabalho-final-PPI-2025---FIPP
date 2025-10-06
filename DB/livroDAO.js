import Livro from "../Models/Livro.js"
import Connect from "./connect.js"

export default class LivroDAO{

    async gravar(livro){
        if(livro instanceof Livro){
            const connection = await Connect();
            const sql = "INSERT INTO LIVROS (liv_id, liv_titulo, liv_autor) VALUES (?, ?, ?)"
            const values = [livro.id, livro.titulo, livro.autor]
            const [result] = await connection.query(sql, values);
            connection.release();
        }
    };

    async alterar(livro){
        if(livro instanceof Livro){
            const connection = await Connect();
            const sql = "UPDATE LIVROS SET liv_titulo = ?, liv_autor = ? WHERE liv_id = ? "
            const values = [livro.titulo, livro.autor, livro.id];
            await connection.execute(sql, values);
            connection.release();
        };
    };

    async excluir(id){
        const connection = await Connect();
        const sql = "DELETE FROM LIVROS WHERE liv_id = ?";
        const values = [id];
        await connection.execute(sql, values);
        connection.release();
    }

    async consultar(id){
        const connection = await Connect();
        let sql, values;

        if (id){
            sql = "SELECT * FROM LIVROS WHERE liv_id = ?";
            values = [id]
        } else{
            sql = "SELECT * FROM LIVROS"
            values = [];
        };

        const [rows] = await connection.query(sql, values);
        connection.release();

        let listaLivros = [];

        for (const row of rows){
            const livro = new Livro(
                row.liv_id,
                row.liv_titulo,
                row.liv_autor,
                row.cli_cpf
            );

            listaLivros.push(livro.toJson());
        };
        return listaLivros;
    };

    async associarCliente(livroId, cliCpf) {
        const connection = await Connect();
        try {
            const sql = "UPDATE LIVROS SET cli_cpf = ? WHERE liv_id = ?";
            const values = [cliCpf, livroId];
            const [result] = await connection.execute(sql, values);
            return result;
        }catch(err){
            console.error("Erro ao associar cliente:", err);
        } 
        finally {
            connection.release();
        }
    }
}