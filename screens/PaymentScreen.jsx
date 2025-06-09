import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";

export default function PaymentScreen() {
    const [tab, setTab] = useState("banco");

    const handleCopy = (value, label) => {
        Clipboard.setStringAsync(value);
        ToastAndroid.show(`${label} copiado`, ToastAndroid.SHORT);
    };

    const openWhatsApp = () => {
        const phoneNumber = "+524271140263";
        const url = `https://wa.me/${phoneNumber}`;
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Formas de Pago</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, tab === "banco" && styles.tabActive]}
                    onPress={() => setTab("banco")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            tab === "banco" && styles.tabTextActive,
                        ]}
                    >
                        Transferencia/Depósito
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, tab === "oxxo" && styles.tabActive]}
                    onPress={() => setTab("oxxo")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            tab === "oxxo" && styles.tabTextActive,
                        ]}
                    >
                        OXXO
                    </Text>
                </TouchableOpacity>
            </View>
            {tab === "banco" && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Transferencia Bancaria y Depósitos
                    </Text>
                    <PaymentItem label="Banco" value="BBVA Bancomer" />
                    <PaymentItem
                        label="Nombre del Beneficiario"
                        value="INSOLINET SA DE CV"
                        copyable
                        onCopy={() =>
                            handleCopy("INSOLINET SA DE CV", "Nombre")
                        }
                    />
                    <PaymentItem
                        label="Número de Cuenta"
                        value="0120411418"
                        copyable
                        onCopy={() =>
                            handleCopy("0120411418", "Número de Cuenta")
                        }
                    />
                    <PaymentItem
                        label="CLABE"
                        value="012685001204114188"
                        copyable
                        onCopy={() => handleCopy("012685001204114188", "CLABE")}
                    />
                    <PaymentItem
                        label="Número de Tarjeta"
                        value="4555 1130 1158 5470"
                        copyable
                        onCopy={() =>
                            handleCopy(
                                "4555 1130 1158 5470",
                                "Número de Tarjeta"
                            )
                        }
                    />
                </View>
            )}
            {tab === "oxxo" && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pagos en OXXO</Text>
                    <PaymentItem label="Cuenta" value="4217 4700 4187 3320" />
                    <Text style={styles.oxxoNote}>
                        Aproximadamente cobran $10.00 pesos de comisión.
                    </Text>
                </View>
            )}
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    Por favor, envía tu comprobante de pago al WhatsApp de
                    soporte para agilizar la activación de tu servicio.
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.iconButton, styles.whatsapp]}
                onPress={openWhatsApp}
            >
                <MaterialCommunityIcons
                    name="whatsapp"
                    size={28}
                    color="#fff"
                />
            </TouchableOpacity>
        </ScrollView>
    );
}

const PaymentItem = ({ label, value, copyable, onCopy }) => (
    <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>{label}:</Text>
        <View style={styles.itemValueRow}>
            <Text style={styles.itemValue}>{value}</Text>
            {copyable && (
                <TouchableOpacity onPress={onCopy} style={styles.copyIcon}>
                    <MaterialCommunityIcons
                        name="content-copy"
                        size={20}
                        color="#1976d2"
                    />
                </TouchableOpacity>
            )}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        padding: 16,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 18,
        color: "#333",
        textAlign: "center",
    },
    tabContainer: {
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: "#e3f2fd",
        borderRadius: 8,
        overflow: "hidden",
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "#e3f2fd",
    },
    tabActive: {
        backgroundColor: "#1976d2",
    },
    tabText: {
        color: "#1976d2",
        fontWeight: "600",
        fontSize: 16,
    },
    tabTextActive: {
        color: "#fff",
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginBottom: 18,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#1976d2",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        alignItems: "center",
    },
    itemLabel: {
        fontWeight: "500",
        color: "#555",
        flex: 1,
    },
    itemValueRow: {
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "65%",
        justifyContent: "flex-end",
    },
    itemValue: {
        color: "#222",
        textAlign: "right",
        marginRight: 6,
    },
    copyIcon: {
        padding: 4,
    },
    infoBox: {
        backgroundColor: "#e3f2fd",
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    infoText: {
        color: "#1976d2",
        fontSize: 15,
        textAlign: "center",
    },
    oxxoNote: {
        marginTop: 10,
        color: "#d84315",
        fontSize: 14,
        textAlign: "center",
    },
    iconButton: {
        padding: 12,
        borderRadius: 50,
        alignItems: "center",
        marginHorizontal: 50,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        marginTop: 16,
    },
    whatsapp: {
        backgroundColor: "#25D366",
    },
});
