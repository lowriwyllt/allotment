import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { homeStyles } from "../HomeScreen/Home.component.style";
import { useEffect, useState } from "react";
import { getUserByEmail } from "../../firebase/database";
import LoginStyle from "../LoginScreen/Login.component.style";
import { doc, updateDoc } from "firebase/firestore";
import { patchUser } from "../../firebase/database";

export default function EditProfileScreen({ currentUser }: any): JSX.Element {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserByEmail(currentUser).then((response) => {
      setEmail(response.email);
      setName(response.name);
      setAvatarUrl(response.avatarUrl);
    });
  }, []);

  const handleChange = (event) => {
    setName(event);
  };

  const handleSubmit = (name) => {
    patchUser(email, name);
  };

  console.log(email);
  console.log(name);
  console.log(avatarUrl);
  return (
    <View style={homeStyles.container}>
      <TextInput
        placeholder={name}
        onChangeText={(newText) => setName(newText)}
        value={name}
      />
      <Text style={homeStyles.homeHeader}>{name}</Text>
      <TouchableOpacity onPress={() => handleSubmit({ name })}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {/* <TextInput
        placeholder={email}
        onChangeText={(newText) => setEmail(newText)}
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
  );
}
