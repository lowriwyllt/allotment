import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { homeStyles } from "../HomeScreen/Home.component.style";
import { useEffect, useState } from "react";
import { getUserById } from "../../firebase/database";
import LoginStyle from "../LoginScreen/Login.component.style";
import { useNavigation } from "@react-navigation/native";
import { patchUser, getAvatars } from "../../firebase/database";
import { getAuth, updateEmail, sendPasswordResetEmail } from "firebase/auth";
import UserType from "../../types/Users.types";

export default function Account({
  currentUser,
}: {
  currentUser: UserType | undefined;
}): JSX.Element {
  console.log(currentUser);

  const navigation = useNavigation<any>();

  return (
    <ScrollView>
      <View style={LoginStyle.avatarsContainer}>
        <Image
          style={LoginStyle.avatars}
          key={currentUser?.avatarUrl}
          source={{ uri: currentUser?.avatarUrl }}
        ></Image>
      </View>
      <View style={homeStyles.container}>
        <Text>Name: {currentUser?.name}</Text>
        <Text>Email: {currentUser?.email}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("editAccount")}>
          <Text>Edit account details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
