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
  carrot: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    margin:30,
    // height: "30%",
    // resizeMode: "contain",
  },
  beetroot: {
    width: 40,
    height: 40,
    resizeMode: "contain"
    // height: "30%",
    // resizeMode: "contain",
  },
  beans: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    margin: 60,
    // height: "30%",
    // resizeMode: "contain",
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
    // paddingHorizontal: 150,
    marginTop: 70,
    borderStyle: "solid",
    borderWidth: 0,
    maxHeight: 170,
    width: "95%",
    borderColor: "#000",
    justifyContent: "center"
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
