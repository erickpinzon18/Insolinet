import { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        try {
          // Consulta la información del usuario en Firestore
          console.log('Usuario autenticado:', usr.uid);
          const userDocRef = doc(db, 'users', usr.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Combina la información de Firebase Auth con la de Firestore
            setUser(userDoc.data());
          } else {
            console.warn('No se encontró información del usuario en Firestore.');
          }
        } catch (error) {
          console.error('Error al obtener información del usuario:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
