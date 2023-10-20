import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    age: '',
  });
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud de registro y maneja la respuesta
      const response = await fetch('http://localhost:8080/session/register', {
        method: 'POST',
        // Agrega los datos del formulario en el cuerpo de la solicitud
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Registro exitoso
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
        }).then(() => {
          // Redirige al usuario a la página de inicio de sesión
          navigate('/login');
        });
      } else {
        // Registro fallido
        setRegistrationError('Hubo un error en el registro. Verifica tus datos.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container my-5">
      <div className="jumbotron">
        <h1>REGISTER</h1>
        <br />
        <form
          className="form"
          autoComplete="off"
          onSubmit={handleRegister}
        >
          <div className="form-group">
            <input
              name="first_name"
              placeholder="nombre"
              className="form-control"
              type="text"
              required
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              name="last_name"
              placeholder="apellido"
              className="form-control"
              type="text"
              required
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              name="password"
              placeholder="password"
              className="form-control"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              name="email"
              placeholder="email"
              className="form-control"
              type="text"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              name="age"
              placeholder="edad"
              className="form-control"
              type="text"
              required
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input className="btn btn-success my-3" type="submit" value="Register" />
          </div>
        </form>

        {registrationError && (
          <p className="text-danger">{registrationError}</p>
        )}

        <hr />

        <div className="text-left">
          <Link to="/login" className="btn btn-success my-3">
            Ir a Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
