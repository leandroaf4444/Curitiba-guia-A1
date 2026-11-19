// Obtém a página atual com base no atributo 'data-pagina' definido no elemento <body>
const paginaAtual = document.body.dataset.pagina;

/**
 * Exibe um alerta visual dinâmico na página.
 * @param {string} texto - Mensagem a ser exibida no alerta.
 * @param {string} tipo - Tipo do alerta Bootstrap (ex: 'success', 'warning', 'secondary').
 */
function mostrarAlerta(texto, tipo) {
  const area = document.getElementById("area-alerta");
  if (!area) {
    return;
  }
  area.innerHTML =
    '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' +
    texto +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button></div>';
}

/**
 * Retorna o texto do botão de favoritos com base no estado atual.
 * @param {boolean} salvo - Indica se o item está salvo ou não.
 * @returns {string} Texto rotulado para o botão.
 */
function rotuloBotao(salvo) {
  return salvo ? "Remover dos Favoritos" : "Salvar nos Favoritos";
}

/**
 * Constrói a estrutura HTML de um card para exibir uma atração.
 * @param {Object} ponto - Objeto contendo os dados da atração.
 * @param {boolean} salvo - Indica se a atração está favoritada.
 * @returns {string} String HTML estruturada do card.
 */
function cartaoPonto(ponto, salvo) {
  return (
    '<div class="col-12 col-sm-6 col-md-4">' +
    '<article class="card h-100">' +
    '<img src="' + ponto.img + '" class="card-img-top" alt="' + ponto.nome + '">' +
    '<div class="card-body d-flex flex-column">' +
    '<h2 class="card-title h5">' + ponto.nome + "</h2>" +
    '<p class="card-text">' + ponto.descricao + "</p>" +
    '<div class="mt-auto d-flex flex-wrap gap-2">' +
    '<a href="detalhe.html?id=' + ponto.id + '" class="btn btn-outline-secondary btn-sm">Ver detalhes</a>' +
    '<button type="button" class="btn btn-curitiba btn-sm btn-fav' + (salvo ? " salvo" : "") + '" data-id="' + ponto.id + '">' + rotuloBotao(salvo) + "</button>" +
    "</div></div></article></div>"
  );
}

/**
 * Filtra e renderiza dinamicamente a lista de atrações com base na busca e categoria selecionada.
 */
function renderizarAtracoes() {
  const busca = document.getElementById("busca").value.trim().toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;
  const favoritos = lerFavoritos();
  let html = "";
  let total = 0;
  
  for (let i = 0; i < pontos.length; i++) {
    const ponto = pontos[i];
    const textoConfere = ponto.nome.toLowerCase().includes(busca) || ponto.descricao.toLowerCase().includes(busca);
    const categoriaConfere = categoria === "todas" || ponto.categoria === categoria;
    
    if (textoConfere && categoriaConfere) {
      html += cartaoPonto(ponto, favoritos.includes(ponto.id));
      total++;
    }
  }
  
  if (total === 0) {
    html = '<div class="col-12"><div class="alert alert-warning">Nenhuma atração encontrada. Tente outro termo.</div></div>';
  }
  
  document.getElementById("lista-atracoes").innerHTML = html;
  document.getElementById("contador").textContent = total + " atração(ões) exibida(s)";
}

/**
 * Renderiza os detalhes de uma atração específica obtida via parâmetro ID na URL.
 */
function renderizarDetalhe() {
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));
  let ponto = buscarPonto(id);
  
  if (ponto === null) {
    ponto = pontos[0];
  }
  
  document.title = ponto.nome + " | Curitiba Guia";
  document.getElementById("detalhe-titulo").textContent = ponto.nome;
  document.getElementById("detalhe-descricao").textContent = ponto.descricao;
  document.getElementById("detalhe-bairro").textContent = ponto.bairro;
  document.getElementById("detalhe-categoria").textContent = ponto.categoria;
  
  const imagem = document.getElementById("detalhe-img");
  imagem.src = ponto.img;
  imagem.alt = ponto.nome;
  
  const botao = document.getElementById("detalhe-fav");
  const salvo = lerFavoritos().includes(ponto.id);
  botao.dataset.id = ponto.id;
  botao.textContent = rotuloBotao(salvo);
  botao.classList.toggle("salvo", salvo);
}

/**
 * Renderiza os roteiros turísticos sugeridos na página de roteiros.
 */
function renderizarRoteiros() {
  let html = "";
  roteiros.forEach(function (roteiro) {
    const paradas = roteiro.paradas.map(function (id) {
      return "<li>" + buscarPonto(id).nome + "</li>";
    }).join("");
    
    html +=
      '<div class="col-md-4"><article class="card h-100"><div class="card-body">' +
      '<h2 class="card-title h5">' + roteiro.titulo + "</h2>" +
      '<p class="text-muted mb-2">' + roteiro.duracao + " | " + roteiro.perfil + "</p>" +
      "<ol>" + paradas + "</ol></div></article></div>";
  });
  
  document.getElementById("lista-roteiros").innerHTML = html;
}

/**
 * Renderiza a lista de locais salvos na página de favoritos.
 */
function renderizarFavoritos() {
  const ids = lerFavoritos();
  const lista = document.getElementById("lista-favoritos");
  lista.innerHTML = "";
  
  if (ids.length === 0) {
    lista.innerHTML = '<div class="alert alert-info">Nenhum favorito salvo. Visite as <a href="atracoes.html">atrações</a> e salve seus preferidos.</div>';
    return;
  }
  
  ids.forEach(function (id) {
    const ponto = buscarPonto(id);
    if (ponto !== null) {
      lista.innerHTML +=
        '<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">' +
        "<span><strong>" + ponto.nome + "</strong> - " + ponto.bairro + "</span>" +
        '<button type="button" class="btn btn-outline-danger btn-sm btn-fav" data-id="' + ponto.id + '">Remover dos Favoritos</button></li>';
    }
  });
}

// Event listener global para capturar cliques nos botões de favoritar/desfavoritar
document.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".btn-fav");
  if (botao === null) {
    return;
  }
  
  const id = Number(botao.dataset.id);
  const salvo = alternarFavorito(id);
  const ponto = buscarPonto(id);
  
  if (paginaAtual === "favoritos") {
    renderizarFavoritos();
    mostrarAlerta(ponto.nome + " removido dos favoritos.", "secondary");
    return;
  }
  
  botao.textContent = rotuloBotao(salvo);
  botao.classList.toggle("salvo", salvo);
  
  if (salvo) {
    mostrarAlerta(ponto.nome + " foi salvo nos favoritos.", "success");
  } else {
    mostrarAlerta(ponto.nome + " foi removido dos favoritos.", "secondary");
  }
});

// Inicialização condicional das funções com base na página atual carregada
if (paginaAtual === "atracoes") {
  document.getElementById("busca").addEventListener("input", renderizarAtracoes);
  document.getElementById("filtro-categoria").addEventListener("change", renderizarAtracoes);
  renderizarAtracoes();
} else if (paginaAtual === "detalhe") {
  renderizarDetalhe();
} else if (paginaAtual === "roteiros") {
  renderizarRoteiros();
} else if (paginaAtual === "favoritos") {
  renderizarFavoritos();
  document.getElementById("limpar").addEventListener("click", function () {
    salvarFavoritos([]);
    renderizarFavoritos();
    mostrarAlerta("Lista de favoritos esvaziada.", "warning");
  });
}