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
import EditProfileStyles from "./EditProfile.component.style";
import { useNavigation } from "@react-navigation/native";
import { patchUser, getAvatars } from "../../firebase/database";
import { getAuth, updateEmail, sendPasswordResetEmail } from "firebase/auth";

export default function EditProfileScreen({
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

  const handleSubmit = (name: string | undefined, email: string, avatarUrl: string) => {
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
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
        <View style={LoginStyle.avatarsContainer}>
          <Image
            style={LoginStyle.avatars}
            key={avatarUrl}
            source={{ uri: `${avatarUrl}` }}
          ></Image>
          <TouchableOpacity onPress={changeAvatar}></TouchableOpacity>
        </View>
        <View style={EditProfileStyles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={EditProfileStyles.centeredView}>
              <View style={EditProfileStyles.modalView}>
                <View>
                  {avatarsArr?.map((avatar) => {
                    return (
                      <Pressable
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
                <Pressable
                  style={[
                    EditProfileStyles.button,
                    EditProfileStyles.buttonClose,
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={EditProfileStyles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[EditProfileStyles.button, EditProfileStyles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={EditProfileStyles.textStyle}>Change Avatar</Text>
          </Pressable>
        </View>
        <View style={homeStyles.container}>
          <TextInput
            placeholder={name || ""}
            onChangeText={(newText) => setName(newText)}
            value={name || ""}
          />

          <TextInput
            placeholder={email || ""}
            onChangeText={(newText) => setEmail(newText)}
            value={email || ""}
          />
          <TouchableOpacity
            onPress={() => {
              sendPasswordResetEmail(auth, email || "")
                .then(() => {
                  // Password reset email sent!
                  Alert.alert(
                    "Password Reset",
                    `An email has been sent to ${email} containing password reset instructions`,
                    [{ text: "OK", onPress: () => console.log("ok pressed") }]
                  );
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);
                });
            }}
          >
            <Text>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSubmit(name, email || "", avatarUrl || "")}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
