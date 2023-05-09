import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import CalendarSinglePlant from "../Calendar";
import { addTask } from "../../firebase/database";
import TasksList from "./TasksList";
import { useState } from "react";
import { UserType } from "../../types/Users.types";

export default function HomeScreen({
  currentUser,
  tasks,
  setTasks,
}: {
  currentUser: UserType | undefined;
  tasks: any;
  setTasks: any;
}): JSX.Element {
  const navigation = useNavigation<any>();
  const [task, setTask] = useState({
    img: "",
    body: "elbows",
    date: new Date(),
    complete: false,
  });
  const [taskAdded, setTaskAdded] = useState(false);

  const handleAddTask = () => {
    addTask(currentUser?.id, task); //neeeds a task to be added
    setTaskAdded(!taskAdded);
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.welcome}>Welcome, {currentUser?.name}!</Text>
      <Text style={homeStyles.subheading}>subheading message</Text>
      <Image
        style={homeStyles.image}
        source={require("../../assets/mudpatch.png")}
      ></Image>
      <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Welcome {currentUser?.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
        <Text>Plants</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddTask}>
        <Text>Add task</Text>
      </TouchableOpacity>
      <TasksList
        currentUser={currentUser}
        tasks={tasks}
        setTasks={setTasks}
        taskAdded={taskAdded}
      />
    </View>
  );
}
