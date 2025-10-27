# 🌈 README – Versão 3.1: Design e UX da Lista de Tarefas

## 🎯 Objetivo

Melhorar a **experiência do usuário (UX)** e o **design visual (UI)** da aplicação "Lista de Tarefas Interativa", tornando a interface mais fluida, responsiva e agradável sem perder o foco no aprendizado de **JavaScript** e **CSS moderno**.

---

## 🧱 Estrutura Básica

**HTML (`index.html`)**

- Mantém todos os elementos da versão 3.0 (filtros e busca incluídos);
- Nenhuma alteração estrutural, apenas ajustes visuais;
- Classes e IDs existentes serão reutilizados para aplicar estilos e efeitos.

**CSS (`style-v3_1.css`)**

- Novo arquivo ou extensão do anterior (`style-v3_1.css`);
- Adição de animações e transições suaves;
- Realce de elementos interativos (botões, hover, input de busca);
- Implementação de modo escuro e responsividade aprimorada.

**JavaScript (`app.js`)**

- Mantém a lógica de filtros e busca;
- Pequenas adições para alternar classes visuais (ex.: adicionar/remover `.oculta` em vez de `display:none`);
- Possível criação de função `alternarModoEscuro()` para estudo.

---

## 🧠 Conceitos Trabalhados

| Conceito                                 | Aplicação Prática                                      |
| ---------------------------------------- | ------------------------------------------------------ |
| Transições (`transition`)                | Animações suaves ao mostrar/ocultar tarefas            |
| Transformações (`transform`)             | Efeitos sutis em hover/click                           |
| Pseudo-elementos (`::before`, `::after`) | Ícones decorativos e realces visuais                   |
| Media Queries                            | Responsividade (ajuste em telas menores)               |
| Classes CSS dinâmicas                    | Mostrar/ocultar com `.oculta` em vez de `display:none` |
| `classList.toggle()`                     | Alternância de estado visual via JS                    |

---

## ⚙️ Funcionalidades Visuais Planejadas

### 🎨 1. Transições Suaves

As tarefas agora desaparecem com fade-out e aparecem com fade-in usando CSS (`opacity` + `transition`).

### 🖱️ 2. Realce de Botões Ativos

O botão do filtro selecionado recebe destaque visual (`.ativo`), com cor, sombra e animação de clique.

### 🔍 3. Campo de Busca Aprimorado

Inclui ícone de lupa e destaque no foco (`:focus-within`), com borda animada.

### 🌙 4. Modo Escuro Automático (opcional)

Aplica `prefers-color-scheme: dark` para trocar automaticamente as cores com base nas preferências do sistema.

### 📱 5. Responsividade

Os filtros e o campo de busca se adaptam ao tamanho da tela, empilhando-se em modo mobile.

---

## 🧩 Etapas de Implementação Guiada

1️⃣ **Planejar a lógica visual** – Definir o comportamento desejado (fade, hover, foco).  
2️⃣ **Criar classes CSS** (`.oculta`, `.fade`, `.ativo`, `.dark-mode`).  
3️⃣ **Ajustar o JavaScript** para usar classes em vez de `display:none`.  
4️⃣ **Aplicar transições e animações** no CSS.  
5️⃣ **Melhorar UX** com responsividade e feedback visual.  
6️⃣ **Testar** todas as interações (adicionar, concluir, filtrar, buscar).

---

📘 **Conclusão**
Esta versão 3.1 solidifica o aprendizado de **CSS dinâmico e interação visual via JavaScript**, preparando o terreno para a futura **Versão 4.0**, onde exploraremos **modularização e APIs assíncronas (fetch)**.
