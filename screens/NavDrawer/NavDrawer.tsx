import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import AllPlantsScreen from "../AllPlantsScreen/AllPlantsScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import SinglePlantScreen from "../SinglePlantScreen/SinglePlantScreen";
import NavSignOut from "./NavSignOut";
import EditProfileScreen from "../EditProfileScreen/EditProfile";

const Drawer = createDrawerNavigator();

export const NavDrawer = ({
  currentUser,
  setCurrentUser,
  currentUserEmail,
  setCurrentUserEmail,
  tasks,
  setTasks,
}: any): JSX.Element => {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerType: "front" }}
      initialRouteName="My Allotment"
      drawerContent={(props) => <NavSignOut {...props} />}
    >
      <Drawer.Screen
        name="My Allotment"
        options={{
          title: "My home",
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentUserEmail={currentUserEmail}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Plants" component={AllPlantsScreen} />
      <Drawer.Screen name="Account">
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
        options={{ drawerItemStyle: { display: "none" } }}
      >
        {(props) => (<SinglePlantScreen {...props} currentUser={currentUser} />)}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
