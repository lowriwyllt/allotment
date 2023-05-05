import { Text, View, FlatList } from "react-native";
import { getTasks } from "../../firebase/database";
import { useEffect } from "react";

export default function TasksList({
  currentUser,
  tasks,
  setTasks,
}: any): JSX.Element {
  useEffect(() => {
    getTasks(currentUser).then((tasks) => {
      const formattedDateTasks = tasks.map((task: any) => {
        task.date = new Date(
          task.date.seconds * 1000 + task.date.nanoseconds / 1000000
        );
        return task;
      });
      setTasks(formattedDateTasks);
    });
  }, [currentUser]);

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View>
            <Text>{item.taskBody}</Text>
            <Text>{item.date.toLocaleDateString()}</Text>
          </View>
        )}
      >
        {/* {tasks?.map((task) => {
            return (
            
                key={avatar}
                onPress={() => {
                  setAvatarUrl(avatar);
                }}
              >
                <Image
                  style={LoginStyle.avatars}
                  key={avatar}
                  source={{ uri: avatar }}
                ></Image>
              
            );
          })} */}
      </FlatList>
    </View>
  );
}
