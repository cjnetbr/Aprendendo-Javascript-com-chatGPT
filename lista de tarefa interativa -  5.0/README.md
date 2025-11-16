# 🧭 Lista de Tarefas Interativa — Versão 5.0

## 📘 Contexto Atual

A versão 4.0 consolidou a arquitetura modular da aplicação, separando responsabilidades e garantindo um código limpo e de fácil manutenção. A estrutura está dividida em quatro módulos principais:

| Módulo       | Função                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| `app.js`     | Orquestra o estado global (`lista`) e coordena as renderizações.        |
| `ui.js`      | Manipula o DOM e os eventos visuais (edição inline, concluir, remover). |
| `tarefas.js` | Contém regras de negócio puras (criar, editar, remover, toggle).        |
| `storage.js` | Gerencia persistência via `localStorage`.                               |

---

## 🚀 Versão 5.0 — Tema Central

**Contadores e Filtros Avançados**

O objetivo é ampliar a aplicação introduzindo **estatísticas dinâmicas** e **filtros de exibição**, mantendo a filosofia modular e pedagógica adotada até aqui.

---

## 🎯 Objetivos Principais

1. **Painel de Estatísticas**

   - Total de tarefas
   - Concluídas
   - Pendentes
   - Progresso percentual (visual via barra ou indicador)

2. **Filtros de Visualização**

   - “Todas”
   - “Pendentes”
   - “Concluídas”

3. **Princípios a Praticar**
   - Derivação de estado (`listaFiltrada`, contagens, percentual)
   - Componentização modular (novos módulos `stats.js` e `filtros.js`)
   - Renderização condicional e reatividade leve

---

## 🧩 Novos Módulos

| Módulo       | Função                                                               |
| ------------ | -------------------------------------------------------------------- |
| `stats.js`   | Calcular e renderizar as estatísticas da lista (totais e progresso). |
| `filtros.js` | Controlar o filtro ativo e aplicar filtragem sobre o estado global.  |

### Exemplo de cálculo das estatísticas

```js
const total = lista.length;
const concluidas = lista.filter((t) => t.feita).length;
const pendentes = total - concluidas;
const percentual = total > 0 ? Math.round((concluidas / total) * 100) : 0;
```

Essas informações serão calculadas por `calcularStats(lista)` e renderizadas por `renderStats(statsObj)`.

---

## ⚙️ Arquitetura e Fluxo de Comunicação

```
app.js
 ├─ importa { calcularStats } de stats.js
 ├─ importa { aplicarFiltro, filtroAtual, setFiltro } de filtros.js
 ├─ mantém o estado principal: lista[]
 ├─ notifica stats.js e filtros.js quando a lista muda
 └─ re-renderiza UI via renderLista(listaFiltrada)
```

```
ui.js
 ├─ renderiza lista e painel de estatísticas
 ├─ recebe callbacks de app.js
 └─ dispara eventos de mudança de filtro (ex.: botão “Pendentes”)
```

---

## 🧮 Lógica dos Filtros

O módulo `filtros.js` mantém um estado interno com o filtro ativo:

```js
let filtroAtual = "todas"; // "todas" | "pendentes" | "concluidas"

export function aplicarFiltro(lista) {
  if (filtroAtual === "pendentes") return lista.filter((t) => !t.feita);
  if (filtroAtual === "concluidas") return lista.filter((t) => t.feita);
  return lista;
}
```

---

## 🧱 Fluxo de Atualização

1. Usuário adiciona / edita / conclui / remove tarefa.  
   → `app.js` atualiza `lista`  
   → persiste com `saveLocal(lista)`  
   → chama `syncRender()`

2. `syncRender()` agora fará:

   ```js
   const listaFiltrada = aplicarFiltro(lista);
   renderLista(ul, listaFiltrada);
   const stats = calcularStats(lista);
   renderStats(stats);
   ```

3. Usuário clica num botão de filtro → `setFiltro()` → `syncRender()` é chamado novamente.

---

## 🎨 Painel de Estatísticas — Estrutura HTML

```html
<div id="painel">
  <span id="total"></span>
  <span id="concluidas"></span>
  <span id="pendentes"></span>
  <div id="progresso">
    <div id="barra"></div>
  </div>
</div>
```

### Atualização visual

```js
barra.style.width = `${stats.percentual}%`;
```

---

## 🧠 Conceitos Praticados

- Derivação de estado (sem duplicar dados)
- Imutabilidade aplicada a listas filtradas
- Modularização com responsabilidade única
- Renderização condicional e reatividade simples
- Comunicação entre módulos via callbacks

---

## 📂 Estrutura Final Esperada

```
modules/
 ├─ storage.js
 ├─ tarefas.js
 ├─ ui.js
 ├─ filtros.js
 └─ stats.js
```

---

✍️ **Autor:** _Claudio P. G. Junior_
