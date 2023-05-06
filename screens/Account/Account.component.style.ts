import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";
export const AccountStyles = StyleSheet.create({
  avatars: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "cover",
    margin: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  textButton: {
    fontWeight: "bold",
  },
  editAccount: {
    marginTop: 40,
  },
});
