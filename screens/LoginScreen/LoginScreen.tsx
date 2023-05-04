import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "./Login.component.style";
import { NavDrawer } from "../NavDrawer/NavDrawer";

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in with: ", user.email);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    navigation.replace("register");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
        <NavDrawer />
        <View style={LoginStyle.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={LoginStyle.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={LoginStyle.input}
            secureTextEntry //changes what you type into dots
          />
        </View>

        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={LoginStyle.button}>
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegister}
            style={[LoginStyle.button, LoginStyle.buttonOutline]}
          >
            <Text style={LoginStyle.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;
