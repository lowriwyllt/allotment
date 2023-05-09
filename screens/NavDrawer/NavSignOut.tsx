import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

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
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign out"
          labelStyle={styles.label}
          onPress={handleSignOut}
          style={styles.button}
        />
      </>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.green,
    width: "50%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
});
export default NavSignOut;
