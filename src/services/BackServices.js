export const consultarProductos = () => {
  fetch("https://back-tienda-online-production.up.railway.app/products/")
    .then((result) => result.json())
    .then((data) => {
      let htmlContent = "";
      data.payload.forEach((product) => {
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

      const mostrarElement = document.getElementById("mostrar");
      mostrarElement.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
    });
};

export const consultarTickets = () => {
  fetch("https://back-tienda-online-production.up.railway.app/tickets/")
    .then((result) => result.json())
    .then((data) => {
      let htmlContent = "";
      data.forEach((ticket) => {
        htmlContent += `
          <div class="card">
            <h3>${ticket.code}</h3>
            <p>Total: ${ticket.amount}</p>
            <p>Comprador: ${ticket.purchaser}</p>
            <p>ID del Carrito: ${ticket.cart ? ticket.cart.id : "N/A"}</p>
            <ul>Productos Procesados:
        `;

        ticket.productsProcessed.forEach((product) => {
          htmlContent += `
            <li>ID del Producto: ${product.updatedProduct.id}, Cantidad: ${product.purchasedQuantity}</li>
          `;
        });

        htmlContent += `</ul></div>`;
      });

      const mostrarElement = document.getElementById("mostrar");
      mostrarElement.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
    });
};

export const consultarUsuarios = () => {
  fetch("https://back-tienda-online-production.up.railway.app/user/")
    .then((result) => result.json())
    .then((data) => {
      let htmlContent = "";
      data.payload.forEach((usuario) => {
        htmlContent += `
          <div class="card">
            <h3>Nombre: ${usuario.first_name}</h3>
            <p>Email: ${usuario.email}</p>
            <p>Rol: ${usuario.role}</p>
            <p>id: ${usuario._id}</p>
          
            
            
          </div>
        `;
      });

      const mostrarElement = document.getElementById("mostrar");
      mostrarElement.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
    });
};
export const eliminarUsuariosInactivos = () => {
  fetch("/ruta/al/backend/para/eliminar/inactivos", {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Usuarios inactivos eliminados con éxito");
      } else {
        alert("No hay usuarios inactivos para eliminar");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
