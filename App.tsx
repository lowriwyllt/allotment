import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import {RegisterScreen} from "./screens/RegisterScreen/RegisterScreen"
import { SetStateAction, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<string | null>("");
  
  

  const Stack = createNativeStackNavigator();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const userEmail = user.email;
    setCurrentUser(userEmail)
    // ...
  } else {
    // User is signed out
    // ...
  }
});


  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register">
        {(props) => <RegisterScreen {...props} setCurrentUser={setCurrentUser}/>}
        </Stack.Screen>
        <Stack.Screen name="home">
          {(props) => <HomeScreen {...props} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
