import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import AllPlantsScreen from "../AllPlantsScreen/AllPlantsScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import SinglePlantScreen from "../SinglePlantScreen/SinglePlantScreen";
import NavSignOut from "./NavSignOut";

const Drawer = createDrawerNavigator();

export const NavDrawer = (): JSX.Element => {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerType: "front" }}
      initialRouteName="My Allotment"
      drawerContent={(props) => <NavSignOut {...props} />}
    >
      <Drawer.Screen name="My Allotment" component={HomeScreen} />
      <Drawer.Screen name="Plants" component={AllPlantsScreen} />
      <Drawer.Screen name="Account" component={HomeScreen} />
      <Drawer.Screen
        name="plant"
        component={SinglePlantScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
};
