//Etapa 5.0.2 — Criando o módulo stats.js
// 🎯 Objetivo do módulo

// O módulo stats.js será responsável por:

// 1. Calcular estatísticas com base na lista completa:
// - total de tarefas
// - concluídas
// - pendentes
// - percentual de progresso

// 2. Renderizar o painel de estatísticas na interface:
// - Atualizar <span id="total">
// - Atualizar <span id="concluidas">
// - Atualizar <span id="pendentes">
// - Atualizar a barra de progresso <div id="barra">

// precisamos do helper de seleção
import { qs } from "./ui.js";

//função pura: recebe a lista completa e devolve um objeto com as estatísticas
export function calcularStats(lista) {
  const total = lista.length;
  const concluidas = lista.filter((t) => t.feita).length;
  const pendentes = total - concluidas;

  //evita divisão por zero
  const percentual = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return { total, concluidas, pendentes, percentual };

  // Explicação linha a linha
  // export function calcularStats(lista) → função pública que recebe a lista completa de tarefas.
  // const total = lista.length; → calcula o total de tarefas.
  // const concluidas = lista.filter(t => t.feita).length; → filtra as tarefas concluídas e conta quantas são.
  // const pendentes = total - concluidas; → calcula as tarefas pendentes.
  // const percentual = total > 0 ? Math.round((concluidas / total) * 100) : 0; → calcula o percentual de conclusão, evitando divisão por zero.
  // return { total, concluidas, pendentes, percentual }; → retorna um objeto com todas as estatísticas calculadas.
}

export function renderStats(stats) {
  //seleciona os elementos do DOM
  const totalEl = qs("#st-total");
  const concluidasEl = qs("#st-concluidas");
  const pendentesEl = qs("#st-pendentes");
  const barra = qs("#st-barra");

  //atualiza o conteúdo dos elementos
  totalEl.textContent = `Total: ${stats.total}`;
  concluidasEl.textContent = `Concluídas: ${stats.concluidas}`;
  pendentesEl.textContent = `Pendentes: ${stats.pendentes}`;

  //atualiza a largura da barra de progresso
  barra.style.width = `${stats.percentual}%`;

  // Explicação linha a linha
  // export function renderStarts(stats) → função pública que recebe o objeto de estatísticas.
  // const totalEl = qs("#st-total"); → seleciona o elemento do DOM para o total de tarefas.
  // const concluidasEl = qs("#st-concluidas"); → seleciona o elemento do DOM para tarefas concluídas.
  // const pendentesEl = qs("#st-pendentes"); → seleciona o elemento do DOM para tarefas pendentes.
  // const barra = qs("#st-barra"); → seleciona o elemento da barra de progresso.
  // totalEl.textContent = `Total: ${stats.total}`; → atualiza o texto do total de tarefas.
  // concluidasEl.textContent = `Concluídas: ${stats.concluidas}`; → atualiza o texto de tarefas concluídas.
  // pendentesEl.textContent = `Pendentes: ${stats.pendentes}`; → atualiza o texto de tarefas pendentes.
  // barra.style.width = `${stats.percentual}%`; → ajusta a largura
}
