import React from 'react';

const LoginError = () => {
  return (
    <div className="container text-center my-3">
      <div className="jumbotron" style={{ backgroundColor: 'salmon', color: 'white' }}>
        <h1>USER ERROR LOGIN</h1>

        <button className="btn btn-warning my-5" onClick={() => { window.location.href = '/login' }}>
          VOLVER
        </button>
      </div>
    </div>
  );
};

export default LoginError;
