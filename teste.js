import Livro from "./Models/Livro.js";
import Cliente from "./Models/Cliente.js";

const livro = new Livro(1, "Crime e Castigo", "Fiódor Dostoiévski", "123-456-789-78");
const cliente = new Cliente("123-456-789-78", "Hideo Kojima", "(14)99999999", "metalgear@gmail.com");



console.log(livro.toString());
console.log(cliente.toString());