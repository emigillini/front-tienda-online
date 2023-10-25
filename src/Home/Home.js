import React, { useEffect, useState } from "react";
import "./Home.css";
import { useAuth } from "../authContext/authContext";
import { Link } from "react-router-dom";
import { useCart } from "../cartContext/cartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { userEmail } = useAuth();
  const { addProduct, deleteProduct,getCart} = useCart();

  useEffect(() => {
    getProducts();
  
  } );
  getCart()
  const getProducts = async () => {
    try {
      const response = await fetch("https://back-tienda-online-production.up.railway.app/products");

      if (response.ok) {
        const data = await response.json();
        setProducts(data.payload);
      } else {
        console.error("Error al obtener productos:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  return (
    <div>
      <h1>Bienvenido, {userEmail}</h1>
      <h1>Formulario de productos</h1>

      <button>
        <Link to="/Cart">Ir al Carrito</Link>
      </button>
      <button>
        <Link to="/Administrador">Ir a Panel Administrador</Link>
      </button>
      <button >   <Link to="/Login">Cerrar Sesión</Link></button>

      <div className="prods">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.thumbnail} alt={product.title} />
            <p>Description: {product.description}</p>
            <p>ID: {product.id}</p>
            <p>Precio: $ {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Categoría: {product.category}</p>
            <button onClick={() => addProduct(product.id)}>
              Agregar al Carrito
            </button>
            <button onClick={() => deleteProduct(product.id)}>
              Eliminar del Carrito
            </button>
          </div>
        ))}
      </div>

      <form
        action="/src/public/uploads/"
        encType="multipart/form-data"
        method="POST"
      >
        <label htmlFor="nombre">Nombre:</label>
        <input type="file" name="Archivo" id="nombre" />
        <input type="submit" value="Subir archivo" />
      </form>
    </div>
  );
};

export default Home;
