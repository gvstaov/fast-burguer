
// menu

function abrirMenu(){
    var menus = document.getElementById('menus')
    var opcoes = document.getElementById('opcoes')

    if(menus.classList.contains('on')){
        menus.classList.remove('on')
        opcoes.classList.remove('on')
    }else{
        menus.classList.add('on')
        opcoes.classList.add('on')
    }
}


//API Google Translate

    function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'pt'}, 'google_translate_element');
    }

//Barra de pesquisa
    function search() {
      let input = document.getElementById('pesquisar').value
      input=input.toLowerCase();
      let x = document.getElementsByClassName('categoria');
        
      for (i = 0; i < x.length; i++) { 
          if (!x[i].innerHTML.toLowerCase().includes(input)) {
              x[i].style.display="none";
          }
          else {
              x[i].style.display="list-item";                 
          }
      }
  }
  
  // Barra de pesquisa Mobile
  function searchmobile() {
    let input = document.getElementById('pesquisar-mobile').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('categoria');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

// Carrossel

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {
  nextImage();
}, 5000);

function nextImage() {
  count++;
  if (count > promocoes.length) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}


// Obter os dados do localStorage
const promocoes = JSON.parse(localStorage.getItem('promocoes'));

// Verificar se existem dados no localStorage
if (promocoes && promocoes.length > 0) {
  const slidesContainer = document.querySelector('.slides');
  const autoNavContainer = document.querySelector('.navigation-auto');
  const manualNavContainer = document.querySelector('.manual-navigation');

  promocoes.forEach((promocao, index) => {
    // Criar slide
    const slideElement = document.createElement('div');
    slideElement.setAttribute('class', index === 0 ? 'slide first' : 'slide');

    // Criar imagem do slide
    const imageElement = document.createElement('img');
    imageElement.src = promocao.imagem;
    imageElement.alt = promocao.alt;

    // Adicionar imagem ao slide
    slideElement.appendChild(imageElement);

    // Adicionar slide ao carrossel
    slidesContainer.appendChild(slideElement);

    // Criar botão de navegação auto
    const autoNavButton = document.createElement('label');
    autoNavButton.setAttribute('class', `auto-btn${index + 1}`);

    // Adicionar botão de navegação auto ao container
    autoNavContainer.appendChild(autoNavButton);

    // Criar botão de navegação manual
    const manualNavButton = document.createElement('label');
    manualNavButton.setAttribute('for', `radio${index + 1}`);
    manualNavButton.classList.add('manual-btn');

    // Adicionar botão de navegação manual ao container
    manualNavContainer.appendChild(manualNavButton);
  });

  // Atualizar quantidade de slides
  const numSlides = promocoes.length;
  document.documentElement.style.setProperty('--num-slides', numSlides);
}



// observer

const observer = new IntersectionObserver(entries => {
    console.log(entries)

    Array.from(entries).forEach(entry => {
        if (entry.intersectionRatio >= 1) {
            entry.target.classList.add('init-hidden-off')
        }
    })
}, {
    threshold: [0, .5, 1]
})

Array.from(document.querySelectorAll('.init-hidden')).forEach(element => {
    observer.observe(element)
})


// Carrinho

let carrinho = [];

function adicionarItem(nome, preco) {
  carrinho.push({ nome, preco });
  exibirCarrinho();
}

function concluirCompra() {
  // Concluir a compra

  alert("Compra finalizada com sucesso!");
  limparCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  exibirCarrinho();
}

function exibirCarrinho() {
  let itensCarrinho = document.getElementById("itens-carrinho");
  let totalCarrinho = document.getElementById("total-carrinho");

  // Limpar carrinho atual
  itensCarrinho.innerHTML = "";

  // Adicionar itens ao carrinho
  let total = 0;
  for (let item of carrinho) {
    let li = document.createElement("li");
    li.innerText = `${item.nome} - R$${item.preco.toFixed(2)}`;
    itensCarrinho.appendChild(li);
    total += item.preco;
  }

  // Atualizar total do carrinho
  totalCarrinho.innerText = total.toFixed(2);
}

// Formulario de Pagamento

// Carrega os dados do carrinho.
function carregaDadosCarrinho(){
  const ListaCarrinho = JSON.parse(localStorage.getItem('carrinho')  || '[]');
  const ListaCarrinhos = JSON.parse(localStorage.getItem('valor')  || '[]');
  if (ListaCarrinho != null) {
    let produtos = '';
    for (let x = 0; x < ListaCarrinho.length; x++) {
       produtos += ListaCarrinho[x].quantidade + 'x ' + ListaCarrinho[x].nome + ' - ';
    }
    document.getElementById('produto').value = produtos;
  }
  if (ListaCarrinhos != null) {
    let total = 0;
    for (let x = 0; x < ListaCarrinhos.length; x++) {
      total += parseFloat(ListaCarrinhos[x].valor);
   document.getElementById('valor').value = total.toLocaleString("pt-BR",{ style: "currency" , currency:"BRL"});
 }
}
}

// Verifica CEP

  //Preenchendo campos
function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualizando campos do formulario
    document.getElementById('logradouro').value = (conteudo.logradouro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('bairro').value = (conteudo.bairro);
  } // Erro na consulta
  else {
    alert("CEP não encontrado");
  }
}

  // Consultando CEP atraves da API viacep
function consultaCEP(valor) {
  // filtrando somente números
  var cep = valor.replace(/\D/g, '');

  // Validando campo vazio
  if (cep != "") {
    var validacep = /^[0-9]{8}$/; //Expressão regular

    // Valida formato
    if (validacep.test(cep)) {

      // Preenche com ... enquanto pesquisa
      document.getElementById('logradouro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('bairro').value = "...";

      // API Cria elemento javascript
      var script = document.createElement('script');
      // Sincroniza callback
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
      // Insere script no documento
      document.body.appendChild(script);
    }
    else {
      alert("CEP inválido");
    }
  }
}


// Calcula Idade
function calcularIdade(aniversario) {
  var nascimento = aniversario.split("-");
  var dataNascimento = new Date(parseInt(nascimento[0], 10),
  parseInt(nascimento[2], 10) - 1,
  parseInt(nascimento[1], 10));

  var diferenca = Date.now() -  dataNascimento.getTime();
  var idade = new Date(diferenca);

  return Math.abs(idade.getUTCFullYear() - 1970);
}

// Gera o numenro do pedido
var numPedido;
function contarPedido(){
  numPedido = 0;
     if (localStorage.getItem("ListaPedidos") != null){
      numPedido = JSON.parse(localStorage.getItem("ListaPedidos")).length + 1;
     }
}

// Valida e Registra o Pedido
function ConfirmarPagamento(){

  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var telefone = document.getElementById('telefone').value;
  var dtaNascimento = document.getElementById('dtaNascimento').value;
  var cep = document.getElementById('cep').value;
  var logradouro = document.getElementById('logradouro').value;
  var numero = document.getElementById('numero').value;
  var bairro = document.getElementById('bairro').value;
  var cidade = document.getElementById('cidade').value;
  var valor = document.getElementById('valor').value;
  var produto = document.getElementById('produto').value;
  var quantidade = document.getElementById('quantidade').value;
  var formaPgm = document.querySelector('input[name="formaPgm"]:checked').value;

  if (nome == ""){
    alert('Informe o Nome!');
    return false;
  }
  if (email == ""){
    alert('Informe o E-mail!');
    return false;
  }
  if (telefone == ""){
    alert('Informe o Telefone!');
    return false;
  }
  if (dtaNascimento == ""){
    alert('Informe a Data de nascimento!');
    return false;
  } else {
    if (calcularIdade(dtaNascimento) <= 16){
      alert('Você deve ter mais de 16 anos para realizar uma compra');
      return false;
    }
  }
  if (cep == ""){
    alert('Informe o CEP!');
    return false;
  }
  if (logradouro == ""){
    alert('Informe o Logradouro!');
    return false;
  }
  if (numero == ""){
    alert('Informe o Número da residência!');
    return false;
  }
  if (bairro == ""){
    alert('Informe o Bairro!');
    return false;
  }
  if (cidade == ""){
    alert('Informe a Cidade!');
    return false;
  }
  if (formaPgm == ""){
    alert('Informe uma Forma de Pagamento!');
    return false;
  }

  
  contarPedido();
  //Criando item para o localStorage
  let Pedidos = {
    // Itens
    NumeroPedido: numPedido,
    Nome: nome,
    Email: email,
    Telefone: telefone,
    DataNascimento: dtaNascimento,
    CEP: cep,
    Logradouro: logradouro,
    Numero: numero,
    Bairro: bairro,
    Cidade: cidade,
    Valor: valor,
    Produto: produto,
    Quantidade: quantidade,
    FormaPagamento: formaPgm
  }
  salvarLS(Pedidos);
 
  // mostra modal
  const modal = document.getElementById('janela-modal-pagamento');
  document.getElementById('h1ModConfPedido').textContent = 'Pedido ' + numPedido + ' Confirmado!';
  modal.classList.add('abrir');

  // Apagar Carrinho
  localStorage.removeItem('carrinho');
}

// localStorage

function salvarLS(Pedido) {
  
  // Converte em um tipo de objeto JSON
  const ListaPedidos = JSON.parse(localStorage.getItem('ListaPedidos') || '[]');

  // Preenchendo objeto com o item
  ListaPedidos.push(Pedido);

  // Inserindo item na lista do Storage em formato string...
  localStorage.setItem('ListaPedidos', JSON.stringify(ListaPedidos));
  //alert('Dados salvos');
}

// Carrinho

let carrinhos = [];

function adicionarItens(nome, preco) {
carrinhos.push({ nome, preco });
exibirCarrinhos();
}

function exibirCarrinhos() {
  var quantidadeCarrinhosElement = document.getElementById('quantidade-carrinho');
  quantidadeCarrinhosElement.textContent = carrinhos.length.toString();
}

// inicio da função cadastro produtos
function gerarCardsProdutos(categoriaSelecionada) {
  // Obter a categoria selecionada do LocalStorage
  var produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];

  // Filtrar os produtos pela categoria selecionada
  var produtosFiltrados = produtosCadastrados.filter(function (produto) {
    return produto.categoria === categoriaSelecionada;
  });

  // Limpar o contêiner de produtos
  var produtosContainers = document.getElementById('produtos-containers-' + categoriaSelecionada);
  produtosContainers.innerHTML = '';

  // Gerar cartões de produto com base nos dados filtrados
  produtosFiltrados.forEach(function (produto) {
    var card = document.createElement('div');
    card.classList.add('card');

    var img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = 'Imagem do produto';

    var h2 = document.createElement('h2');
    h2.textContent = produto.nome;

    var p = document.createElement('p');
    p.textContent = produto.descricao;

    var precoSpan = document.createElement('span');
    precoSpan.textContent = 'R$ ' + produto.preco;

    var adc = document.createElement('div');
    adc.classList.add('adc');

    var adicionarButton = document.createElement('button');
    adicionarButton.innerHTML = '<ion-icon name="add-circle-outline"></ion-icon>Adicionar';
    adicionarButton.addEventListener('click', () => {
      adicionarItens(produto.nome, produto.preco, 1);
    });

    adc.appendChild(adicionarButton);

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(adc);
    adc.appendChild(precoSpan);
    produtosContainers.appendChild(card);
  });
}

function gerarCartoesPromocao() {
  // Obter as promoções cadastradas do LocalStorage
  var promocoesCadastradas = JSON.parse(localStorage.getItem('promocoes')) || [];

  // Limpar o contêiner de promoções
  var promocoesContainer = document.getElementById('promocoes-containers');
  promocoesContainer.innerHTML = '';

  // Gerar cartões de promoção com base nos dados do LocalStorage
  promocoesCadastradas.forEach(function (promocao) {
    var card = document.createElement('div');
    card.classList.add('card');

    var img = document.createElement('img');
    img.src = promocao.imagem;
    img.alt = 'Imagem da promoção';

    var h2 = document.createElement('h2');
    h2.textContent = promocao.nome;

    var p = document.createElement('p');
    p.textContent = promocao.descricao;

    var precoSpan = document.createElement('span');
    precoSpan.textContent = 'R$ ' + promocao.preco;

    var adc = document.createElement('div');
    adc.classList.add('adc');

    var adicionarButton = document.createElement('button');
    adicionarButton.innerHTML = '<ion-icon name="add-circle-outline"></ion-icon>Adicionar';
    adicionarButton.addEventListener('click', () => {
      adicionarItens(promocao.nome, promocao.preco, 1);
    });


    adc.appendChild(adicionarButton);

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(adc);
    adc.appendChild(precoSpan);
    promocoesContainer.appendChild(card);
  });
}

  

document.addEventListener('DOMContentLoaded', function() {
  gerarCardsProdutos('hamburguers');
  gerarCardsProdutos('bebidas');
  gerarCartoesPromocao();
});

function adicionarItens(nome, preco, quantidade) {
  let itemExistente = false;

  // Verifica se o produto já está no carrinho
  for (let i = 0; i < carrinhos.length; i++) {
    if (carrinhos[i].nome === nome) {
      carrinhos[i].quantidade += quantidade;
      itemExistente = true;
      break;
    }
  }

  // Se o produto não estiver no carrinho, adiciona como um novo item
  if (!itemExistente) {
    const item = { nome, preco, quantidade };
    carrinhos.push(item);
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinhos));
  exibirCarrinhos();

  const quantidadeCarrinhos = document.getElementById('quantidade-carrinho');
  quantidadeCarrinhos.textContent = carrinhos.length;
}




// localstorage tela de cupons

// recebendo valores dos inputs

var inputCod = document.getElementById('name')
var inputDesc = document.getElementById('preco')
var cod = inputCod.value
var desc = inputDesc.value

// garantindo que só seja adicionado caso siga as regras

function adc() {

    var inputCod = document.getElementById('name')
    var inputDesc = document.getElementById('preco')
    var cod = inputCod.value
    var desc = inputDesc.value




    if (cod === "") {
        inputCod.style.border = '2px solid red'
    } else {
        if (desc === "") {
            inputCod.style.border = '2px solid black'
            inputDesc.style.border = '2px solid red'
        } else {
            inputDesc.style.border = '2px solid black'
            // realizando a adição do cupom
            if (!localStorage.getItem("cuponsLocal")) {
                localStorage.setItem("cuponsLocal", JSON.stringify([]));
            }
            var cuponsLocal = JSON.parse(localStorage.getItem("cuponsLocal"));
            var novoCupom = {
                nome: cod,
                valor: desc
            };
            cuponsLocal.push(novoCupom);
            localStorage.setItem("cuponsLocal", JSON.stringify(cuponsLocal));
            location.reload()

        }
    }
}
