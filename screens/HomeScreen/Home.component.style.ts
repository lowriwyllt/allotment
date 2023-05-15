import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.brown,
  },
  background: {
    width: "100%",
    height: 400,
    zIndex: -99999,
    position: "absolute",
  },

  touchableOpacity: {
    width: "25%",
    height: "25%",
  },

  crop: {
    width: "100%",
    height: "100%",
    marginTop: 5,
    marginBottom: 5,
    resizeMode: "contain",
  },

  header: {
    fontWeight: "700",
    marginTop: 50,
    fontSize: 20,
    color: theme.lightcream,
    textAlign: "center",
    backgroundColor: theme.orange,
    width: "100%",
    padding: 8,
  },
  allotmentButtonContainer: {
    paddingTop: 20,
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 70,
    borderStyle: "solid",
    borderWidth: 0,
    maxHeight: 170,
    width: "95%",
    borderColor: "#000",
    justifyContent: "center",
  },
  bodyContainer: {
    marginTop: 20,
    borderWidth: 0,
    width: "100%",
    flex: 1,
    textAlign: "left",
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  homeHeader: {
    fontSize: 30,
  },
  addTask: {
    alignSelf: "center",
    backgroundColor: theme.orange,
    height: 50,
    width: 50,
    borderRadius: 50,
    textAlign: "center",
    alignItems: "center",
    textAlignVertical: "center",
    padding: 15,
  },
});
