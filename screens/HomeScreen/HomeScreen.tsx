import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import { getPlantsFromAllotment } from "../../firebase/database";
import TasksList from "./TasksList";
import { useState, useEffect } from "react";
import { TaskType, UserType } from "../../types/Users.types";
import { useIsFocused } from "@react-navigation/native";
import AllotmentPlantButton from "./AllotmentPlantButton";
import { DrawerNavigationType } from "../../types/Navigation.types";
import { PlantType } from "../../types/Plants.types";

export default function HomeScreen({
  currentUser,
  tasks,
  setTasks,
}: {
  currentUser: UserType;
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
}): JSX.Element {
  const navigation = useNavigation<DrawerNavigationType>();
  const [task, setTask] = useState({
    img: "",
    body: "elbows",
    date: new Date(),
    complete: false,
  });
  const [taskAdded, setTaskAdded] = useState<boolean>(false);
  const [allotment, setAllotment] = useState<PlantType[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getPlantsFromAllotment(currentUser?.id).then((response?: PlantType[]) => {
      console.log("plants", response);
      setAllotment(response ? response : []);
    });
  }, [isFocused, currentUser?.id]);

  return (
    <View style={homeStyles.container}>
      <Image
        source={require("../../crops/farm.png")}
        style={homeStyles.background}
      />
      <View style={homeStyles.allotmentButtonContainer}>
        {allotment?.map((plant: PlantType) => {
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
