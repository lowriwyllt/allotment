import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const handlePlants = () => {
    navigation.navigate("Plants");
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handlePlants}>
        <Text>Plants</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
