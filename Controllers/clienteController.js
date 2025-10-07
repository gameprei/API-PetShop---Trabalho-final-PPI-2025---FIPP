import Cliente from "../Models/Cliente.js";

export default class ClienteController {
    gravar(requisicao, resposta) {
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body
            console.log("📦 Dados recebidos no body:", dados);
            if (dados.cli_cpf && dados.cli_nome && dados.cli_telefone && dados.cli_email) {
                const cliente = new Cliente(dados.cli_cpf, dados.cli_nome, dados.cli_telefone, dados.cli_email);
                console.log("Dados recebidos na rota:", dados.cli_cpf, dados.cli_nome, dados.cli_telefone, dados.cli_email)
                cliente.gravar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            "mensagem": "Cliente gravado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            "mensagem": "Erro ao gravar o cliente: " + erro.message
                        });
                    });
            }
            else {
                return resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe todas as informações do cliente"
                });
            };
        }
        else {
            return resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        }
    };

    alterar(requisicao, resposta){
        if((requisicao.method ==="PUT" || requisicao.method ==="PATCH") && requisicao.is("application/json")){
            const dados = requisicao.body;
            
            if(dados.cli_cpf && dados.cli_nome && dados.cli_telefone && dados.cli_email){
                const cliente = new Cliente(dados.cli_cpf, dados.cli_nome, dados.cli_telefone, dados.cli_email);
                cliente.alterar()
                .then(() => {
                    return resposta.status(200).json({
                        status: true,
                        "mensagem": "Cliente alterado com sucesso!"
                    });
                })
                .catch((erro) =>{
                    return resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao alterar o cliente" + erro.message
                    });
                });
            } 
            else {
                return resposta.status(400).json({
                    status: false,
                    "mensagem": "informe todos os dados do cliente"
                });
            };
        }
        else {
            return resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        };
    };

    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const cli_cpf = requisicao.params.cli_cpf;
            if(cli_cpf){
                const cliente = new Cliente();
                cliente.excluir(cli_cpf)
                .then(() => {
                    return resposta.status(200).json({
                        status: true,
                        "mensagem": "Cliente excluido com sucesso"
                    });
                })
                .catch((erro) =>{
                    return resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao excluir cliente" + erro.message
                    });
                });
            } 
            else{
                return resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe o CPF do cliente para exclusão"
                })
            };
        }
        else{
            return resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        };
    };

    consultar(requisicao, resposta){
        if(requisicao.method === "GET"){
            const cli_cpf = requisicao.params.cli_cpf;
            console.log("CPF RECEBIDO NA ROTA", cli_cpf);

            const cliente = new Cliente();
            if (cli_cpf){
                cliente.consultar(cli_cpf)
                .then((listClientes) =>{
                    if(listClientes.length > 0){
                        return resposta.status(200).json({
                            status: true,
                            "mensagem": "Consulta realizada com sucesso",
                            cliente: listClientes[0]
                        });
                    }
                    else{
                        return resposta.status(404).json({
                            status: false,
                            "mensagem": "Cliente não encontrado"
                        });
                    };
                })
                .catch((erro) =>{
                    return resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao consultar cliente" + erro.message
                    });
                });
            }
            else{
                cliente.consultar()
                .then((listClientes) =>{
                    return resposta.status(200).json({
                        status: true,
                        "Mensagem": "Consulta realizada com sucesso",
                        cliente: listClientes
                    });
                })
                .catch((erro) =>{
                    return resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao consultar clientes" + erro.message
                    });
                });
            };
        };
    };
};
