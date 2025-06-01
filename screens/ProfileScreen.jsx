import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No hay información de usuario</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{user.nombre?.split("-")[1]} {user.apellidos}</Text>
      <Text style={styles.subheader}>{user.nombre?.split("-")[0]}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Personales</Text>
        <ProfileItem label="Nombre" value={user.nombre} />
        <ProfileItem label="Apellidos" value={user.apellidos} />
        <ProfileItem label="Tipo de Persona" value={user.tipo_persona} />
        <ProfileItem label="Usuario" value={user.usuario} />
        <ProfileItem label="Teléfono" value={user.telefono} />
        <ProfileItem label="Ciudad" value={user.ciudad} />
        <ProfileItem label="Localidad" value={user.localidad} />
        <ProfileItem label="Dirección" value={user.direccion} />
        <ProfileItem label="Saldo" value={`$${user.saldo}`} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facturación</Text>
        <ProfileItem label="RFC" value={user.rfc} />
        <ProfileItem label="Descuento" value={user.descuento} />
        <ProfileItem label="Retenciones" value={user.retenciones} />
        <ProfileItem label="Recargo por Mora" value={user.recargo_mora} />
        <ProfileItem label="Generar Factura Electrónica" value={user.generar_factura_electronica === "True" ? "Sí" : "No"} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <ProfileItem label="SMS" value={user.notificacion_sms ? "Activado" : "Desactivado"} />
        <ProfileItem label="Push" value={user.notificaciones_push ? "Activado" : "Desactivado"} />
        <ProfileItem label="Aviso en Pantalla" value={user.aviso_pantalla ? "Sí" : "No"} />
      </View>
      <View style={[styles.section, { marginBottom: 24 }]}>
        <Text style={styles.sectionTitle}>Otros</Text>
        <ProfileItem label="Aplicar Mora" value={user.aplicar_mora === "True" ? "Sí" : "No"} />
        <ProfileItem label="Aplicar Reconexión" value={user.aplicar_reconexion === "True" ? "Sí" : "No"} />
        <ProfileItem label="ID Servicio" value={user.id_servicio} />
      </View>
    </ScrollView>
  );
};

const ProfileItem = ({ label, value }) => (
  <View style={styles.itemRow}>
    <Text style={styles.itemLabel}>{label}:</Text>
    <Text style={styles.itemValue}>{value || "-"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#555',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1976d2',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemLabel: {
    fontWeight: '500',
    color: '#555',
  },
  itemValue: {
    color: '#222',
    maxWidth: '60%',
    textAlign: 'right',
  },
});

export default ProfileScreen;
