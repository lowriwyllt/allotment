import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import CalendarSinglePlant from "../Calendar";
import { addTask } from "../../firebase/database";
import TasksList from "./TasksList";

export default function HomeScreen({
  currentUser,
  setCurrentUser,
  currentUserEmail,
}: any): JSX.Element {
  const navigation = useNavigation<any>();

  const handleAddTask = () => {
    console.log(currentUser);
    addTask(currentUser);
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login");
        //setCurrentUser("");
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
      <Text>Email: {currentUserEmail}</Text>
      <TouchableOpacity onPress={handleSignOut} style={homeStyles.button}>
        <Text style={homeStyles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlants}>
        <Text>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEditProfile}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddTask}>
        <Text>Add task</Text>
      </TouchableOpacity>
      <TasksList />
    </View>
  );
}
