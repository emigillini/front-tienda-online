
const createCard = async () => {
    try {
      const response = await fetch("/cartBD", {
        method: "POST"
      });
  
      if (response.ok) {
        const cart = await response.json();
        console.log(cart);
      } else {
        console.error('Error al crear el carrito:', response.status);
      }
    } catch (error) {
      console.error('Error al crear el carrito:', error);
    }
  }
  

  const addProd = async (cartId, productId) => {
    try {
      const response = await fetch(`/cartBD/${cartId}/product/${productId}`, {
        method: "PUT"
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Error al agregar el producto al carrito:', response.status);
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

let boton=document.getElementById("createCardBtn")
boton.addEventListener("click",()=>{
    createCard ()
})

/*document.getElementById("agregarCart").addEventListener("click", async () => {
  const cartId = event.target.getAttribute("cart.Id");
  const productId = event.target.getAttribute("product.Id");
  addProd(cartId, productId);
});*/