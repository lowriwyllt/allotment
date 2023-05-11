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
  TouchableHighlight,
} from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EditProfileStyles from "./EditAccount.component.style";
import { useNavigation } from "@react-navigation/native";
import { patchUser, getAvatars } from "../../firebase/database";
import { getAuth, updateEmail, sendPasswordResetEmail } from "firebase/auth";
import { UserType } from "../../types/Users.types";
import theme from "../../styles/theme.style";

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

  const [modalVisible, setModalVisible] = useState<boolean>(false);
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
    email: string | null | undefined,
    avatarUrl: string | undefined
  ) => {
    const user: any = auth.currentUser;

    if (email === currentUser?.email) {
      patchUser(currentUser?.id, name, email, avatarUrl).then(() => {
        setCurrentUser((nowUser) => {
          return { ...nowUser, email, name, avatarUrl } as UserType;
        });
      });
      navigation.navigate("Account");
    } else {
      updateEmail(user, email as string).catch((err) => {
        console.log(err);
      });
      patchUser(currentUser?.id, name, email, avatarUrl).then(() => {
        setCurrentUser((nowUser) => {
          return { ...nowUser, email, name, avatarUrl } as UserType;
        });
      });
      auth
        .signOut()
        .then(() => {
          navigation.replace("login");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.lightcream }}>
      <View style={EditProfileStyles.centeredView}>
        <KeyboardAvoidingView
          style={EditProfileStyles.containerAll}
          behavior="padding"
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={EditProfileStyles.modalView}>
              <View style={EditProfileStyles.avatarsContainer}>
                {avatarsArr?.map((avatar) => {
                  return (
                    <TouchableOpacity
                      key={avatar}
                      onPress={() => {
                        setNewAvatarUrl(avatar);
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Image
                        style={
                          newAvatarUrl === avatar
                            ? EditProfileStyles.avatarsActive
                            : EditProfileStyles.avatars
                        }
                        source={{ uri: avatar }}
                      ></Image>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Pressable
                style={EditProfileStyles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={EditProfileStyles.textStyle}>x</Text>
              </Pressable>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={EditProfileStyles.avatars}
              key={newAvatarUrl}
              source={{ uri: `${newAvatarUrl}` }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={[
                EditProfileStyles.textButton,
                EditProfileStyles.margin10,
                { color: theme.green },
              ]}
            >
              Change Avatar
            </Text>
          </TouchableOpacity>

          <View style={EditProfileStyles.details}>
            <Text>Name</Text>
            <TextInput
              style={EditProfileStyles.profileDetail}
              placeholder={newName || ""}
              onChangeText={(newText) => setNewName(newText)}
              value={newName || ""}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              handleSubmit(newName, currentUser?.email, newAvatarUrl || "")
            }
          >
            <Text
              style={[
                EditProfileStyles.textButton,
                EditProfileStyles.spacedMargin,
              ]}
            >
              Submit my profile changes
            </Text>
          </TouchableOpacity>

          <View style={EditProfileStyles.details}>
            <Text>Email</Text>
            <TextInput
              style={EditProfileStyles.profileDetail}
              placeholder={newEmail || ""}
              onChangeText={(newText) => setNewEmail(newText)}
              value={newEmail || ""}
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              handleSubmit(
                currentUser?.name,
                newEmail || "",
                currentUser?.avatarUrl
              )
            }
          >
            <Text
              style={[
                EditProfileStyles.textButton,
                EditProfileStyles.spacedMargin,
              ]}
            >
              Submit my email changes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sendPasswordResetEmail(auth, newEmail || "")
                .then(() => {
                  Alert.alert(
                    "Password Reset",
                    `An email has been sent to ${newEmail} containing password reset instructions`,
                    [{ text: "OK", onPress: () => console.log("ok pressed") }]
                  );
                })
                .catch((error) => {
                  console.log(error.code + ": " + error.message);
                });
            }}
          >
            <Text
              style={[
                EditProfileStyles.textButton,
                EditProfileStyles.spacedMargin,
              ]}
            >
              Reset Password
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}
