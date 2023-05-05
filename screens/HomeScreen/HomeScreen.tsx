import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import UserType from "../../types/Users.types";

export default function HomeScreen({
  currentUser,
}: {
  currentUser: UserType | undefined;
}): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Welcome {currentUser?.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
        <Text>Plants</Text>
      </TouchableOpacity>
    </View>
  );
}
