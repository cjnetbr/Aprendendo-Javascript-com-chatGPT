# ⚙️ Lista de Tarefas Interativa – Versão 4.0

## 🎯 Objetivo
Evoluir o projeto para um **nível modular e escalável**, explorando **import/export**, **APIs**, **armazenamento local e assíncrono**, e **boas práticas de arquitetura em JavaScript**.

---

## 🧱 Estrutura Modular Planejada

### 📁 Estrutura de Pastas
```
/projeto-lista-tarefas/
│
├── index.html
├── /css/
│   ├── style-v2_1.css
│   ├── style-v3_1.css
│   └── style-v4_0.css
│
├── /js/
│   ├── app.js              # arquivo principal (entry point)
│   ├── modules/
│   │   ├── tarefas.js      # lógica de criação, edição e remoção
│   │   ├── storage.js      # controle de localStorage e sessionStorage
│   │   ├── ui.js           # manipulação do DOM e renderização
│   │   ├── api.js          # comunicação com APIs e fetch()
│   │   └── utils.js        # funções auxiliares
│
└── /data/
    └── tarefas.json        # arquivo simulado de API (mock)
```

---

## 🧩 Principais Metas da Versão 4.0

| Tema | Descrição | Objetivo |
|------|------------|-----------|
| **Modularização** | Separar o código em múltiplos arquivos e módulos ES6 | Facilitar manutenção e reuso |
| **Armazenamento Local** | Implementar localStorage e sessionStorage | Persistência de tarefas entre sessões |
| **APIs Simuladas** | Criar um mock `tarefas.json` e consumir via fetch() | Praticar uso de APIs e Promises |
| **Assincronismo** | Introduzir `async/await` | Aprender controle de fluxo assíncrono |
| **Organização e Clean Code** | Pastas lógicas, funções puras, nomes semânticos | Estrutura de projeto profissional |

---

## ⚙️ Funcionalidades Planejadas

- [ ] Carregar tarefas de um arquivo JSON (mock API);
- [ ] Salvar tarefas no localStorage;
- [ ] Permitir alternar entre armazenamento local e remoto (mock);
- [ ] Reorganizar o código em módulos (`tarefas`, `ui`, `storage`, `api`);
- [ ] Adicionar mensagens de status (“Carregando...”, “Erro ao buscar dados”);
- [ ] Melhorar controle de erros com `try/catch`;
- [ ] Documentar a estrutura e funções.

---

## 🧠 Conceitos Trabalhados

| Conceito | Aplicação |
|-----------|------------|
| **Modularização (ES Modules)** | Uso de `import` e `export` para dividir responsabilidades |
| **Fetch API** | Consumo de dados externos (tarefas.json) |
| **Promises / Async-Await** | Controle assíncrono e tratamento de erros |
| **Storage API** | Persistência local e temporária |
| **Funções puras e reutilizáveis** | Melhoria de legibilidade e manutenção |
| **Arquitetura escalável** | Base para futuros recursos (gráficos, painéis, etc.) |

---

## 🧩 Próximas Etapas
1. Criar a estrutura de diretórios e arquivos base.
2. Implementar `tarefas.js` (CRUD das tarefas).
3. Implementar `storage.js` (controle de armazenamento).
4. Implementar `ui.js` (renderização dinâmica da lista).
5. Implementar `api.js` (fetch e sincronização).
6. Integrar tudo em `app.js` (ponto de entrada).

---

## 📚 Conceitos Preparatórios
Antes de iniciar a implementação, revise:
- Diferença entre escopo global e de módulo;
- Sintaxe `export default` e `import` com caminhos relativos;
- Manipulação de JSON (`fetch()`, `.then()`, `await response.json()`);
- Erros assíncronos (`try...catch`).

---

## 🧾 Conclusão
A **versão 4.0** introduz **arquitetura modular e lógica assíncrona**, elevando a aplicação ao nível de projeto real — pronta para evoluir em direção à **v5.0 (Painel de Estatísticas e Componentização)**.

---

📅 **Status:** Em planejamento  
🔖 **Próxima meta:** Implementar estrutura modular inicial  
✍️ **Autor:** Claudio Pereira
