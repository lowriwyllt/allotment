import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavDrawer } from "../NavDrawer/NavDrawer";

const Stack = createNativeStackNavigator();

const Loggedin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={NavDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Loggedin;

const styles = StyleSheet.create({});
