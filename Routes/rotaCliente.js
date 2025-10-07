import { Router } from "express";
import ClienteController from "../Controllers/clienteController.js";


const clienteRouter = Router();
const clienteCtrl = new ClienteController();

clienteRouter
.get("/:cli_cpf", clienteCtrl.consultar)
.get("/", clienteCtrl.consultar)
.post("/", clienteCtrl.gravar)
.put("/:cli_cpf", clienteCtrl.alterar)
.delete("/:cli_cpf", clienteCtrl.excluir);

export default clienteRouter