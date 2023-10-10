// networkService.js

export const consultarProductos = () => {
    return fetch('http://localhost:8080/products/')
      .then(response => response.json())
      .then(data => {
        return data.payload.payload.map(producto => {
          return {
            id: producto.id,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            stock: producto.stock,
            category: producto.category,
            thumbnail: producto.thumbnail[0] // Debes ajustar esto según la estructura real de tu respuesta
          };
        });
      })
      .catch(error => {
        console.error("Error en la petición de productos:", error);
        throw error;
      });
  };
  
  export const consultarTickets = () => {
    return fetch('http://localhost:8080/tickets/')
      .then(response => response.json())
      .then(data => {
        return data.map(ticket => {
          const productsProcessed = ticket.productsProcessed.map(product => {
            return {
              updatedProduct: product.updatedProduct,
              purchasedQuantity: product.purchasedQuantity
            };
          });
  
          return {
            code: ticket.code,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
            productsProcessed: productsProcessed
          };
        });
      })
      .catch(error => {
        console.error("Error en la petición de tickets:", error);
        throw error;
      });
  };
  