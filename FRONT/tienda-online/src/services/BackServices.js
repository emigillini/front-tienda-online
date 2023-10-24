

export const consultarProductos = () => {

  fetch('http://localhost:8080/products/')
    .then(result => result.json())
    .then(data => {
   
      let htmlContent = '';
      data.payload.forEach(product => { 
        htmlContent += `
          <div class="card">
            <h3>${product.title}</h3>
            <img src="${product.thumbnail[0]}" alt="${product.title}" style="width: 200px; height: 150px;" />
            <p>Description: ${product.description}</p>
            <p>ID: ${product.id}</p>
            <p>Precio: $ ${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <p>Categoria: ${product.category}</p>
           
          </div>
        `;
      });

      const mostrarElement = document.getElementById('mostrar');
      mostrarElement.innerHTML = htmlContent;
    })
    .catch(error => {
      console.error("Error en la petición:", error);
    });
};
  
export const consultarTickets = () => {
  fetch('http://localhost:8080/tickets/')
    .then(result => result.json())
    .then(data => {
      let htmlContent = '';
      data.forEach(ticket => {
        htmlContent += `
          <div class="card">
            <h3>${ticket.code}</h3>
            <p>Total: ${ticket.amount}</p>
            <p>Comprador: ${ticket.purchaser}</p>
            <p>ID del Carrito: ${ticket.cart ? ticket.cart.id : 'N/A'}</p>
            <ul>Productos Procesados:
        `;

        ticket.productsProcessed.forEach(product => {
          htmlContent += `
            <li>ID del Producto: ${product.updatedProduct.id}, Cantidad: ${product.purchasedQuantity}</li>
          `;
        });

        htmlContent += `</ul></div>`;
      });

      const mostrarElement = document.getElementById('mostrar');
      mostrarElement.innerHTML = htmlContent;
    })
    .catch(error => {
      console.error("Error en la petición:", error);
    });
};

export const consultarUsuarios = () => {
  fetch('http://localhost:8080/user/') // Reemplaza la URL con la ruta correcta para consultar usuarios
    .then(result => result.json())
    .then(data => {
      let htmlContent = '';
      data.payload.forEach(usuario => {
        htmlContent += `
          <div class="card">
            <h3>Nombre: ${usuario.first_name}</h3>
            <p>Email: ${usuario.email}</p>
            <p>Rol: ${usuario.role}</p>
            <p>id: ${usuario._id}</p>
            
            
          </div>
        `;
      });

      const mostrarElement = document.getElementById('mostrar'); // Asegúrate de tener un elemento HTML con el ID "mostrar" en tu página
      mostrarElement.innerHTML = htmlContent;
    })
    .catch(error => {
      console.error("Error en la petición:", error);
    });
};
