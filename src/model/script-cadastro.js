// Função para abrir/fechar o menu
function abrirMenu() {
  var menus = document.getElementById('menus');
  var opcoes = document.getElementById('opcoes');

  if (menus.classList.contains('on')) {
    menus.classList.remove('on');
    opcoes.classList.remove('on');
  } else {
    menus.classList.add('on');
    opcoes.classList.add('on');
  }
}

// Observer
const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    Array.from(entries).forEach((entry) => {
      if (entry.intersectionRatio >= 1) {
        entry.target.classList.add('init-hidden-off');
      }
    });
  },
  {
    threshold: [0, 0.5, 1],
  }
);

Array.from(document.querySelectorAll('.init-hidden')).forEach((element) => {
  observer.observe(element);
});

// Função para cadastrar uma nova promoção
function cadastrarProdutos() {
  var nome = document.getElementById('name').value;
  var descricao = document.getElementById('desc').value;
  var categoria = document.getElementById('categ').value;
  var preco = document.getElementById('preco').value;
  var imagem = document.getElementById('imagem').files[0];

  if (nome === '' || descricao === '' || categoria === '' || preco === '' || !imagem) {
    alert('Por favor, preencha todos os campos de cadastro e anexe uma imagem.');
  } else {

    // Verificar e formatar o preço no padrão de moeda
    preco = preco.replace(',', '.'); // Substituir vírgula por ponto (ex: 15,00 -> 15.00)
    preco = parseFloat(preco).toFixed(2); // Converter para número e fixar em 2 casas decimais
    preco =  preco.replace('.', ','); // Substituir ponto por vírgula (ex: 15.00 -> R$15,00)


    // Criar objeto para representar o produto
    var novoProduto = {
      nome: nome,
      descricao: descricao,
      categoria: categoria,
      preco: preco,
      imagem: URL.createObjectURL(imagem),
    };

    // Obter os produtos existentes da localStorage (se houver)
    var produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];

    // Adicionar o novo produto ao array de produtos
    produtosCadastrados.push(novoProduto);

    // Armazenar o array atualizado na localStorage
    localStorage.setItem('produtos', JSON.stringify(produtosCadastrados));

    // Chamar a função para gerar os cartões com base nos dados do LocalStorage
    gerarCartoesProdutos(categoria);

    // Limpar os campos de entrada
    document.getElementById('name').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('categ').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('imagem').value = '';
  }
}

// Função para gerar os cartões de produto com base nos dados do LocalStorage e categoria selecionada
function gerarCartoesProdutos(categoriaSelecionada) {
  // Obter os produtos cadastrados do LocalStorage
  var produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];

  // Filtrar os produtos pela categoria selecionada
  var produtosFiltrados = produtosCadastrados.filter(function (produto) {
    return produto.categoria === categoriaSelecionada;
  });

  // Limpar o contêiner de produtos
  var produtosContainer = document.getElementById('produtos-container-' + categoriaSelecionada);
  produtosContainer.innerHTML = '';

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
    precoSpan.textContent = 'Preço: R$ ' + produto.preco;

    var adc = document.createElement('div');
    adc.classList.add('adc');

    var removerButton = document.createElement('button');
    removerButton.innerHTML = '<ion-icon name="arrow-down-circle-outline"></ion-icon>Remover';
    removerButton.addEventListener('click', function () {
      card.remove();

      // Remover o produto do array de produtos no LocalStorage
      var index = produtosCadastrados.indexOf(produto);
      if (index > -1) {
        produtosCadastrados.splice(index, 1);
        localStorage.setItem('produtos', JSON.stringify(produtosCadastrados));
      }
    });

    var editarIcon = document.createElement('span');
    editarIcon.innerHTML = '<ion-icon name="brush-outline"></ion-icon>';

    adc.appendChild(removerButton);

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(precoSpan);
    card.appendChild(adc);

    produtosContainer.appendChild(card);
  });
}

// Chamar a função para gerar os cartões de produto com base nos dados do LocalStorage e categoria inicial
var categoriaSelecionada = document.getElementById('categ').value;
gerarCartoesProdutos(categoriaSelecionada);
