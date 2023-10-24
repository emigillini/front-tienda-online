 import React, { useState } from 'react';
import { useAuth } from '../authContext/authContext';
import  "./login.css"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth()
  const navigate = useNavigate();
 
  const addCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, 
        }),
       
      });

      if (response.ok) {
        const cart = await response.json();
       
        console.log('Carrito agregado');
        console.log(cart);
      } else {
    
        console.error('Error al crear el carrito:', response.status);
      }
    } catch (error) {

      console.error('Error al crear el carrito:', error);
    }
  };
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();


    const formData = {
      email,
      password,
    };

    try {
      const response = await login(formData); 
  
      console.log('Respuesta del backend:', response);
      
       if (response.success) {
       
       addCart()
       
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          showConfirmButton: true,
          confirmButtonText: 'Ingresar',
        }).then((result) => {
          if (result.isConfirmed) {
            
        
            navigate('/Home');
          }
        });
      }
     
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      if (error instanceof SyntaxError) {
        console.error('La respuesta del servidor no es válida JSON. Puede haber un problema en el servidor.');
      }
    }
  };
  return (
    <div className="container my-5">
      <div className="jumbotron">
        <h1>LOGIN</h1>
        <br />
        <form
          className="form"
          action="http://localhost:8080/session/login"
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              id="email"
              name="email"
              placeholder="usuario"
              className="form-control"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              name="password"
              placeholder="password"
              className="form-control"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input className="btn btn-success my-3" type="submit" value="Login" />
          </div>
        </form>

        <hr />
        <div className="text-left">
        <Link to="/register" className="btn btn-success my-3">
            Ir a register
          </Link>
          </div>
          
          <div className="text-left">
          <Link to="/restorePassword"  className="btn btn-success my-3">  
            Restaurar contraseña
            </Link>
          
        </div>
        <div className="text-left">
          <Link to="/Administrador"  className="btn btn-success my-3">  
            Panel de Administracion
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;