import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen/RegisterScreen";
import "react-native-gesture-handler";
import Loggedin from "./screens/LOGGEDIN/Loggedin";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserByEmail } from "./firebase/database";

export default function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("");

  const Stack = createNativeStackNavigator();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const userEmail = user.email;

      getUserByEmail(user.email).then((response) => {
        setCurrentUser(response?.id);
        setCurrentUserEmail(response?.email || "");
      });
      // ...
    } else {
      // User is signed out
      // ... ??????
    }
  });


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register">
            {(props) => (
              <RegisterScreen {...props} setCurrentUser={setCurrentUser} />
            )}
          </Stack.Screen>
          <Stack.Screen name="home" options={{ headerShown: false }}>
            {(props) => (
              <Loggedin
                {...props}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                currentUserEmail={currentUserEmail}
                setCurrentUserEmail={setCurrentUserEmail}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
