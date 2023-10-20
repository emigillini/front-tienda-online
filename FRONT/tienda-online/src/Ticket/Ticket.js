import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cartContext/cartContext';
import './Ticket.css';

const Ticket = () => {
  const { cart } = useCart();
  const [ticket, setTicket] = useState(null);
  
  console.log(cart)

  

  useEffect(() => {
    if (cart) {
      // Realizar la solicitud POST para generar el ticket
      fetch(`http://localhost:8080/cart/${cart.id}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      })
        .then((response) => response.json())
        .then((data) => {
          setTicket(data.ticket); // Guardar el ticket en el estado local
        })
        .catch((error) => {
          console.error('Error al generar el ticket:', error);
        });
    }
  }, [cart]);

  

  return (
    <div className="ticket-container">
      <h2 className="ticket-title">Confirmación de Compra</h2>
      {ticket ? (
        <div>
          <div>
            <p className="ticket-info-label">ID del Carrito:</p>
            <span>{ticket.cart}</span>
          </div>
          <p className="ticket-info-label">Productos Comprados:</p>
          <ul className="ticket-product-list">
            {ticket.productsProcessed && ticket.productsProcessed.length > 0 ? (
              ticket.productsProcessed.map((product, index) => (
                <li key={index} className="ticket-product-card">
                  <h3 className="ticket-product-title">{product.updatedProduct.title}</h3>
                  <img
                    src={product.updatedProduct.thumbnail}
                    alt="Thumbnail"
                    className="ticket-product-image"
                  />
                  <p className="ticket-product-price">Precio: ${product.updatedProduct.price}</p>
                  <p className="ticket-product-quantity">Cantidad: {product.purchasedQuantity}</p>
                </li>
              ))
            ) : <p className="ticket-info">No hay productos comprados.</p>}
          </ul>
          <p className="ticket-total">Total: ${ticket.amount}</p>
          <p className="ticket-info">Email: {ticket.purchaser}</p>
          <div className="ticket-buttons">
            <Link to="/Home" className="ticket-button home-button">
              Volver al Inicio
            </Link>
          </div>
        </div>
      ) : (
        <p className="ticket-info">Generando el ticket...</p>
      )}
    </div>
  );
};

export default Ticket;
