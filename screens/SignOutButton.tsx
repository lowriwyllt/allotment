import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import theme from "../styles/theme.style";
import { DrawerNavigationType } from "../types/Navigation.types";

const SignOutButton = (): JSX.Element => {
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
    <TouchableOpacity onPress={handleSignOut} style={styles.button}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.green,
  },
});

export default SignOutButton;
