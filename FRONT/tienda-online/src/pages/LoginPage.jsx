import React, { useState } from 'react';
import  "./login.css"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      email,
      password,
    };

    // Realizar una solicitud POST al backend
    fetch('http://localhost:8080/session/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convertir a JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del backend aquí
        console.log('Respuesta del backend:', data);
          // Si el inicio de sesión es exitoso, redirige al usuario al "home"
          if (data.success) {
            window.location.href = '/home'; // Cambia '/home' a la ruta de tu página de inicio
          }
          else{window.location.href = '/LoginError';}

        // Puedes hacer algo en respuesta, como redireccionar al usuario
        // o mostrar un mensaje de éxito
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error('Error al enviar la solicitud:', error);
        if (error instanceof SyntaxError) {
          // La respuesta del servidor no es válida JSON, mostrar un mensaje de error adecuado
          console.error('La respuesta del servidor no es válida JSON. Puede haber un problema en el servidor.');
          // Puedes mostrar un mensaje de error al usuario si lo deseas
        }

        // Puedes mostrar un mensaje de error al usuario si lo deseas
      });
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
          <button className="btn btn-success my-3" onClick={() => {}}>
            Ir a Register
          </button>
          <button className="btn btn-success my-3" onClick={() => {}}>
            Restaurar contraseña
          </button>
          <button className="btn btn-success my-3" onClick={() => {}}>
            Entrar con GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
