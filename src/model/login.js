// Página inicial de Login
const LOGIN_URL = "login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// Dados do usuário para serem utilizados como carga inicial
const dadosIniciais = {
  usuarios: [
    { login: "admin@fastburguer.com", senha: "123" },
  ],
};

// Declara uma função para processar o formulário de login
function processaFormLogin(event) {
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault();

  // Obtem os dados de login e senha a partir do formulário de login
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Valida login e se estiver ok, redireciona para tela inicial da aplicação
  var resultadoLogin = loginUser(username, password);
  if (resultadoLogin) {
    window.location.href = "admin-cadastro.html";
  } else {
    // Se login falhou, avisa ao usuário
    alert("Usuário ou senha incorretos");
  }
}

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp() {
  // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
  var usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");
  if (usuarioCorrenteJSON) {
    usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
  }

  // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
  // Obtem a string JSON com os dados de usuários a partir do localStorage
  var usuariosJSON = localStorage.getItem("db_usuarios");

  // Verifica se existem dados já armazenados no localStorage
  if (!usuariosJSON) {
    // Se NÃO há dados no localStorage

    // Informa sobre localStorage vazio e que serão carregados os dados iniciais
    alert("Dados de usuários não encontrados no localStorage.");

    // Copia os dados iniciais para o banco de dados
    db_usuarios = dadosIniciais;

    // Salva os dados iniciais no local Storage convertendo-os para string antes
    localStorage.setItem("db_usuarios", JSON.stringify(dadosIniciais));
  } else {
    // Se há dados no localStorage

    // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
    db_usuarios = JSON.parse(usuariosJSON);
  }
}

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(login, senha) {
  // Procura pelo usuário com o login fornecido
  var usuarioEncontrado = db_usuarios.usuarios.find(function (usuario) {
    return usuario.login === login && usuario.senha === senha;
  });

  if (usuarioEncontrado) {
    // Se o login e a senha correspondem, define o usuário corrente
    usuarioCorrente = usuarioEncontrado;

    // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));

    // Retorna true para usuário autenticado
    return true;
  }

  // Se chegou até aqui é porque não encontrou o usuário ou as credenciais estão incorretas
  return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
  usuarioCorrente = {};
  sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));
  window.location = LOGIN_URL;
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();

// Adiciona um event listener ao formulário de login
var loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", processaFormLogin);
