
// menu

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


// tradução

function traducao(){

    var traducao = document.querySelector('.traducao-op')

    if(traducao.style.display === "block"){
        traducao.style.display = "none"
    } else {
        traducao.style.display = "block"
    }

}

function traducao2(){

    var traducao2 = document.getElementById('traducao2')

    var traducao1 = document.getElementById('traducao')

    var span1 = traducao1.innerText

    var span2 = traducao2.innerText

    traducao1.innerHTML = span2

    traducao2.innerHTML = span1

    var traducao = document.querySelector('.traducao-op')

    if(traducao.style.display === "block"){
        traducao.style.display = "none"
    } else {
        traducao.style.display = "block"
    }


}


// carrossel

let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
  nextImage();
}, 5000)

function nextImage(){
  count++;
  if(count>3){
    count = 1;
  }
  document.getElementById("radio"+count).checked = true;
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

//Igor - Exibir lista de pedidos
function exibirVenda () {
    var Pedidos = localStorage.getItem("ListaPedidos");
    var venda = JSON.parse(Pedidos);
    if (venda != null)
    {
        var textoHTML = ''; 
        for (let x = 0; x < venda.length; x++) {
           
            textoHTML += `<tr>`
            textoHTML +=`<th>${venda[x].NumeroPedido}</th>`
            textoHTML +=`<th>${venda[x].Nome}</th>`
            textoHTML += `<th>${venda[x].Email}</th>`
            textoHTML += `<th>${venda[x].Telefone}</th>`
            textoHTML += `<th>${venda[x].Logradouro}</th>`
            textoHTML += `<th>${venda[x].Numero}</th>`
            textoHTML += `<th>${venda[x].Cidade}</th>`
            textoHTML += `<th>${venda[x].FormaPagamento}</th>`
            textoHTML += `<th>${venda[x].Produto}</th>`
            textoHTML += `<th>${venda[x].Quantidade}</th>`
            textoHTML += `<th>${venda[x].Valor}</th>`
            textoHTML += `<td><input  class="btnExcluir" type='button' value='Excluir' onClick = "Excluir(this)"></input></td>`
            textoHTML += `</tr>`
        }
    
        var tabela = document.getElementById("tabelaPedidos"); 
        var htmlTabela = tabela.innerHTML; 
        htmlTabela += textoHTML; 
        tabela.innerHTML = htmlTabela;
    }
}
//Igor - Remover um pedido da Lista e do LocalStorage
function Excluir(elementoClicado)
{
    if (elementoClicado.classList.contains("btnExcluir")){
        
        var celula = elementoClicado.parentNode;
        var linha = celula.parentNode;
        var nomeCliente = linha.cells[1].innerHTML;
        
        var Pedidos = localStorage.getItem("ListaPedidos");
        let _Pedidos = JSON.parse(Pedidos);
        const _PedidosAtualizados = [];


        _Pedidos.forEach(element => {
            if (element.Nome != nomeCliente)
            {
                _PedidosAtualizados.push(element);
            }
        });

        localStorage.setItem("ListaPedidos", JSON.stringify(_PedidosAtualizados));

        linha.remove();   
     }
}


