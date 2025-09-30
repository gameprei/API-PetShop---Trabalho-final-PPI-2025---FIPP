import Connect from "./DB/connect.js";

async function testConnection() {
  try {
    const conn = await Connect(); // pega uma conexão do pool
    const [rows] = await conn.query("SELECT 1 + 1 AS resultado");
    console.log("Query de teste:", rows[0].resultado); // deve imprimir 2
    conn.release(); // devolve a conexão para o pool
  } catch (err) {
    console.error("Erro ao conectar no banco:", err);
  }
}

testConnection();
