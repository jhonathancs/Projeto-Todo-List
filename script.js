const textoTarefa = document.querySelector('#texto-tarefa'); //input onde coloco o texto
const CriarTarefa = document.querySelector('#criar-tarefa'); //botao para clicar evento inserir o texto
const lista = document.querySelector('#lista-tarefas'); //é a OL onde vai meus itens como texto no caso a lista
const apagarTudo = document.querySelector('#apaga-tudo'); // botao apagar tudo
const removeFinalizados = document.querySelector('#remover-finalizados');
const removerSelecionado = document.querySelector('#remover-selecionado');
const salvar = document.querySelector('#salvar-tarefas');
const cima = document.querySelector('#mover-cima');
const baixo = document.querySelector('#mover-baixo'); // a classe de todas os itens adicionado
const itemtarefas = document.getElementsByClassName('item')
const select = document.getElementsByClassName('selected') //selecionado

// botao enter

function adicionar() {
    const linha = document.createElement('li'); // criar linha
    linha.innerHTML = textoTarefa.value; // 
    linha.classList.add('item'); // criar a classe item dentro da linha LI
    lista.appendChild(linha); // vai colocar minha linha dentro da minha OL
    textoTarefa.value = null; // caso o texto seja vazio vai adicionar nada
    textoTarefa.style.backgroundColor = 'white';  
};

textoTarefa.addEventListener("keydown", function(event) { //keyup na hora que soube o botao keydown quando abaixa o botao
  if (event.which == 13) { //evento realizado atraves do https://keycode.info/
     adicionar();
   }
 });

// CriarTarefa.addEventListener('click',adicionar);



//selecionar o botao
    function selecionar(evento) {
    for (let index = 0; index < itemtarefas.length; index++) { // vai pecorrer todos os elementos ate encontrar o elemento com a palavra selected
      if (itemtarefas[index].classList.contains('selected')) {
        itemtarefas[index].style.backgroundColor = 'white';
        itemtarefas[index].classList.remove('selected');
      }
      if (evento.target != lista) { // != Diferente nao identico !=  != exemplo --> 4 != "4" return false -- true != "true" return false // Não idêntico a !== 4 !== "4" return true -- true !== "true" return true
        evento.target.style.backgroundColor = 'rgb(128,128,128)';
        evento.target.classList.add('selected');
      }
    }
  };

  lista.addEventListener('click',selecionar);

  function riscar (evento) {
    if (evento.target.classList.contains('completed') !== true && evento.target !== lista) {
      evento.target.classList.add('completed');
    }
    else if (evento.target.classList.contains('completed')) {
      evento.target.classList.remove('completed');
    }
  };

  lista.addEventListener('dblclick',riscar);

  function finalizados() { // remove os riscados e 
    for (let index = 0; index < itemtarefas.length; index++) { // vai pecorrer todos os elementos ate encontrar o elemento com a palavra completed ou null(vazio '')
      if (itemtarefas[index].classList.contains('completed') || itemtarefas[index].innerText === '') { // se conter completed ou estiver vazio ele vai executar o comando
        itemtarefas[index].remove(); // remove o item da lista o li sai da ol
         --index;
        //remove todos os itens senao tiver o --index ou index-- nao vai remover o primeiro item riscado
      }
    }
  };

  removeFinalizados.addEventListener('click',finalizados);

  //deletar lista toda 
  function apagatudo() { // 
    lista.innerHTML = null; // vai apagar todos os elementos da lista-tarefas
  };

  apagarTudo.addEventListener('click',apagatudo);


  function SalvarLista() { 
    localStorage.setItem('Lista', lista.innerHTML); // para verificar se o item foi salvo basta dar inspecionar elemento e no console digitar localStorage // salva como lista no localstorage 
  };
  // para limpar localStorage bastar dar comando localStorage.clear();
  salvar.addEventListener('click',SalvarLista); // executa o comando no click

  function CarregarLista() {
    lista.innerHTML = localStorage.getItem('Lista'); //https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem
  };

  window.addEventListener('DOMContentLoaded',CarregarLista); // pode usar load porem tem funcao diferente //O evento DOMContentLoaded é acionado quando todo o HTML foi completamente carregado e analisado, sem aguardar pelo CSS, imagens, e subframes para encerrar o carregamento. https://developer.mozilla.org/pt-BR/docs/Web/API/Window/DOMContentLoaded_event

  function ParaCima() {
    // achei essa função insertBefore aqui: https://stackoverflow.com/questions/5882768/how-to-append-a-childnode-to-a-specific-position
    for (let index = 0; index < itemtarefas.length; index++) {
      if (itemtarefas[index] === select[0] && select[0] !== itemtarefas[0]) {
        lista.insertBefore(select[0], lista.children[index-1]);
        return;
      }
    }
  };

  cima.addEventListener('click',ParaCima);

  // insertBefore() insere um nó antes do nó de referência como um filho de um nó pai especificado. Se o filho especificado for uma referência a um nó existente no documento, insertBefore() o moverá de sua posição atual para a nova posição

  function ParaBaixo() {
    
    for (let index = 0; index < itemtarefas.length; index++) {
      if (select[0] === itemtarefas[index] && select[0] !== itemtarefas.length-1) { //
        lista.insertBefore(select[0], lista.children[index + 2]);
        return;
      }
    }
  };

  baixo.addEventListener('click',ParaBaixo); // botao acionado

  function deletarSelecionado() {
    select[0].remove();
  };

  removerSelecionado.addEventListener('click',deletarSelecionado); 
  






  