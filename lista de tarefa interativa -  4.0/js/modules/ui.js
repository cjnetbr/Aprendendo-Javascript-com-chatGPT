// Módulo de UI (renderização da lista)
// O que a UI deve fazer (e o que não deve)

//import { saveLocal } from "./storage"; <-- rremovido pois não possuia a extenção .js
import { loadLocal, saveLocal } from "./storage.js";

// Sistema de callbacks entre UI e App
let callbacks = {};
export function setCallbacks(novosCallbacks) {
  callbacks = { ...callbacks, ...novosCallbacks };
  // explicação
  // let callbacks = {} → armazena funções vindas do app.js;
  // setCallbacks({...}) → função pública para registrar novas callbacks;
  // usamos o spread (...) para permitir adicionar mais de uma no futuro
  // (ex.: onEditar, onRemover, onConcluir, etc.).
}

// Faz: criar elementos do DOM, aplicar classes, inserir na <ul id="lista-tarefas">, e disparar
// animações suaves já definidas no seu CSS (.fade, .nova, .removendo, .feita).

// Não faz: decidir regras de negócio (isso já está em tarefas.js) e nem persistência (isso é storage.js).

// Mantém: compatibilidade com a sua estrutura HTML e CSS atuais (mesmos ids/classes, como #lista-tarefas,
// .btn-container, .btn-concluir, .btn-remover).

// A estratégia será montar três bloquinhos mínimos:

// - helpers de seleção (qs, qsa), para limpar seu app.js;
// - criação de um <li> a partir de um objeto {texto, feita};
// - renderização da lista inteira com animação de entrada .nova

//A) Helpers de seleção (micro-bloco 1)

export function qs(sel, root = document) {
  return root.querySelector(sel);
  //     Explicação Linha a linha
  //     export function qs(sel, root = document) → função pública; recebe um seletor CSS e um “raiz” (por padrão, o document).
  //     return root.querySelector(sel); → devolve o primeiro elemento que bate com o seletor.
}

export function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
  // Explicação Linha a linha
  // export function qsa(...) → semelhante, mas retorna todos os elementos.
  // [...root.querySelectorAll(...)] → transforma a NodeList em array real, útil para .map, .forEach com métodos de array.
}

// B) Criar um item <li> a partir de uma tarefa (micro-bloco 2)
// Por quê: centralizar a estrutura visual de cada tarefa para manter o layout e as classes esperadas pelo CSS (transições e botões).

export function criarItemDOM(tarefa) {
  const li = document.createElement("li");
  li.classList.add("fade"); // ativa transições de v3.1
  if (tarefa.feita) li.classList.add("feita"); // ativa transições de v3.1

  const span = document.createElement("span");
  span.classList.add("texto");
  span.textContent = tarefa.texto; // texto visível da tarefa

  // DETECTAR DUPLO-CLIQUE PARA EDITAR
  span.addEventListener("dblclick", () => {
    // 🔹 1. descobrir qual tarefa está sendo editada
    const li = span.closest("li");
    const ul = li.parentElement;
    const itens = [...ul.querySelectorAll("li")];
    const indice = itens.indexOf(li);
    // | Linha                            | Explicação                                                               |
    // | -------------------------------- | ------------------------------------------------------------------------ |
    // | `span.closest('li')`             | sobe na árvore DOM até encontrar o `<li>` que contém o texto.            |
    // | `li.parentElement`               | retorna a `<ul>` da lista.                                               |
    // | `[...ul.querySelectorAll('li')]` | cria um array com todos os `<li>` da lista.                              |
    // | `itens.indexOf(li)`              | descobre a posição (índice) do `<li>` atual dentro da `<ul>`.            |
    // | `indice`                         | variável local, disponível para uso nos callbacks (`salvarEdicao`, etc). |

    //CRIAR O CAMPO INPUT
    const input = document.createElement("input");
    input.type = "text";
    input.value = tarefa.texto;
    input.classList.add("editando");

    //SUBSTITUIR O SPAN PELO INPUT
    li.replaceChild(input, span);

    //FOCAR E SELECIONAR O TEXTO
    input.focus();
    input.select();

    //CONTROLAR TECLAS E SAÍDA DE CAMPOS
    input.addEventListener("keydown", (ev) => {
      //ENTER -> salvar
      if (ev.key === "Enter") {
        salvaEdicao();
      }

      //ESC -> cancelar
      if (ev.key === "Escape") {
        cancelaEdicao();
      }

      //BLUR -> salvar altomaticamente
      input.addEventListener("blur", salvaEdicao);
    });

    function salvaEdicao() {
      const novoTexto = input.value.trim();
      if (callbacks.onEditar) {
        callbacks.onEditar(indice, novoTexto);
      }
      // explicação
      // callbacks.onEditar → verifica se o app.js registrou a função.
      // onEditar(indice, novoTexto) → o ui.js envia a intenção (“editar tarefa X para Y”)
      // e não se preocupa em salvar nem renderizar — o app.js faz isso.
      console.log(indice, novoTexto);
    }

    function cancelaEdicao() {
      //Volta a lista original sem alterar dados
      if (callbacks.onCancelarEdicao) {
        callbacks.onCancelarEdicao();
      }
    }
  });

  const divBotoes = document.createElement("div");
  divBotoes.classList.add("btn-container"); // posiciona botões à direita

  const bOk = document.createElement("button");
  bOk.classList.add("btn-concluir");
  bOk.textContent = "Concluir"; // cor/estilo de concluir

  const bRm = document.createElement("button");
  bRm.classList.add("btn-remover");
  bRm.textContent = "Remover"; // cor/estilo de remover

  divBotoes.append(bOk, bRm); // ordem dos botões
  li.append(span, divBotoes); // texto à esquerda, botões à direita

  return li;
}

// C) Renderizar a lista inteira com animação de entrada (micro-bloco 3)

// Por quê: abstrair “limpar e preencher” a <ul> sem saber como as tarefas foram obtidas (local/API).
// Animação: adicionamos .nova no fim para ganhar o efeito de entrada previsto em v3.1

export function limparLista(ul) {
  ul.innerHTML = "";
}

export function renderLista(ul, lista) {
  limparLista(ul);
  //   lista.forEach((t) => {
  lista.forEach((t) => {
    const li = criarItemDOM(t);
    ul.append(li);
    // dispara a animação de entrada v3.1:
    li.classList.add("nova");
    setTimeout(() => li.classList.remove("nova"), 400); // dura ~0.4s
  });

  //   ExplicaçãoLinha a linha

  //     - limparLista(ul) → zera o conteúdo para evitar duplicatas.
  //     - lista.forEach(t => { ... }) → itera as tarefas já no formato puro ({texto, feita}).
  //     - const li = criarItemDOM(t) → delega a construção do item visual.
  //     - li.classList.add('nova') → habilita a animação “nova entrada” definida no CSS (@keyframes novaEntrada). style-v3_1
  //     - setTimeout(..., 400) → remove a classe após o tempo da animação (0.4s).
}
