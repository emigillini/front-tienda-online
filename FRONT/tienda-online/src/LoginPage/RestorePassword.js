import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RestorePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {

      const response = await fetch('http://localhost:8080/session/restore-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        const data = await response.json();

        Swal.fire({
          title: 'Contraseña restablecida con éxito',
          showConfirmButton: true,
          confirmButtonText: 'Ingresar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      } else {
    
        Swal.fire({
          title: 'Error',
          text: 'No se pudo restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="jumbotron">
        <h1>Restaurar contraseña</h1>
        <br />
        <form
          className="form"
          action="/session/restore-password"
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
            <input className="btn btn-success my-3" type="submit" value="Restaurar" />
          </div>
        </form>

        <hr />
        <div className="text-left">
          <button
            className="btn btn-success my-3"
            onClick={() => navigate('/register')}
          >
            Ir a Register
          </button>
          <button
            className="btn btn-success my-3"
            onClick={() => navigate('/login')} 
          >
            Ir a Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestorePassword;
