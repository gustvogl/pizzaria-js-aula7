// middlewares/logger.js — Middleware de Log (sem alterações)
const loggerMiddleware = (req, res, next) => {
    const horaAtual = new Date().toLocaleTimeString('pt-BR');
    console.log(`[${horaAtual}] 📝 Novo Acesso na Pizzaria: ${req.method} ${req.url}`);
    next();
};

module.exports = loggerMiddleware;
