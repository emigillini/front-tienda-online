import React from 'react';

const RegisterPage = () => {
  return (
    <div className="container my-5">
      <div className="jumbotron">
        <h1>REGISTER</h1>
        <br />
        <form
          className="form"
          action="http://localhost:8080/session/register"
          method="post"
          autoComplete="off"
        >
          <div className="form-group">
            <input
              id="first_name"
              name="first_name"
              placeholder="nombre"
              className="form-control"
              type="text"
              required
            />
          </div>

          <div className="form-group">
            <input
              id="last_name"
              name="last_name"
              placeholder="apellido"
              className="form-control"
              type="text"
              required
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
            />
          </div>

          <div className="form-group">
            <input
              id="email"
              name="email"
              placeholder="email"
              className="form-control"
              type="text"
              required
            />
          </div>

          <div className="form-group">
            <input
              id="age"
              name="age"
              placeholder="edad"
              className="form-control"
              type="text"
              required
            />
          </div>

          <div className="form-group">
            <input className="btn btn-success my-3" type="submit" value="Register" />
          </div>
        </form>

        <hr />

        <div className="text-left">
          <button className="btn btn-success my-3" onClick={() => {}}>
            Ir a Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
