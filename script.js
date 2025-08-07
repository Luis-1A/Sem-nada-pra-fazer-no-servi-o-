const dados = [
  { modelo: "iPhone 7/8 Plus", masc: 2, fem: 2 },
  { modelo: "iPhone 7/8", masc: 3, fem: 3 },
  { modelo: "iPhone X", masc: 3, fem: 1 },
  { modelo: "iPhone XR", masc: 0, fem: 3 },
  { modelo: "iPhone XS Max", masc: 3, fem: 1 },
  { modelo: "iPhone 11", masc: 6, fem: 3 },
  { modelo: "iPhone 11 Pro", masc: 3, fem: 1 },
  { modelo: "iPhone 11 Pro Max", masc: 1, fem: 3 },
  { modelo: "iPhone 12", masc: 6, fem: 2 },
  { modelo: "iPhone 12 Pro Max", masc: 1, fem: 3 },
  { modelo: "iPhone 12 mini", masc: 0, fem: 3 },
  { modelo: "iPhone 13", masc: 3, fem: 4 },
  { modelo: "iPhone 13 Pro", masc: 3, fem: 2 },
  { modelo: "iPhone 13 Pro Max", masc: 5, fem: 3 },
  { modelo: "iPhone 13 mini", masc: 0, fem: 4 },
  { modelo: "iPhone 14", masc: 2, fem: 3 },
  { modelo: "iPhone 14 Max", masc: 2, fem: 3 },
  { modelo: "iPhone 14 Pro", masc: 1, fem: 3 },
  { modelo: "iPhone 14 Pro Max", masc: 8, fem: 5 },
  { modelo: "iPhone 15", masc: 9, fem: 4 },
  { modelo: "iPhone 15 Plus", masc: 1, fem: 0 },
  { modelo: "iPhone 15 Pro Max", masc: 3, fem: 2 },
  { modelo: "iPhone 16 SE", masc: 3, fem: 1 },
  { modelo: "iPhone 16", masc: 5, fem: 3 },
  { modelo: "iPhone 16 Plus", masc: 3, fem: 3 },
  { modelo: "iPhone 16 Pro", masc: 5, fem: 4 },
  { modelo: "iPhone 16 Pro Max", masc: 7, fem: 6 }
];

const container = document.getElementById("lista-modelos");
const totalSpan = document.getElementById("totalCapinhas");
const inputBusca = document.getElementById("busca");
const inputFiltro = document.getElementById("filtroQtd");
const btnSurpresa = document.getElementById("surpresa");

function calcularTotal(lista) {
  return lista.reduce((acc, item) => acc + item.masc + item.fem, 0);
}

function criarCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const total = item.masc + item.fem;

  card.innerHTML = `
    <h2>${item.modelo}</h2>
    <div class="detalhes">
      <p>📦 Masculinas: <strong>${item.masc}</strong></p>
      <p>🎀 Femininas: <strong>${item.fem}</strong></p>
      <p>📊 Total: <strong>${total}</strong></p>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("mostrar");
    card.style.backgroundColor = card.classList.contains("mostrar") ? "#f1f8e9" : "#fff";
  });

  return card;
}

function atualizarLista() {
  container.innerHTML = "";

  const busca = inputBusca.value.toLowerCase();
  const minQtd = parseInt(inputFiltro.value) || 0;

  const filtrados = dados.filter(item => {
    const nomeMatch = item.modelo.toLowerCase().includes(busca);
    const qtd = item.masc + item.fem;
    return nomeMatch && qtd >= minQtd;
  });

  filtrados.forEach(item => {
    const card = criarCard(item);
    container.appendChild(card);
  });

  totalSpan.innerText = calcularTotal(filtrados);
}

function destacarAleatorio() {
  const cards = container.querySelectorAll(".card");
  if (cards.length === 0) return;

  const aleatorio = Math.floor(Math.random() * cards.length);
  cards.forEach((c, i) => {
    c.classList.remove("mostrar");
    c.style.backgroundColor = "#fff";
    if (i === aleatorio) {
      c.classList.add("mostrar");
      c.style.backgroundColor = "#ffecb3";
      c.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

inputBusca.addEventListener("input", atualizarLista);
inputFiltro.addEventListener("input", atualizarLista);
btnSurpresa.addEventListener("click", destacarAleatorio);

atualizarLista(); // inicia a lista
