import {
  DrawerContentComponentProps,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../styles/theme.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerNavigationType } from "../../types/Navigation.types";

const NavSignOut = (props: DrawerContentComponentProps): JSX.Element => {
  const navigation = useNavigation<DrawerNavigationType>();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.signOutButtonContainer}>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.signOutButton}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signOutButtonContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: theme.green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "center",
  },
  signOutButton: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
});
export default NavSignOut;
