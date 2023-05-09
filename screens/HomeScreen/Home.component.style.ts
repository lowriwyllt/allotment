import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.brown,
  },
  background: {
    width: "100%",
    height: 400,
    // resizeMode: "contain",
    zIndex: -99999,
    // top: 0,
    position: "absolute",
  },
  image: {
    position: "absolute",
    marginTop: 0,
    height: "50%",
    width: "100%",
    // height: "30%",
    // resizeMode: "contain",
  },
  header: {
    fontWeight: "700",
    marginTop: 30,
    fontSize: 30,
    color: theme.cream,
    textAlign: "center",
  },
  allotmentButtonContainer: {
    marginTop: 70,
    borderStyle: "solid",
    borderWidth: 0,
    height: 170,
    width: "95%",
    borderColor: "#000",
  },
  bodyContainer: {
    marginTop: 20,
    borderWidth: 0,
    width: "100%",
    flex: 1,
    textAlign: "left",
    // backgroundColor: theme.mainheader,
    padding: 15,
  },
  subheading: {
    fontSize: 17,
    color: theme.lightcream,
    fontWeight: "800",
    textAlign: "left",
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
