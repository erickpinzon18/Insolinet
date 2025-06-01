import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, async (usr) => {
    //     if (usr) {
    //       try {
    //         // Consulta la información del usuario en Firestore
    //         console.log('Usuario autenticado:', usr.uid);
    //         const userDocRef = doc(db, 'users', usr.uid);
    //         const userDoc = await getDoc(userDocRef);

    //         if (userDoc.exists()) {
    //           // Combina la información de Firebase Auth con la de Firestore
    //           setUser(userDoc.data());
    //         } else {
    //           console.warn('No se encontró información del usuario en Firestore.');
    //         }
    //       } catch (error) {
    //         console.error('Error al obtener información del usuario:', error);
    //       }
    //     } else {
    //       setUser(null);
    //     }
    //     setLoading(false);
    //   });

    //   return unsubscribe;
    // }, []);

    const login = async ({ id, number }) => {
      // console.log("Login function called with:", { id, number });
      // setLoading(true);
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
        // console.log("Datos del usuario:", data);
        if (data && data.telefono === number) {
          // Aquí puedes guardar la información del usuario en el contexto
          // console.log("Usuario autenticado:", data);
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
        <AuthContext.Provider value={{ loading, logout, login, user }}>
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
