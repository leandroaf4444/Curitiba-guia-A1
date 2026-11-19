// Array contendo os pontos turísticos e atrações de Curitiba (dados estáticos do guia)
const pontos = [
  { 
    id: 1, 
    nome: "Jardim Botânico", 
    categoria: "Parques", 
    bairro: "Jardim Botânico", 
    img: "img/jardim-botanico.jpg", 
    descricao: "Estufa de vidro e metal cercada por jardins de traçado francês, um dos cartões-postais da cidade." 
  },
  { 
    id: 2, 
    nome: "Ópera de Arame", 
    categoria: "Cultura", 
    bairro: "Pedreira Paulo Leminski", 
    img: "img/opera-de-arame.jpg", 
    descricao: "Teatro de estrutura tubular e teto transparente, cercado por mata nativa." 
  },
  { 
    id: 3, 
    nome: "Parque Tanguá", 
    categoria: "Parques", 
    bairro: "Pilarzinho", 
    img: "img/parque-tangua.jpg", 
    descricao: "Mirante com cachoeira artificial e túneis escavados na rocha de uma antiga pedreira." 
  },
  { 
    id: 4, 
    nome: "Museu Oscar Niemeyer", 
    categoria: "Cultura", 
    bairro: "Centro Cívico", 
    img: "img/museu-oscar-niemeyer.jpg", 
    descricao: "O Museu do Olho reúne exposições de artes visuais, arquitetura e design." 
  },
  { 
    id: 5, 
    nome: "Torre Panorâmica", 
    categoria: "Centro e vistas", 
    bairro: "Centro", 
    img: "img/torre-panoramica.jpg", 
    descricao: "Mirante com vista de 360 graus para o centro e os parques da cidade." 
  },
  { 
    id: 6, 
    nome: "Rua XV de Novembro", 
    categoria: "Centro e vistas", 
    bairro: "Centro", 
    img: "img/rua-xv.jpg", 
    descricao: "Calçadão histórico com lojas, cafés e a Boca Maldita, ponto de encontro dos curitibanos." 
  },
  { 
    id: 7, 
    nome: "Mercado Municipal", 
    categoria: "Centro e vistas", 
    bairro: "Rebouças", 
    img: "img/mercado-municipal.jpg", 
    descricao: "Barracas de queijos, frutas, cafés e produtos típicos para provar e levar para casa." 
  },
  { 
    id: 8, 
    nome: "Parque Tingui", 
    categoria: "Parques", 
    bairro: "Tingui", 
    img: "img/parque-tingui.jpg", 
    descricao: "Parque com lagos, pista de caminhada e memorial dedicado à imigração ucraniana." 
  }
];

// Array contendo sugestões de roteiros turísticos, incluindo duração, perfil e IDs das paradas
const roteiros = [
  { 
    titulo: "Um dia nos parques", 
    duracao: "6 horas", 
    perfil: "Famílias e quem gosta de natureza", 
    paradas: [1, 3, 8] 
  },
  { 
    titulo: "Cultura e arquitetura", 
    duracao: "5 horas", 
    perfil: "Quem busca arte e design", 
    paradas: [4, 2, 5] 
  },
  { 
    titulo: "Centro histórico a pé", 
    duracao: "4 horas", 
    perfil: "Primeira visita à cidade", 
    paradas: [6, 7, 5] 
  }
];

// Array com dicas úteis sobre a cidade que são exibidas dinamicamente na página inicial
const dicas = [
  "Leve um casaco leve: o tempo em Curitiba muda várias vezes no mesmo dia.",
  "Os parques abrem cedo e ficam mais tranquilos antes das 10 horas.",
  "Use a Linha Turismo para conhecer os principais pontos em um só passeio.",
  "Experimente o pinhão cozido nos meses mais frios do ano.",
  "Confira a programação da Ópera de Arame antes de visitar."
];