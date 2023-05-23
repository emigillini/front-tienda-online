const socket = io();
socket.emit("message", "Hola, WebSocket emitiendo");

socket.on("prod actualizado", (data) => {
  console.log(data);
});

socket.on("updateProducts", (products) => {
  renderProductList(products);
});

socket.on("connect", () => {
  socket.emit("getProducts");
});

socket.on("productAdded", (product) => {
  addProductCard(product);
});

socket.on("productDeleted", (prodId) => {
  removeProductCard(prodId);
});

const renderProductList = (products) => {
  const productList = document.querySelector(".prods");
  productList.innerHTML = "";

  products.forEach((product) => {
    addProductCard(product);
  });
};

const addProductCard = (product) => {
  const productCard = `
    <div class="card">
      <h3>${product.title}</h3>
      <img src="${product.thumbnail}" alt="${product.title}">
      <p>Description: ${product.description}</p>
      <p>ID: ${product.id}</p>
      <p>Precio: $ ${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <p>Categoria: ${product.category}</p>
    </div>
  `;
  document.querySelector(".prods").insertAdjacentHTML("beforeend", productCard);
};

const removeProductCard = (productId) => {
  const productElement = document.getElementById(productId);
  if (productElement) {
    productElement.remove();
  }
};
