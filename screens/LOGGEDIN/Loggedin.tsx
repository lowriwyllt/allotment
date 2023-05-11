import { StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavDrawer } from "../NavDrawer/NavDrawer";
import { UserType } from "../../types/Users.types";
import PushNotification from "../../notifications/PushNotifications";

const Stack = createNativeStackNavigator();

const Loggedin = ({
  currentUser,
  setCurrentUser,
}: {
  currentUser: UserType | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserType | undefined>>;
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {(props) => (
          <>
            <PushNotification />
            <NavDrawer
              {...props}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Loggedin;

const styles = StyleSheet.create({});
