import { createContext, useState, useEffect, useContext } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación que envuelve la app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado del usuario autenticado
    const [loading, setLoading] = useState(false); // Estado de carga para operaciones async

    // Función para iniciar sesión
    const login = async ({ id, number }) => {
      try {
        // Llamada a la API para obtener el perfil del cliente
        const response = await fetch(`https://api.wisphub.io/api/clientes/${id}/perfil`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Api-Key 420Pkcgv.QaPGnqL86jMEQYrYudXyaz4CmZNDXdLM"
          }
        });
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar error
          throw new Error("Las credenciales no son correctas o no existen");
        }
        const data = await response.json();
        // Tomar solo el primer teléfono si hay varios separados por coma
        const newPhone = data.telefono?.split(",")[0] || data.telefono; 
        // Validar que el teléfono coincida con el ingresado
        if (data && newPhone === number) {
          setUser({ id, ...data });
        } else {
          throw new Error("Las credenciales no son correctas o no existen");
        }        
      } catch (error) {
        // Propagar el error para manejo externo
        throw new Error(error.message || "Error al iniciar sesión");
      } finally {
        setLoading(false);
      }
    };

    // Función para cerrar sesión
    const logout = () => setUser("");

    // Proveer los valores y funciones a los componentes hijos
    return (
        <AuthContext.Provider value={{ loading, logout, login, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
