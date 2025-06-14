import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerMenu from '../components/DrawerMenu';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

// Stack principal para usuarios autenticados, envuelto en DrawerMenu
export default function MainStack() {
  return (
    // DrawerMenu provee el menú lateral a todas las pantallas del stack
    <DrawerMenu>
      <Stack.Navigator>
        {/* Pantalla de perfil */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de inicio */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de facturación */}
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </DrawerMenu>
  );
}