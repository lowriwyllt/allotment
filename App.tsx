import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { RegisterScreen } from "./screens/RegisterScreen/RegisterScreen";
import AllPlantsScreen from "./screens/AllPlantsScreen/AllPlantsScreen";
import SinglePlantScreen from "./screens/SinglePlantScreen/SinglePlantScreen";
import "react-native-gesture-handler";
import { NavDrawer } from "./screens/NavDrawer";
import Loggedin from "./screens/LOGGEDIN/Loggedin";

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {false ? null : (
            <Stack.Screen
              name="LoggedIn"
              component={Loggedin}
              options={{ headerShown: false }}
            />
          )}

          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          {/* <Stack.Screen name="home" component={HomeScreen} /> */}
          {/* <Stack.Screen name="plants" component={AllPlantsScreen} /> */}
          <Stack.Screen name="plant" component={SinglePlantScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
