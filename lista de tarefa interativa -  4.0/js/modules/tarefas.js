// função criar(texto);

// Ela vai:
// receber o texto digitado pelo usuário;
// limpar espaços extras;
// validar se não está vazio;
// devolver um objeto tarefa pronto para usar (com texto e feita).

export function criar(texto) {
  const t = String(texto).trim();
  if (!t) throw new Error("Texto vazio");
  return { texto: t, feita: false };
}

// conceito de imutabilidade e criar uma função que alterna o estado de uma tarefa entre:
//  “feita” ✅ e “pendente” ⏳ — sem modificar o objeto original.

// 🧠 Lógica – o porquê antes do código

// Cada tarefa é um objeto com duas propriedades:

// { texto: "Aprender JS", feita: false }

// Quando o usuário marca ou desmarca uma tarefa, queremos inverter o valor de feita.
// Se estava false, vira true;
// Se estava true, volta false.
// Imutabilidade: em vez de mudar o objeto original (o mesmo endereço na memória), criamos um novo
// objeto com os mesmos dados, mudando apenas o campo feita.
// Isso evita efeitos colaterais — e torna o código mais previsível.

// Receber uma tarefa.
// Criar uma cópia igual.
// Inverter o valor de “feita”.
// Retornar a nova cópia.

export function toggle(tarefa) {
  return { ...tarefa, feita: !tarefa.feita };
  // → Usa o operador spread (...) para copiar todas as propriedades de tarefa.
  // → Depois, substitui feita por seu valor invertido (! = “não”).
  // ➜ Resultado: um novo objeto com tudo igual, exceto feita.
}

// Criar uma função pura que atualiza o texto de uma tarefa, validando
// // a entrada e sem alterar o objeto original
// Motivação:
// - quando o usuário clicar duas vezes no texto (edição inline), o app
// precisará atualizar apenas o conteúdo da tarefa, preservando o status (feita).
// - Devemos garantir que o novo texto não seja vazio.
// - E devemos manter a tarefa antiga intacta — criando uma nova versão com o texto atualizado.

// Receber a tarefa e o novo texto.
// Converter o texto para string e remover espaços extras.
// Se o texto for vazio → manter o texto antigo.
// Retornar um novo objeto, com o texto atualizado e o restante igual.

export function editar(tarefa, novoTexto) {
  const t = String(novoTexto).trim();
  return { ...tarefa, texto: t || tarefa.texto };

  //   Explicação linha a linha

  //     export function editar(tarefa, novoTexto)
  //     ➜ Função exportada que recebe dois parâmetros:
  //     tarefa → objeto existente; novoTexto → entrada do usuário.

  //     const t = String(novoTexto).trim();
  //     ➜ Converte o valor recebido em string e remove espaços à esquerda e à direita.
  //     Assim, " ler " vira "ler" e undefined vira "undefined" (sem quebrar o código).

  //     return { ...tarefa, texto: t || tarefa.texto };
  //     ➜ Usa o operador spread para copiar todo o objeto original (texto, feita).
  //     ➜ Se t não for vazio, substitui texto por t;
  //     ➜ Se t for vazio (""), mantém tarefa.texto.
  //     ➜ Resultado: novo objeto imutável.
}

// function remover(lista, indice)
// remover uma tarefa de forma imutável, ou seja, sem alterar o array original.
// Queremos uma função que:

// Receba a lista completa de tarefas e o índice da tarefa a ser excluída;
// Retorne uma nova lista sem aquele item;
// Preserve a ordem e os objetos restantes.

// Receber lista e índice.
// Pegar todos os elementos antes do índice.
// Pegar todos os elementos depois do índice.
// Juntar os dois pedaços.
// Retornar o novo array.

export function remover(lista, indice) {
  return [...lista.slice(0, indice), ...lista.slice(indice + 1)];
  // Explicação linha a linha

  // export function remover(lista, indice)
  // ➜ Função pública que recebe a lista original e o número da posição a excluir.
  // lista.slice(0, indice)
  // ➜ Cria uma cópia dos elementos do início até (mas sem incluir) o índice indicado.
  // lista.slice(indice + 1)
  // ➜ Cria uma segunda cópia com todos os elementos após o índice removido.
  // [ ...A, ...B ]
  // ➜ Usa o spread operator para juntar os dois pedaços em um novo array.
  // 🔁 O array original lista continua intacto — garantimos imutabilidade.
}
