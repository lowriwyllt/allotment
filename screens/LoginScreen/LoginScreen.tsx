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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "./Login.component.style";
import { createUser, getAvatars } from "../../firebase/database";
import theme from "../../styles/theme.style";

const LoginScreen = (): JSX.Element => {
  // const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [avatarUrl, setAvatarUrl] = useState<string>(
  //   "https://img.freepik.com/premium-vector/little-plant-soil-pixel-art-style_475147-1002.jpg"
  // );
  // const [avatarsArr, setAvatarsArr] = useState<string[] | undefined>([]);

  const navigation = useNavigation<any>();

  // useEffect(() => {
  //   getAvatars().then((res) => {
  //     setAvatarsArr(res);
  //   });
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("home");
      }
    });
    return unsubscribe;
  }, []);

  // const handleSignUp = async () => {
  //   try {
  //     const { user }: { user: User } = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     await updateProfile(user, { displayName: name });
  //     await createUser({ name, email, avatarUrl });
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // };

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
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
      {/* <Text style={{ color: theme.feature, paddingBottom: 10 }}>
        Choose an avatar:
      </Text> */}
      {/* <View style={LoginStyle.avatarsContainer}>
        {avatarsArr?.map((avatar) => {
          return (
            <Pressable
              onPress={() => {
                setAvatarUrl(avatar);
                console.log(avatar);
              }}
            >
              <Image
                style={LoginStyle.avatars}
                key={avatar}
                source={{ uri: avatar }}
              ></Image>
            </Pressable>
          );
        })}
      </View> */}
      <View style={LoginStyle.inputContainer}>
        {/* <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={LoginStyle.input}
        /> */}
        {/* <TextInput
          placeholder="Avatar URL"
          value={avatarUrl}
          onChangeText={(text) => setAvatarUrl(text)}
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
