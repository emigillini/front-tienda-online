
const peticion = () => {

    fetch('http://localhost:8080/products/')
      .then(result => result.json())
      .then(data => {
     
        let htmlContent = '';
        data.payload.payload.forEach(product => { 
          htmlContent += `
            <div class="card">
              <h3>${product.title}</h3>
              <img src="${product.thumbnail[0]}" alt="${product.title}" style="width: 200px; height: 150px;" />
              <p>Description: ${product.description}</p>
              <p>ID: ${product.id}</p>
              <p>Precio: $ ${product.price}</p>
              <p>Stock: ${product.stock}</p>
              <p>Categoria: ${product.category}</p>
              <button class="agregarCart" productId="${product.id}">Agregar al carrito</button> <!-- Utilizamos "product.id" en lugar de "_id" -->
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
  
  
const peticion2 = () => {

  fetch('http://localhost:8080/tickets/')
    .then(result => result.json())
    .then(data => {
   
      let htmlContent = '';
      data.forEach(ticket => { 
        htmlContent += `
          <div class="card">
            <h3>${ticket.code}</h3>
           
            <p>Total: ${ticket.amount}</p>
            <p>comprador: $ ${ticket.purchaser}</p>
          
          
        `;
        console.log(ticket.productsProcessed)
        ticket.productsProcessed.forEach(product => {
          htmlContent += `
            <li>ID: ${product.updatedProduct}, Cantidad: ${product.purchasedQuantity}</li>
          `;
        });
        htmlContent += `</ul></div>`;
        console.log(ticket.productsProcessed)
      });

      const mostrarElement = document.getElementById('mostrar');
      mostrarElement.innerHTML = htmlContent;
    })
    .catch(error => {
      console.error("Error en la petición:", error);
    });
};
