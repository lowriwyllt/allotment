import {
  KeyboardAvoidingView,
  Text,
  ScrollView,
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
import LoginStyle from "../LoginScreen/Login.component.style";
import { createUser, getAvatars } from "../../firebase/database";
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
      }; // insert the id among the data
      await setDoc(userRef, userData); // create the document

      // setEmail(email.toLowerCase());
      // try {
      //   const { user }: { user: User } = await createUserWithEmailAndPassword(
      //     auth,
      //     email.toLowerCase(),
      //     password
      //   );

      //   const docRef = await addDoc(collection(db, "users"), {
      //     name: name,
      //     email: emailLowerCase,
      //     avatarUrl: avatarUrl,
      //     allotment: allotment
      //   });

      //   await updateProfile(user, { displayName: name });
      //   await createUser(docRef);
      //   setCurrentUser(docRef.id);

      navigation.replace("home");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    handleSignUp();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
        <Text style={{ color: theme.feature, paddingBottom: 10 }}>
          Choose an avatar:
        </Text>
        <View style={LoginStyle.avatarsContainer}>
          {avatarsArr?.map((avatar) => {
            return (
              <Pressable key={avatar}
                onPress={() => {
                  setAvatarUrl(avatar);
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
            secureTextEntry //changes what you type into dots
          />
        </View>

        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity onPress={handleRegister} style={LoginStyle.button}>
            <Text style={LoginStyle.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
