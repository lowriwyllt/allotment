import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import { getTasks, setTaskCompleted } from "../../firebase/database";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import LoginStyle from "../LoginScreen/Login.component.style";
import { TaskType, UserType } from "../../types/Users.types";
import theme from "../../styles/theme.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

export default function TodaysTasks({
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
  const [todaysTaskListEmpty, setTodaysTaskListEmpty] =
    useState<boolean>(false);
  const [loadMorePressed, setLoadMorePressed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [checkboxChanged, setCheckboxChanged] = useState(false);
  const [taskListEmpty, setTaskListEmpty] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      getTasks(currentUser?.id)
        .then((tasks) => {
          if (tasks.length === 0) {
            console.log("inside if statement for no tasks");
            setTodaysTaskListEmpty(true);
            console.log(taskListEmpty);
            setLoading(false);
          } else {
            setTaskListEmpty(false);
            tasks.sort(
              (a: TaskType, b: TaskType) =>
                new Date(a.nextTaskDate).getTime() -
                new Date(b.nextTaskDate).getTime()
            );
            setTasks(tasks);

            const today = new Date();

            const todays = tasks.filter((task: any) => {
              if (task.nextTaskDate === today.toLocaleDateString("en-CA")) {
                console.log(task);
                return task;
              }
            });
            setTodaysTasks(todays);
            console.log("todays->>>", todays);
            if (!todays.length) {
              setTodaysTaskListEmpty(true);
            } else {
              setTodaysTaskListEmpty(false);
            }

            setLoading(false);

            const completedTasks = tasks.map((task: any) => {
              return task.completed;
            });
            setCompletedTasks(completedTasks);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("getTasks error", err);
        });
    }
  }, [currentUser?.id, taskAdded, isFocused]);

  const handleLoadMore = () => {
    setLoadMorePressed(true);
  };

  useEffect(() => {
    setCompletedTasks(completedTasks);
  }, [checkboxChanged, isFocused]);

  // Get the current date
  let today = new Date();

  // Create a new Date object for yesterday's date
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return loading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={taskStyles.container}>
      <Text style={taskStyles.subheading}>
        {loadMorePressed ? "all tasks:" : "tasks:"}
      </Text>

      {todaysTaskListEmpty && !loadMorePressed && (
        <View style={taskStyles.msgContainer}>
          <Text style={taskStyles.msg}>No tasks today!</Text>
        </View>
      )}

      {(!todaysTaskListEmpty && !loadMorePressed) ||
      (loadMorePressed && tasks.length) ? (
        <FlatList
          data={loadMorePressed ? tasks : todaysTasks}
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
                <Text
                  style={
                    new Date(item.nextTaskDate) < yesterday
                      ? taskStyles.bodyLate
                      : taskStyles.body
                  }
                >
                  {item.body}
                </Text>
                <Text style={taskStyles.date}>
                  {item.nextTaskDate.toLocaleString()}
                </Text>
              </View>
              <View>
                <Checkbox
                  style={taskStyles.checkbox}
                  value={Boolean(completedTasks[index])}
                  color={completedTasks[index] ? theme.orange : undefined}
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
      ) : null}

      {!loadMorePressed && (
        <TouchableOpacity onPress={handleLoadMore}>
          <Text style={taskStyles.loadMore}>Load more...</Text>
        </TouchableOpacity>
      )}

      {loadMorePressed && !tasks.length && (
        <View style={taskStyles.msgContainer}>
          <Text style={taskStyles.msg}>No future tasks!</Text>
          <Text style={taskStyles.msg}>
            Maybe try adding some plants to your allotment...
          </Text>
        </View>
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
    gap: 10,
  },
  individualTask: {
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: theme.cream,
    display: "flex",
    flexDirection: "row",
    // borderWidth: 1,
    borderColor: theme.lightcream,
    marginVertical: 10,
  },
  taskContainer: {
    padding: 10,
    // borderWidth: 1,
    borderColor: theme.lightcream,
    width: "78%",
  },
  subheading: {
    fontSize: 17,
    color: theme.lightcream,
    fontWeight: "800",
    textAlign: "left",
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
  bodyLate: {
    color: theme.orange,
    fontWeight: "600",
  },
  body: {
    color: theme.darkgreen,
    fontWeight: "600",
  },
  date: {
    color: theme.brown,
    fontSize: 10,
    fontWeight: "500",
  },
  checkbox: {
    borderWidth: 1,
    borderColor: theme.green,
  },
  msgContainer: {
    marginTop: 10,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.cream,
    height: 90,
  },
  msg: {
    // margin: 30,
    textAlign: "center",
    color: theme.cream,
    fontWeight: "600",
  },
  loadMore: {
    marginTop: 10,
    height: 40,
    padding: 10,
    borderRadius: 20,
    // alignItems: "center",
    // backgroundColor: theme.skyblue,
    // display: "flex",
    // flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.lightcream,
    textAlign: "center",
    color: theme.cream,
    fontWeight: "600",
    // marginVertical: 10,
  },
});
