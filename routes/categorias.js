// =============================================================
// routes/categorias.js — Rotas de Categorias da Pizzaria
// =============================================================
// Atualizado para buscar dados do Supabase em vez do banco em memória.
// As funções agora são async/await pois o Supabase é assíncrono.
// =============================================================

const express = require('express');
const router = express.Router();

// Importa o cliente Supabase (antes era o array em memória)
const supabase = require('../data/database');

// ─── [GET] /api/categorias ────────────────────────────────────
// Retorna a lista completa de categorias do cardápio.
//
// Teste: GET https://pizzaria-js-aula7.vercel.app/api/categorias
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .select('*')
            .order('id');

        if (error) throw new Error(error.message);

        res.json(data);
    } catch (err) {
        next(err); // passa o erro para o errorHandler
    }
});

// ─── [POST] /api/categorias ───────────────────────────────────
// Cria uma nova categoria no cardápio da Pizzaria.
//
// Body (JSON): { "nome": "Bordas Recheadas" }
// Teste: POST https://pizzaria-js-aula7.vercel.app/api/categorias
router.post('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .insert([{ nome: req.body.nome }])
            .select()
            .single();

        if (error) throw new Error(error.message);

        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
