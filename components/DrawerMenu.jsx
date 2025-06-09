import React, { useRef, useEffect } from "react";
import {
    DrawerLayoutAndroid,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Linking,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

// Componente principal que envuelve la app con un Drawer lateral
export default function DrawerMenu({ children }) {
    const drawerRef = useRef(null); // Referencia al Drawer para abrir/cerrar programáticamente
    const { logout, user } = useAuth(); // Hook de autenticación para obtener usuario y logout
    const navigation = useNavigation(); // Hook de navegación
    const isFocused = useIsFocused(); // Saber si la pantalla está enfocada

    // Cierra el Drawer si la pantalla pierde el foco
    useEffect(() => {
        if (!isFocused && drawerRef.current) {
            drawerRef.current.closeDrawer();
        }
    }, [isFocused]);

    // Función para abrir WhatsApp con número predefinido
    const openWhatsApp = () => {
        const phoneNumber = "+524271140263";
        const url = `https://wa.me/${phoneNumber}`;
        Linking.openURL(url);
    };

    // Función para abrir la página de Facebook
    const openFacebook = () => {
        const url = "https://www.facebook.com/insolinetsjr";
        Linking.openURL(url);
    };

    // Renderiza el contenido del Drawer lateral
    const renderDrawerContent = () => (
        <View style={styles.drawerContent}>
            {/* Logo de la empresa */}
            <Image
                source={require("../assets/logo.png")}
                style={{ width: 100, height: 50, alignSelf: "center" }}
                resizeMode="contain"
            />
            {/* Mostrar nombre del usuario si está disponible */}
            {user?.nombre && (
                <Text style={styles.userName}>
                    Hola {user.nombre.split("-")[1]}!
                </Text>
            )}
            {/* Título del menú */}
            <Text style={styles.drawerTitle}>Menú</Text>
            {/* Opciones de navegación */}
            <View style={{ flexDirection: "col", marginBottom: 16 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Home");
                        drawerRef.current.closeDrawer();
                    }}
                >
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>
                        Inicio
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Profile");
                        drawerRef.current.closeDrawer();
                    }}
                >
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>
                        Perfil
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Payment");
                        drawerRef.current.closeDrawer();
                    }}
                >
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>
                        Facturación
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Botones de redes sociales */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.iconButton, styles.whatsapp]}
                    onPress={openWhatsApp}
                >
                    <MaterialCommunityIcons name="whatsapp" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconButton, styles.facebook]}
                    onPress={openFacebook}
                >
                    <MaterialCommunityIcons name="facebook" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            {/* Botón para cerrar sesión */}
            <Button title="Cerrar Sesión" onPress={logout} />
            {/* Versión de la app */}
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Versión 1.0.4</Text>
            </View>
        </View>
    );

    // Render principal: Header + Drawer + children
    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={250}
            drawerPosition="left"
            renderNavigationView={renderDrawerContent}
        >
            {/* Header superior con botón de menú y logo */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => drawerRef.current.openDrawer()}
                >
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            {/* Renderiza los hijos (pantalla actual) */}
            {children}
        </DrawerLayoutAndroid>
    );
}

// Estilos para el componente DrawerMenu
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    menuIcon: {
        fontSize: 24,
        color: "#333",
    },
    logo: {
        width: 100,
        height: 40,
    },
    drawerContent: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    drawerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#1877F3",
        alignSelf: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginBottom: 16,
    },
    iconButton: {
        padding: 12,
        borderRadius: 50,
        alignItems: "center",
        marginHorizontal: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    whatsapp: {
        backgroundColor: "#25D366",
    },
    facebook: {
        backgroundColor: "#1877F3",
    },
    versionContainer: {
        position: "absolute",
        bottom: 16,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    versionText: {
        color: "#888",
        fontSize: 14,
    },
});
