var nome_cliente = document.getElementById("data_1")
var N_pedido = document.getElementById("data_2")

var qualidade_comida = document.getElementById("data_3")
var Nota_restaurante = document.getElementById("data_4")

var cardapio_variado = document.getElementById("data_5")
var bom_tempo_entrega = document.getElementById("data_6")
var valor_bom = document.getElementById("data_7")
var recomendaria = document.getElementById("data_8")

var opiniao = document.getElementById("data_9")

var Enviar = document.getElementById("Enviar")
var jsonText = document.getElementById("jsontext")


var FeedBack = JSON.parse(localStorage.getItem("ListaAvaliacao"));

var temp = [];

let x = FeedBack;

function buildTable(test){
		var table = document.getElementById('tabelafeedback')

		for (var i = 0; i < test.length; i++){
			var row = `<tr>
							<td>${test[i].nome_cliente}</td>
							<td>${test[i].N_pedido}</td>
							<td>${test[i].qualidade_comida}</td>
							<td>${test[i].Nota_restaurante}</td>
							<td>${test[i].cardapio_variado}</td>
							<td>${test[i].bom_tempo_entrega}</td>
							<td>${test[i].valor_bom}</td>
							<td>${test[i].recomendaria}</td>
							<td>${test[i].opiniao}</td>								
					  </tr>`
			table.innerHTML += row


		}
}

Enviar.addEventListener("click", function () {

			var data = {
				"nome_cliente": nome_cliente.value,
				"N_pedido": N_pedido.value,

				"qualidade_comida": qualidade_comida.value,
				"Nota_restaurante": Nota_restaurante.value,

				"cardapio_variado": cardapio_variado.value,
				"bom_tempo_entrega": bom_tempo_entrega.value,
				"valor_bom": valor_bom.value,
				"recomendaria": recomendaria.value,

				"opiniao": opiniao.value

			}
	
			if(x != null && JSON.stringify(N_pedido.value).length > 2){
				
				temp.push(data);				
				
				
				alert('obrigado por nos dar seu feedback');
				
				var children = x.concat(temp);
				localStorage.setItem('ListaAvaliacao',JSON.stringify(children));
			}
			else if(JSON.stringify(N_pedido.value).length > 2) {

				temp.push(data);
				
				alert('obrigado por nos dar seu feedback');
				
				localStorage.setItem('ListaAvaliacao',JSON.stringify(temp));
			}			
			else{
				
				alert('por favor preencha todos os espaços em branco');	
			}
			
			console.log(temp);
	



})
