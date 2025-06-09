import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function HomeScreen() {
    const { user, setUser } = useAuth();

    const openWhatsApp = (message) => {
        const phoneNumber = "+524271140263";
        let url = `https://wa.me/${phoneNumber}`;
        if (message)
            url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
            )}`;
        console.log("Abriendo WhatsApp con URL:", url);
        Linking.openURL(url);
    };

    const openFacebook = () => {
        const url = "https://www.facebook.com/insolinetsjr";
        Linking.openURL(url);
    };

    useEffect(() => {
        (async () => {
            const checkAuth = await getDoc(doc(db, "users/default"));
            if (checkAuth?.exists()) {
                const stateData = checkAuth.data();
                if (!stateData?.active) {
                    setUser(null);
                } 
            }
        })();
    }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.name}>Hola {user?.nombre?.split("-")[1]}!</Text>
            <Text style={styles.title}>Paquetes de internet</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={() =>
                        openWhatsApp(
                            "Hola, me gustaría más información sobre el paquete básico de Fibra Óptica."
                        )
                    }
                >
                    <Image
                        source={require("../assets/packages/basic_package.jpeg")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        openWhatsApp(
                            "Hola, me gustaría más información sobre el paquete escolar de Fibra Óptica."
                        )
                    }
                >
                    <Image
                        source={require("../assets/packages/school_package.jpeg")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        openWhatsApp(
                            "Hola, me gustaría más información sobre el paquete profesional de Fibra Óptica."
                        )
                    }
                >
                    <Image
                        source={require("../assets/packages/pro_package.jpeg")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        openWhatsApp(
                            "Hola, me gustaría más información sobre el paquete básico de Antena."
                        )
                    }
                >
                    <Image
                        source={require("../assets/packages/basic_package_antena.jpeg")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        openWhatsApp(
                            "Hola, me gustaría más información sobre el paquete escolar de Antena."
                        )
                    }
                >
                    <Image
                        source={require("../assets/packages/school_package_antena.jpeg")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        openWhatsApp(
                            "Hola, me gustaría más información sobre el paquete profesional de Antena."
                        )
                    }
                >
                    <Image
                        source={require("../assets/packages/pro_package_antena.jpeg")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.iconButton, styles.whatsapp]}
                    onPress={openWhatsApp}
                >
                    <MaterialCommunityIcons
                        name="whatsapp"
                        size={32}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconButton, styles.facebook]}
                    onPress={openFacebook}
                >
                    <MaterialCommunityIcons
                        name="facebook"
                        size={32}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    imageContainer: {
        flexDirection: "column",
        gap: 16,
    },
    image: {
        width: "100%",
        height: 400,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    iconButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: "center",
        marginHorizontal: 16,
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
    error: {
        marginTop: 12,
        color: "red",
        textAlign: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
});
