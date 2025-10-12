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
    console.log(botaoConcluir);

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
    console.log(botaoRemover);


    // 5️⃣ adicionar os dois botões dentro do <div>
    divBotoes.appendChild(botaoConcluir);
    divBotoes.appendChild(botaoRemover);

    // 6️⃣ anexar o <span> e o <div> dentro do <li>
    li.appendChild(spanTexto);
    li.appendChild(divBotoes);

    // Exibir o item na tela.
    document.getElementById("lista-tarefas").appendChild(li);




    // passo 3 — associar os eventos aos botões criados
    //     Dentro da função adicionarTarefa(),
    //     logo depois de criar cada botão (botaoConcluir e botaoRemover),
    //     vamos adicionar:

    console.log(li);
}

