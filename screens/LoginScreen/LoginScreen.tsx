import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "./Login.component.style";

const LoginScreen = (): JSX.Element => {
  const [name, setName] = useState<string>("");
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
  });

  const handleSignUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("registered with: ", user.email);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in with: ", user.email);
      // if (auth.currentUser) {
      //   await updateProfile(auth.currentUser, { displayName: name });
      // }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
      <View style={LoginStyle.inputContainer}>
        {/* <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={LoginStyle.input}
        /> */}
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
          onPress={handleSignUp}
          style={[LoginStyle.button, LoginStyle.buttonOutline]}
        >
          <Text style={LoginStyle.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
