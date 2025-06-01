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
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function DrawerMenu({ children }) {
    const drawerRef = useRef(null);
    const { logout, user } = useAuth();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused && drawerRef.current) {
            drawerRef.current.closeDrawer();
        }
    }, [isFocused]);

    const openWhatsApp = () => {
        const phoneNumber = "4271140263";
        const url = `https://wa.me/${phoneNumber}`;
        Linking.openURL(url);
    };

    const openFacebook = () => {
        const url = "https://www.facebook.com/insolinetsjr";
        Linking.openURL(url);
    };

    const renderDrawerContent = () => (
        <View style={styles.drawerContent}>
            <Image
                source={require("../assets/logo.png")}
                style={{ width: 100, height: 50, alignSelf: "center" }}
                resizeMode="contain"
            />
            {/* Mostrar nombre del usuario */}
            {user?.nombre && (
                <Text style={styles.userName}>
                    Hola {user.nombre.split("-")[1]}!
                </Text>
            )}
            <Text style={styles.drawerTitle}>Menú</Text>
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
            </View>
            {/* Botones de contacto */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.iconButton, styles.whatsapp]}
                    onPress={openWhatsApp}
                >
                    <Icon name="whatsapp" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconButton, styles.facebook]}
                    onPress={openFacebook}
                >
                    <Icon name="facebook" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            <Button title="Cerrar Sesión" onPress={logout} />
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={250}
            drawerPosition="left"
            renderNavigationView={renderDrawerContent}
        >
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
            {children}
        </DrawerLayoutAndroid>
    );
}

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
});
