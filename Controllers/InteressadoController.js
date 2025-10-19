import Interessado from "../Models/Interessado.js";

export default class InteressadoController {
    
    gravar(requisicao, resposta) {
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            if (dados.cpf && dados.nome && dados.telefone && dados.email && dados.id_filhote) {
                const interessado = new Interessado(
                    0, // id é auto incremento
                    dados.cpf,
                    dados.nome,
                    dados.telefone,
                    dados.email,
                    dados.id_filhote
                );
                console.log("Dados recebidos na rota:", dados);

                interessado.gravar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Interessado gravado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao gravar o interessado: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todas as informações do interessado (cpf, nome, telefone, email, id_filhote)"
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
            
            if (dados.cpf && dados.nome && dados.telefone && dados.email && dados.id_filhote) {
                const interessado = new Interessado(
                    dados.id || 0,
                    dados.cpf,
                    dados.nome,
                    dados.telefone,
                    dados.email,
                    dados.id_filhote
                );

                interessado.alterar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Interessado alterado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao alterar o interessado: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do interessado"
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
            const cpf = requisicao.params.cpf;
            if (cpf) {
                const interessado = new Interessado();
                interessado.excluir(cpf)
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Interessado excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao excluir interessado: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do interessado para exclusão"
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
            const cpf = requisicao.params.cpf;
            console.log("CPF recebido na rota:", cpf);

            const interessado = new Interessado();
            if (cpf) {
                interessado.consultar(cpf)
                    .then((listaInteressados) => {
                        if (listaInteressados.length > 0) {
                            return resposta.status(200).json({
                                status: true,
                                mensagem: "Consulta realizada com sucesso",
                                interessado: listaInteressados[0]
                            });
                        } else {
                            return resposta.status(404).json({
                                status: false,
                                mensagem: "Interessado não encontrado"
                            });
                        }
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao consultar interessado: " + erro.message
                        });
                    });
            } else {
                interessado.consultar()
                    .then((listaInteressados) => {
                        return resposta.status(200).json({
                            status: true,
                            mensagem: "Consulta realizada com sucesso",
                            interessados: listaInteressados
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao consultar interessados: " + erro.message
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
}
