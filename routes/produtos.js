// =============================================================
// routes/produtos.js — Rotas de Produtos (CRUD Completo)
// =============================================================
// Atualizado para buscar dados do Supabase em vez do banco em memória.
// As funções agora são async/await pois o Supabase é assíncrono.
// =============================================================

const express = require('express');
const router = express.Router();

// Importa o cliente Supabase
const supabase = require('../data/database');

// =============================================================
// ── ROTA ESPECIAL PARA TESTE DE ERRO ─────────────────────────
// Demonstra que o errorHandler captura erros e devolve JSON elegante.
// Teste: GET /api/produtos/erro-teste
// ⚠️ DEVE VIR ANTES da rota '/:id'!
// =============================================================
router.get('/erro-teste', (req, res) => {
    throw new Error("Ops! O forno da Pizzaria quebrou!");
});

// =============================================================
// ── [GET] /api/produtos ───────────────────────────────────────
// Retorna todos os produtos OU filtra por categoriaId.
//
// Exemplos:
//   Todos:             GET /api/produtos
//   Filtrar categoria: GET /api/produtos?categoriaId=1
// =============================================================
router.get('/', async (req, res, next) => {
    try {
        const { categoriaId } = req.query;

        let query = supabase.from('produtos').select('*').order('id');

        // Se passou categoriaId na URL, filtra no Supabase
        if (categoriaId) {
            query = query.eq('categoriaId', categoriaId);
        }

        const { data, error } = await query;

        if (error) throw new Error(error.message);

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [GET] /api/produtos/:id ───────────────────────────────────
// Busca um produto específico pelo seu ID.
// Teste: GET /api/produtos/1
// =============================================================
router.get('/:id', async (req, res, next) => {
    try {
        const produtoId = parseInt(req.params.id);

        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', produtoId)
            .single();

        if (error) {
            return res.status(404).json({ mensagem: 'Pizza/Produto não encontrado no cardápio.' });
        }

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [POST] /api/produtos ──────────────────────────────────────
// Adiciona um novo produto ao cardápio.
//
// Body: { "categoriaId": 1, "nome": "Pepperoni", "descricao": "...", "preco": 55.00, "imagem": "pepperoni.png" }
// Teste: POST /api/produtos
// =============================================================
router.post('/', async (req, res, next) => {
    try {
        const { categoriaId, nome, descricao, preco, imagem } = req.body;

        const { data, error } = await supabase
            .from('produtos')
            .insert([{ categoriaId, nome, descricao, preco, imagem }])
            .select()
            .single();

        if (error) throw new Error(error.message);

        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [PUT] /api/produtos/:id ───────────────────────────────────
// Atualiza um produto existente pelo ID.
//
// Body: os campos que deseja alterar, ex: { "preco": 59.90 }
// Teste: PUT /api/produtos/1
// =============================================================
router.put('/:id', async (req, res, next) => {
    try {
        const produtoId = parseInt(req.params.id);

        const { data, error } = await supabase
            .from('produtos')
            .update(req.body)
            .eq('id', produtoId)
            .select()
            .single();

        if (error) {
            return res.status(404).json({ mensagem: 'Pizza/Produto não encontrado para atualização.' });
        }

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [DELETE] /api/produtos/:id ────────────────────────────────
// Remove um produto do cardápio pelo ID.
// Teste: DELETE /api/produtos/2
// =============================================================
router.delete('/:id', async (req, res, next) => {
    try {
        const produtoId = parseInt(req.params.id);

        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', produtoId);

        if (error) throw new Error(error.message);

        res.json({ mensagem: 'Produto removido do cardápio com sucesso!' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
