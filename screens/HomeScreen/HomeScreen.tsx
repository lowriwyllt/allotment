import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import CalendarSinglePlant from "../Calendar";
import { addTask } from "../../firebase/database";
import TasksList from "./TasksList";

export default function HomeScreen({
  currentUser,
  currentUserEmail,
  tasks,
  setTasks,
}: any): JSX.Element {
  const navigation = useNavigation<any>();

  const handleAddTask = (currentUser: any) => {
    console.log(currentUser);
    addTask(currentUser);
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {currentUserEmail}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
        <Text>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddTask}>
        <Text>Add task</Text>
      </TouchableOpacity>
      <TasksList currentUser={currentUser} tasks={tasks} setTasks={setTasks} />
    </View>
  );
}
