var jsonVendas =  '[{"NumeroPedido": "1","Nome": "Wander Ribeiro","Email": "Wander@gmail.com","Telefone": "21990876452","Endereço": "Rua Fabio Luz, 678, Alphavile","FormaPagamento": "Pix","Pedido": "Burguer Smash 1","Valor": 23},{"NumeroPedido": "2","Nome": "Pedro Silva","Email": "Pedro@gmail.com","Telefone": "21900872452","Endereço": "Rua dias da cruz, 68, Alphavile","FormaPagamento": "Pix","Pedido": "Burguer Smash 2","Valor": 40},{"NumeroPedido": "3","Nome": "Felipe Oliveira","Email": "Felipe@gmail.com","Telefone": "21990896752","Endereço": "Rua siqueira campos, 8, Alphavile","FormaPagamento": "Cartao","Pedido": "Burguer Smash 3","Valor": 100},{"NumeroPedido": "4","Nome": "Carlos Muniz","Email": "Carlos@gmail.com","Telefone": "21997463452","Endereço": "Rua pacheco, 78, Alphavile","FormaPagamento": "Dinheiro","Pedido": "Burguer Smash 4","Valor": 150}]'


//Exibição de vendas na tabela 
function exibirVenda () {
    var venda = JSON.parse(jsonVendas);
    var textoHTML = ''; 
    for (let x = 0; x < venda.length; x++) {
       
        textoHTML += `<tr>`
        textoHTML += `<th>${venda[x].NumeroPedido}</th>`
        textoHTML +=`<th>${venda[x].Nome}</th>`
        textoHTML += `<th>${venda[x].Email}</th>`
        textoHTML += `<th>${venda[x].Telefone}</th>`
        textoHTML += `<th>${venda[x].Endereço}</th>`
        textoHTML += `<th>${venda[x].FormaPagamento}</th>`
        textoHTML += `<th>${venda[x].Pedido}</th>`
        textoHTML += `<th>${venda[x].Valor}</th>`
        textoHTML += `<td><input  class="btnExcluir" type='button' value='Excluir'></input></td>`
        textoHTML += `</tr>`
    }

var tabela = document.getElementById("tabelaPedidos"); 
var htmlTabela = tabela.innerHTML; 
htmlTabela += textoHTML; 
tabela.innerHTML = htmlTabela;
}
//botão de excluir da tabela
var tabelaVenda = document.querySelector("#tabelaPedidos");
tabelaVenda.addEventListener("click", function (event){
    var elementoClicado = event.target;
    if (elementoClicado.classList.contains("btnExcluir")){
       var celula = elementoClicado.parentNode;
       var linha = celula.parentNode;
       linha.remove();   

    }
})



