import { Text, View, FlatList, Image } from "react-native";
import { getTasks, setTaskCompleted } from "../../firebase/database";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import LoginStyle from "../LoginScreen/Login.component.style";
import { TaskType } from "../../types/Users.types";

export default function TasksList({
  currentUser,
  tasks,
  setTasks,
  taskAdded,
}: any): JSX.Element {
  const [todaysTasks, setTodaysTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkboxChanged, setCheckboxChanged] = useState(false);
  const [taskListEmpty, setTaskListEmpty] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);

  useEffect(() => {
    setLoading(true);
    getTasks(currentUser)
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
            if (task.date.toLocaleDateString() === today.toLocaleDateString()) {
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
        console.log("getTasks error", err);
      });
  }, [currentUser, , taskAdded]);

  useEffect(() => {
    setCompletedTasks(completedTasks);
  }, [checkboxChanged]);

  return loading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <View>
      <Text>Today's Tasks</Text>
      {taskListEmpty ? (
        <Text>No tasks today!</Text>
      ) : (
        <FlatList
          data={todaysTasks}
          renderItem={({ item, index }) => (
            <View>
              <Text>{item.date.toLocaleDateString()}</Text>
              <Image
                style={LoginStyle.avatars}
                source={
                  item.img
                    ? { uri: item.img }
                    : {
                        uri: "https://upload.wikimedia.org/wikipedia/commons/3/3b/PlaceholderRoss.png",
                      }
                }
              ></Image>
              <Text>{item.body}</Text>
              <View>
                <Checkbox
                  value={Boolean(completedTasks[index])}
                  onValueChange={() => {
                    setTaskCompleted(currentUser, item);
                    setCheckboxChanged(!checkboxChanged);
                    const oppositeOfCurrentValue = !completedTasks[index];
                    completedTasks.splice(index, 1, oppositeOfCurrentValue);
                    setCompletedTasks(completedTasks);
                  }}
                />
                <Text>Completed</Text>
              </View>
            </View>
          )}
        ></FlatList>
      )}
    </View>
  );
}
