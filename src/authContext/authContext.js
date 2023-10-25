import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const login = async (formData) => {
    try {
      const response = await fetch("https://back-tienda-online-production.up.railway.app/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUserEmail(data.user.email);
        setUserRole(data.user.role);
        console.log("esteesteeste");

        return { success: true };
      } else {
        return { success: false, error: "Credenciales incorrectas" };
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return { success: false, error: "Error interno del servidor" };
    }
  };

  const handleLogout = async () => {
   
        Link

  };

  return (
    <AuthContext.Provider value={{ userEmail, login, handleLogout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
