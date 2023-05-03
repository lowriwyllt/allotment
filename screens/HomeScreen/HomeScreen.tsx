import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import CalendarSinglePlant from "../Calendar";

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

  const handlePlants = () => {
    navigation.navigate("plants");
  };  

  const handleEditProfile = () => {
    navigation.navigate("edit-profile");
  }; 
  
  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={homeStyles.button}>
        <Text style={homeStyles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={handlePlants}>
        <Text>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEditProfile}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};