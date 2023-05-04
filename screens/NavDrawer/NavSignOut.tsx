import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const NavSignOut = (props: any): JSX.Element => {
  const navigation = useNavigation<any>();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
};

export default NavSignOut;
