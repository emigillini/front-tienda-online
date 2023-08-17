const createCard = async () => {
  try {
    const response = await fetch("/cart/addCart", {
      method: "POST",
    });

    if (response.ok) {
      const cart = await response.json();
      console.log(cart);
    } else {
      console.error("Error al crear el carrito:", response.status);
    }
  } catch (error) {
    console.error("Error al crear el carrito:", error);
  }
};

const addProd = async (cartId, productId) => {
  try {
    const response = await fetch(
      `/cart/addProductToCart/${cartId}/product/${productId}`,
      {
        method: "PUT",
      }
    );

    if (response.ok) {
      console.log("producto agregado");
    } else {
      console.error(
        "Error al agregar el producto al carrito:",
        response.status
      );
    }
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
};

let boton = document.getElementById("createCardBtn");
boton.addEventListener("click", () => {
  createCard();
  alert("carro creado");
});

document.querySelectorAll(".agregarCart").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    try {
      const response = await fetch(`/cart/lastCart`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const cartId = data.payload;
        const productId = event.target.getAttribute("productId");
        addProd(cartId, productId);
        console.log(cartId);
      } else {
        console.error(
          "Error al agregar el producto al carrito:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  });
});
