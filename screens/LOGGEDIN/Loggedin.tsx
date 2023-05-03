import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen/HomeScreen";
import AllPlantsScreen from "../AllPlantsScreen/AllPlantsScreen";
import SinglePlantScreen from "../SinglePlantScreen/SinglePlantScreen";
import { NavDrawer } from "../NavDrawer";

const Stack = createNativeStackNavigator();

const Loggedin = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={NavDrawer}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="plants" component={AllPlantsScreen} />
      <Stack.Screen name="plant" component={SinglePlantScreen} /> */}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Loggedin;

const styles = StyleSheet.create({});
