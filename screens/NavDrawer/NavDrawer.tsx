import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import AllPlantsScreen from "../AllPlantsScreen/AllPlantsScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import SinglePlantScreen from "../SinglePlantScreen/SinglePlantScreen";
import NavSignOut from "./NavSignOut";
import EditProfileScreen from "../EditProfileScreen/EditProfile";
import theme from "../../styles/theme.style";

const Drawer = createDrawerNavigator();

export const NavDrawer = ({
  currentUser,
  setCurrentUser,
  currentUserEmail,
  setCurrentUserEmail,
}: any): JSX.Element => {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerType: "front" }}
      initialRouteName="My Allotment"
      drawerContent={(props) => <NavSignOut {...props} />}
    >
      <Drawer.Screen
        name="My Allotment"
        options={{headerStyle: {backgroundColor: theme.skyblue}, headerShadowVisible:false}}
      >
        {(props) => (
          <HomeScreen
            {...props}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentUserEmail={currentUserEmail}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Plants"
        component={AllPlantsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.cream,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.darkgreen,
          headerTitleAlign: "center",
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
        {(props) => (
          <EditProfileScreen
            {...props}
            currentUser={currentUser}
            setCurrentUserEmail={setCurrentUserEmail}
          />
        )}
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
