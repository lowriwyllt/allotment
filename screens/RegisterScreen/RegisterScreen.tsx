import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "../LoginScreen/Login.component.style";
import { getAvatars } from "../../firebase/database";
import theme from "../../styles/theme.style";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const RegisterScreen = ({ setCurrentUser }: any): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [allotment, setAllotment] = useState<Array<Object>>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://img.freepik.com/premium-vector/little-plant-soil-pixel-art-style_475147-1002.jpg"
  );
  const [avatarsArr, setAvatarsArr] = useState<string[] | undefined>([]);
  const [emailLowerCase, setEmailLowerCase] = useState<string>("");

  const navigation = useNavigation<any>();

  const db = getFirestore(app);

  useEffect(() => {
    getAvatars().then((res) => {
      setAvatarsArr(res);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const { user }: { user: User } = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );

      const usersRef = collection(db, "users"); // collectionRef
      const userRef = doc(usersRef); // docRef
      const id = userRef.id; // a docRef has an id property
      const userData = {
        id,
        name: name,
        email: emailLowerCase,
        avatarUrl: avatarUrl,
        allotment: allotment,
      };
      await setDoc(userRef, userData);

      navigation.replace("home");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    handleSignUp();
  };

  return (
    <KeyboardAvoidingView
      style={LoginStyle.registerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text
        style={{
          color: theme.darkgreen,
          paddingBottom: 0,
          paddingTop: 0,
          fontSize: 15,
        }}
      >
        Choose an avatar:
      </Text>
      <View style={LoginStyle.avatarsContainer}>
        {avatarsArr?.map((avatar) => {
          return (
            <TouchableOpacity
              key={avatar}
              onPress={() => {
                setAvatarUrl(avatar);
              }}
            >
              <Image
                style={
                  avatarUrl === avatar
                    ? LoginStyle.avatarsActive
                    : LoginStyle.avatars
                }
                key={avatar}
                source={{ uri: avatar }}
              ></Image>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={LoginStyle.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={LoginStyle.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailLowerCase(text.toLowerCase());
          }}
          style={LoginStyle.input}
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
        <TouchableOpacity onPress={handleRegister} style={LoginStyle.button}>
          <Text style={LoginStyle.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
