import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.lightcream,
  },
  image: {
    marginTop: 20,
    height: "30%",
    resizeMode: "contain",
  },
  welcome: {
    fontWeight:"700",
    marginTop: 20,
    fontSize: 30,
  },
  subheading: {
    marginTop: 10,
    fontSize: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  homeHeader: {
    fontSize: 30,
  },
});
