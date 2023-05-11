import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";
import CalendarSinglePlant from "../SinglePlantScreen/components/Calendar";
import { addTask, getPlantsFromAllotment } from "../../firebase/database";
import TasksList from "./TasksList";
import { useState, useEffect } from "react";
import { UserType } from "../../types/Users.types";
import { TouchableHighlight } from "react-native-gesture-handler";
import { PlantType } from "../../types/Plants.types";
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
  }, [isFocused]);

  // const handleAddTask = () => {
  //   addTask(currentUser?.id, task); //neeeds a task to be added
  //   setTaskAdded(!taskAdded);
  // };

  // const handleClickPlant = () => {

  //   navigation.navigate("plant", { plantName:plant.id });
  // }

  return (
    <View style={homeStyles.container}>
      <Image
        source={require("../../crops/farm.png")}
        style={homeStyles.background}
      />
      <View style={homeStyles.allotmentButtonContainer}>
        {/* <Image
          source={require("../../crops/carrot/3.png")}
          style={homeStyles.carrot}
        />
        <Image
          source={require("../../crops/beetroot/5.png")}
          style={homeStyles.beetroot}
        />
        <Image
          source={require("../../crops/beans/5.png")}
          style={homeStyles.beans}
        /> */}
        {allotment?.map((plant: any) => {
          return (
            <AllotmentPlantButton key={plant.name} plant={plant} />
            // <TouchableOpacity onPress={handleClickPlant} style={homeStyles.touchableOpacity}>

            // <Image style={homeStyles.crop} source={{uri: plant.img}}/>
            // </TouchableOpacity>
          );
        })}

        {/* <Image style={homeStyles.crop} source={require('../../crops/broccoli/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/cabbage/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/carrot/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/corn/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/cucumber/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/onion/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/peas/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/potato/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/pumpkin/5.png')}/>
        <Image style={homeStyles.crop} source={require('../../crops/tomato/5.png')}/> */}
      </View>
      <Text style={homeStyles.header}>Welcome, {currentUser?.name}!</Text>
      <View style={homeStyles.bodyContainer}>
        <TasksList
          currentUser={currentUser}
          tasks={tasks}
          setTasks={setTasks}
          taskAdded={taskAdded}
        />
        {/* <TouchableOpacity onPress={handleAddTask} style={homeStyles.addTask}>
          <Text>+</Text>
        </TouchableOpacity> */}
      </View>
      {/* <Image style={homeStyles.image} source={require('../../crops/farm.png')}></Image> */}
      {/* <Text style={homeStyles.homeHeader}>allotment</Text> */}
      {/* <Text>Email: {currentUserEmail}</Text> */}
      {/* <Text style={homeStyles.welcome}>Welcome, {currentUser?.name}!</Text> */}
      {/* <Text style={homeStyles.subheading}>subheading message</Text> */}
      {/* <Image */}
      {/* style={homeStyles.image} */}
      {/* source={require("../../assets/mudpatch.png")} */}
      {/* ></Image> */}
      {/* <Text style={homeStyles.homeHeader}>allotment</Text> */}
      {/* <Text>Welcome {currentUser?.name}</Text> */}
      {/* <TouchableOpacity onPress={() => navigation.navigate("Plants")}> */}
      {/* <Text>Plants</Text> */}
      {/* </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={() => navigation.navigate("Account")}> */}
      {/* }  <Text>Edit Profile</Text> */}
      {/* </TouchableOpacity> */}
    </View>
  );
}
