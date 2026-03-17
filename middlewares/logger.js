// =============================================================
// middlewares/logger.js — Middleware de Log (Supervisão da Pizzaria)
// =============================================================
// O que é um Middleware?
//   Pense num Middleware como o GERENTE ou ATENDENTE na porta
//   da nossa Pizzaria. Todo cliente (requisição) que chega ao servidor 
//   passa por ele ANTES de chegar na cozinha (rota de destino).
//
//   O Middleware pode:
//     1. Olhar a requisição ("Quem está pedindo e o quê?")
//     2. Alterar a requisição ou a resposta (ex: formatar os dados)
//     3. Barrar a requisição ("Você não tem permissão para entrar!")
//     4. Deixar passar (encaminhando com a função next())
//
// O que este Middleware faz?
//   Anota no seu terminal (console) a HORA e a ROTA acessada toda vez
//   que alguém fizer um pedido à API. Isso é o seu painel de controle!
//
// Fluxo visual:
//   Cliente / App → [Logger Middleware] → Cozinha (Rota) → Resposta
// =============================================================

// ─── Definição do Middleware de Log ───────────────────────────
// Um middleware normal do Express sempre recebe 3 parâmetros:
//   req  = objeto da requisição (o "pedido" ou dados que chegaram)
//   res  = objeto da resposta (o que vamos devolver ao cliente)
//   next = função que manda a requisição continuar para o próximo passo
const loggerMiddleware = (req, res, next) => {

    // Pegamos a hora atual do servidor e formatamos como string legível (ex: "20:30:45")
    const horaAtual = new Date().toLocaleTimeString('pt-BR');

    // Mostramos no terminal:
    //   - A hora exata
    //   - O método HTTP (GET = ver cardápio, POST = novo pedido, etc.)
    //   - A URL da rota acessada (ex: /api/produtos)
    console.log(`[${horaAtual}] 📝 Novo Acesso na Pizzaria: ${req.method} ${req.url}`);

    // ⚠️ MUITO IMPORTANTE: next() é obrigatório!
    // Sem chamar next(), o cliente fica esperando eternamente na porta e a 
    // aplicação trava. É o next() que faz o pedido ir para a rota certa.
    next();
};

// ─── Exportação ───────────────────────────────────────────────
// Exportamos a função para que o server.js possa importar e usar globalmente.
module.exports = loggerMiddleware;