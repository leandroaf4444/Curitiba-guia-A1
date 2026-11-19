// Define a chave constante utilizada para armazenar o histórico de mensagens no localStorage do navegador
const CHAVE_MENSAGENS = "curitibaGuiaMensagens";

// Seleciona os elementos principais do DOM referentes ao formulário de contato e áreas de feedback
const formulario = document.getElementById("form-contato");
const retorno = document.getElementById("retorno");
const historico = document.getElementById("historico");

/**
 * Lê o histórico de mensagens salvas no navegador.
 * @returns {Array<Object>} Retorna um array com os objetos de mensagens ou um array vazio se não houver registros.
 */
function lerMensagens() {
  const bruto = localStorage.getItem(CHAVE_MENSAGENS);
  return bruto === null ? [] : JSON.parse(bruto);
}

/**
 * Exibe o histórico de mensagens enviadas na lista lateral da página.
 */
function mostrarHistorico() {
  const mensagens = lerMensagens();
  historico.innerHTML = "";
  
  // Se não houver mensagens cadastradas, exibe um aviso padrão
  if (mensagens.length === 0) {
    historico.innerHTML = "<li>Nenhuma mensagem enviada neste navegador.</li>";
    return;
  }
  
  // Percorre o array de mensagens e cria elementos de lista (li) para cada uma
  for (let i = 0; i < mensagens.length; i++) {
    const item = document.createElement("li");
    item.textContent = mensagens[i].data + " - " + mensagens[i].assunto + " (" + mensagens[i].nome + ")";
    historico.appendChild(item);
  }
}

/**
 * Exibe um feedback visual (retorno) para o usuário após a tentativa de envio.
 * @param {string} texto - Mensagem a ser exibida.
 * @param {string} tipo - Classe de estilo aplicada ("ok" para sucesso, "erro" para falhas).
 */
function mostrarRetorno(texto, tipo) {
  retorno.className = "aviso " + tipo;
  retorno.textContent = texto;
}

// Adiciona um ouvinte de evento para interceptar o envio (submit) do formulário
formulario.addEventListener("submit", function (evento) {
  // Impede o comportamento padrão de recarregamento da página ao enviar o formulário
  evento.preventDefault();
  
  // Verifica se o formulário é válido de acordo com as regras HTML5 (required, minlength, etc.)
  if (!formulario.checkValidity()) {
    mostrarRetorno("Revise os campos destacados antes de enviar.", "erro");
    formulario.reportValidity();
    return;
  }
  
  // Recupera as mensagens existentes, adiciona a nova mensagem capturada dos campos e salva
  const mensagens = lerMensagens();
  mensagens.push({
    nome: formulario.nome.value.trim(),
    email: formulario.email.value.trim(),
    assunto: formulario.assunto.value,
    mensagem: formulario.mensagem.value.trim(),
    data: new Date().toLocaleDateString("pt-BR")
  });
  
  localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(mensagens));
  
  // Exibe mensagem de sucesso, limpa o formulário e atualiza o histórico exibido na tela
  mostrarRetorno("Mensagem enviada! Obrigado pelo contato, " + formulario.nome.value.trim() + ".", "ok");
  formulario.reset();
  mostrarHistorico();
});

// Executa a função para carregar o histórico assim que o script é inicializado na página
mostrarHistorico();