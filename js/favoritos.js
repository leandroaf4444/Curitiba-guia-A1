// Define a chave constante utilizada para armazenar os dados no localStorage do navegador
const CHAVE_FAVORITOS = "curitibaGuiaFavoritos";

/**
 * Lê a lista de favoritos salva no navegador.
 * @returns {Array<number>} Retorna um array com os IDs dos favoritos ou um array vazio se não houver registros.
 */
function lerFavoritos() {
  const bruto = localStorage.getItem(CHAVE_FAVORITOS);
  if (bruto === null) {
    return [];
  }
  return JSON.parse(bruto);
}

/**
 * Salva a lista atualizada de favoritos no localStorage.
 * @param {Array<number>} lista - Array contendo os IDs atualizados dos favoritos.
 */
function salvarFavoritos(lista) {
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
}

/**
 * Alterna o estado de favorito de um ponto (adiciona se não existir, remove se já estiver salvo).
 * @param {number} id - ID do ponto turístico a ser alternado.
 * @returns {boolean} Retorna true se o item foi adicionado aos favoritos, ou false se foi removido.
 */
function alternarFavorito(id) {
  const lista = lerFavoritos();
  const posicao = lista.indexOf(id);
  
  if (posicao === -1) {
    // Se o ID não está na lista, adiciona (push)
    lista.push(id);
  } else {
    // Se o ID já está na lista, remove (splice)
    lista.splice(posicao, 1);
  }
  
  salvarFavoritos(lista);
  // Retorna true se acabou de ser inserido (antes estava em -1)
  return posicao === -1;
}

/**
 * Busca um ponto turístico específico no array global 'pontos' pelo ID.
 * @param {number} id - ID do ponto que deseja buscar.
 * @returns {Object|null} Retorna o objeto do ponto encontrado ou null caso não exista.
 */
function buscarPonto(id) {
  for (let i = 0; i < pontos.length; i++) {
    if (pontos[i].id === id) {
      return pontos[i];
    }
  }
  return null;
}