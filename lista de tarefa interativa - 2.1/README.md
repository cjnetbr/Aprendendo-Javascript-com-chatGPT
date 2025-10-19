# 🎨 Lista de Tarefas Interativa – Versão 2.1 (Design e UX)

## 🎯 Objetivo

Melhorar a **aparência** e a **experiência do usuário (UX)** da aplicação sem alterar sua lógica principal, tornando-a mais agradável, responsiva e intuitiva.

---

## 🧩 Estrutura do Projeto

```
📁 projeto-lista-tarefas/
│
├── index.html # Estrutura da interface
├── style-v2_1.css # Estilos e temas visuais
├── app.js # Lógica da aplicação
├── README.md # Documentação da versão atual
└── assets/ # Ícones, fontes ou imagens auxiliares
```

---

## 💅 Melhorias Planejadas

### 🟦 1. Organização visual

- Aplicar **layout centralizado e espaçamento equilibrado**.
- Criar uma **seção superior** para o campo de entrada e o botão “Adicionar”.
- Separar visualmente a **lista de tarefas** e os **contadores**.

### 🌈 2. Cores e tipografia

- Adotar uma paleta leve e moderna (tons de azul, cinza e branco).
- Usar **fontes mais legíveis** (ex: `Poppins`, `Roboto` ou `Open Sans`).
- Destacar as tarefas concluídas com **transparência** ou **risco no texto**.

### 💫 3. Feedbacks visuais

- Efeitos “hover” em botões e itens da lista.
- Transições suaves para **adicionar**, **remover** ou **concluir** tarefas.
- Cursor de edição ao dar duplo clique no texto da tarefa.

### 📱 4. Responsividade

- Adaptar o layout para telas menores (mobile first).
- Garantir que botões e textos sejam **tocáveis e legíveis** em dispositivos móveis.

### 🌙 5. (Extra opcional) Modo Escuro

- Adicionar uma classe `.dark-mode` com cores invertidas.
- Um botão ou ícone permitirá alternar o tema.
- A escolha ficará salva no `localStorage`.

---

## 🧠 Conceitos e práticas de UX aplicados

| Conceito                      | Descrição                                   |
| ----------------------------- | ------------------------------------------- |
| **Hierarquia visual**         | Facilita a compreensão da interface.        |
| **Espaçamento e alinhamento** | Cria uma aparência limpa e organizada.      |
| **Feedback imediato**         | Usuário entende o resultado de suas ações.  |
| **Acessibilidade visual**     | Contraste, tipografia e tamanhos adequados. |
| **Design responsivo**         | Adaptável a diferentes tamanhos de tela.    |

---

## 🧩 Próximos Passos

1. Criar o **novo CSS base** com layout centralizado, cores e tipografia.
2. Aplicar estilos aos **contadores** e aos **botões**.
3. Adicionar **transições suaves** (CSS `transition`, `hover` e `active`).
4. (Opcional) Implementar o **modo escuro persistente**.

---

## ✨ Resultado esperado

Ao final da versão 2.1, a Lista de Tarefas terá:

- aparência moderna e profissional;
- melhor usabilidade e legibilidade;
- transições e feedbacks visuais agradáveis;
- base pronta para futuras versões (filtros e busca).
