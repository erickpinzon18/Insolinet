import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerMenu from '../components/DrawerMenu';

const Stack = createNativeStackNavigator();

function withDrawer(Component) {
  return (props) => (
    <DrawerMenu>
      <Component {...props} />
    </DrawerMenu>
  );
}

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={withDrawer(ProfileScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={withDrawer(HomeScreen)}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}