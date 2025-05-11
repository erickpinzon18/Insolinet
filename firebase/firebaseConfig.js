import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBEIvG3I7SLWlMVEa7pY1R6dQ0GGr0Uyjk",
  authDomain: "insolinet-720fe.firebaseapp.com",
  projectId: "insolinet-720fe",
  storageBucket: "insolinet-720fe.firebasestorage.app",
  messagingSenderId: "875936802286",
  appId: "1:875936802286:web:2208914515ca656503daff"
};

// Verifica si Firebase ya está inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializa Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Inicializa Firestore
const db = getFirestore(app);

export { app, auth, db };