// /js/modules/storage.js
const STORAGE_KEY = "tarefas";

export function loadLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return []; // sem dados → array vazio
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }

  //Explicação linha a linha:
  // localStorage.getItem(STORAGE_KEY) → busca a string salva sob a chave "tarefas".

  // if (!raw) return [];
  // Se nada salvo, devolve array vazio — app funciona sem erros.

  // const parsed = JSON.parse(raw);
  // Converte a string JSON em objeto/array JavaScript.

  // return Array.isArray(parsed) ? parsed : [];
  // Garantimos que o retorno é um array (se não for, protege com []).

  // catch { return []; }
  // Se o JSON estiver corrompido, evita quebrar a app e volta [].
}

export function saveLocal(tarefas) {
  // tarefas = [{ texto: string, feita: boolean }, ...]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  // Explicação linha a linha:

  // export function saveLocal(tarefas) { ... }
  // Expondo a função pública de salvar o array.

  // JSON.stringify(tarefas)
  // Converte o array (ex.: [{texto:'A',feita:false}]) para string JSON.

  // localStorage.setItem(STORAGE_KEY, ...)
  // Persiste sob a mesma chave ("tarefas") usada pelo loadLocal().
}
