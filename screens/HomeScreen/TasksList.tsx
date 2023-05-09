import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import { getTasks, setTaskCompleted } from "../../firebase/database";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import LoginStyle from "../LoginScreen/Login.component.style";
import { TaskType, UserType } from "../../types/Users.types";
import theme from "../../styles/theme.style";

export default function TasksList({
  currentUser,
  tasks,
  setTasks,
  taskAdded,
}: {
  currentUser: UserType | undefined;
  tasks: any;
  setTasks: any;
  taskAdded: any;
}): JSX.Element {
  const [todaysTasks, setTodaysTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkboxChanged, setCheckboxChanged] = useState(false);
  const [taskListEmpty, setTaskListEmpty] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      getTasks(currentUser?.id)
        .then((tasks) => {
          if (tasks === undefined) {
            setTaskListEmpty(true);
          } else {
            setTaskListEmpty(false);

            const formattedDateTasks = tasks.map((task: any) => {
              task.date = new Date(
                task.date.seconds * 1000 + task.date.nanoseconds / 1000000
              );

              return task;
            });

            setTasks(formattedDateTasks);

            const today = new Date();

            const todays = tasks.filter((task: any) => {
              if (
                task.date.toLocaleDateString() === today.toLocaleDateString()
              ) {
                return task;
              }
            });
            setTodaysTasks(todays);

            setLoading(false);

            const completedTasks = tasks.map((task: any) => {
              return task.complete;
            });
            setCompletedTasks(completedTasks);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("getTasks error", err);
        });
    }
  }, [currentUser?.id, taskAdded]);

  useEffect(() => {
    setCompletedTasks(completedTasks);
  }, [checkboxChanged]);

  return loading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={taskStyles.container}>
      {/* <Text>Today's Tasks</Text> */}
      {taskListEmpty ? (
        <Text>No tasks today!</Text>
      ) : (
        <FlatList
          data={todaysTasks}
          renderItem={({ item, index }) => (
            <View style={taskStyles.individualTask}>
              <Image
                style={taskStyles.taskImg}
                source={
                  item.img
                  ? { uri: item.img }
                  : {
                    uri: "https://upload.wikimedia.org/wikipedia/commons/3/3b/PlaceholderRoss.png",
                  }
                }
                ></Image>
                <View style={taskStyles.taskContainer}>

              <Text style={taskStyles.body}>{item.body}</Text>
                <Text style={taskStyles.date}>{item.date.toLocaleString()}</Text>
                </View>
              <View>
                <Checkbox style={taskStyles.checkbox}
                  value={Boolean(completedTasks[index])}
                  onValueChange={() => {
                    setTaskCompleted(currentUser?.id, item);
                    setCheckboxChanged(!checkboxChanged);
                    const oppositeOfCurrentValue = !completedTasks[index];
                    completedTasks.splice(index, 1, oppositeOfCurrentValue);
                    setCompletedTasks(completedTasks);
                  }}
                />
              </View>
                {/* <Text>Completed</Text> */}
            </View>
          )}
        ></FlatList>
      )}
    </View>
  );
}

const taskStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    gap:10,
  },
  individualTask: {
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: theme.skyblue,
    display: "flex",
    flexDirection: "row",
    // borderWidth: 1,
    borderColor: theme.lightcream,
    marginVertical:10,
  },
  taskContainer: {
    padding: 10,
    // borderWidth: 1,
    borderColor: theme.lightcream,
    width: "78%"
  },
  taskImg: {
    marginLeft: 5,
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "cover",
    // borderColor: theme.brown,
    // borderWidth: 1,
  },
  body: {
    color: theme.darkgreen,
fontWeight: "600"
  },
  date: {
    color: theme.brown,
    fontSize:10,
  },
  checkbox: {
borderWidth:1,
borderColor: theme.green
  }
});
