import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Modal, Pressable, Alert } from "react-native";
import { homeStyles } from "../HomeScreen/Home.component.style";
import { useEffect, useState } from "react";
import { getUserById } from "../../firebase/database";
import LoginStyle from "../LoginScreen/Login.component.style";
import EditProfileStyles from './EditProfile.component.style';
import { useNavigation } from "@react-navigation/native";
import { patchUser, getAvatars } from "../../firebase/database";
import { getAuth, updateEmail, sendPasswordResetEmail } from "firebase/auth";




export default function EditProfileScreen({ currentUser }: any): JSX.Element {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarsArr, setAvatarsArr] = useState<string[] | undefined>([]);

  const auth = getAuth();
  const navigation = useNavigation<any>();

useEffect(() => {
  console.log(currentUser);
  getUserById(currentUser)
  .then((response) => {
    setEmail(response.email);
    setName(response.name);
    setOldEmail(response.email);
    setAvatarUrl(response.avatarUrl)
  }).catch(err => {
    console.log(err);
  })
}, [])
  
  useEffect(() => {
    getAvatars().then((res) => {
      setAvatarsArr(res);
    });
  }, []);

  // const handleChange = (event) => {
  //   setName(event);
  // };

  const handleSubmit = (name: string, email: string, avatarUrl: string) => {
    patchUser(currentUser, name, email, avatarUrl);
    updateEmail(auth.currentUser, `${email}`).then(() => {
      // Email updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    navigation.replace("home");
  };

    

  const changeAvatar = () => {

  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
    <View style={LoginStyle.avatarsContainer}>
           <Image
                  style={LoginStyle.avatars}
                  key={avatarUrl}
                  source={{ uri: `${avatarUrl}` }}
                  ></Image>
                  <TouchableOpacity
      onPress={changeAvatar}
      >
      
    </TouchableOpacity> 
    </View>
    <View style={EditProfileStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
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
              style={[EditProfileStyles.button, EditProfileStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={EditProfileStyles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[EditProfileStyles.button, EditProfileStyles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={EditProfileStyles.textStyle}>Change Avatar</Text>
      </Pressable>
    </View>
    <View style={homeStyles.container}>


      <TextInput
        placeholder={name}
        onChangeText={(newText) => setName(newText)}
        value={name}
        />
      <TextInput
        placeholder={email}
        onChangeText={(newText) => setEmail(newText)}
        value={email}
      />
      <TouchableOpacity onPress={() => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          Alert.alert('Password Reset', `An email has been sent to ${email} containing password reset instructions`, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
      
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      
      }}>
        <Text>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSubmit(name, email, avatarUrl)}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {/* <TextInput
        placeholder={email}
        onChangeText={(newText) => setNewEmail(newText)}
        // value={name}
      /> */}
      {/* <Text style={homeStyles.homeHeader}>Profile</Text> */}
      {/* <Text style={homeStyles.homeHeader}>{email}</Text>
      <Image style={LoginStyle.avatars} source={{ uri: avatarUrl }}></Image>
      <TouchableOpacity
      onPress={() => { //open image picker
      }}
      >
      <Text>Change Avatar</Text>
    </TouchableOpacity> */}
    </View>
    </KeyboardAvoidingView>
    </ScrollView>

  );
}
