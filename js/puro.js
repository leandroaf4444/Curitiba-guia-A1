// Seleciona o botão de menu e a barra de navegação no DOM através dos seus IDs
const botaoMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

// Adiciona um ouvinte de evento para alternar a visibilidade do menu ao clicar no botão
botaoMenu.addEventListener("click", function () {
  // Alterna a classe 'aberto' no elemento do menu (retorna true se adicionou, false se removeu)
  const aberto = menu.classList.toggle("aberto");
  
  // Atualiza o atributo de acessibilidade aria-expanded para leitores de tela
  botaoMenu.setAttribute("aria-expanded", String(aberto));
});

// Seleciona a caixa destinada à "Dica do Dia"
const caixaDica = document.getElementById("dica-dia");

// Verifica se o elemento existe na página atual antes de tentar manipulá-lo
if (caixaDica) {
  // Calcula um índice com base no dia do mês atual para alternar a dica exibida do array 'dicas'
  const indice = new Date().getDate() % dicas.length;
  
  // Insere a dica selecionada como conteúdo de texto na caixa
  caixaDica.textContent = dicas[indice];
}

// Seleciona o elemento que exibe a contagem de lugares favoritados
const contadorFavoritos = document.getElementById("contador-favoritos");

// Verifica se o elemento existe na página atual
if (contadorFavoritos) {
  // Obtém a quantidade de itens favoritados chamando a função lerFavoritos()
  const total = lerFavoritos().length;
  
  // Exibe a mensagem apropriada dependendo da quantidade de itens salvos
  if (total === 0) {
    contadorFavoritos.textContent = "Você ainda não salvou nenhum lugar.";
  } else {
    contadorFavoritos.textContent = "Você tem " + total + " lugar(es) salvo(s).";
  }
}