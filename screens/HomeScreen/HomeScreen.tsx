import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import { addTask } from "../../firebase/database";
import TasksList from "./TasksList";
import CalendarSinglePlant from "../SinglePlantScreen/components/Calendar";

export default function HomeScreen({
  currentUserEmail,
}: any): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.welcome}>Welcome, Peter!</Text>
      <Text style={homeStyles.subheading}>subheading message</Text>
      <Image style={homeStyles.image} source={require('../../assets/mudpatch.png')}></Image>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {currentUserEmail}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
        <Text>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
