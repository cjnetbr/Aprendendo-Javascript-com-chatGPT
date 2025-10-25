
# 🧭 README – Versão 3.0: Filtros e Busca Instantânea

## 🎯 Objetivo
Ampliar as funcionalidades da aplicação **Lista de Tarefas Interativa**, adicionando filtros dinâmicos e busca instantânea para que o usuário visualize apenas as tarefas desejadas.  
O foco é aprofundar o raciocínio lógico e a manipulação eficiente do **DOM** e de **arrays** usando JavaScript puro.

---

## 🧱 Estrutura Básica
**HTML (`index.html`)**
- Campo de entrada para nova tarefa (`#nova-tarefa`)
- Botão **Adicionar**
- Área de exibição das tarefas (`#lista-tarefas`)
- Rodapé com contadores (`#contadores`)
- *(Agora também conterá a barra de filtros e o campo de busca.)*

**CSS (`style-v2_1.css`)**
- Mantém variáveis, responsividade e modo escuro automático
- Classes `.feita`, `.ativo`, `.pulse`, `.btn-container` etc.
- Nesta versão, incluirá ajustes visuais para os filtros e a barra de busca.

**JavaScript (`app.js`)**
- Funções consolidadas das versões anteriores:
  - `adicionarTarefa()`
  - `salvarTarefas()`
  - `carregarTarefas()`
  - `atualizarContadores()`
  - `ativarEdicao()`
- Acrescentaremos novas variáveis e funções:
  - `filtroAtual` e `termoBusca`
  - `aplicarFiltroEBusca()`
  - Eventos para filtros e busca instantânea

---

## 🧠 Conceitos trabalhados
| Conceito JS | Aplicação prática |
|--------------|------------------|
| `filter()` | Criar listas temporárias baseadas em condições |
| `includes()` | Busca textual insensível a maiúsculas/minúsculas |
| `addEventListener('input')` | Reatividade instantânea ao digitar |
| `localStorage` | Guardar o último filtro usado |
| `classList` / `style.display` | Mostrar / ocultar elementos dinamicamente |
| `forEach()` | Iterar sobre tarefas exibidas |
| Funções puras | Calcular o que exibir sem modificar os dados originais |

---

## ⚙️ Funcionalidades da versão 3.0
### 🔹 1. Filtros dinâmicos
Permitir alternar entre:
- **Todas**
- **Pendentes**
- **Concluídas**

### 🔹 2. Busca instantânea
Campo `<input id="busca">` que filtra tarefas conforme o usuário digita.

### 🔹 3. Persistência do filtro
O último filtro selecionado é armazenado em `localStorage`.

### 🔹 4. Nova função: `aplicarFiltroEBusca()`
Responsável por combinar filtro + busca e controlar a exibição de cada item.

---

## 🧩 Etapas de implementação guiada
1️⃣ Adicionar HTML — inserir a barra de filtros (3 botões) e campo de busca.  
2️⃣ Criar as variáveis de estado no topo do `app.js`: `filtroAtual` e `termoBusca`.  
3️⃣ Construir a função `aplicarFiltroEBusca()`, linha por linha.  
4️⃣ Conectar os eventos (cliques e digitação).  
5️⃣ Integrar ao fluxo existente.  
6️⃣ Testar combinações de busca + filtro.
