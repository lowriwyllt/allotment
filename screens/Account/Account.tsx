import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { homeStyles } from "../HomeScreen/Home.component.style";
import { useEffect, useState } from "react";
import { getUserById } from "../../firebase/database";
import LoginStyle from "../LoginScreen/Login.component.style";
import EditProfileStyles from "./Account.component.style";
import { useNavigation } from "@react-navigation/native";
import { patchUser, getAvatars } from "../../firebase/database";
import { getAuth, updateEmail, sendPasswordResetEmail } from "firebase/auth";

export default function Account({
  currentUser,
  setCurrentUserEmail,
}: any): JSX.Element {
  console.log(currentUser);

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | null | undefined>("");
  const [oldEmail, setOldEmail] = useState<string | null | undefined>("");
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [avatarsArr, setAvatarsArr] = useState<string[] | undefined>([]);

  const navigation = useNavigation<any>();
  const auth = getAuth();

  useEffect(() => {
    console.log("currentUser *** ", currentUser);
    getUserById(currentUser)
      .then((response) => {
        setEmail(response?.email);
        setName(response?.name);
        setOldEmail(response?.email);
        setAvatarUrl(response?.avatarUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAvatars().then((res) => {
      setAvatarsArr(res);
    });
  }, []);

  const handleSubmit = (
    name: string | undefined,
    email: string,
    avatarUrl: string
  ) => {
    const user: any = auth.currentUser;

    updateEmail(user, email).catch((err) => {
      console.log(err);
    });

    patchUser(currentUser, name, email, avatarUrl);
    setCurrentUserEmail(email);
    navigation.replace("home");
  };

  const changeAvatar = () => {};

  return (
    <ScrollView>
      <View style={LoginStyle.avatarsContainer}>
        <Image
          style={LoginStyle.avatars}
          key={avatarUrl}
          source={{ uri: `${avatarUrl}` }}
        ></Image>
      </View>
      <View style={homeStyles.container}>
        <Text>{name}</Text>
        <Text>{email}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("editAccount")}>
          <Text>Edit account details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
