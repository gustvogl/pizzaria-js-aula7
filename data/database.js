// =============================================================
// data/database.js — Banco de Dados em Memória da Pizzaria
// =============================================================
// O que é isso?
//   Em vez de usar um banco de dados real (como MySQL ou MongoDB),
//   guardamos os dados aqui mesmo, dentro de arrays do JavaScript.
//   Isso funciona enquanto o servidor está ligado.
//   Quando o servidor reinicia, os dados voltam para o estado inicial.
//
// Por que usar isso nas aulas?
//   Simplifica o aprendizado! Não precisamos instalar e configurar
//   um banco de dados externo. O foco é aprender a criar a API 
//   e a entender o fluxo dos Middlewares e Rotas.
// =============================================================

// ─── Tabela de Categorias ─────────────────────────────────────
// Cada categoria agrupa produtos relacionados no cardápio.
let categorias = [
    { id: 1, nome: 'Pizzas Salgadas' },
    { id: 2, nome: 'Pizzas Doces' },
    { id: 3, nome: 'Bebidas' }
];

// ─── Tabela de Produtos ───────────────────────────────────────
// Cada produto tem um ID único, pertence a uma categoria (categoriaId),
// e possui nome, descrição, preço e o nome do arquivo de imagem.
let produtos = [
    {
        id: 1,
        categoriaId: 1,
        nome: 'Pizza de Calabresa',
        descricao: 'Mussarela, calabresa fatiada, cebola e orégano.',
        preco: 45.00,
        imagem: 'calabresa.png'
    },
    {
        id: 2,
        categoriaId: 1,
        nome: 'Pizza Margherita',
        descricao: 'Mussarela, tomate em rodelas e manjericão fresco.',
        preco: 48.00,
        imagem: 'margherita.png'
    },
    {
        id: 3,
        categoriaId: 2,
        nome: 'Pizza Chocolate com Morango',
        descricao: 'Chocolate ao leite derretido coberto com morangos frescos.',
        preco: 50.00,
        imagem: 'chocolate-morango.png'
    },
    {
        id: 4,
        categoriaId: 3,
        nome: 'Refrigerante Cola 2L',
        descricao: 'Refrigerante gelado garrafa PET 2 Litros.',
        preco: 12.00,
        imagem: 'refri-cola.png'
    }
];

// ─── Exportação dos dados ─────────────────────────────────────
// Exportamos as duas variáveis num único objeto para que outros
// arquivos (como as rotas) possam importar e usar esses dados.
module.exports = { categorias, produtos };