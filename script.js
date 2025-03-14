const items = document.querySelector(".items");
const buttom = document.querySelector(".grid-selector");
const headerItems = document.querySelector(".header-items");
const counter = document.querySelector(".counter");
const svg1 = document.querySelector(".svg1");
const svg2 = document.querySelector(".svg2");
const svg4 = document.querySelector(".svg4");
const svg5 = document.querySelector(".svg5");
let alternado = false;
let products = [];

buttom.addEventListener("click", function () {
  items.classList.toggle("items--grid");
  if (alternado === false) {
    svg2.classList.add("svg-inactive");
    svg4.classList.add("svg-inactive");
    svg1.classList.remove("svg-inactive");
    svg5.classList.remove("svg-inactive");
    alternado = true;
  } else {
    svg2.classList.remove("svg-inactive");
    svg4.classList.remove("svg-inactive");
    svg1.classList.add("svg-inactive");
    svg5.classList.add("svg-inactive");
    alternado = false;
  }
});

async function getData() {
  const url = "https://desafio.xlow.com.br/search";
  try {
    const response = await fetch(url);
    const json = await response.json();
    products = json;
  } catch (error) {
    console.error(error.message);
  }
}

function updateCounter() {
  const totalProduts = products.length;
  counter.innerHTML = `${totalProduts} ${getLabel(totalProduts)}`;
}

function getLabel(totalProduts) {
  if (totalProduts > 1) {
    return "Produtos";
  } else {
    return "Produto";
  }
}

await getData();

let htmlItems = "";

async function renderProducts() {
  for (const product of products) {
    const getProductId = product.productId;
    const url = `https://desafio.xlow.com.br/search/${getProductId}`;
    try {
      const response = await fetch(url);
      const jsonResponse = await response.json();
      const fullProduct = jsonResponse[0];

      htmlItems += `<div class="item">
      <div class="container-image">
        <img
          class="item-image"
          src="${fullProduct.items[0].images[1].imageUrl}"
          alt="${fullProduct.items[0].images[1].imageText}"
        />
      </div>
      <p class="item-name">${fullProduct.productName}</p>
      <div class="option-container">
        <img
          class="option-item"
          src="${fullProduct.items[0].images[1].imageUrl}"
          alt="${fullProduct.items[0].images[1].imageText}"
        />
        <img
          class="option-item"
          src="${fullProduct.items[0].images[0].imageUrl}"
          alt="${fullProduct.items[0].images[0].imageText}"
        />
      </div>
      <p class="no-discount">R$ ${Number(
        fullProduct.items[0].sellers[0].commertialOffer.ListPrice
      ).toFixed(2)}</p>
      <p class="item-price">R$ ${Number(
        fullProduct.items[0].sellers[0].commertialOffer.Price
      ).toFixed(2)}</p>
      <div class="buy-buttom-container">
        <button class="buy-buttom">COMPRAR</button>
      </div>
    </div>
      `;
    } catch (error) {
      console.error(error);
    }
  }
  items.insertAdjacentHTML("afterbegin", htmlItems);

  document.querySelectorAll(".option-item").forEach((el) =>
    el.addEventListener("click", (event) => {
      const target = event.target;
      const parent = target.parentElement.parentElement;
      const img = parent.querySelector(".item-image");
      if (img.src !== el.src) {
        img.src = el.src;
      }
    })
  );
}

updateCounter();
renderProducts();
