# 🧩 Mini Projeto de Progressão: “Lista de Tarefas Interativa”

## 🎯 Objetivo
Este mini projeto tem como objetivo consolidar os conceitos aprendidos no projeto **Amigo Secreto** e introduzir novas habilidades essenciais de JavaScript.  
O usuário poderá criar, marcar e remover tarefas, com os dados sendo salvos localmente no navegador por meio do **localStorage**.

**Habilidades trabalhadas:**
- Manipulação do DOM avançada
- Eventos (`addEventListener`)
- Controle de classes CSS dinâmicas (`classList`)
- Armazenamento local com `localStorage`
- Estruturação modular de funções

---

## 🧱 Estrutura básica

O projeto conterá três partes principais:

### 1️⃣ HTML
- Campo de entrada para digitar novas tarefas.
- Botão “Adicionar tarefa”.
- Lista (`<ul>`) onde as tarefas serão exibidas como `<li>`.

### 2️⃣ CSS
- Estilos para tarefas pendentes e concluídas.
- Classes para destacar tarefas finalizadas (ex: riscar texto ou mudar cor).
- Layout limpo e responsivo.

### 3️⃣ JavaScript
- Função para adicionar novas tarefas.
- Função para marcar tarefas como concluídas (toggle de classe CSS).
- Função para remover tarefas da lista.
- Função para salvar e carregar tarefas usando o `localStorage`.

---

## 🧩 Conceitos novos para praticar

### 1️⃣ Eventos (`addEventListener`)
Aprender a associar eventos de clique, digitação e interação a funções específicas, tornando a interface dinâmica e reativa.

### 2️⃣ Manipulação de classes CSS (`classList`)
Permite alterar o visual de elementos dinamicamente, como marcar uma tarefa como concluída com:
```js
element.classList.toggle('feito');
```

### 3️⃣ Armazenamento local (`localStorage`)
Salvar e carregar dados diretamente do navegador, garantindo que as tarefas permaneçam mesmo após recarregar a página.

### 4️⃣ Criação dinâmica de elementos
Gerar elementos HTML via JavaScript, permitindo adicionar, editar e remover tarefas de forma interativa:
```js
let li = document.createElement('li');
li.textContent = 'Nova tarefa';
document.querySelector('ul').appendChild(li);
```

### 5️⃣ Estrutura modular
Organizar o código em funções pequenas e específicas, facilitando manutenção, leitura e reutilização.
