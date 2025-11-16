//stado interno do filtro atual
let filtroAtual = "todas"; // valores possíveis: "todas", "pendentes", "concluidas"

//Define o filtro ativo
export function setFiltro(novoFiltro) {
  filtroAtual = novoFiltro;
}

//retorna o filtro ativo
export function getFiltro() {
  return filtroAtual;
}

//Aplica o filtro à lista de tarefas original (sem modifica-la)
export function aplicarFiltro(lista) {
  if (filtroAtual === "pendentes") {
    return lista.filter((t) => !t.feita);
  }

  if (filtroAtual === "concluidas") {
    return lista.filter((t) => t.feita);
  }

  return lista; //filtro "todas"

  // Explicação linha a linha
  // let filtroAtual = "todas"; → variável interna que mantém o estado do filtro atual.
  // export function setFiltro(novoFiltro) → função pública para definir o filtro ativo.
  // filtroAtual = novoFiltro; → atualiza o estado do filtro.

  // export function getFiltro() → função pública para obter o filtro ativo.
  // return filtroAtual; → retorna o valor atual do filtro.

  // export function aplicarFiltro(lista) → função pública que aplica o filtro à lista de tarefas.
  // if (filtroAtual === "pendentes") { ... } → filtra e retorna apenas as tarefas pendentes.
  // if (filtroAtual === "concluidas") { ... } → filtra e retorna apenas as tarefas concluídas.
  // return lista; → retorna a lista completa se o filtro for "todas".
}
