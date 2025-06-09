import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async ({ id, number }) => {
      try {
        const response = await fetch(`https://api.wisphub.io/api/clientes/${id}/perfil`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Api-Key 420Pkcgv.QaPGnqL86jMEQYrYudXyaz4CmZNDXdLM"
          }
        });
        if (!response.ok) {
          throw new Error("Las credenciales no son correctas o no existen");
        }
        const data = await response.json();
        const newPhone = data.telefono?.split(",")[0] || data.telefono; 
        if (data && newPhone === number) {
          setUser({ id, ...data });
        } else {
          throw new Error("Las credenciales no son correctas o no existen");
        }        
      } catch (error) {
        throw new Error(error.message || "Error al iniciar sesión");
      } finally {
        setLoading(false);
      }
    };

    const logout = () => setUser("");

    return (
        <AuthContext.Provider value={{ loading, logout, login, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
