import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PaymentScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Formas de Pago</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transferencia Bancaria</Text>
        <PaymentItem label="Banco" value="BANCO" />
        <PaymentItem label="Nombre del Beneficiario" value="INSOLINET S. DE R.L. DE C.V." />
        <PaymentItem label="Cuenta" value="0112345678" />
        <PaymentItem label="CLABE" value="012345678901234567" />
        <PaymentItem label="Referencia" value="Tu número de cliente o nombre" />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Por favor, envía tu comprobante de pago al WhatsApp de soporte para agilizar la activación de tu servicio.
        </Text>
      </View>
    </ScrollView>
  );
}

const PaymentItem = ({ label, value }) => (
  <View style={styles.itemRow}>
    <Text style={styles.itemLabel}>{label}:</Text>
    <Text style={styles.itemValue}>{value}</Text>
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
  },
  itemLabel: {
    fontWeight: "500",
    color: "#555",
  },
  itemValue: {
    color: "#222",
    maxWidth: "60%",
    textAlign: "right",
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
});
