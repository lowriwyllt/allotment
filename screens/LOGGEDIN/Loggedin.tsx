import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavDrawer } from "../NavDrawer/NavDrawer";

const Stack = createNativeStackNavigator();

const Loggedin = ({
  currentUser,
  setCurrentUser,
  currentUserEmail,
  setCurrentUserEmail,
  tasks,
  setTasks,
}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {(props) => (
          <NavDrawer
            {...props}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            currentUserEmail={currentUserEmail}
            setCurrentUserEmail={setCurrentUserEmail}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Loggedin;

const styles = StyleSheet.create({});
