import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { View, Text } from "react-native";

// Componente principal de navegación de la app
export default function AppNavigator() {
    // Obtener usuario y estado de carga desde el contexto de autenticación
    const { user, loading } = useContext(AuthContext);

    // Mostrar pantalla de carga mientras loading es true
    if (loading)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Cargando...</Text>
            </View>
        );

    // Si hay usuario autenticado, mostrar MainStack; si no, AuthStack
    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}