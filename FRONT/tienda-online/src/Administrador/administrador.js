import React from 'react';
import './Administrador.css';
import { consultarProductos } from '../services/BackServices';
import { consultarTickets } from '../services/BackServices';
import { consultarUsuarios } from '../services/BackServices';




const Administrador = () => {



  return (
    <div className="container text-center my-3">
      <h2>Hola Administrador</h2>
      <div className="admin-buttons">
      <button className="admin-button" onClick={consultarProductos}>Consultar Productos</button>
        <button className="admin-button" onClick={consultarTickets}>Consultar Tickets</button>
        <button className="admin-button" onClick={consultarUsuarios}>consultarUsuarios</button>
      </div>
      <div id="mostrar" className="product-container">
        {}
      </div>
    </div>
  );
};

export default Administrador;
