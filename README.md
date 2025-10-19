# API-PetShop---Trabalho-final-PPI-2025---FIPP
# 📋 Resumo do Projeto - Sistema Pet Shop

## 🎯 **Objetivo**
Desenvolver um sistema web completo para cadastro de interessados em filhotes, funcionando como uma fila de espera para adoção/aquisição, com gerenciamento de filhotes disponíveis.

## 🛠 **Tecnologias Utilizadas**

### **Backend**
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **MySQL** - Banco de dados relacional

### **Arquitetura**
- **MVC (Model-View-Controller)** - Padrão arquitetural
- **API REST** - Interface de comunicação

## 📊 **Estrutura do Banco de Dados**

### **Tabela: INTERESSADO**
| Campo | Tipo | Descrição |
|-------|------|------------|
| id | INT AUTO_INCREMENT | Chave primária |
| cpf | VARCHAR | Documento único |
| nome | VARCHAR | Nome completo |
| telefone | VARCHAR | Contato telefônico |
| email | VARCHAR | E-mail de contato |

### **Tabela: FILHOTE**
| Campo | Tipo | Descrição |
|-------|------|------------|
| id | INT AUTO_INCREMENT | Chave primária |
| especie | VARCHAR | Espécie do animal |
| raca | VARCHAR | Raça do animal |
| id_interessado | INT | Chave estrangeira para INTERESSADO |

## 🔗 **Relacionamentos**
- **Um para Muitos**: Um interessado pode estar relacionado a um ou mais filhotes
- **Muitos para Um**: Um filhote pode ter um interessado vinculado

## 🌐 **API REST - Endpoints**

### **Interessados**
- `GET /interessados` - Listar todos os interessados
- `GET /interessados/:id` - Buscar interessado específico
- `POST /interessados` - Cadastrar novo interessado
- `PUT /interessados/:id` - Atualizar interessado
- `DELETE /interessados/:id` - Excluir interessado

### **Filhotes**
- `GET /filhotes` - Listar todos os filhotes
- `GET /filhotes/:id` - Buscar filhote específico
- `POST /filhotes` - Cadastrar novo filhote
- `PATCH /filhotes/:id/associar` - Associar interessado
- `PUT /filhotes/:id` - Atualizar filhote
- `DELETE /filhotes/:id` - Excluir filhote

## 📝 **Características Técnicas**

### **Formato de Resposta**
- **JSON** - Todas as respostas em formato JSON
- **Mensagens claras** - Confirmações e mensagens de erro
- **Status HTTP** - Códigos de status apropriados

## 🎨 **Funcionalidades Principais**
1. **Cadastro de Interessados** - Fila de espera para adoção
2. **Gerenciamento de Filhotes** - Controle de animais disponíveis
3. **Associação Automática** - Vinculação entre interessados e filhotes
4. **Operações CRUD** - Create, Read, Update, Delete completos
