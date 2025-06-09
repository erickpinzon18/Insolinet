import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

// Stack para usuarios no autenticados (solo login)
export default function AuthStack() {
  return (
    <Stack.Navigator>
      {/* Pantalla de login */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}