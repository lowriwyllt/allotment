import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import AllPlantsScreen from "../AllPlantsScreen/AllPlantsScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import SinglePlantScreen from "../SinglePlantScreen/SinglePlantScreen";
import NavSignOut from "./NavSignOut";
import Account from "../Account/Account";
import EditAccount from "../EditAccount/EditAccount";

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
      <Drawer.Screen name="My Allotment">
        {(props) => (
          <HomeScreen
            {...props}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentUserEmail={currentUserEmail}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Plants" component={AllPlantsScreen} />
      <Drawer.Screen name="Account">
        {(props) => (
          <Account
            {...props}
            currentUser={currentUser}
            setCurrentUserEmail={setCurrentUserEmail}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="plant"
        component={SinglePlantScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="editAccount"
        options={{ drawerItemStyle: { display: "none" } }}
      >
        {(props) => (
          <EditAccount
            {...props}
            currentUser={currentUser}
            setCurrentUserEmail={setCurrentUserEmail}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
