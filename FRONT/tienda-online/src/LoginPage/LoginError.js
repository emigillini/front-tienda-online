import React from 'react';
import { Link } from 'react-router-dom';

const LoginError = () => {
  return (
    <div className="container text-center my-3">
      <div className="jumbotron" style={{ backgroundColor: 'salmon', color: 'white' }}>
        <h1>USER ERROR LOGIN</h1>

        <Link to="/login" className="btn btn-warning my-5">
          VOLVER
        </Link>
      </div>
    </div>
  );
};

export default LoginError;
