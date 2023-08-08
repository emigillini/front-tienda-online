
const peticion = () => {

    fetch('http://localhost:8080/productsBD/')
      .then(result => result.json())
      .then(data => {
     
        let htmlContent = '';
        data.payload.payload.forEach(product => { 
          htmlContent += `
            <div class="card">
              <h3>${product.title}</h3>
              <img src="${product.thumbnail[0]}" alt="${product.title}" style="width: 200px; height: 150px;" />
              <p>Description: ${product.description}</p>
              <p>ID: ${product._id}</p>
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
  