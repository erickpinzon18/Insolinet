import { useState, useContext, useEffect } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Pantalla de login
export default function LoginScreen() {
    const [id, setId] = useState(""); // ID de usuario
    const [number, setNumber] = useState(""); // Teléfono
    const [error, setError] = useState(""); // Mensaje de error
    const { login } = useContext(AuthContext); // Función login del contexto
    const [loading, setLoading] = useState(false); // Estado de carga
    const [isActive, setIsActive] = useState(true); // Estado de actividad del servicio

    // Validación para evitar bugs no deseados no eliminar puede causar conflictos
    useEffect(() => {
        (async () => {
            const checkAuth = await getDoc(doc(db, "users/default"));
            if (checkAuth?.exists()) {
                const stateData = checkAuth.data(); 
                setIsActive(stateData?.active);
            }
        })();
    }, []);

    // Función para iniciar sesión localmente
    const loginLocal = async () => {
        try {
            setLoading(true);
            setError("");
            await login({ id, number });
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    };

    if (!isActive) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>
                    El servicio ha sido deshabilitado. Por favor, ponte en
                    contacto con tu proveedor para más información.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Overlay de carga */}
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#1877F3" />
                </View>
            )}
            {/* Logo de la empresa */}
            <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            {/* Input para ID */}
            <TextInput
                style={styles.input}
                placeholder="ID"
                onChangeText={setId}
                keyboardType="numeric"
                autoCapitalize="none"
            />
            {/* Input para número de teléfono */}
            <TextInput
                style={styles.input}
                placeholder="Número de Teléfono"
                onChangeText={setNumber}
                keyboardType="numeric"
                autoCapitalize="none"
            />
            {/* Botón de login */}
            <Button title="Login" onPress={loginLocal} />
            {/* Mensaje de error */}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

// Estilos para la pantalla de login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
    logo: {
        width: 160,
        height: 160,
        alignSelf: "center",
        marginBottom: 32,
    },
    input: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: "#f9f9f9",
    },
    error: {
        marginTop: 12,
        color: "red",
        textAlign: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
});
