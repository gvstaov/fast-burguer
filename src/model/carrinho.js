// Variável global para rastrear o estado do cupom
var cupomUtilizado = false;
var cupomValor = 0;

// Função para adicionar um novo item à tabela
function addItemToCart(product, price, quantity) {
  var newRow =
    '<tr>' +
    '<td class="align-middle">' +
    '<div class="main">' +
    '<div class="d-flex"></div>' +
    '<div class="des"><p class="font-italic font-size-17">' +
    product +
    '</p></div>' +
    '</div>' +
    '</td>' +
    '<td class="align-middle"><h6 class="font-italic font-size-17">' +
    price +
    '</h6></td>' +
    '<td class="align-middle">' +
    '<div class="qty mt-5">' +
    '<span class="minus bg-dark">-</span>' +
    '<input type="number" class="count" name="qty" value="' +
    quantity +
    '">' +
    '<span class="plus bg-dark">+</span>' +
    '</div>' +
    '</td>' +
    '<td class="align-middle"><h6 class="font-italic font-size-17">' +
    (price * quantity) +
    '</h6></td>' +
    '<td class="align-middle" style="border-bottom: 1px solid #000;"><i class="fa fa-trash-o delete-item" style="cursor: pointer; color: red;"></i></td>' +
    '</tr>';

  $('.table tbody').append(newRow);

  // Atualizar subtotal e total
  updateSubtotal($('.table tbody tr:last-child'));
  updateValues();
}

// Função para atualizar o subtotal de uma linha
function updateSubtotal(row) {
  var price = parseFloat(row.find('h6:first-child').text());
  var quantity = parseInt(row.find('.count').val());
  var subtotal = price * quantity;

  // Formatando o subtotal com vírgula
  var subtotalFormatted = subtotal.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });

  row.find('td:last-child h6').text(subtotalFormatted);
  updateValues();
}

// Botões da tabela
$('.table').on('click', '.plus', function () {
  var row = $(this).closest('tr');
  var input = row.find('.count');
  var currentValue = parseInt(input.val());
  input.val(currentValue + 1);
  updateSubtotal(row);
});

$('.table').on('click', '.minus', function () {
  var row = $(this).closest('tr');
  var input = row.find('.count');
  var currentValue = parseInt(input.val());
  if (currentValue > 1) {
    input.val(currentValue - 1);
    updateSubtotal(row);
  }
});

// Função para excluir um item do carrinho
function deleteCartItem() {
  var row = $(this).closest('tr');
  var product = row.find('.des p').text();
  row.remove();
  removeItemFromLocalStorage(product);
  updateValues();
}

// Botão de exclusão do item
$('.table').on('click', '.delete-item', deleteCartItem);

// Função para remover um item do carrinho do localStorage
function removeItemFromLocalStorage(product) {
  var cartItems = localStorage.getItem('carrinho');

  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    // Procurar pelo item no carrinho
    var index = cartItems.findIndex(function (item) {
      return item.nome === product;
    });

    if (index !== -1) {
      // Remover o item do carrinho
      cartItems.splice(index, 1);

      // Atualizar o carrinho no localStorage
      localStorage.setItem('carrinho', JSON.stringify(cartItems));
    }
  }
}

// Função para atualizar o subtotal, desconto e total
function updateValues() {
  var subtotal = 0;
  $('.table tbody tr').each(function () {
    var price = parseFloat($(this).find('h6:first-child').text());
    var quantity = parseInt($(this).find('.count').val());
    var rowSubtotal = price * quantity;
    subtotal += rowSubtotal;

    var itemTotalFormatted = rowSubtotal.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    });
    $(this).find('td:nth-child(4) h6').text(itemTotalFormatted);
  });

  // Atualizar subtotal
  $('.subtotal td:last-child').text('R$' + subtotal.toFixed(2).replace('.', ','));

  // Calcular o desconto com base no valor do cupom utilizado
  var discount = subtotal * (cupomValor / 100);

  $('.desconto td:last-child').text('R$' + discount.toFixed(2).replace('.', ','));

  // Atualizar total
  var total = subtotal - discount;
  $('.total td:last-child').text('R$' + total.toFixed(2).replace('.', ','));

  // Salvar o total no localStorage
  var valorArray = [{ valor: total.toFixed(2) }];
  localStorage.setItem('valor', JSON.stringify(valorArray));
}

// Função para exibir o valor do desconto quando um cupom for aplicado
function displayDiscountValue(discount) {
  var discountElement = document.querySelector('.desconto td:last-child');
  var discountValue = 'R$' + discount.toFixed(2).replace('.', ',');
  discountElement.textContent = discountValue;
}

// Verificar se há itens no carrinho no localStorage
var carrinhoItens = localStorage.getItem('carrinho');

if (carrinhoItens) {
  carrinhoItens = JSON.parse(carrinhoItens);

  // Adicionar os itens à tabela
  carrinhoItens.forEach(function (item) {
    addItemToCart(item.nome, item.preco, item.quantidade);
  });
}

// Obter os cupons do localStorage
var cupons = localStorage.getItem('cuponsLocal');

if (cupons) {
  cupons = JSON.parse(cupons);

  // Preencher o menu de cupons
  var cupomSelect = document.getElementById('cupom-select');
  cupons.forEach(function (cupom) {
    var option = document.createElement('option');
    option.value = cupom.nome;
    option.text = cupom.nome;
    cupomSelect.appendChild(option);
  });
}

// Função para aplicar o cupom selecionado
function applyCoupon() {
  var cupomSelect = document.getElementById('cupom-select');
  var selectedCoupon = cupomSelect.value;

  // Verificar se um cupom foi selecionado e se ainda não foi utilizado
  if (selectedCoupon && !cupomUtilizado) {
    // Obter o cupom selecionado do localStorage
    var cupons = localStorage.getItem('cuponsLocal');

    if (cupons) {
      cupons = JSON.parse(cupons);

      // Procurar pelo cupom selecionado
      var selectedCouponObj = cupons.find(function (cupom) {
        return cupom.nome === selectedCoupon;
      });

      if (selectedCouponObj) {
        // Armazenar o valor do cupom selecionado
        cupomValor = parseFloat(selectedCouponObj.valor);

        // Atualizar os valores
        updateValues();

        // Marcar o cupom como utilizado
        cupomUtilizado = true;
      } else {
        // Cupom não encontrado
        console.log('Cupom não encontrado');
      }
    }
  }
}

// Evento de clique no botão "APLICAR"
var cupomApplyButton = document.getElementById('cupom-apply');
cupomApplyButton.addEventListener('click', applyCoupon);

// Função para excluir um item do carrinho
function removeItemFromCart(row) {
  row.remove();
  updateValues();
}

// Evento de clique no ícone de lixeira
$('.table').on('click', '.fa-trash-o', function () {
  var row = $(this).closest('tr');
  removeItemFromCart(row);
});

// ...
