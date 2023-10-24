import React, { useState } from 'react';
import './Administrador.css';
import { useAuth } from '../authContext/authContext';
import { consultarProductos, consultarTickets, consultarUsuarios, eliminarUsuariosInactivos} from '../services/BackServices';

const Administrador = () => {
  const [userId, setUserId] = useState(''); // Estado para almacenar el ID de usuario
  const {userRole} = useAuth()

  console.log(userRole)
  const cambiarRol = (userId) => {
    if (userRole === "admin") { // Verifica si el usuario tiene permisos de administrador
      fetch(`http://localhost:8080/user/premium/${userId}`, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.newUserRole) {
            console.log(`Rol cambiado a ${data.newUserRole}`);
            consultarUsuarios(); // Vuelve a cargar la lista de usuarios después del cambio
          } else {
            console.error('No se pudo cambiar el rol del usuario.');
          }
        })
        .catch((error) => {
          console.error("Error al cambiar el rol:", error);
        });
    } else {
      alert('No tienes permisos para cambiar el rol.')
      console.error('No tienes permisos para cambiar el rol.');
    }
  }

  const eliminarUsuario = (userId) => {
    if (userRole === "admin") { 
      fetch(`http://localhost:8080/user/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Usuario eliminado exitosamente') {
            console.log('Usuario eliminado exitosamente');
            consultarUsuarios(); // Vuelve a cargar la lista de usuarios después de la eliminación
          } else {
            console.error('No se pudo eliminar al usuario.');
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error);
        });
    } else {
      alert('No tienes permisos para eliminar al usuario.')
      console.error('No tienes permisos para eliminar al usuario.');
    }
  }
  const handleUserIdChange = (event) => {
    setUserId(event.target.value); // Actualizar el estado con el valor del cuadro de texto
  };

  return (
    <div className="container text-center my-3">
      <h2>Hola Administrador</h2>

      <div className="admin-buttons">
        <button className="admin-button" onClick={consultarProductos}>Consultar Productos</button>
        <button className="admin-button" onClick={consultarTickets}>Consultar Tickets</button>
        <button className="admin-button" onClick={consultarUsuarios}>Consultar Usuarios</button>
        <button className="admin-button" onClick={eliminarUsuariosInactivos}>Eliminar Usuarios Inactivos</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="ID de usuario"
          value={userId}
          onChange={handleUserIdChange}
        />
        <button onClick={() => cambiarRol(userId)}>Cambiar Rol</button>
        <button onClick={() => eliminarUsuario(userId)}>Eliminar Usuario</button> {/* Agregar botón de eliminación */}
      </div>
      <div id="mostrar" className="product-container"></div>
    </div>
  );
};

export default Administrador;
