// =============================================================
// data/database.js — Conexão com Supabase
// =============================================================
// Antes usávamos arrays em memória (dados sumiam ao reiniciar).
// Agora conectamos ao Supabase para persistir os dados de verdade!
//
// As credenciais vêm das variáveis de ambiente do Vercel:
//   SUPABASE_URL → URL do seu projeto Supabase
//   SUPABASE_KEY → Chave pública (anon/publishable key)
//
// Como configurar no Vercel:
//   Settings → Environment Variables → adicionar as duas variáveis
// =============================================================

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pyjofnuvnlnbkfnbgijn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_renUaDIKOkP2uPJNBsWEvw_jzcjxR0w';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
