import React, { useRef } from "react";
import {
    DrawerLayoutAndroid,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function DrawerMenu({ children }) {
    const drawerRef = useRef(null);
    const { logout } = useAuth();

    const renderDrawerContent = () => (
        <View style={styles.drawerContent}>
            <Image
                source={require("../assets/logo.png")}
                style={{ width: 100, height: 50, alignSelf: "center" }}
                resizeMode="contain"
            />
            <Text style={styles.drawerTitle}>Menú</Text>
            <View style={{ flexDirection: "col", marginBottom: 16 }}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>
                        Inicio
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>
                        Perfil
                    </Text>
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
});
