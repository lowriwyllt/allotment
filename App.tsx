import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen/RegisterScreen";
import "react-native-gesture-handler";
import Loggedin from "./screens/LOGGEDIN/Loggedin";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserByEmail } from "./firebase/database";
import { UserType } from "./types/Users.types";
import theme from "./styles/theme.style";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

export default function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>();

  const Stack = createNativeStackNavigator();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("this is the problem");
        getUserByEmail(user.email).then((response) => {
          console.log("this is the problem response");
          if (response) {
            console.log("this is the problem response if statement");
            setCurrentUser(response);
          }
        });
      }
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerStyle: { backgroundColor: theme.skyblue },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              headerStyle: { backgroundColor: theme.cream },
              headerShadowVisible: false,
            }}
          >
            {(props) => (
              <RegisterScreen {...props} setCurrentUser={setCurrentUser} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="home"
            options={{ headerShown: false, headerShadowVisible: false }}
          >
            {(props) => (
              <Loggedin
                {...props}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
