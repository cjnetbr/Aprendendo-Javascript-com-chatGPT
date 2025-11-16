// A) Imports — declarar dependências (micro-bloco 1)

import { loadLocal, saveLocal } from "./modules/storage.js";
import { criar, editar } from "./modules/tarefas.js";
import { qs, renderLista, setCallbacks } from "./modules/ui.js";
import { calcularStats, renderStats } from "./modules/stats.js";
import { aplicarFiltro } from "./modules/filter.js";
import { atualizarRotulosDosFiltros } from "./modules/ui.js";
// Linha a linha
// import { loadLocal, saveLocal } ... → trará as funções de persistência (ler/salvar).
// import { criar } ... → função de regra de negócio para fabricar o objeto tarefa.
// import { qs, renderLista } ... → utilitário de seleção de elementos e render da lista.

// B) Estado em memória + função de render (micro-bloco 2)

let lista = [];

function syncRender() {
  const ul = qs("#lista-tarefas");

  //1) Aplicar filtro antes de renderizar
  const listaFiltrada = aplicarFiltro(lista);

  // 2) Renderizr lista filtrada
  renderLista(ul, listaFiltrada);

  //3) Calcular e renderizar estatísticas
  const stats = calcularStats(lista);
  renderStats(stats);

  // Atualizar rótulos dos botões de filtro
  atualizarRotulosDosFiltros(stats);
}
//Explicação Linha a linha

// - let lista = []; → variável do módulo que guarda todas as tarefas correntes.
// - function syncRender() → função utilitária para re-renderizar a <ul> usando o estado lista.
// - const ul = qs('#lista-tarefas'); → pega a <ul> do HTML (mesmo id que você já usa).
// - renderLista(ul, lista); → delega ao módulo de UI a montagem dos <li>.

//C) Init — carregar do storage e renderizar (micro-bloco 3)

setCallbacks({
  onEditar: (indice, novoTexto) => {
    const tarefaAntiga = lista[indice];
    const tarefaNova = editar(tarefaAntiga, novoTexto);
    lista = [...lista.slice(0, indice), tarefaNova, ...lista.slice(indice + 1)];
    saveLocal(lista);
    syncRender();
  },
  onCancelarEdicao: () => {
    syncRender();
  },
  // explicação linha a linha
  // trecho	                              explicação
  // setCallbacks({...})	                envia para ui.js uma função que será chamada quando o usuário editar algo.
  // onEditar(indice, novoTexto)	        recebe os dados vindos da UI.
  // const tarefaAntiga = lista[indice]	  pega a tarefa que será editada.
  // const tarefaNova = editar(...)	      usa o módulo tarefas.js (função pura) para atualizar o texto.
  // lista = [...lista.slice(0, indice), tarefaNova, ...lista.slice(indice + 1)]	substitui imutavelmente a tarefa no array.
  // saveLocal(lista)	                    persiste no storage.
  // syncRender()	                        re-desenha a lista.
});

function init() {
  // 1) Carrega o storage
  lista = loadLocal();

  // 2) primeira renderização
  syncRender();

  //Explicação Linha a linha
  // - function init() → ponto único de inicialização da app.
  // - lista = loadLocal(); → traz as tarefas já salvas no navegador (ou []).
  // - syncRender(); → mostra na tela o que foi carregado.
}

// D) Ligar SOMENTE o “Adicionar” (micro-bloco 4)
function ligarAdicionar() {
  const input = qs("#nova-tarefa");
  const btn = qs("#btn-adicionar");

  btn.addEventListener("click", () => {
    //btn.addEventListener('click', () => {
    const texto = input.value.trim();
    if (!texto) {
      alert("digite uma tarefa");
      input.focus();
      return;
    }

    // 1) criar objeto tarefa (regra pura)
    const nova = criar(texto);

    // 2) atualizar estado imutavelmente
    lista = [...lista, nova];

    // 3) persistir
    saveLocal(lista);

    // 4) renderizar
    syncRender();

    // 5) limpar e focar
    input.value = "";
    input.focus();
  });

  //Explicação Linha a linha
  // - const input = qs('#nova-tarefa'); → campo de texto que você já usa no HTML.
  // - const btn = qs('#btn-adicionar'); → botão de adicionar existente.
  // - btn.addEventListener('click', ... ) → registra o ouvinte do clique.
  // - const texto = input.value.trim(); → lê o que foi digitado e remove espaços laterais.
  // - if (!texto) { ... return; } → validação: evita criar tarefas vazias (UX).
  // - const nova = criar(texto); → usa regra de negócio pura (sem DOM) para fabricar a tarefa.
  // - lista = [...lista, nova]; → atualiza imutavelmente (novo array com a tarefa no fim).
  // - saveLocal(lista); → persiste o novo estado.
  // - syncRender(); → re-renderiza a lista na tela (mostra a nova tarefa com a sua animação de entrada).
  // - input.value = ''; input.focus(); → limpa o campo e volta o foco para digitar outra.
}

// Concluir e Remover tarefas (com delegação de eventos)

// 🎯 Objetivo
// Ensinar o app.js a reagir quando o usuário:
// marca uma tarefa como concluída (✔️);
// remove uma tarefa (🗑️), com animação suave .removendo.
// E tudo isso sem adicionar um listener para cada <li>.

// 🧠 Lógica — “delegação de eventos”

// Problema
// Se criássemos um addEventListener para cada <li> ou botão, precisaríamos recriar
// todos sempre que a lista fosse renderizada de novo — ineficiente.

// Solução
// Escutamos apenas um elemento-pai (a <ul id="lista-tarefas">) e, quando o clique ocorre:
// verificamos quem foi clicado (event.target);
// subimos (.closest('li')) para achar o item da lista;
// descobrimos o índice dessa <li> dentro da <ul>;
// aplicamos a ação correta (toggle ou remover).

// 🧩 Estrutura lógica das funções
// ligarEventosLista()
//  ├── escuta cliques na <ul>
//  ├── identifica botão clicado
//  ├── acha índice da <li>
//  ├── decide:
//  │     ├── btn-concluir → toggle()
//  │     └── btn-remover → animação → remover()
//  └── salva + renderiza

//Micro-bloco A — Função para ligar eventos
function ligarEventosLista() {
  const ul = qs("#lista-tarefas");

  ul.addEventListener("click", (evento) => {
    const alvo = evento.target; // elemento clicado
    const li = alvo.closest("li"); // sobe até o <li>
    if (!li) return; // clique fora? ignora

    const itens = [...ul.querySelectorAll("li")];
    const indice = itens.indexOf(li); // posição da tarefa
    if (indice === -1) return;

    // botão concluir
    if (alvo.classList.contains("btn-concluir")) {
      const tarefaAtual = lista[indice];
      const atualizada = { ...tarefaAtual, feita: !tarefaAtual.feita };
      lista = [
        ...lista.slice(0, indice),
        atualizada,
        ...lista.slice(indice + 1),
      ];

      saveLocal(lista);
      syncRender();
    }

    // botão Remover
    if (alvo.classList.contains("btn-remover")) {
      li.classList.add("removendo"); //ativa a animação
      setTimeout(() => {
        lista = [...lista.slice(0, indice), ...lista.slice(indice + 1)];
        saveLocal(lista);
        syncRender();
      }, 300);
    }
  });

  //Explicação linha a linha

  // | Trecho                                                                         | Explicação                                                                         |
  // | :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
  // | `const ul = qs('#lista-tarefas');`                                             | Seleciona a `<ul>` onde todas as tarefas vivem.                                    |
  // | `ul.addEventListener('click', (ev) => { ... })`                                | Cria **um único** ouvinte para todos os cliques nos botões internos.               |
  // | `const alvo = ev.target;`                                                      | O elemento específico que o usuário clicou.                                        |
  // | `const li = alvo.closest('li');`                                               | Sobe na árvore DOM até achar o `<li>` correspondente à tarefa.                     |
  // | `if (!li) return;`                                                             | Se o clique não for dentro de um `<li>`, não faz nada.                             |
  // | `const itens = [...ul.querySelectorAll('li')];`                                | Cria um array de todas as `<li>` atuais.                                           |
  // | `const indice = itens.indexOf(li);`                                            | Determina o índice da tarefa clicada.                                              |
  // | `if (alvo.classList.contains('btn-concluir')) { ... }`                         | Detecta se o botão clicado foi “Concluir”.                                         |
  // | `const tarefaAtual = lista[indice];`                                           | Recupera a tarefa correspondente no array.                                         |
  // | `const atualizada = { ...tarefaAtual, feita: !tarefaAtual.feita };`            | Cria nova cópia com o valor `feita` invertido (imutabilidade).                     |
  // | `lista = [...lista.slice(0, indice), atualizada, ...lista.slice(indice + 1)];` | Substitui a tarefa antiga no array por sua versão atualizada.                      |
  // | `saveLocal(lista); syncRender();`                                              | Persiste e redesenha.                                                              |
  // | `if (alvo.classList.contains('btn-remover')) { ... }`                          | Detecta se o botão clicado foi “Remover”.                                          |
  // | `li.classList.add('removendo');`                                               | Adiciona a classe que aciona a animação de saída (já prevista no seu CSS v3.1).    |
  // | `setTimeout(..., 300)`                                                         | Espera o término da animação (≈ 0,3 s) antes de realmente remover e re-renderizar. |
}

import { ligarFiltros } from "./modules/ui.js";

window.addEventListener("DOMContentLoaded", () => {
  init();
  ligarAdicionar(); // ← ativa o botão
  ligarEventosLista(); // ← ativa concluir/remover
  ligarFiltros(syncRender); // ← ativa os botões de filtro

  // Explicação:
  // DOMContentLoaded garante que os elementos HTML já existem antes de selecioná-los.
  // Chamamos init() para renderizar as tarefas existentes.
  // Chamamos ligarAdicionar() para habilitar o botão “Adicionar”.
  // Chamamos ligarEventosLista() para habilitar concluir/remover com delegação.
  // Chamamos ligarFiltros(syncRender) para ativar os botões de filtro.
});
