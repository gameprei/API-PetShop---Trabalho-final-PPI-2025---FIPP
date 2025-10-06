import express from "express";
import cors from 'cors';


const host = "0.0.0.0";
const port = 3000;
const app = express();

app.use(express.json());

app.listen(port, host, () => {
    console.log(`Server is Running at http://${host}:${port}`)
});

