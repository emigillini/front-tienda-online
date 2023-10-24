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

/*Aqui comienza config del Chat*/

let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "identificacion",
  input: "text",
  text: "Ingresa usuario",
  inputValidator: (value) => {
    return !value && "Tienes que ingresar el usuario";
  },
  allowOutsideClick: false,
})
  .then((result) => {
    user = result.value;
    socket.emit("newUser", { user });
    return user;
  })
  .catch((error) => {
    console.log(error);
  });

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length >= 0) {
      socket.emit("messageChat", { user: user, messageChat: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messageChat = "";
  data.forEach((message) => {
    messageChat =
      messageChat + `${message.user} dice: ${message.messageChat}</br>`;
  });
  log.innerHTML = messageChat;
});

socket.on("userConnected", (user) => {
  const newUser = user.username;
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    title: "Nuevo usuario conectado",
    text: `${newUser} se ha conectado`,
    icon: "success",
  });
});
