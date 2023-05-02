import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login");
      })
      .catch((err) => alert(err.message));
  };

  const handlePlants = () => {
    navigation.navigate("plants");
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
    </View>
  );
};

export default HomeScreen;
