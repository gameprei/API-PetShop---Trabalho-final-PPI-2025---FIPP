import { Router } from "express";
import FilhoteController from "../Controllers/FilhoteController.js";

const FilhoteRouter = Router();
const FilhoteCtrl = new FilhoteController();

FilhoteRouter
.get("/:id", FilhoteCtrl.consultar)
.get("/", FilhoteCtrl.consultar)
.post("/", FilhoteCtrl.gravar)
.put("/:id", FilhoteCtrl.alterar)
.patch("/:id/associar", FilhoteCtrl.associarInteressado)
.delete("/:id", FilhoteCtrl.excluir);

export default FilhoteRouter;
