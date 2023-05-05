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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoginStyle from "../LoginScreen/Login.component.style";
import EditProfileStyles from "./EditAccount.component.style";
import { useNavigation } from "@react-navigation/native";
import { patchUser, getAvatars } from "../../firebase/database";
import { getAuth, updateEmail, sendPasswordResetEmail } from "firebase/auth";
import UserType from "../../types/Users.types";

export default function EditAccount({
  currentUser,
  setCurrentUser,
}: {
  currentUser: UserType | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserType | undefined>>;
}): JSX.Element {
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | undefined>(
    currentUser?.avatarUrl
  );
  const [newName, setNewName] = useState<string | undefined>(currentUser?.name);
  const [newEmail, setNewEmail] = useState<string | null | undefined>(
    currentUser?.email
  );
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [avatarsArr, setAvatarsArr] = useState<string[] | undefined>([]);

  const navigation = useNavigation<any>();
  const auth = getAuth();

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

    patchUser(currentUser?.id, name, email, avatarUrl).then(() => {
      setCurrentUser((nowUser) => {
        return { ...nowUser, email, name, avatarUrl } as UserType;
      });
    });

    navigation.navigate("Account");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
        <View style={LoginStyle.avatarsContainer}>
          <Image
            style={LoginStyle.avatars}
            key={newAvatarUrl}
            source={{ uri: `${newAvatarUrl}` }}
          ></Image>
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
                        key={avatar}
                        onPress={() => {
                          setNewAvatarUrl(avatar);
                        }}
                      >
                        <Image
                          style={LoginStyle.avatars}
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
            placeholder={newName || ""}
            onChangeText={(newText) => setNewName(newText)}
            value={newName || ""}
          />

          <TextInput
            placeholder={newEmail || ""}
            onChangeText={(newText) => setNewEmail(newText)}
            value={newEmail || ""}
          />
          <TouchableOpacity
            onPress={() => {
              sendPasswordResetEmail(auth, newEmail || "")
                .then(() => {
                  // Password reset email sent!
                  Alert.alert(
                    "Password Reset",
                    `An email has been sent to ${newEmail} containing password reset instructions`,
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
            onPress={() =>
              handleSubmit(newName, newEmail || "", newAvatarUrl || "")
            }
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
