// middlewares/errorHandler.js — Middleware de Tratamento de Erros (sem alterações)
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(`❌🔥 Erro na cozinha detectado: ${err.message}`);
    res.status(500).json({
        sucesso: false,
        mensagem: "Ops! Ocorreu um problema na nossa cozinha e não conseguimos processar seu pedido.",
        detalhe: err.message
    });
};

module.exports = errorHandlerMiddleware;
