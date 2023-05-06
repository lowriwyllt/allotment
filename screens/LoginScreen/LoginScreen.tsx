import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "./Login.component.style";

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<any>();

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
    // <ScrollView>
    <>
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
      <Image
        source={require("../../crops/farm.png")}
        style={LoginStyle.background}
      />
      {/* <Text style={LoginStyle.header}>allotment</Text> */}
      <Image source={require('../../crops/allotment.png')} style={LoginStyle.allotmentimg}/>
      {/* <Text style={LoginStyle.subheading}>Start your journey today [insert message here] by logging in or registering...</Text> */}
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
            secureTextEntry //changes what you type into dots
          />
        </View>

        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={LoginStyle.button}>
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={{fontSize:12, fontWeight: "bold", color: "#fff", paddingTop:5, paddingBottom: 0}}>OR</Text>
          <TouchableOpacity
            onPress={handleRegister}
            style={[LoginStyle.button, LoginStyle.buttonOutline]}
          >
            <Text style={LoginStyle.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
    // </ScrollView>
  );
}
function useFonts(arg0: { munro: any; }): [any] {
  throw new Error("Function not implemented.");
}

