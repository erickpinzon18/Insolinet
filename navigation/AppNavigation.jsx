import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { View, Text } from "react-native";

export default function AppNavigator() {
    const { user, loading } = useContext(AuthContext);

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

    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}