import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import { getPlantsFromAllotment } from "../../firebase/database";
import TasksList from "./TasksList";
import { useState, useEffect } from "react";
import { UserType } from "../../types/Users.types";
import { useIsFocused } from "@react-navigation/native";
import AllotmentPlantButton from "./AllotmentPlantButton";

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
  const [allotment, setAllotment] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getPlantsFromAllotment(currentUser?.id).then((response: any) => {
      console.log("plants", response);
      setAllotment(response);
    });
  }, [isFocused, currentUser?.id]);

  return (
    <View style={homeStyles.container}>
      <Image
        source={require("../../crops/farm.png")}
        style={homeStyles.background}
      />
      <View style={homeStyles.allotmentButtonContainer}>
        {allotment?.map((plant: any) => {
          return <AllotmentPlantButton key={plant.name} plant={plant} />;
        })}
      </View>
      <Text style={homeStyles.header}>Welcome, {currentUser?.name}!</Text>
      <View style={homeStyles.bodyContainer}>
        <TasksList
          currentUser={currentUser}
          tasks={tasks}
          setTasks={setTasks}
          taskAdded={taskAdded}
        />
      </View>
    </View>
  );
}
