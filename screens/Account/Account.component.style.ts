import { StyleSheet } from "react-native";
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
  bold: {
    fontWeight: "bold",
  },
  details: {
    backgroundColor: "white",
    width: "80%",
    margin: 10,
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  editAccount: {
    marginTop: 40,
  },
});
