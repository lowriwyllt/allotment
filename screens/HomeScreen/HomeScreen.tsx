import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";

export default function HomeScreen({ currentUserEmail }: any): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {currentUserEmail}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
        <Text>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
}
