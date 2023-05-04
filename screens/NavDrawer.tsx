import { createDrawerNavigator } from "@react-navigation/drawer";
import AllPlantsScreen from "./AllPlantsScreen/AllPlantsScreen";
import HomeScreen from "./HomeScreen/HomeScreen";

const Drawer = createDrawerNavigator();

export const NavDrawer = (): JSX.Element => {
  return (
    <Drawer.Navigator initialRouteName="My Allotment">
      <Drawer.Screen name="My Allotment" component={HomeScreen} />
      <Drawer.Screen name="Plants" component={AllPlantsScreen} />
      <Drawer.Screen name="Account" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
