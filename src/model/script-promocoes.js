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
function cadastrarPromocao() {
  var nome = document.getElementById('name').value;
  var descricao = document.getElementById('desc').value;
  var preco = document.getElementById('preco').value;
  var imagem = document.getElementById('imagem').files[0];

  if (nome === '' || descricao === '' || preco === '' || !imagem) {
    alert('Por favor, preencha todos os campos de cadastro e anexe uma imagem.');
  } else {

    // Verificar e formatar o preço no padrão de moeda
    preco = preco.replace(',', '.'); // Substituir vírgula por ponto (ex: 15,00 -> 15.00)
    preco = parseFloat(preco).toFixed(2); // Converter para número e fixar em 2 casas decimais
    preco = preco.replace('.', ','); // Substituir ponto por vírgula (ex: 15.00 -> R$15,00)

    // Criar objeto para representar a promoção
    var novaPromocao = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      imagem: URL.createObjectURL(imagem),
    };

    // Obter as promoções existentes da localStorage (se houver)
    var promocoesCadastradas = JSON.parse(localStorage.getItem('promocoes')) || [];

    // Adicionar a nova promoção ao array de promoções
    promocoesCadastradas.push(novaPromocao);

    // Armazenar o array atualizado na localStorage
    localStorage.setItem('promocoes', JSON.stringify(promocoesCadastradas));

    // Chamar a função para gerar os cartões com base nos dados do LocalStorage
    gerarCartoesPromocao();

    // Limpar os campos de entrada
    document.getElementById('name').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('imagem').value = '';
  }
}

// Função para gerar os cartões de promoção com base nos dados do LocalStorage
function gerarCartoesPromocao() {
  // Obter as promoções cadastradas do LocalStorage
  var promocoesCadastradas = JSON.parse(localStorage.getItem('promocoes')) || [];

  // Limpar o contêiner de promoções
  var promocoesContainer = document.getElementById('promocoes-container');
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
    precoSpan.textContent = 'Preço: R$ ' + promocao.preco;

    var adc = document.createElement('div');
    adc.classList.add('adc');

    var removerButton = document.createElement('button');
    removerButton.innerHTML = '<ion-icon name="arrow-down-circle-outline"></ion-icon>Remover';
    removerButton.addEventListener('click', function () {
      card.remove();

      // Remover a promoção do array de promoções no LocalStorage
      var index = promocoesCadastradas.indexOf(promocao);
      if (index > -1) {
        promocoesCadastradas.splice(index, 1);
        localStorage.setItem('promocoes', JSON.stringify(promocoesCadastradas));
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

    promocoesContainer.appendChild(card);
  });
}

// Chamar a função para gerar os cartões de promoção com base nos dados do LocalStorage
gerarCartoesPromocao();
