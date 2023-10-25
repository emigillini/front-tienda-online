import React, { useEffect, useState } from "react";
import { useAuth } from "../authContext/authContext";
import { Link } from "react-router-dom";
import { useCart } from "../cartContext/cartContext";
import "./Cart.css";

const Cart = () => {
  const { user, userRole } = useAuth();
  const {
    cart,
    getCart,
    deleteAllProducts,
    deleteProduct,
    calculateTotalPrice,
  } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);



  useEffect(() => {
   
    if (cart && cart.products) {
      const total = calculateTotalPrice();
      setTotalPrice(total);
    }
  }, [cart, calculateTotalPrice]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carro de Compras</h2>
      {cart ? (
        <div>
          <div>
            <p className="role-info-label">ID del Carrito:</p>
            <span>{cart.id}</span>
          </div>
          <div>
            <p className="role-info-label">Rol:</p>
            <span>{userRole}</span>
          </div>
          <p className="role-info-label">Productos en el Carrito:</p>
          <ul className="cart-product-list">
            {cart.products && cart.products.length > 0 ? (
              cart.products.map((product, index) => (
                <li key={index} className="cart-product-card">
                  <h3 className="cart-product-title">{product.title}</h3>
                  <img
                    src={product.thumbnail}
                    alt="Thumbnail"
                    className="cart-product-image"
                  />
                  <p className="cart-product-price">Precio: ${product.price}</p>
                  <p className="cart-product-quantity">
                    Cantidad: {product.quantity}
                  </p>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="delete-button"
                  >
                    Eliminar Producto
                  </button>
                </li>
              ))
            ) : (
              <p className="cart-info">No hay productos en el carrito.</p>
            )}
          </ul>
          <p className="cart-total">Total: ${totalPrice}</p>
          <p className="cart-info">Email: {cart.email}</p>
          <div className="cart-buttons">
            <Link to="/Home" className="cart-button home-button">
              Volver al Inicio
            </Link>
            <button
              onClick={deleteAllProducts}
              className="cart-button delete-button"
            >
              Eliminar Todos los Productos
            </button>
            <button id="finalizarCompraBtn" className="cart-button home-button">
              <Link to="/stripe" className="cart-button home-button">
                Finalizar Compra
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <p className="cart-info">Carrito no creado todavía para {user.email}</p>
      )}
    </div>
  );
};

export default Cart;
