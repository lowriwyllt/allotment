import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import AllPlantsScreen from "../AllPlantsScreen/AllPlantsScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import SinglePlantScreen from "../SinglePlantScreen/SinglePlantScreen";
import NavSignOut from "./NavSignOut";
import Account from "../Account/Account";
import EditAccount from "../EditAccount/EditAccount";
import { UserType } from "../../types/Users.types";
import { Dispatch, SetStateAction, useState } from "react";
import theme from "../../styles/theme.style";

const Drawer = createDrawerNavigator();

export const NavDrawer = ({
  currentUser,
  setCurrentUser,
}: {
  currentUser: UserType | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserType | undefined>>;
}): JSX.Element => {
  const [tasks, setTasks] = useState<any>([]);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: theme.cream },
        drawerType: "front",
        drawerActiveTintColor: theme.green,
      }}
      initialRouteName="My Allotment"
      drawerContent={(props) => <NavSignOut {...props} />}
    >
      <Drawer.Screen
        name="My Allotment"
        options={{
          headerStyle: { backgroundColor: theme.skyblue },
          headerShadowVisible: false,
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            currentUser={currentUser}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Plants"
        component={AllPlantsScreen}
        options={{
          headerStyle: { backgroundColor: theme.cream },
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        options={{
          headerStyle: {
            backgroundColor: theme.cream,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.darkgreen,
          headerTitleAlign: "center",
        }}
      >
        {(props) => <Account {...props} currentUser={currentUser} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="plant"
        component={SinglePlantScreen}
        options={{
          drawerItemStyle: { display: "none" },
          headerStyle: {
            backgroundColor: theme.cream,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.darkgreen,
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="editAccount"
        options={{
          drawerItemStyle: { display: "none" },
          headerTitle: "Edit Account",
          headerStyle: {
            backgroundColor: theme.cream,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.darkgreen,
          headerTitleAlign: "center",
        }}
      >
        {(props) => (
          <EditAccount
            {...props}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const DrawerNavStyles = {
  headerStyle: {
    backgroundColor: theme.cream,
    borderBottomWidth: 0,
  },
  headerTintColor: theme.darkgreen,
  headerTitleAlign: "center",
};
