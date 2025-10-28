// Módulo de UI (renderização da lista)
// O que a UI deve fazer (e o que não deve)

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
