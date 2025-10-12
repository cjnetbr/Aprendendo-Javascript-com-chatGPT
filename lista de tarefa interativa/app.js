function adicionarTarefa(){

    // objetivo da função
    // Quando o usuário digitar uma tarefa e clicar em “Adicionar”, queremos:
    // Ler o texto digitado no input.
    let textoTarefa =  document.getElementById("nova-tarefa").value.trim();

    // Validar se o campo não está vazio.
    if(textoTarefa === ""){
        alert("Digite uma tarefa!");
        return;
    }

    // Criar um novo item (<li>) na lista (#lista-tarefas).
    //let novaTarefa = document.createElement("li");
    //novaTarefa.innerText = textoTarefa;
    //novaTarefa.textContent = textoTarefa; //textContent é levemente mais performático. que innerText

    // document.getElementById("lista-tarefas").appendChild(novaTarefa);
    //console.log(novaTarefa);
    let li = document.createElement("li");


    // Incluir botões de “Concluir” e “Remover” dentro de cada <li>.
        // objetivo
        // Cada <li> da lista deve conter dois botões:
        // ✅ Concluir: alterna o estado da tarefa (normal ↔ concluída).
        // ❌ Remover: apaga a tarefa da lista.
        // Esses botões serão criados junto com o <li>, cada vez que uma nova tarefa for adicionada.
        //queremos que o item final fique assim:
            // <li>
            //     <span>Estudar JavaScript</span>
            //     <div>
            //         <button class="btn-concluir">Concluir</button>
            //         <button class="btn-remover">Remover</button>
            //     </div>
            // </li>
    // passo 1 — criar os elementos
    // pensamento lógico:

    // 1️⃣ criar um <span> para conter o texto
    let spanTexto = document.createElement("span");
    spanTexto.textContent = textoTarefa;

    // 2️⃣ criar um <div> para abrigar os botões
    let divBotoes = document.createElement("div");

    // 3️⃣ criar o botão concluir
    let botaoConcluir = document.createElement("button");
    botaoConcluir.classList.add("btn-concluir");
    botaoConcluir.textContent = "Concluir";

    // passo 1 — adicionar o evento ao botão “Concluir”
    // Quando o botão for clicado:
    // Precisamos encontrar o elemento <li> onde ele está.
    // Alternar a classe .feita.
    
    // Ao clicar no botão “Concluir”, alterna o estado da tarefa
    botaoConcluir.addEventListener("click", () => {
        // 'toggle' adiciona ou remove a classe 'feita' no elemento <li>
        li.classList.toggle("feita");
    });
    

    // 4️⃣ criar o botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.classList.add("btn-remover");
    botaoRemover.textContent = "Remover";

    // passo 2 — adicionar o evento ao botão “Remover”
    //     raciocínio
    //     Quando o botão for clicado:
    //     Localizamos o <li> (o pai do botão).
    //     Removemos esse <li> da lista.
    
    // Ao clicar no botão “Remover”, apaga a tarefa da lista
    botaoRemover.addEventListener("click", () => {
        // Remove completamente o elemento <li> da página
        li.remove();
    });
    

    // 5️⃣ adicionar os dois botões dentro do <div>
    divBotoes.appendChild(botaoConcluir);
    divBotoes.appendChild(botaoRemover);

    // 6️⃣ anexar o <span> e o <div> dentro do <li>
    li.appendChild(spanTexto);
    li.appendChild(divBotoes);

    // Exibir o item na tela.
    document.getElementById("lista-tarefas").appendChild(li);

    // 1️⃣ Salvamento automático ao adicionar tarefa
    // Dentro da sua função adicionarTarefa() — logo depois de montar e inserir o <li> na lista —
    // adicione uma chamada simples:
    salvarTarefas();
    //🔹 Assim, toda vez que o usuário adiciona uma nova tarefa, ela já é gravada no localStorage.

    //limpa o input
    document.getElementById("nova-tarefa").value = "";

    // console.log(li);
}

// localStorage
//     o localStorage é uma pequena base de dados embutida no navegador do usuário.
//     ela armazena pares chave → valor, como se fossem pequenas variáveis permanentes.

//     regras importantes:

//     os dados ficam salvos mesmo após fechar o navegador;
//     tudo é armazenado como texto (string);
//     podemos converter listas (arrays) para texto com JSON.stringify() e depois reconverter com JSON.parse().


// Queremos que salvarTarefas():

// pegue todas as tarefas exibidas na tela (a lista dentro do <ul>),
// crie uma lista com o texto e o estado de cada uma (feita ou não),
// salve essa lista no localStorage em formato de texto.

// Pensamento lógico

// Imagine que você tem na tela:
//     Estudar JS        → não feita
//     Ler documentação  → feita
//     Treinar lógica    → não feita


// A função precisa transformar isso em algo assim:

//     [
// //     { texto: "Estudar JS", feita: false },
// //     { texto: "Ler documentação", feita: true },
// //     { texto: "Treinar lógica", feita: false }
//     ]

// Fluxo passo a passo da função

// 1️⃣ Pegar a <ul> onde estão todas as tarefas (id="lista-tarefas").
// 2️⃣ Pegar todos os <li> dentro dela.
// 3️⃣ Para cada <li>, extrair:

// o texto (span.textContent);

// se possui a classe .feita.
// 4️⃣ Montar uma lista (array) com esses dados.
// 5️⃣ Converter em texto (JSON.stringify).
// 6️⃣ Salvar no localStorage (localStorage.setItem("tarefas", ...)).

function salvarTarefas(){
    // 1️⃣ Seleciona todos os itens (li) dentro da lista de tarefas
    let itens = document.querySelectorAll("#lista-tarefas li");
    // 2️⃣ Cria um array vazio que vai armazenar os dados das tarefas
    let tarefas = [];

    // 3️⃣ Percorre cada item da lista e extrai as informações importantes
    itens.forEach(li => {
        // Captura o texto da tarefa (dentro do <span>)
        let texto = li.querySelector("span").textContent;
        // Verifica se a tarefa possui a classe 'feita'
        let feita = li.classList.contains("feita");
        // Adiciona o objeto representando essa tarefa ao array
        tarefas.push({ texto: texto, feita: feita });
    });

    // 4️⃣ Converte o array em texto JSON
    let textoJSON = JSON.stringify(tarefas);

    // 5️⃣ Salva o texto JSON no localStorage
    localStorage.setItem("tarefas", textoJSON);

    console.log("tarefa Salvas:", tarefas);
}

// A função carregarTarefas() deve:

// objetivo

// Ler as tarefas salvas no localStorage.
// Converter o texto JSON de volta em um array.
// Reconstruir a lista no DOM (criando <li>s, <span>s e botões).
// Reaplicar o estado “feita” onde for necessário.

// Resumo mental do fluxo

// [Início do site]
//       ↓
// Ler localStorage ("tarefas")
//       ↓
// Se existir conteúdo:
//    → converter para array
//    → reconstruir os <li>
//    → aplicar classes e eventos

function carregarTarefas(){
    //1️⃣ Verificar se há dados no localStorage
    let tarefasJSON = localStorage.getItem("tarefas");

    // Se não houver nada salvo, encerra a função
    if(tarefasJSON === null){
        return;
    }

    // 2️⃣ Converter o texto em um array de objetos
    // Converte o texto JSON de volta para um array de objetos
    let tarefas = JSON.parse(tarefasJSON);
    
    // 3️⃣ Limpar a lista atual
    // Limpa a lista antes de reconstruir (evita duplicações)
    let lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";
    //➡️ Isso garante que, ao recarregar, a lista comece do zero antes de adicionar os itens.

    // 4️⃣ Recriar cada tarefa
    // Recria cada tarefa salva no localStorage
    tarefas.forEach(tarefa => {
        // Cria o <li>
        let li = document.createElement("li");

        // Se a tarefa estava concluída, reaplica a class
        if(tarefa.feita){
            li.classList.add("feita");
        }

        // Cria o texto
        let spanTexto = document.createElement("span");
        spanTexto.textContent = tarefa.texto;


        //5️⃣ Criar os botões
        // Cria o container dos botões
        let divBotoes = document.createElement("div");

        // Cria o botão concluir
        let botaoConcluir = document.createElement("button");
        botaoConcluir.classList.add("btn-concluir");
        botaoConcluir.textContent = "Concluir";

        // Cria o botão remover

        let botaoRemover = document.createElement("button");
        botaoRemover.classList.add("btn-remover");
        botaoRemover.textContent = "Remover";

        //6️⃣ Adicionar os eventos novamente
        // Eventos de clique nos botões
        botaoConcluir.addEventListener("click", () => {
            li.classList.toggle("feita");
            salvarTarefas()  // salva o novo estado
        });

        botaoRemover.addEventListener("click", () => {
            li.remove();
            salvarTarefas()  // salva o novo estado após a remoção

        // isso garante que as tarefas recarregadas continuem interativas e sincronizadas com o localStorage.
        });

     
        //7️⃣ Montar e inserir o item completo
        //monta a estrutura final
        divBotoes.appendChild(botaoConcluir);
        divBotoes.appendChild(botaoRemover);
        li.appendChild(spanTexto);
        li.appendChild(divBotoes);
        // Adiciona o item na lista
        lista.appendChild(li);

        // ✅ agora, a função carregarTarefas() está pronta.
        // Ela:
        // 1. o que está salvo no navegador,
        // 2. onstrói a lista de forma idêntica,
        // 3. plica os eventos e estados,
        // 4. tém tudo sincronizado.
    });
        console.log(tarefas);
}

// integração final

// 1. Conectar o salvarTarefas() às três ações principais do app:
// 2. Adicionar tarefa
// 3. Concluir tarefa
// 4. Remover tarefa
// 5. E garantir que o carregamento (carregarTarefas()) ocorra automaticamente ao abrir a página.
window.onload = carregarTarefas;