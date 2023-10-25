import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../authContext/authContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const { userEmail } = useAuth();

  const getCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/cart/lastCart", {
        method: "GET",
      });

      if (response.ok) {
        const cart = await response.json();
        setCart(cart);
        setCartId(cart.id);
        console.log("Carrito Obtenido");
        console.log(cart);
      } else {
        console.error("Error al crear el carrito:", response.status);
      }
    } catch (error) {
      console.error("Error al crear el carrito:", error);
    }
  };
  const addCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/cart/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (response.ok) {
        const cart = await response.json();

        console.log("Carrito agregado");
        console.log(cart);
      } else {
        console.error("Error al crear el carrito:", response.status);
      }
    } catch (error) {
      console.error("Error al crear el carrito:", error);
    }
  };

  const deleteAllProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/deleteallproducts/${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        getCart();
        console.log("Todos los productos eliminados del carrito");
      } else {
        console.error(
          "Error al eliminar todos los productos del carrito:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Error al eliminar todos los productos del carrito:",
        error
      );
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/${cartId}/product/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        getCart();

        console.log("Producto eliminado del carrito");
      } else {
        console.error(
          "Error al eliminar el producto del carrito:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const addProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/addProductToCart/${cartId}/product/${productId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        console.log("Producto agregado al carrito");
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

  const calculateTotalPrice = () => {
    if (cart && cart.products && cart.products.length > 0) {
      let total = 0;
      cart.products.forEach((product) => {
        total += product.price * product.quantity;
      });
      return total;
    }
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        cartId,
        calculateTotalPrice,
        getCart,
        deleteProduct,
        addProduct,
        deleteAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
