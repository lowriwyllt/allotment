import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "./Login.component.style";
import { DrawerNavigationType } from "../../types/Navigation.types";
import { FirebaseError } from "firebase/app";

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<DrawerNavigationType>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("home", {
          /* params go here */
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    navigation.navigate("register");
  };

  return (
    <>
      <KeyboardAvoidingView
        style={LoginStyle.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../../crops/farm.png")}
          style={LoginStyle.background}
        />
        <Image
          source={require("../../crops/allotment.png")}
          style={LoginStyle.allotmentimg}
        />
        <View style={LoginStyle.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            style={LoginStyle.input}
            autoCapitalize="none"
            keyboardType={"visible-password"}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={LoginStyle.input}
            secureTextEntry
          />
        </View>

        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={LoginStyle.button}>
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#fff",
              paddingTop: 5,
              paddingBottom: 0,
            }}
          >
            OR
          </Text>
          <TouchableOpacity
            onPress={handleRegister}
            style={[LoginStyle.button, LoginStyle.buttonOutline]}
          >
            <Text style={LoginStyle.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
