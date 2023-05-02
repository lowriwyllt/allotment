import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";

export default function  HomeScreen({currentUser, setCurrentUser}: any): JSX.Element {

  const navigation = useNavigation<any>();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login");
        setCurrentUser('');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={homeStyles.button}>
        <Text style={homeStyles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};