import express from "express";
import cors from 'cors';
import interessadoRouter from "./Routes/RotaInteressados.js";
import FilhoteRouter from "./Routes/RotaFilhotes.js";

const host = "0.0.0.0";
const port = 3000;
const app = express();

app.use(express.json());
app.use("/interessado", interessadoRouter);
app.use("/filhote", FilhoteRouter);

app.listen(port, host, () => {
    console.log(`Server is Running at http://${host}:${port}`)
});

