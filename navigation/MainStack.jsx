import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerMenu from '../components/DrawerMenu';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <DrawerMenu>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </DrawerMenu>
  );
}