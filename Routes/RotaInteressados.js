import { Router } from "express";
import InteressadoController from "../Controllers/InteressadoController.js";

const interessadoRouter = Router();
const interessadoCtrl = new InteressadoController();

interessadoRouter
.get("/:id", interessadoCtrl.consultar)
.get("/", interessadoCtrl.consultar)
.post("/", interessadoCtrl.gravar)
.put("/:id", interessadoCtrl.alterar)
.delete("/:id", interessadoCtrl.excluir);

export default interessadoRouter;
