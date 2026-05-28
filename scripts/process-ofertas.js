#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OFERTAS_DIR = path.join(__dirname, '../src/content/ofertas');
const QUEUE_FILE = path.join(__dirname, '../ofertas-queue.json');

/**
 * Gera uma descrição automática baseada no título
 */
function generateDescription(title) {
  const descriptions = [
    `${title} em promoção — aproveita o preço especial de hoje!`,
    `${title} com desconto imperdível — confira a oferta completa.`,
    `${title} em oferta exclusiva — ótimo custo-benefício.`,
    `${title} com preço reduzido — não perca esta promoção!`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

/**
 * Sanitiza título para nome de arquivo
 */
function sanitizeFilename(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais
    .replace(/^-+|-+$/g, '') // Remove hífens nas extremidades
    .substring(0, 50); // Limita tamanho
}

/**
 * Obtém o próximo número de order
 */
function getNextOrder() {
  const files = fs.readdirSync(OFERTAS_DIR);
  const orders = files
    .map(file => {
      const content = fs.readFileSync(path.join(OFERTAS_DIR, file), 'utf8');
      const match = content.match(/order:\s*(\d+)/);
      return match ? parseInt(match[1], 10) : -1;
    })
    .filter(order => order !== -1);

  return Math.max(...orders, -1) + 1;
}

/**
 * Processa a fila de ofertas
 */
async function processOfertasQueue() {
  if (!fs.existsSync(QUEUE_FILE)) {
    console.log('❌ Arquivo ofertas-queue.json não encontrado!');
    console.log('📝 Crie o arquivo com este formato:');
    console.log(JSON.stringify([
      {
        title: "Fantasia Infantil Dino Verde",
        price: "74,00",
        link: "https://meli.la/28Fjvd4",
        image: "fantasia.png",
      }
    ], null, 2));
    process.exit(1);
  }

  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));

  if (!Array.isArray(queue) || queue.length === 0) {
    console.log('⚠️  Nenhuma oferta na fila!');
    process.exit(0);
  }

  console.log(`🚀 Processando ${queue.length} oferta(s)...\n`);

  let processedCount = 0;

  for (const oferta of queue) {
    const { title, price, link, image = 'oferta.png' } = oferta;

    if (!title || !price || !link) {
      console.log('❌ Oferta inválida (faltam campos obrigatórios):', oferta);
      continue;
    }

    const filename = sanitizeFilename(title);
    const filepath = path.join(OFERTAS_DIR, `${filename}.md`);

    // Verifica se já existe
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Pulando ${title} (já existe)`);
      continue;
    }

    const order = getNextOrder();
    const description = generateDescription(title);
    const priceFormatted = price.includes('R$') ? price : `R$ ${price}`;

    const frontmatter = `---
title: "${title}"
description: "${description}"
image: "/${image}"
price: "${priceFormatted}"
link: "${link}"
featured: true
order: ${order}
---
`;

    fs.writeFileSync(filepath, frontmatter);
    console.log(`✅ Criado: ${filename}.md (order: ${order})`);
    processedCount++;
  }

  if (processedCount === 0) {
    console.log('ℹ️  Nenhuma oferta foi processada.');
    process.exit(0);
  }

  console.log(`\n📦 ${processedCount} oferta(s) criada(s) com sucesso!\n`);

  // Git commit e push
  try {
    console.log('🔄 Fazendo commit e push...');
    execSync('git add src/content/ofertas/*.md', { stdio: 'inherit' });
    execSync(`git commit -m "Adicionar ${processedCount} oferta(s) do dia"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Publicado no repositório!\n');
  } catch (error) {
    console.error('❌ Erro ao fazer git commit/push:', error.message);
    console.log('⚠️  Os arquivos foram criados, mas o push falhou.');
    process.exit(1);
  }

  // Limpa a fila
  fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2));
  console.log('🧹 Fila limpa!\n');
}

processOfertasQueue().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
