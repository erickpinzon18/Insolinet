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

export default function LoginScreen() {
    const [id, setId] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        (async () => {
            const checkAuth = await getDoc(doc(db, "users/default"));
            if (checkAuth?.exists()) {
                const stateData = checkAuth.data(); 
                setIsActive(stateData?.active);
            }
        })();
    }, []);

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
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#1877F3" />
                </View>
            )}
            <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder="ID"
                onChangeText={setId}
                keyboardType="numeric"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Teléfono"
                onChangeText={setNumber}
                keyboardType="numeric"
                autoCapitalize="none"
            />
            <Button title="Login" onPress={loginLocal} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

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
