import Filhote from "../Models/Filhote.js";

export default class FilhoteController {

    gravar(requisicao, resposta) {
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            if (dados.especie && dados.raca && dados.id_interessado !== undefined) {
                const filhote = new Filhote(
                    0,
                    dados.especie,
                    dados.raca,
                    dados.id_interessado
                );
                console.log("Dados recebidos na rota:", dados); // Só para teste, retirar depois

                filhote.gravar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Filhote gravado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao gravar o filhote: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todas as informações do filhote (especie, raca, id_interessado)"
                });
            }
        } else {
            return resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    alterar(requisicao, resposta) {
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const dados = requisicao.body;

            if (dados.id && dados.especie && dados.raca && dados.id_interessado !== undefined) {
                const filhote = new Filhote(
                    dados.id,
                    dados.especie,
                    dados.raca,
                    dados.id_interessado
                );

                filhote.alterar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Filhote alterado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao alterar o filhote: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do filhote para alteração"
                });
            }
        } else {
            return resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    excluir(requisicao, resposta) {
        if (requisicao.method === "DELETE") {
            const id = requisicao.params.id;
            if (id) {
                const filhote = new Filhote();
                filhote.excluir(id)
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Filhote excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao excluir filhote: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID do filhote para exclusão"
                });
            }
        } else {
            return resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    consultar(requisicao, resposta) {
        if (requisicao.method === "GET") {
            const id = requisicao.params.id;
            console.log("ID recebido na rota:", id); // Só para teste, retirar depois

            const filhote = new Filhote();
            if (id) {
                filhote.consultar(id)
                    .then((listaFilhotes) => {
                        if (listaFilhotes.length > 0) {
                            return resposta.status(200).json({
                                status: true,
                                mensagem: "Consulta realizada com sucesso",
                                filhote: listaFilhotes[0]
                            });
                        } else {
                            return resposta.status(404).json({
                                status: false,
                                mensagem: "Filhote não encontrado"
                            });
                        }
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao consultar filhote: " + erro.message
                        });
                    });
            } else {
                filhote.consultar()
                    .then((listaFilhotes) => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Consulta realizada com sucesso",
                            filhotes: listaFilhotes
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao consultar filhotes: " + erro.message
                        });
                    });
            }
        } else {
            return resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    associarInteressado(requisicao, resposta) {
        if (requisicao.method === "PATCH" || requisicao.method === "PUT") {
            const filhoteId = requisicao.params.id;
            const { id_interessado } = requisicao.body;

            console.log("ID filhote recebido na rota", filhoteId);
            console.log("ID Interessado recebido na rota", id_interessado);

            if (filhoteId && id_interessado) {
                const filhote = new Filhote();
                filhote.associarInteressado(filhoteId, id_interessado)
                    .then((resultado) => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Filhote associado ao interessado com sucesso!",
                            resultado: resultado
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao associar filhote: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID do filhote e do interessado"
                });
            }
        } else {
            return resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }


}
